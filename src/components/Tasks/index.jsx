import React, { useEffect, useState } from "react";
import { getDateFormat } from "../Helpers";
import Link from "next/link";
import { toast } from "react-toastify";
import { getAllTasks, getSingleTask, updateTask } from "../ApiCalls";
import { PiSpinnerGapThin } from "react-icons/pi";

const initialData = {
  tasks: [],
  columns: {
    todo: [],
    inProgress: [],
    done: [],
  },
};

const DisplayTasks = ({ query }) => {
  const [data, setData] = useState(initialData);
  const [loading, showLoading] = useState(false);
  const fetchAllTasks = async () => {
    try {
      showLoading(true);
      const taskResp = await getAllTasks();
      if (taskResp.ok) {
        const taskData = await taskResp.json();
        console.log("all tasks", taskData);

        const filteredTasks = taskData.allTasks.filter(
          (task) =>
            task.title.toLowerCase().includes(query.search.toLowerCase()) ||
            task.description.toLowerCase().includes(query.search.toLowerCase())
        );

        const sortedTasks = filteredTasks.sort((a, b) => {
          if (query.sortBy === "today") {
            return new Date(b.createdAt) - new Date(a.createdAt);
          } else if (query.sortBy === "yesterday") {
            return new Date(b.createdAt) - new Date(a.createdAt);
          } else if (query.sortBy === "lastYear") {
            return new Date(b.createdAt) - new Date(a.createdAt);
          } else {
            return 0;
          }
        });

        const todoTasks = sortedTasks.filter((task) => task.type === "todo");
        const inProgressTasks = sortedTasks.filter(
          (task) => task.type === "inProgress"
        );
        const doneTasks = sortedTasks.filter((task) => task.type === "done");

        setData({
          tasks: sortedTasks,
          columns: {
            todo: todoTasks,
            inProgress: inProgressTasks,
            done: doneTasks,
          },
        });
        showLoading(false);
      } else {
        showLoading(false);
        console.error("Failed to fetch tasks", taskResp.statusText);
      }
    } catch (error) {
      showLoading(false);
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, [query]);

  const onDragStart = (event, task) => {
    event.dataTransfer.setData("task", JSON.stringify(task));
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = async (event, columnName) => {
    const task = JSON.parse(event.dataTransfer.getData("task"));
    task.type = columnName;
    try {
      const updateResp = await updateTask(task.taskId, task);
      if (updateResp.ok) {
        const newColumns = { ...data.columns };
        Object.keys(newColumns).forEach((column) => {
          newColumns[column] = newColumns[column].filter(
            (t) => t.taskId !== task.taskId
          );
        });
        const data1 = await updateResp.json();
        console.log("data is", data1);
        newColumns[columnName].push(task);
        setData({ ...data, columns: newColumns });
        toast.success(`Task moved to ${columnName}.`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        console.error("Failed to update task", updateResp.statusText);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const renderTasks = (tasks) => {
    return tasks?.map((task) => (
      <div
        key={task.taskId}
        onDragStart={(event) => onDragStart(event, task)}
        draggable
        className="py-2 px-1 flex flex-col gap-3 hover:cursor-pointer transition-all"
      >
        <div className="bg-blue-300 px-2 py-2 rounded-md">
          <div className="text-[12px] md:text-[14px] lg:text-[16px] font-medium">
            TaskId - {task.taskId}
          </div>
          <div className="text-[12px] md:text-[14px] lg:text-[16px] font-medium">
            {task.title}
          </div>
          <div className="text-[12px] md:text-[14px] lg:text-[16px]">
            {task.description}
          </div>
          <div className="text-[12px] md:text-[14px] lg:text-[16px]">
            {getDateFormat(task.createdAt)}
          </div>
          <div className="mt-1 text-white flex justify-end items-end text-[10px] md:text-[10px] lg:text-[12px] gap-1">
            <Link
              className="px-4 py-2 rounded-lg bg-red-500 hover:shadow-2xl"
              href={`/dashboard/tasks/delete/${task.taskId}`}
            >
              Delete
            </Link>
            <Link
              className="px-4 py-2 rounded-lg bg-blue-400 hover:shadow-2xl"
              href={`/dashboard/tasks/edit/${task.taskId}`}
            >
              Edit
            </Link>
            <Link
              className="px-4 py-2 rounded-lg bg-blue-700 hover:shadow-2xl"
              href={`/dashboard/tasks/view-details/${task.taskId}`}
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      {!loading && (
        <div className="flex flex-row gap-3 flex-wrap md:flex-wrap lg:flex-nowrap">
          <div
            className="w-full md:w-full lg:w-2/6 bg-white px-2 py-3 shadow-xl border rounded-md"
            onDragOver={(event) => onDragOver(event)}
            onDrop={(event) => onDrop(event, "todo")}
          >
            <h2 className="px-2 py-2 md:px-3 md:py-3 lg:px-2 lg:py-3 bg-blue-500 rounded-md mb-3 text-white">
              TODO
            </h2>
            {renderTasks(data.columns?.todo)}
          </div>
          <div
            className="w-full md:w-full lg:w-2/6 bg-white px-2 py-2 shadow-xl border rounded-md"
            onDragOver={(event) => onDragOver(event)}
            onDrop={(event) => onDrop(event, "inProgress")}
          >
            <h2 className="px-2 py-2 md:px-3 md:py-3 lg:px-2 lg:py-3 bg-blue-500 rounded-md mb-3 text-white">
              IN PROGRESS
            </h2>

            {renderTasks(data.columns?.inProgress)}
          </div>
          <div
            className="w-full md:w-full lg:w-2/6 bg-white px-2 py-2 shadow-xl border rounded-md"
            onDragOver={(event) => onDragOver(event)}
            onDrop={(event) => onDrop(event, "done")}
          >
            <h2 className="px-2 py-2 md:px-3 md:py-3 lg:px-2 lg:py-3 bg-blue-500 rounded-md mb-3 text-white">
              DONE
            </h2>
            {renderTasks(data.columns?.done)}
          </div>
        </div>
      )}
      {loading && (
        <span className="absolute left-[50%] z-50 top-[60%] translate-x-[-50%] translate-y-[-50%] text-black text-[16px] md:text-[20px] lg:text-[32px]">
          <span className="inline-block animate-spin360">
            <PiSpinnerGapThin size={30} />
          </span>
        </span>
      )}
    </>
  );
};

export default DisplayTasks;
