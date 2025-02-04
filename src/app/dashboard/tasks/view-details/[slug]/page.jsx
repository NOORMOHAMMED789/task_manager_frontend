"use client";
import { getSingleTask } from "@/components/ApiCalls";
import TaskInputForm from "@/components/TaskCreationForm";
import { useEffect, useState } from "react";
import { PiSpinnerGapThin } from "react-icons/pi";

const ViewDetails = ({ params }) => {
  const taskId = params.slug;
  const [task, setTask] = useState(null);
  // Fetch the task details with that id
  const fetchSingleTask = async () => {
    try {
      const taskResp = await getSingleTask(taskId);
      if (taskResp.ok) {
        const taskData = await taskResp.json();
        console.log("task Data is", taskData);
        setTask(taskData.singleTaskResp[0]);
      } else {
        console.error("Failed to fetch task", taskResp.statusText);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  useEffect(() => {
    fetchSingleTask();
  }, [taskId]);

  return (
    <>
      {task && (
        <div className="w-[80%] rounded-lg px-10 py-10 mt-[100px] mb-[100px] mx-auto bg-white z-50 shadow-2xl">
          <label className="mb-2 text-[16px] md:text-[20px] lg:text-[32px] font-bold">
            {`View details: ${task.title}`}
          </label>
          <TaskInputForm viewDetails={task} editData={task} taskId={taskId} />
        </div>
      )}
      {!task && (
        <span className="absolute left-[50%] z-40 top-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-[16px]">
          <span className="inline-block animate-spin360 px-4">
            <PiSpinnerGapThin size={40} />
          </span>
        </span>
      )}
    </>
  );
};

export default ViewDetails;
