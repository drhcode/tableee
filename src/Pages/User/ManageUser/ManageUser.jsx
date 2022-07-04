import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
// import "./ManageTable.css";

const ManageUser = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(0);

  // Get all tables data
  useEffect(() => {
    loadTablesList();
  }, []);

  // functions

  const loadTablesList = () => {
    console.log("loadUserlist ... loading");
    setLoading(true);
    setLoadingLabel("Duke ngarkuar....");
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/users")
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          console.log(res.data);
          setUserList(res.data);
        }
      })
      .catch((error) => {
        console.log("errorStatus - ", error.status);
      });
  };

  const handleDelete = (userId) => {
    setLoading(true);
    setLoadingLabel("Deleting user...");
    console.log(userId);

    axios
      .delete(process.env.REACT_APP_BACKEND_URL + "/api/users/" + userId)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          console.log(res);
          loadTablesList();
          // setTableList(res.data);
        } else {
          console.log(res);
        }
      });
  };
  // functions

  return (
    <>
      {/* <Audio
    heigth="100"
    width="100"
    color='grey'
    ariaLabel='loading'
  /> */}
      <div className="relative">
        {loading ? (
          <div className=" bg-white h-screen ">
            <div className="  flex justify-center md:items-center items-bottom">
              <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>
            <p className="text-center text-blue-500 block font-semibold">
              {loadingLabel}
            </p>
          </div>
        ) : (
          <>
            <table className=" text-gray-800 top-0">
              <caption> Menaxhimi Përdoruesve </caption>
              <thead>
                <tr>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Numer Kontakti</th>

                  <th scope="col">Opsione</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user) => (
                  <tr key={user.id}>
                    <td data-label="User Name">{user.name}</td>
                    <td data-label="Email">
                      {" "}
                      {user.email ? user.email : "__"}
                    </td>
                    <td data-label="Numer Kontakti">
                      {user.contact_number ? user.contact_number : "__"}
                    </td>

                    <td data-label="Opsione">
                      {" "}
                      {deleteIndex === user.id ? (
                        <>
                          <span className="text-md">Confirm delete </span>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className=" btn btn-error text-white"
                            href="#"
                          >
                            Yes
                          </button>{" "}
                          <button
                            onClick={() => setDeleteIndex(0)}
                            className="btn  "
                          >
                            No
                          </button>
                        </>
                      ) : (
                        <>
                          {/* <button className="btn btn-warning btn-sm md:btn-outline">EDIT</button>
                        <button className="btn btn-error btn-sm md:btn-outline">EDIT</button> */}
                          <Link
                            to={`/users/${user.id}/edit`}
                            className=" btn btn-warning btn-sm md:btn-outline mr-2"
                            href="#"
                          >
                            Ndrysho
                          </Link>{" "}
                          <button
                            onClick={() => setDeleteIndex(user.id)}
                            className="btn btn-error btn-sm md:btn-outline text-gray-200"
                          >
                            Fshije
                          </button>
                        </>
                      )}{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default ManageUser;
