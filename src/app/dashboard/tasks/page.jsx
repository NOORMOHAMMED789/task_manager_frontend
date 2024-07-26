'use client'
import Filters from "@/components/Filters"
import DisplayTasks from "@/components/Tasks";
import Link from "next/link"
import { useState } from "react";

const Tasks = () => {
    const [formData, setFormData] = useState({
      values: {
        search: "",
        sortBy: "today",
      },
      touched: {
        search: false,
        sortBy: false,
      },
      errors: {
        search: null,
        sortBy: null,
      },
    });

    return (
      <div className="lg:pl-11 lg:pr-11 md:pl-8 md:pr-8 pl-6 pr-6">
        <Link
          href="/dashboard/tasks/new"
          className="px-6 inline-block py-1 md:px-8 md:py-2 lg:px-10 lg:py-3 hover:shadow-2xl hover:cursor-pointer bg-blue-500 text-white rounded-lg mt-[40px]"
        >
          Add Task
        </Link>
        <div className="mt-3 md:mt-5 lg:mt-7 w-full px-3 py-3 md:px-4 md:py-4 lg:px-5 lg:py-5 shadow-xl rounded-lg">
          <Filters formData={formData} setFormData={setFormData} />
        </div>
        <div className="mt-3 md:mt-5 lg:mt-7 w-full px-3 py-3 md:px-4 md:py-4 lg:px-5 lg:py-5">
          <DisplayTasks query={formData.values}/>
        </div>
      </div>
    );
}

export default Tasks