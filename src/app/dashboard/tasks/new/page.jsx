import TaskInputForm from "@/components/TaskCreationForm";

const CreateNewTask = () => {
    return (
      <div className="w-[80%] rounded-lg px-10 py-10 mt-[100px] mb-[100px] mx-auto bg-white z-50 shadow-2xl">
        <div>
          <label className="mb-2 text-[16px] md:text-[20px] lg:text-[32px] font-bold">
            Create new task
          </label>
          <TaskInputForm createTask={true} />
        </div>
      </div>
    );
}

export default CreateNewTask