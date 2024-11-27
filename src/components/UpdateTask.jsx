import { useState } from "react";

const UpdateTask = ({ tasks, id, setTask }) => {
  const [updateModal, setUpdateModal] = useState(false);

  const handleEditTask = e => {
    e.preventDefault();
    const form = e.target;
    const newTitle = form.title.value.trim();

    if (!newTitle) {
      alert("Title cannot be empty!");
      return;
    }

    // Fetch tasks from localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Update the task with matching ID
    const updatedTasks = storedTasks.map(task =>
      task.id === id
        ? { ...task, title: newTitle, updatedAt: Date.now() }
        : task
    );

    // Save updated tasks to localStorage and state
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTask(updatedTasks);

    // Clear form and close modal
    form.title.value = "";
    setUpdateModal(false);
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
            <form method="dialog" onSubmit={handleEditTask}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text mr-2 font-bold">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
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
