import { createContext, useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import Swal from "sweetalert2";
export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [toDos, setToDos] = useState([]);

  const getToDB = () => {
    let notes = {};

    const taskCard = localStorage.getItem("notes-item");
    if (taskCard) {
      notes = JSON.parse(taskCard);
    }
    return notes;
  };
  const removeFromDb = data => {
    const notes = getToDB();
    const updatednotes = notes.filter(task => task.id !== data.id);

    localStorage.setItem("notes-item", JSON.stringify(updatednotes));

    // Update the state to trigger a re-render and reflect the change in the UI
    setNotes(updatednotes);
  };

  // Function to add a new task to local storage
  const addToDb = data => {
    try {
      setToDos(() => {
        const existingNotes = Array.isArray(getToDB()) ? getToDB() : [];
        const newNote = {
          id: Math.random().toString(),
          title: data.title,
          note: data.note,
          createdAt: new Date(),
        };

        const newNotes = [newNote, ...existingNotes];

        setNotes(newNotes);
        localStorage.setItem("notes-item", JSON.stringify(newNotes));

        Swal.fire({
          title: "Note Add Successful!",
         width: '300px',
         height: "100px",
          icon: "success",
        });

        return newNotes;
      });
    } catch (error) {
      console.error("Error adding note:", error);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  };


  // Function to update the status of a task in local storage
  const updateStatus = data => {
    const targetIndex = notes.findIndex(task => task.id === data.id);

    if (targetIndex !== -1) {
      const updatednotes = [...notes];
      const target = updatednotes[targetIndex];

      if (target.status === "pending") {
        target.status = "running";
      } else if (target.status === "running") {
        target.status = "done";
      }

      updatednotes[targetIndex] = target;
      setNotes(updatednotes);

      localStorage.setItem("notes-item", JSON.stringify(updatednotes));
    } else {
      console.error("Task not found for the given ID:", data.id);
    }
  };

  // Edit The Task
const handleEditNote = (data,id) => {
  const targetIndex = notes.findIndex(item => item.id === id);

  if (targetIndex !== -1) {
    const editedNotes = [...notes];
    editedNotes[targetIndex] = {
      ...editedNotes[targetIndex],
      title: data.title,
      note: data.note,
    };

    // Update state to trigger a re-render
    setNotes(editedNotes);

    // Update the entire notes array in localStorage
    localStorage.setItem("notes-item", JSON.stringify(editedNotes));
      Swal.fire({
        title: "Note Edit Successful!",
        width: "300px",
        height: "100px",
        icon: "success",
      });
  } else {
    console.error("Note not found for the given ID:", id);
  }
};


  useEffect(() => {
    const fetchednotes = getToDB();
    setNotes(Array.isArray(fetchednotes) ? fetchednotes : []);
  }, []);

  const deletenotes = () => {
    localStorage.removeItem("notes-item");
  };
  const authInfo = {
    addToDb,
    updateStatus,
    notes,
    setNotes,
    toDos,
    setToDos,
    deletenotes,
    getToDB,
    removeFromDb,

    handleEditNote,
  };

  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children} </AuthContext.Provider>
    </div>
  );
};

export default NotesProvider;
