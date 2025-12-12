import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className=" fixed top-0 w-full flex sm:flex-row justify-between items-center bg-blue-600 p-2 gap-2">
      {/* Logo */}
      <div
        className="group cursor-pointer w-24 h-24 flex items-center justify-center
                sm:p-2 mb-2 sm:self-start"
      >
        <img
          src="/1.png"
          alt="LOGO"
          className="
      rounded-xl
      transition-all duration-300 ease-out

      group-hover:scale-110

      group-hover:shadow-[10px_10px_8px_rgb(255,215,0)]
    "
        />
      </div>

      {/* Menu */}
      <ul className="flex text-xs gap-6 text-white font-semibold  justify-center sm:pr-8 sm:text-xl ">
        <li>
          <NavLink
            to="/Home"

            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 underline underline-offset-4"
                : "text-white hover:text-black hover:bg-white px-2 py-1 rounded transition-all duration-300"
            }
          >
            HOME
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/MetalChart"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 underline underline-offset-4"
                : "text-white hover:text-black hover:bg-white  py-1 rounded transition-all duration-300"
            }
          >
            METAL CHART
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/MetalRate"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 underline underline-offset-4"
                : "text-white hover:text-black hover:bg-white  py-1 rounded transition-all duration-300"
            }
          >
            METAL RATE
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/Images"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 underline underline-offset-4"
                : "text-white hover:text-black hover:bg-white px-2 py-1 rounded transition-all duration-300"
            }
          >
            IMAGES
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
