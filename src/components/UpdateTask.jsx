import { useState } from "react";
import { useTodos } from "../store/todos";

const UpdateTask = ({ task }) => {
  const { handleUpdateTodo } = useTodos(); // Get the update function from context
  const [updateModal, setUpdateModal] = useState(false);
  const [newTitle, setNewTitle] = useState(task.task);

  const handleEditTask = e => {
    e.preventDefault();

    if (!newTitle.trim()) {
      alert("Task title cannot be empty!");
      return;
    }

    handleUpdateTodo(task.id, newTitle); // Call the update function
    setUpdateModal(false); // Close the modal
  };

  return (
    <div>
      <button
        className="btn bg-zinc-500 text-white p-1 rounded ml-1"
        onClick={() => setUpdateModal(true)}
      >
        Edit
      </button>

      {updateModal && (
        <dialog className="modal rounded" open>
          <div className="modal-box pl-2 pt-6 pr-3 pb-3">
            <h2 className="text-left font-bold text-xl my-3">Edit Your Task</h2>
            <button
              className="bg-red-600 rounded-full px-2 absolute right-2 top-2 hover:bg-yellow-700"
              onClick={() => setUpdateModal(false)}
            >
              X
            </button>
            <form onSubmit={handleEditTask}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text mr-2 font-bold">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Edit your title"
                  className="border pl-1 mb-6 w-full"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="bg-green-600 rounded-full px-2 py-1 absolute right-2 bottom-2 hover:bg-yellow-700"
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default UpdateTask;
