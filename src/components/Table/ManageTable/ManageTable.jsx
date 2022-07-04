import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import "./ManageTable.css";

const ManageTable = () => {
  const [tableList, setTableList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("");
  const [deleteIndex, setDeleteIndex] = useState(0);

  const [errorMsg, setErrorMsg] = useState("");

  // Get all tables data
  useEffect(() => {
    loadTablesList();
  }, []);

  // functions

  const loadTablesList = () => {
    setErrorMsg("");
    console.log("UserList ... loading");
    setLoading(true);
    setLoadingLabel("Duke ngarkuar....");
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/restaurant-tables")
      .then((res) => {
        setErrorMsg("");
        setLoading(false);
        if (res.status === 200) {
          console.log(res.data);
          setTableList(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("error table list - ", err);
        setErrorMsg(err.response.status + " -  " + err.response.data.message);
      });
  };

  const handleDelete = (tableId) => {
    setLoading(true);
    setLoadingLabel("Deleting table...");
    console.log(tableId);

    axios
      .delete(
        process.env.REACT_APP_BACKEND_URL + "/api/restaurant-tables/" + tableId
      )
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
      {errorMsg.length > 2 ? (
        <>
          <p className="text-xl text-center font-semibold text-red-400">
            {errorMsg}
          </p>
        </>
      ) : (
        <>
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
                  <caption>Menaxho Tavolinat </caption>
                  <thead>
                    <tr>
                      <th scope="col">Emri Tavolines</th>
                      <th scope="col">Vëndndodhja</th>
                      <th scope="col">Shënim</th>
                      {/* <th scope="col">Color</th> */}
                      <th scope="col">Opsione</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableList.map((table) => (
                      <tr key={table.id}>
                        <td data-label="Emri Tavolines">{table.table_name}</td>
                        <td data-label="Vëndndodhja">
                          {" "}
                          {table.table_location ? table.table_location : "__"}
                        </td>
                        <td data-label="Shënim">
                          {table.note ? table.note : "__"}
                        </td>
                        {/* <td data-label="Color">
                          {table.color ? table.color : "__"}
                        </td> */}
                        {/* <td data-label="Action"> <a className=" font-semibold text-yellow-500" href="#">EDIT</a> <a href="#" className="font-semibold text-red-500" >DELETE</a>  </td> */}

                        <td data-label="Opsione">
                          {" "}
                          {deleteIndex === table.id ? (
                            <>
                              <span className="text-md">Confirm delete </span>
                              <button
                                onClick={() => handleDelete(table.id)}
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
                                to={`/restaurant-tables/${table.id}/edit`}
                                className=" btn btn-warning btn-sm md:btn-outline mr-2"
                                href="#"
                              >
                                Ndrysho
                              </Link>{" "}
                              <button
                                onClick={() => setDeleteIndex(table.id)}
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
      )}
    </>
  );
};

export default ManageTable;
