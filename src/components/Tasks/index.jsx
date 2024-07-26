import React, { useEffect, useState } from "react";
import { getDateFormat } from "../Helpers";
import Link from "next/link";
import { toast } from "react-toastify";

const initialData = {
  tasks: [],
  columns: {
    todo: [],
    inProgress: [],
    done: [],
  },
};

const DisplayTasks = () => {
  const [data, setData] = useState(initialData);

  const fetchAllTasks = async () => {
    try {
      const taskResp = await fetch("http://localhost:8080/tasks/all", {
        method: "GET",
      });
      if (taskResp.ok) {
        const taskData = await taskResp.json();
        const todoTasks = taskData.allTasks.filter(
          (task) => task.type === "todo"
        );
        const inProgressTasks = taskData.allTasks.filter(
          (task) => task.type === "inProgress"
        );
        const doneTasks = taskData.allTasks.filter(
          (task) => task.type === "done"
        );
        setData({
          tasks: taskData.allTasks,
          columns: {
            todo: todoTasks,
            inProgress: inProgressTasks,
            done: doneTasks,
          },
        });
      } else {
        console.error("Failed to fetch tasks", taskResp.statusText);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const onDragStart = (event, task) => {
    event.dataTransfer.setData("task", JSON.stringify(task));
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = async (event, columnName) => {
    const task = JSON.parse(event.dataTransfer.getData("task"));
    console.log("task is",task)
    task.type = columnName;


    // Call the update API
    try {
      const updateResp = await fetch(
        `http://localhost:8080/tasks/update?taskId=${task.taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );
      if (updateResp.ok) {
        const newColumns = { ...data.columns };
        Object.keys(newColumns).forEach((column) => {
          newColumns[column] = newColumns[column].filter(
            (t) => t.taskId !== task.taskId
          );
        });
        const data1 = await updateResp.json()
        console.log("data is",data1)
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
            {task.title} - {`${task.taskId}`}
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
    </>
  );
};

export default DisplayTasks;
