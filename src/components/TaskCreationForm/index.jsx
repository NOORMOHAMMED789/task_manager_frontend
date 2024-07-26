"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { createNewTask, deleteSingleTask, updateTask } from "../ApiCalls";

const TaskInputForm = ({ editData, editTask, createTask, deleteTask, taskId, viewDetails }) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    values: {
      title: editData?.title || "",
      description: editData?.description || "",
      createdAt: editData?.createdAt || Date.now(),
      type: editData?.type || "todo",
    },
    touched: {
      title: false,
      description: false,
    },
    errors: {
      title: null,
      description: null,
    },
  });
  // function to update the form fields
  function updateFormData(field, value, result, isTouched) {
    setFormData((prevState) => {
      return {
        ...prevState,
        values: {
          ...prevState.values,
          [field]: value,
        },
        errors: {
          ...prevState.errors,
          [field]: result.success,
        },
        touched: {
          ...prevState.touched,
          [field]: isTouched,
        },
      };
    });
  }
  const handleDeleteTask = async () => {
    try {
      const taskResp = await deleteSingleTask(taskId);
      if (taskResp.ok) {
        const taskData = await taskResp.json();
        if (taskData.message === "success") {
          toast.success("Task deleted successfully.", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "light",
          });
        }
        router.replace("/dashboard/tasks")
      } else {
        console.error("Failed to fetch task", taskResp.statusText);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const onTitleChange = (title) => {
    updateFormData("title", title, true, true);
  };

  const onDescriptionChange = (description) => {
    updateFormData("description", description, true, true);
  };

  const handleSubmit = async() => {
    try{
      const taskResp = await createNewTask(formData.values);
      if (taskResp.ok) {
        const taskData = await taskResp.json();
        toast.success("Task Successfully created.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
        router.replace("/dashboard/tasks")
      } else {
        console.error("Failed to fetch task", taskResp.statusText);
      }
    }catch(error){

    }
  };

  const handleEditSubmit = async () => {
    try {
      const taskResp = await updateTask(taskId, formData.values);
      if (taskResp.ok) {
        const taskData = await taskResp.json();
        toast.success("Task Successfully Edited", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
        router.replace("/dashboard/tasks");
      } else {
        console.error("Failed to fetch task", taskResp.statusText);
      }
    } catch (error) {}
  };


  return (
    <div className="mt-4 flex flex-col gap-10">
      <div>
        <label
          htmlFor="title"
          className="mb-2 text-[14px] md:text-[18px] lg:text-[20px] font-medium"
        >
          Title
        </label>
        <input
          id="title"
          className="w-full disabled:cursor-not-allowed border-b-[1px] border-gray-500 mb-2 focus:outline-none"
          onChange={(e) => onTitleChange(e.target.value)}
          value={formData.values.title}
          type="text"
          placeholder="Enter your title..."
          required={true}
          disabled={deleteTask || viewDetails}
        />
      </div>
      <div>
        <label
          htmlFor="desc"
          className="mb-2 text-[14px] md:text-[18px] lg:text-[20px] font-medium"
        >
          Description
        </label>
        <input
          className="w-full disabled:cursor-not-allowed border-b-[1px] border-gray-500 mb-2 focus:outline-none"
          onChange={(e) => onDescriptionChange(e.target.value)}
          value={formData.values.description}
          type="text"
          id="desc"
          placeholder="Enter your description..."
          required={true}
          disabled={deleteTask || viewDetails}
        />
      </div>
      {editTask && (
        <div className="flex flex-row justify-end items-end gap-4">
          <button
            disabled={
              editData.title === formData.values.title &&
              editData.description === formData.values.description
            }
            onClick={handleEditSubmit}
            className="disabled:bg-slate-400 disabled:cursor-not-allowed px-3 md:px-4 lg:px-6 rounded-md py-2 bg-blue-500 text-white hover:cursor-pointer hover:shadow-2xl"
          >
            Save
          </button>

          <Link
            href="/dashboard/tasks"
            className="px-3 md:px-4 lg:px-6 rounded-md py-2 bg-red-500 text-white hover:cursor-pointer hover:shadow-2xl"
          >
            Cancel
          </Link>
        </div>
      )}
      {createTask && (
        <div className="flex justify-end items-end gap-3">
          <button
            onClick={handleSubmit}
            disabled={!formData.values.title && !formData.values.description}
            className="px-4 py-2 bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-[14px] md:text-[16px] lg:text-[18px] rounded-lg hover:cursor-pointer hover:shadow-2xl"
          >
            Create
          </button>
          <Link
            className="px-4 py-2 inline-block bg-red-500 text-white text-[14px] md:text-[16px] lg:text-[18px] rounded-lg hover:cursor-pointer hover:shadow-2xl"
            href="/dashboard/tasks"
          >
            Cancel
          </Link>
        </div>
      )}
      {deleteTask && (
        <div className="flex justify-end items-end gap-3">
          <button
            onClick={handleDeleteTask}
            disabled={!formData.values.title && !formData.values.description}
            className="px-4 py-2 bg-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-[14px] md:text-[16px] lg:text-[18px] rounded-lg hover:cursor-pointer hover:shadow-2xl"
          >
            Delete
          </button>
          <Link
            className="px-4 py-2 inline-block bg-green-500 text-white text-[14px] md:text-[16px] lg:text-[18px] rounded-lg hover:cursor-pointer hover:shadow-2xl"
            href="/dashboard/tasks"
          >
            Cancel
          </Link>
        </div>
      )}

      {viewDetails && (
        <div className="flex justify-end items-end gap-3">
          <Link
            className="px-4 py-2 inline-block bg-red-500 text-white text-[14px] md:text-[16px] lg:text-[18px] rounded-lg hover:cursor-pointer hover:shadow-2xl"
            href="/dashboard/tasks"
          >
            Close
          </Link>
        </div>
      )}
    </div>
  );
};

export default TaskInputForm;
