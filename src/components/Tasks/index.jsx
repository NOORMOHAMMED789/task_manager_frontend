import React, { useEffect, useState } from "react";
import { getDateFormat } from "../Helpers";
import Link from "next/link";

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
      const taskResp = await fetch(`http://localhost:8080/tasks/all`, {
        method: "GET",
      });
      if (taskResp.ok) {
        const taskData = await taskResp.json();
        setData({
          tasks: taskData.allTasks,
          columns: {
            todo: taskData.allTasks,
            inProgress: [],
            done: [],
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

  const onDrop = (event, columnName) => {
    const task = JSON.parse(event.dataTransfer.getData("task"));

    const newColumns = { ...data.columns };
    Object.keys(newColumns).forEach((column) => {
      newColumns[column] = newColumns[column].filter(
        (t) => t.taskId !== task.taskId
      );
    });

    newColumns[columnName].push(task);

    setData({ ...data, columns: newColumns });
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
      <style jsx>{`
        .task {
          padding: 10px;
          margin: 5px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .drag-drop-container {
          display: flex;
          justify-content: space-around;
        }

        .drag-drop-container div {
          width: 30%;
          padding: 10px;
          background-color: #f7f7f7;
          border-radius: 5px;
        }

        .drag-drop-container h2 {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default DisplayTasks;
