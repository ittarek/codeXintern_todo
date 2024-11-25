import { useEffect } from "react";
import { useState } from "react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTask(storedTasks);
  }, []);

  const onAdd = title => {
    const newTask = {
      id: Date.now(),
      title,
      createdAt: Date.now(),
    };
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = [...storedTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTask(updatedTasks);
  };
  // Sort notes by createdAt in descending order
  const sortedTask = tasks.sort((a, b) => b.createdAt - a.createdAt);
  // delete todo
const handleDelete = id => {
  if (confirm("Are you sure you want to delete this task?")) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = storedTasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTask(updatedTasks);

    alert("Task deleted successfully!");
  } else {
    console.log("Task deletion canceled.");
  }
};


const onCompleat = task => {
  if (task.completed) {
    return alert("Task is already completed");
  }
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = storedTasks.map(t => {
    if (t.id === task.id) {
      return { ...t, completed: true };    }
    return t;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  setTask(updatedTasks);
};


  return (
    <div className="bg-slate-400 w-2/3 mx-auto my-3 p-10 rounded-sm">
      <AddTask
        onAdd={onAdd}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <h2 className="text-4xl font-bold text-center text-purple-900">
        My Todo List
      </h2>

      <div className="flex justify-center items-start flex-col ">
        {sortedTask.map(task => (
          <TaskList
          onAdd={onAdd}
            key={task.id}
            tasks={task}
            handleDelete={handleDelete}
            setShowModal={setShowModal}
            showModal={showModal}
            onCompleat={onCompleat}
            setTask={setTask}
          ></TaskList>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
