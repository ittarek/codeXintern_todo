import { useState } from "react";
import UpdateTask from "./UpdateTask";

const TaskList = ({
  task,
  handleDelete,
  setShowModal,
  showModal,


  onCompleat
}) => {


  
  const [check, setCheck] = useState(false);

  return (
    <div className="card w-full my-5 bg-slate-300 ">
      <div className="card-body flex justify-between items-center flex-row  text-center">
        <div className="flex justify-center items-center gap-2">
          <input
            type="checkbox"
        onClick={()=>onCompleat(task)}
            className="checkbox checkbox-primary mr-5  "
          />
          {/* <h2 className="card-title text-black">{task.id}.</h2> */}
          <p className="text-black justify-start">{task.title}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleDelete(task.id)}
            className="btn btn-warning "
          >
            X
          </button>

          <UpdateTask
          task={task}
          

          />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
