import { Link } from "react-router";
import { Plus } from "lucide-react";

const Navbar = () => {
  return (
    <header className="shadow bg-white py-3">
      <div className="flex justify-between items-center container mx-auto px-4">
        <div className="px-5">
          <h1 className=" text-transparent bg-clip-text bg-gradient-to-r from-[#00FF9D] to-[#00C8FF] font-bold text-2xl">
            <Link to={"/"}>Note App</Link>
          </h1>
        </div>
        {/* <div className="nav flex gap-3 text-[#706F6F]">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/create"}>Create</NavLink>
        </div> */}
        <div className="login-btn flex gap-2 items-center px-5">
          <Link
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00FF9D] to-[#00C8FF] text-gray-900 font-semibold hover:opacity-90 transition"
            to={"/create"}
          >
            <span className="flex gap-2 items-center text-blue-600 ">
              <Plus /> New Note
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
