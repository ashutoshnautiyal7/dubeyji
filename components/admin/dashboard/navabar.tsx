import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import { MainNav } from "@/components/admin/dashboard/main-nav";
import ThemeChanger from "@/components/Navbar/DarkSwitch";
import { db } from "@/lib/db";

const Navbar = async () => {

  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeChanger/>
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;