import { useState } from "react";


const UpdateTask = ({ task, onAdd, setShowModal, showModal }) => {
  const [updateModal, setUpdateModal] = useState(false);

  const handleEditTask = e => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    onAdd(title);
    form.title.value = "";
    setUpdateModal(!updateModal);
  };

  return (
    <div>
      <button
        className="btn bg-zinc-500 text-white"
        onClick={() => setUpdateModal(!updateModal)}
      >
        Edit
      </button>

      <dialog className="modal rounded" open={updateModal}>
        <div className="modal-box pl-2 pt-6 pr-3 pb-3 ">
          <h2 className="text-left font-bold text-xl my-3 ">
            Edit Your Valuable Task
          </h2>
          <button
            className=" bg-red-600 rounded-full px-2  absolute right-2 top-2  hover:bg-yellow-700 "
            onClick={() => setUpdateModal(!updateModal)}
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
                placeholder="edit your title"
                className="border pl-1 mb-6"
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="bg-green-600 rounded-full px-2 py-1  absolute right-2 bottom-2  hover:bg-yellow-700 "
              >
                Edit Task
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateTask;