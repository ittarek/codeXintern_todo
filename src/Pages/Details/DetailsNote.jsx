import { FaRegTrashAlt, FaArrowLeft } from "react-icons/fa";
import { Link,  useNavigate,  useParams } from "react-router-dom";

import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { FaCheck } from "react-icons/fa6";
import { AuthContext } from "../../Provider/NotesProvider";
const DetailsNote = () => {

  const { removeFromDb } = useContext(AuthContext);
  const { id } = useParams();
  const getNotesDb = localStorage.getItem("notes-item");
  const parsData = JSON.parse(getNotesDb);
  const dataById = parsData?.find(data => data.id === id);
  const { title, note, id:noteId} = dataById || [];
const navigate = useNavigate()
  // delete note
 const handleDelete = dataById => {
   Swal.fire({
     title: "Are you sure Delete This Note?",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     width: "300px",
     height: "100px",
     confirmButtonText: "Yes, delete it!",
   }).then(result => {
     if (result.isConfirmed) {
       removeFromDb(dataById);
       navigate("/");
       console.log(id);

       Swal.fire({
         title: "Deleted!",
         text: "Your file has been deleted.",
         icon: "success",
         width: "300px",
         height: "100px",
       });
     }
   });
 };


  return (
    <div className="flex flex-col  mx-auto w-full lg:w-[450px]  lg:mt-6  h-[100vh] text-white pt-11 pb-4 px-4 bg-black   overflow-auto touch-auto scroll-smooth">
      <div className="flex justify-between items-center pb-11">
        <Link to="/" className=" flex items-center gap-6">
          <FaArrowLeft /> <span className="text-2xl">Note</span>
        </Link>

        <Link
          to={`/edit/${id}`}
          className="flex items-center gap-3 hover:bg-slate-900 p-1 rounded"
        >
          Edit
        </Link>
      </div>
      <div className="flex justify-between items-center mt-11">
        <form>
          <p className="text-3xl mb-4">{title}</p>
          <p className="tracking-wider">{note}</p>
        </form>
        <button onClick={() => handleDelete(dataById)} className="text-red-400">
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default DetailsNote;
