import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import { ThemeContext } from "../../App";
import Header from "../../components/Header/Header";
import Homepage from "../../components/Homepage/Homepage";
import AddTable from "../../components/Table/AddTable/AddTable";
import EditTable from "../../components/Table/EditTable/EditTable";
import ManageTable from "../../components/Table/ManageTable/ManageTable";
// import { AuthContext } from "../../Context/AuthContext";
import Auth from "../../Pages/Auth/Auth";
import AddUser from "../../Pages/User/AddUser/AddUser";
import EditUser from "../../Pages/User/EditUser/EditUser";
import ManageUser from "../../Pages/User/ManageUser/ManageUser";
export const ThemeContext = React.createContext();

const Master = () => {
  // const darkTheme = useContext(ThemeContext);
  // const [user, setUser] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [permission, setPermission] = useState("");

  const validateUserToken = (token) => {
    console.log(
      "Token exist in localStorage , Here user token will be validate now"
    );
  };

  useEffect(() => {
    const t = localStorage.getItem("isLoggedIn");
    const tValue = localStorage.getItem("token");
    const userStorageValue = localStorage.getItem("user");
    t && JSON.parse(t) ? setIsLoggedIn(true) : setIsLoggedIn(false);
    t && JSON.parse(t) ? setToken(tValue) : setToken("");
    t && JSON.parse(t) ? setUserInfo(userStorageValue) : setUserInfo({});
    console.log("token --", token);
  }, []);
  useEffect(() => {
    console.log("userinfo - 1- ", typeof userInfo);
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("token", token);
    localStorage.setItem("user", userInfo);

    if (JSON.stringify(userInfo) !== "{}") {
      if (token.length > 5) {
        validateUserToken(token);
      }

      // console.log("userInfo -",  JSON.parse(userInfo).permission, isLoggedIn);
      console.log("userInfo -2-", userInfo);
      console.log(
        "permission -2-",
        JSON.parse(userInfo).permission,
        typeof JSON.parse(userInfo).permission
      );
      setPermission(JSON.parse(userInfo).permission);
      console.log("permission - 3 - ", permission);
    }
  }, [isLoggedIn]);
  return (
    <>
      <ThemeContext.Provider value={token}>
        <div className="mx-5 md:mx-20 bg-white min-h-screen">
       
          {isLoggedIn && (
            <Header
              permission={permission}
              logout={() => {
                setIsLoggedIn(false);
                setUserInfo({});
                setToken("");
              }}
            />
          )}
          <Routes>
            {!isLoggedIn && (
              <>
                <Route
                  path="/auth"
                  element={
                    <Auth
                      authenticate={(user) => {
                        setToken(user.token);
                        setUserInfo(JSON.stringify(user.user));
                        setIsLoggedIn(true);
                      }}
                    />
                  }
                />
              </>
            )}

            {isLoggedIn && (
              <>
                <Route path="/" token={token} element={<Homepage />} />
                <Route path="add-table" element={<AddTable />} />
                <Route
                  path="restaurant-tables/:id/edit"
                  element={<EditTable />}
                />
                <Route path="manage-table" element={<ManageTable />} />

                {/* <Route path="add-user" element={<AddUser />} />
                <Route path="manage-user" element={<ManageUser />} />
                <Route path="users/:id/edit" element={<EditUser />} /> */}
                {permission === "admin" ? (
                  <>
                    <Route path="add-user" element={<AddUser />} />
                    <Route path="manage-user" element={<ManageUser />} />
                    <Route path="users/:id/edit" element={<EditUser />} />
                  </>
                ) : (
                  ""
                )}
              </>
            )}

            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/" : "/auth"} />}
            />
          </Routes>
          <div>
            <p className="italic text-center text-sm text-gray-200 py-5">
              Created By{" "}
              <a
                href="https://drhcode.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                DRHCode{" "}
              </a>
            </p>
          </div>
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default Master;
