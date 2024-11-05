import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


// import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddNote from './Components/Notes/AddNote.jsx';
import NotesProvider from './Provider/NotesProvider.jsx';
import DetailsNote from './Pages/Details/DetailsNote.jsx';
import Edit from './Pages/EditPage/Edit.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "addNote",
    element: <AddNote />,
  },
  {
    path: "Details/:id",
    element: <DetailsNote/>
  },
  {
    path: "edit/:id",
    element: <Edit/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotesProvider>
      {" "}
      <RouterProvider router={router} />
    </NotesProvider>

  </React.StrictMode>
);