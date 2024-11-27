import { useState } from "react";
import { useTodos } from "../store/todos";

const AddTask = ({ showModal, setShowModal }) => {
  const [task, setTask] = useState(""); // State for task title
  const { handleAddTodo } = useTodos(); // Context function to add todo

  const handleSubmit = e => {
    e.preventDefault();
    if (!task.trim()) return; // Prevent adding empty tasks
    handleAddTodo(task); // Add task to context
    setTask(""); // Clear input field
    setShowModal(false); // Close modal
  };

  return (
    <div>
      <button
        className="btn bg-zinc-500 px-3 py-1 rounded hover:bg-green-800 duration-500 text-white"
        onClick={() => setShowModal(!showModal)}
      >
        Add Task
      </button>
      <dialog className="modal rounded" open={showModal}>
        <div className="modal-box pl-2 pt-6 pr-3 pb-3">
          <h2 className="text-left font-bold text-xl my-3">Add Your Task</h2>
          <button
            className="bg-red-600 rounded-full px-2 absolute right-2 top-2 hover:bg-yellow-700"
            onClick={() => setShowModal(!showModal)}
          >
            X
          </button>
          <form onSubmit={handleSubmit} method="dialog">
            <div className="form-control">
              <label className="label">
                <span className="label-text mr-2 font-bold">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Add Your Title"
                className="border pl-1 mb-6"
                value={task} // Bind input value to state
                onChange={e => setTask(e.target.value)} // Update state on input
                required
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="bg-green-600 rounded-full px-2 py-1 absolute right-2 bottom-2 hover:bg-yellow-700"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddTask;
