import { createContext, useContext, useState } from "react";

// Create the context
export const todosContext = createContext(null);

// Create the provider
export const TodosProvider = ({ children }) => {
  const [tasks, setTodos] = useState(() => {
    try {
      const storedTodos = localStorage.getItem("tasks") || "[]";
      return JSON.parse(storedTodos);
    } catch (error) {
      console.error("Failed to parse tasks from localStorage:", error);
      return [];
    }
  });

  // Add a new task
  const handleAddTodo = task => {
    const newTodo = {
      id: Math.random().toString(), // Generate a unique ID
      task,
      completed: false,
      createdAt: new Date(),
    };

    setTodos(prev => {
      const updatedTodos = [...prev, newTodo];
      localStorage.setItem("tasks", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  // Mark a task as completed/uncompleted
  const toggleTodoAsCompleted = id => {
    setTodos(prev => {
      const updatedTodos = prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  // Delete a task
  const handleDeleteTodo = id => {
    setTodos(prev => {
      const updatedTodos = prev.filter(todo => todo.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  return (
    <todosContext.Provider
      value={{
        tasks,
        handleAddTodo,
        toggleTodoAsCompleted,
        handleDeleteTodo,
      }}
    >
      {children}
    </todosContext.Provider>
  );
};

// Custom hook for using the TodosContext
export const useTodos = () => {
  const todosConsumer = useContext(todosContext);
  if (!todosConsumer) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return todosConsumer;
};
