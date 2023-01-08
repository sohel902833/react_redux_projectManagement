import React from "react";
import imgLogo from "../../assets/images/logo.png";
import { NavLink as Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/users/userSelectors";
import { setFilterText } from "../../features/filter-project/filterProjectSlice";
const Header = () => {
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const debounceHandler = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  const doSearch = (value) => {
    dispatch(setFilterText(value));
  };

  const handleSearch = debounceHandler(doSearch, 500);
  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <img src={imgLogo} className="h-10 w-10" />

      {pathname === "/projects" && (
        <input
          onChange={(e) => handleSearch(e.target.value)}
          className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
          type="search"
          placeholder="Search for anything…"
        />
      )}

      <div className="ml-10">
        <Link
          to="/projects"
          className={({ isActive }) =>
            isActive
              ? `mx-2 text-sm font-semibold text-red-600 hover:text-indigo-700`
              : `mx-2 text-sm font-semibold`
          }
        >
          Projects
        </Link>
        <Link
          className={({ isActive }) =>
            isActive
              ? `mx-2 text-sm font-semibold text-red-600 hover:text-indigo-700`
              : `mx-2 text-sm font-semibold`
          }
          to="/teams"
        >
          Team
        </Link>
      </div>

      <buton className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer">
        <img
          src={
            user?.avatar
              ? user?.avatar
              : "https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
          }
          alt="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
        />
      </buton>
    </div>
  );
};

export default Header;
