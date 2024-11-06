import { useState } from "react";


const UpdateTask = ({task}) => {
const [updateModal, setUpdateModal] = useState(false)


const handleEditTask = (task) =>{

  

setUpdateModal(!updateModal);
}


    return (
        <div>
        <button
          className="btn bg-zinc-500 text-white"
          onClick={() => setUpdateModal(!updateModal)}
        >
          Edit 
        </button>
        <dialog className="modal" open={updateModal}>
          <div className="modal-box">
            <h2 className="text-center font-bold text-xl ">
              Edit Your Valuable Task
            </h2>
            <button
              className="btn btn-sm bg-red-600 btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setUpdateModal(!updateModal)}
            >
              X
            </button>
            <form onSubmit={()=>handleEditTask(task)} method="dialog">
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