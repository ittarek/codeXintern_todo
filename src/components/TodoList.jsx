import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import { useTodos } from "../store/todos";

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);
  const { tasks } = useTodos();
  const [searchParams] = useSearchParams();

  // Filter tasks based on query parameter
  const filter = searchParams.get("tasks"); // Get the 'tasks' parameter
  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // Default: show all tasks
  });

  // Sort tasks by creation date (descending order)
  const sortedTasks = filteredTasks.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="todoList bg-slate-400 w-2/3 mx-auto my-3 p-10 rounded-sm">
      {/* Add Task Modal */}
      <AddTask showModal={showModal} setShowModal={setShowModal} />
      <h2 className="text-4xl font-bold text-center text-purple-900">
        My Todo List
      </h2>

      {/* Task List */}
      <div className="flex justify-center items-start flex-col">
        {sortedTasks.length > 0 ? (
          sortedTasks.map(task => (
            <TaskList
              key={task.id}
              task={task}
              setShowModal={setShowModal}
              showModal={showModal}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
