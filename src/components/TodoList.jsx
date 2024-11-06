import { useEffect } from "react";
import { useState } from "react";
import TaskList from "./TaskList";
import AddTask from "./AddTask";

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTask] = useState([]);


  
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(data => {
        setTask(data);
      });
  }, []);

  const onAdd = async title => {
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, id: tasks.id}),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTask(tasks => [...tasks, data]);
      });
  };
  // delete todo
  const handleDelete = id => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then(res => {
      setTask(
        tasks.filter(task => {
          return task.id !== id;
        })
      );
    });
  };
  // update todo
  const onCompleat = task => {

    if(task.completed == true){
      return alert("task is already completed")
    }else{

     
    fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(task.completed == true ),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTask(tasks => [...tasks, data]);
      });}
  };

  return (
    <div className="bg-slate-400 w-2/3 mx-auto my-24 p-10 rounded-sm">
      <AddTask
        onAdd={onAdd}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <h2 className="text-4xl font-bold text-center text-purple-900">
        My Todo List
      </h2>
      <div className="flex justify-between ">
        <div className="flex">
          <p className="mr-5 font-bold">Compleat</p>
          {/* <p className="mr-5 font-bold">NO</p> */}
          <p className="font-bold">Title</p>
        </div>
        <p className="mr-11 font-bold">Delete</p>
      </div>
      <div className="flex justify-center items-start flex-col">
        {tasks.map(task => (
          <TaskList
            key={task.id}
            task={task}
            handleDelete={handleDelete}
            setShowModal={setShowModal}
            showModal={showModal}
            onCompleat={onCompleat}
          ></TaskList>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
