import React, { useContext } from 'react'
import { NavLink } from 'react-router';
import { ThemeContext } from '../../Context/ThemeContext';

const Navbar = () => {

 const { theme, toggleTheme } = useContext(ThemeContext);

    const navitem = [
        {
            id: 1,
            name: "Home",
            path : "/"
        },
        {
            id: 2,
            name: "Blog",
            path : "/blog"
        },
        {
            id: 3,
            name: "Profile",
            path : "/profle"
        },
    ]
  return (
    <div className=" w-full bg-BGWhite flex gap-[80px] justify-between">
      <div className="">
        <ul className="flex gap-8">
          {navitem.map((item) => (
            <NavLink
              to={item.path}
              key={item.id}
              className={({ isActive, isPending }) =>
                isPending
                  ? "text-black"
                  : isActive
                  ? " text-red-600"
                  : "text-blue-500"
              }
            >
              <li className="text-[20px] font-medium">{item.name}</li>
            </NavLink>
          ))}
        </ul>
      </div>
      <div>
        <button
          className="bg-gray-600 px-3 py-2 rounded cursor-pointer text-white"
          onClick={toggleTheme}
        >
          {theme === "light" ? "dark" : "light"} mode
        </button>
      </div>
    </div>
  );
}

export default Navbar