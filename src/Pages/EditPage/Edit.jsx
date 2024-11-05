
import { FaArrowLeft } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/NotesProvider";

const Edit = () => {
    const [isFocus, setIsFocus] = useState(false);
const { id } = useParams();

    console.log("id",id);
    
        const { handleEditNote } = useContext(AuthContext);
     const {
       register,
       handleSubmit,
       watch,
       reset,
       formState: { errors },
     } = useForm();

     const onSubmit = (data) => {
       handleEditNote(data,id);
       reset();
     };
  return (
    <div className="flex flex-col  mx-auto w-full lg:w-[450px]  lg:mt-6  h-[100vh] text-white pt-11 pb-4 px-4 bg-black   overflow-auto touch-auto scroll-smooth">
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center pb-11">
          <Link to="/" className=" flex items-center gap-6">
            <FaArrowLeft /> <span className="text-2xl">Note</span>
          </Link>
          {isFocus && (
            <button className="flex items-center gap-3 hover:bg-slate-900 p-1 rounded">
              <FaCheck />
              <input type="submit" value="Edit" className="text-xl" />
            </button>
          )}
        </div>
        <input
          type="text"
          name="title"
          className="px-5 py-1 rounded-xl bg-slate-900 mb-6 mt-2 w-full"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          placeholder="Title"
          {...register("title")}
        />
        <textarea
          className="px-5 py-1 rounded-xl bg-slate-900 mb-6 mt-2 w-full"
          name="note"
          id=""
          cols="30"
          rows="10"
          placeholder="Note Something Down"
          {...register("note")}
        ></textarea>
      </form>
    </div>
  );
};

export default Edit;
