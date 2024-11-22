const AddTask = ({ onAdd, showModal, setShowModal }) => {


  const handleAddTask = e => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    onAdd(title);
    form.title.value = "";
    setShowModal(!showModal);
  };

  return (
    <div>
      <button
        className="btn bg-zinc-500 px-3 py-1
        rounded hover:bg-green-800 duration-500 text-white"
        onClick={() => setShowModal(!showModal)}
      >
        Add Task
      </button>
      <dialog className="modal rounded" open={showModal}>
        <div className="modal-box pl-2 pt-6 pr-3 pb-3 ">
          <h2 className="text-left font-bold text-xl my-3 ">
            Add Your Valuable Task
          </h2>
          <button
            className=" bg-red-600 rounded-full px-2  absolute right-2 top-2  hover:bg-yellow-700 "
            onClick={() => setShowModal(!showModal)}
          >
            X
          </button>
          <form onSubmit={handleAddTask} method="dialog">
            <div className="form-control">
              <label className="label">
                <span className="label-text mr-2 font-bold">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Add Your Title"
                className="border pl-1 mb-6"
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="bg-green-600 rounded-full px-2 py-1  absolute right-2 bottom-2  hover:bg-yellow-700 "
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
