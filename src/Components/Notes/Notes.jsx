import { Link } from "react-router-dom";
import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

const Notes = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filterDataByMonth, setFilterDataByMonth] = useState([]);
  const [search, setSearch] = useState("");

  // for original data
  useEffect(() => {
    const storedData = localStorage.getItem("notes-item");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    setOriginalData(parsedData);
  }, []); 

  // for filter by month
  useEffect(() => {
    // Filter by search
    const filteredNote = originalData.filter(note =>
      note.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilterDataByMonth(filteredNote);
  }, [originalData, search]);

  const handleFilterDataByMonth = targetMonth => {
    const selectedMonth = parseInt(targetMonth.split("-")[1], 10);
    const filteredData = originalData.filter(item => {
      const itemMonth = new Date(item.createdAt).getMonth() + 1;
      return itemMonth === selectedMonth;
    });
    setFilterDataByMonth(filteredData);
  };

  function handleSearchNote(event) {
    setSearch(event.target.value);
  }


 
  function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  return (
    <main className="flex flex-col  mx-auto w-full lg:w-[450px]  lg:mt-6  h-[100vh] text-white px-4 pb-4  bg-black   overflow-auto touch-auto scroll-smooth">
      <section className="">
        {/* search your notes */}
        <div className="sticky  top-0 z-10 pt-4  bg-black overflow-y-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-4xl pb-2 text-start ">
              {" "}
              Notes
            </Link>
            <div className=" flex flex-col">
              <label htmlFor="forFilter">Filter By Month</label>

              <input
                placeholder="Month"
                type="month"
                id="forFilter"
                onChange={e => handleFilterDataByMonth(e.target.value)}
                className="bg-slate-900 rounded-xl  border mr-1 border-green-600 px-1 text-white "
              />
            </div>
          </div>
          <form>
            <i className="fi fi-search"></i>
            <input
              className="px-5 py-1 rounded-xl bg-slate-900 mb-6 mt-2 w-full"
              type="search"
              name=""
              id=""
              value={search}
              onChange={handleSearchNote}
              placeholder="Search Your Note"
            />
          </form>
        </div>
        {/* notes card */}
        <div className="text-slate-300 py-2 ">
          {filterDataByMonth?.map(s => (
            <div
              key={s.id}
              className=" bg-slate-900 rounded-xl px-2 py-4 w-full mb-2 text-start scroll-smooth"
            >
              <Link to={`/Details/${s.id}`}>
                <p className="text-xl font-bold mb-1 tracking-wider">
                  {s.title}
                </p>
                <h1 className="text-slate-300 tracking-wider mb-1">{s.note}</h1>

                {isValidDate(s.createdAt)
                  ? formatDistanceToNow(new Date(s.createdAt), {
                      addSuffix: true,
                    }) === "less than a minute ago"
                    ? "Just Now"
                    : format(new Date(s.createdAt), "MMMM do yyyy, h:mm a")
                  : "Invalid date"}
              </Link>
            </div>
          ))}
        </div>
        {/* add note */}
        <Link to="/addNote">
          {" "}
          <button className="bg-[#29C901] p-3 rounded-full   mt-[90%] ml-[39%] text-center w-[60px] lg:ml-[170px] lg:mt-[200px] text-3xl  md:ml-[50%] md:mb-[25px] absolute bottom-0 mb-1">
            +
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Notes;