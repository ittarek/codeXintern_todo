import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const Navbar = () => {
  const [tasks, setTasks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("tasks"); // Get the filter value from query params

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <nav className="flex justify-between items-center border-b w-2/3 border-black">
      {/* Link to All tasks */}
      <Link
        to="/"
        className={!filter ? "active" : ""} // Active if no filter is applied
      >
        All
      </Link>

      {/* Link to Active tasks */}
      <Link
        to="/?tasks=active"
        className={filter === "active" ? "active" : ""} // Active if filter is active
      >
        Active
      </Link>

      {/* Link to Completed tasks */}
      <Link
        to="/?tasks=completed"
        className={filter === "completed" ? "active" : ""} // Active if filter is completed
      >
        Completed
      </Link>
    </nav>
  );
};

export default Navbar;
