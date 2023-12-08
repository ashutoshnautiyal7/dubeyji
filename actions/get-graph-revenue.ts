import { db } from "@/lib/db";
import { LeadStatus } from "@prisma/client";



export const getGraphRevenue = async () => {
  const sales = await db.lead.findMany({
    where: {
      status: LeadStatus.CONVERTED,
    },
  });

  const monthlyRevenue: { [key: number]: number } = {};

  // Grouping the orders by month and summing the revenue
  for (const sale of sales) {
    if(sale.createdAt === null){
        continue;
    }
    if(sale.bill === null){
        continue;
    }

    const month = sale.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...
    let revenue = sale.bill;

    

    // Adding the revenue for this order to the respective month
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenue;
  }

  // Converting the grouped data into the format expected by the graph
  const graphData = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  // Filling in the revenue data
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  }

  return graphData;
};