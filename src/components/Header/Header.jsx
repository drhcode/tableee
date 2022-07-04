import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.jpg";

const Header = ({ permission, logout }) => {
  console.log("indiside - header - ", permission);
  const navigate = useNavigate();
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  // --------------------------------------------------------------------- FUNCTION
  const handleMobileMenu = () => {
    if (isMobileMenuActive) {
      setIsMobileMenuActive(false);
    } else {
      setIsMobileMenuActive(true);
    }
  };
  // --------------------------------------------------------------------- FUNCTION //
  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="relative">
      <div className="navbar mb-2   text-neutral-content ">
        <div className="flex-1 px-2 mx-2">
          {/* <span className="text-lg font-bold">Royal </span> */}
          <Link to="/">
            {" "}
            <img src={logo} alt="" className="w-20 md:w-40" />
          </Link>
        </div>
        <div className="flex-none hidden px-2 mx-2 lg:flex text-black">
          <div className="flex items-stretch">
            <Link to="/" className="btn btn-ghost btn-sm rounded-btn ">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 mr-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
              <span className="text-black">Faqja Kryesore</span>
            </Link>

            <Link to="/add-table" className="btn btn-ghost btn-sm rounded-btn">
              <i className="fas fa-tasks mr-2 "></i>
              Shto Tavolinë
            </Link>
            <Link
              to="/manage-table"
              className="btn btn-ghost btn-sm rounded-btn"
            >
              <i className="fas fa-tasks mr-2 "></i>
              Menaxho Tavolinat
            </Link>

            {permission === "admin" ? (
              <>
                <Link
                  to="/add-user"
                  className="btn btn-ghost btn-sm rounded-btn"
                >
                  <i className="fas fa-tasks mr-2 "></i>
                  Shto Përdorues
                </Link>
                <Link
                  to="/manage-user"
                  className="btn btn-ghost btn-sm rounded-btn"
                >
                  <i className="fas fa-tasks mr-2 "></i>
                  Menaxho Përdoruesit
                </Link>
              </>
            ) : (
              ""
            )}

            <button
              onClick={() => handleLogout()}
              className="btn btn-ghost btn-sm rounded-btn"
            >
              <i className="fas fa-sign-out-alt mr-2"></i>
              Dil
            </button>
          </div>
        </div>
        <div className="md:hidden block">
          <button
            onClick={handleMobileMenu}
            className="btn btn-square btn-ghost text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Start  */}
      <div
        className={`bg-gray-100 absolute h-screen  w-full z-10 rounded shadow-lg ${
          isMobileMenuActive ? "    " : "hidden"
        } `}
      >
        <nav className="flex flex-col items-start mt-2 px-2  text-gray-700">
          {/* <nav className="grid grid-cols-1 gap-1 mt-2"> */}

          <Link
            onClick={handleMobileMenu}
            to="/"
            className="btn btn-ghost rounded-btn  text-lg md:text-xl bg-white w-full justify-start my-1 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 mr-2 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            Faqja Kryesore
          </Link>
          <Link
            onClick={handleMobileMenu}
            to="/add-table"
            className="btn btn-ghost rounded-btn  text-lg md:text-xl bg-white w-full justify-start  my-1"
          >
            <i className="fas fa-tasks mr-2 "></i>
            Shto Tavolinë
          </Link>
          <Link
            onClick={handleMobileMenu}
            to="/manage-table"
            className="btn btn-ghost rounded-btn  text-lg md:text-xl bg-white w-full justify-start my-1 "
          >
            <i className="fas fa-tasks mr-2 "></i>
            Menaxho Tavolinat
          </Link>
          {/* admin user  */}
          {permission === "admin" ? (
            <>
              <Link
                onClick={handleMobileMenu}
                to="/add-user"
                className="btn btn-ghost rounded-btn  text-lg md:text-xl bg-white w-full justify-start my-1 "
              >
                <i className="fas fa-tasks mr-2 "></i>
                Shto Përdorues
              </Link>
              <Link
                onClick={handleMobileMenu}
                to="/manage-user"
                className="btn btn-ghost rounded-btn  text-lg md:text-xl bg-white w-full justify-start my-1 "
              >
                <i className="fas fa-tasks mr-2 "></i>
                Menaxho Përdoruesit
              </Link>
            </>
          ) : (
            ""
          )}
          {/* admin user  */}

          <button
            onClick={() => handleLogout()}
            className="btn btn-ghost rounded-btn text-lg md:text-xl bg-white w-full justify-start my-1 "
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Dil
          </button>
        </nav>
      </div>
      {/* Mobile Menu Start  */}
    </div>
  );
};

export default Header;
