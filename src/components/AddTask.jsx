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
        className="btn bg-zinc-500 text-white"
        onClick={() => setShowModal(!showModal)}
      >
        Add Task
      </button>
      <dialog className="modal" open={showModal}>
        <div className="modal-box">
          <h2 className="text-center font-bold text-xl ">
            Add Your Valuable Task
          </h2>
          <button
            className="btn btn-sm bg-red-600 btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setShowModal(!showModal)}
          >
            X
          </button>
          <form onSubmit={handleAddTask} method="dialog">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Add Your Title"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
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
