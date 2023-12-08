"use client";
import React, { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

const formSchema = z.object({
  link: z.string().url({
    message: "Invalid URL. Please enter a valid YouTube link.",
  }),
});

type AddYouTubeFormValues = z.infer<typeof formSchema>;

const Page: React.FC<Props> = () => {
  const [isLoading, setLoading] = useState(false);

  const form = useForm<AddYouTubeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.post("/api/youtube", values);
      form.reset();
      toast.success("YouTube link added successfully!");
      // Redirect or perform any other action after successful submission
    } catch (error) {
      console.error("Error adding YouTube link:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl font-bold mb-5 m-10">Add YouTube Link</h2>
        <div className="container mx-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="mb-6">
                <label
                  htmlFor="link"
                  className="block text-sm font-bold text-black dark:text-white"
                >
                  YouTube Link
                </label>
                <input
                  id="link"
                  name="link"
                  type="text"
                  disabled={isLoading}
                  className="w-full mt-1 p-2 border border-primary focus:outline-none focus:border-secondary dark:text-white dark:bg-gray-800"
                  placeholder="Enter YouTube link"
                  {...form.register("link")}
                />
                {form.formState.errors.link && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.link.message}
                  </p>
                )}
              </div>
            </div>

            <div className="px-6 py-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white rounded-md cursor-pointer"
                disabled={isLoading}
              >
                Add Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
