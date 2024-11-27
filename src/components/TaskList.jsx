import UpdateTask from "./UpdateTask";
import { useTodos } from "../store/todos";

const TaskList = ({task}) => {
  const {  toggleTodoAsCompleted, handleDeleteTodo } = useTodos();
console.log(task);

  return (
    <div className="main-task grid-cols-3 flex items-center w-full my-3 bg-slate-300 rounded">
      <li className="grid grid-cols-3 items-center w-full">
        {/* Checkbox for toggling completion */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTodoAsCompleted(task.id)}
          className="checkbox checkbox-primary mr-5"
        />

        {/* Task title */}
        <label htmlFor={`task-${task.id}`}> {task.task} </label>
    
        {/* Delete button (only shows if completed) */}
        {task.completed && (
          <button
            className="btn bg-zinc-500 text-white p-1 rounded"
            type="button"
            onClick={() => handleDeleteTodo(task.id)}
          >
            Delete
          </button>
        )}
      </li>

      {/* Update task button */}
      <div>
        <UpdateTask task={task} id={task.id} />
      </div>
    </div>
  );
};

export default TaskList;
