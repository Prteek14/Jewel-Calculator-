import { NavLink } from "react-router-dom";

function MetalNav() {
  return (
    <div className="h-14 w-4/5 mx-auto mt-36 mb-4 sm:w-3/5 bg-sky-300 rounded-xl flex items-center justify-center border-2 border-gray-500">

      <ul className="h-12 w-[98%] flex text-xs font-semibold justify-evenly items-center sm:text-base p-1">

        {/* GOLD */}
        <li className="w-full h-full">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `w-full h-full flex items-center justify-center rounded-xl transition-all duration-200
               ${isActive ? "bg-yellow-400" : "hover:bg-yellow-400"}`
            }
          >
            GOLD
          </NavLink>
        </li>

        {/* SILVER */}
        <li className="w-full h-full">
          <NavLink
            to="/Home/Silver"
            className={({ isActive }) =>
              `w-full h-full flex items-center justify-center rounded-xl transition-all duration-200
               ${isActive ? "bg-[#e0e0e0]" : "hover:bg-[#e0e0e0]"}`
            }
          >
            SILVER
          </NavLink>
        </li>

        {/* PLATINUM */}
        <li className="w-full h-full pr-1">
          <NavLink
            to="/Home/Platinum"
            className={({ isActive }) =>
              `w-full h-full flex items-center justify-center rounded-xl transition-all duration-200
               ${isActive ? "bg-[#fbfbfb]" : "hover:bg-[#fbfbfb]"}`
            }
          >
            PLATINUM
          </NavLink>
        </li>

        

      </ul>
    </div>
  );
}

export default MetalNav;
