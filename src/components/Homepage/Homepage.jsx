import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { ThemeContext } from "../../layout/Master/Master";
import GetCurrentDate from "../../utils/GetCurrentDate/GetCurrentDate";
import FreeTable from "../RoundTable/FreeTable/FreeTable";
import ReservedTable from "../RoundTable/ReservedTable/ReservedTable";
import ArrivedTable from "../RoundTable/ArrivedTable/ArrivedTable";
// import FreeTable from "../FreeTable/FreeTable";
import Stat from "../Stat/Stat";
// import Table from "../Table/Table";
// import TableReserved from "../TableReserved/TableReserved";

const Homepage = (props) => {
  const tokenValue = useContext(ThemeContext);
  // const useAuth =
  // const token = props.token;
  // const user = useContext(UserContext);
  //  ---------------------------------------------------------------- useState
  const [tableList, setTableList] = useState([]);
  const [dateReservation, setDateReservation] = useState([]);
  const [currentReservationList, setCurrentReservationList] = useState([]);
  const [currentDate, setCurrentDate] = useState([]);
  const [confirmTableName, setConfirmTableName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Duke ngarkuar...");
  // Reservation data
  const [customerName, setCustomerName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [contactNumber, setContactNumber] = useState("");
  const [tableNo, setTableNo] = useState(0);
  const [reservationId, setReservationId] = useState("");
  const [isSavingResarvation, setIsSavingResarvation] = useState(false);
  const [isLoadingFreeReservation, setIsLoadingFreeReservation] =
    useState(false);
  const [warningContainer, setWarningContainer] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  // const user = useContext(UserContext);
  //  ---------------------------------------------------------------- useState //
  //  ---------------------------------------------------------------- FUNCTION

  const selectDate = (event) => {
    setCurrentDate(event.target.value);
  };

  const loadTableData = () => {
    // console.log("token from context- ", tokenValue)
    setErrorMsg("");
    setLoading(true);
    fetch(process.env.REACT_APP_BACKEND_URL + "/api/restaurant-tables", {
      headers: new Headers({
        Authorization: "Bearer " + tokenValue,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setErrorMsg("");
        setLoading(false);
        // console.log(data);
        setTableList(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error  table list- ", err);
        setErrorMsg(err.response.status + " -  " + err.response.data.message);
      });
  };
  const loadTablesList = () => {
    setErrorMsg("");
    // console.log("UserList ... loading");
    setLoading(true);
    setLoadingLabel("Loading data....");
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

  const loadReservationData = () => {
    setErrorMsg("");
    setLoading(true);
    fetch(
      process.env.REACT_APP_BACKEND_URL +
        "/api/reservation-listes/date/" +
        currentDate,
      {
        headers: new Headers({
          Authorization: "Bearer " + tokenValue,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setErrorMsg("");
        setLoading(false);
        setDateReservation(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error reservation list  - ", err);
        setErrorMsg(err.response.status + " -  " + err.response.data.message);
      });
  };

  const bookingConfirmation = (event, name, id) => {
    event.preventDefault();
    // alert("hello");
    setConfirmTableName(name);
    setTableNo(id);
    setCustomerName("");
    setCapacity("");
    setContactNumber("");
    window.location.href = "#my-modal";

    // window.open("#my-modal")
  };

  const handleReservationSave = (
    event,
    name,
    id,
    customer_name,
    capacity,
    contact_info,
    reservationId
  ) => {
    event.preventDefault();
    // alert("hello");

    setConfirmTableName(name);
    setTableNo(id);
    setCustomerName(customer_name);
    setCapacity(capacity);
    setContactNumber(contact_info);
    setReservationId(reservationId);
    window.location.href = "#my-modal-reservation";
    // window.open("#my-modal")
  };

  const handaleSaveReservation = (event) => {
    setWarningContainer({
      contactName: customerName,
      capacity: capacity,
    });
    if (customerName === "" || capacity === "") {
      return;
    } else {
      setIsSavingResarvation(true);
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      };

      // console.log(this.formData);
      axios
        .post(
          process.env.REACT_APP_BACKEND_URL + "/api/reservation-listes",
          {
            table_no: tableNo,
            customer_name: customerName,
            contact_info: contactNumber,
            capacity: capacity,
            is_reserved: true,
            rdate: currentDate,
            note: "",
          },
          axiosConfig
        )
        .then((res) => {
          setIsSavingResarvation(false);
          // console.log(res);
          loadReservationData();
          // this.setFeedback(res.data.feedback);
        })
        .catch((error) => {
          // console.log("error paise", error.response.data);
          const errors = error.response.data.errors;
          let errorMsg = "";
          for (const err in errors) {
            errorMsg = errorMsg + " " + errors[err];
          }
          // const feedbackData = {
          //   status: "Error",
          //   msg: errorMsg,
          // };
          // this.setFeedback(feedbackData);
        })
        .finally(() => setIsSavingResarvation(false));
    }
    // validation

    // contactNumber==="" ? setWarningContainer({contactNumber:true}) : setWarningContainer({contactNumber:false})
    // validation
    // return;
  };
  ///////////////////
  const clientArrived = (event) => {
    setWarningContainer({
      contactName: customerName,
      capacity: capacity,
    });
    if (customerName === "" || capacity === "") {
      return;
    } else {
      setIsSavingResarvation(true);
      const axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
        },
      };

      // console.log(this.formData);
      axios
        .post(
          process.env.REACT_APP_BACKEND_URL + "/api/reservation-listes",
          {
            table_no: tableNo,
            customer_name: customerName,
            contact_info: contactNumber,
            capacity: capacity,
            is_reserved: true,
            rdate: currentDate,
            note: "",
          },
          axiosConfig
        )
        .then((res) => {
          setIsSavingResarvation(false);
          // console.log(res);
          loadReservationData();
          // this.setFeedback(res.data.feedback);
        })
        .catch((error) => {
          // console.log("error paise", error.response.data);
          const errors = error.response.data.errors;
          let errorMsg = "";
          for (const err in errors) {
            errorMsg = errorMsg + " " + errors[err];
          }
          // const feedbackData = {
          //   status: "Error",
          //   msg: errorMsg,
          // };
          // this.setFeedback(feedbackData);
        })
        .finally(() => setIsSavingResarvation(false));
    }
    // validation

    // contactNumber==="" ? setWarningContainer({contactNumber:true}) : setWarningContainer({contactNumber:false})
    // validation
    // return;
  };
  //////////////

  const handleFreeTable = (reservation_id) => {
    setIsLoadingFreeReservation(true);
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + tokenValue,
      },
    };
    axios
      .put(
        process.env.REACT_APP_BACKEND_URL +
          "/api/reservation-listes/" +
          reservation_id,
        {
          // rdate: tableName,
          is_reserved: 0,
        },
        axiosConfig
      )
      .then((res) => {
        setIsLoadingFreeReservation(false);
        // console.log(res);
        loadReservationData();
        window.location.href = "#";
        // this.setFeedback(res.data.feedback);
      })
      .catch((error) => {
        console.log("error paise", error.response.data);
        const errors = error.response.data.errors;
        let errorMsg = "";
        for (const err in errors) {
          errorMsg = errorMsg + " " + errors[err];
        }
        const feedbackData = {
          status: "Error",
          msg: errorMsg,
        };
        this.setFeedback(feedbackData);
      })
      .finally(() => setIsLoadingFreeReservation(false));
  };
  //  ---------------------------------------------------------------- FUNCTION //

  // Fetch restaurant tables list
  useEffect(() => {
    // console.log("GetCurrentDate- ", GetCurrentDate());
    setCurrentDate(GetCurrentDate());
    // fetch data
    loadTableData();
  }, []);

  //  ---------------------------------------------------------------- USE EFFECT
  // Get list of reservation list when component load & datefield data chagne
  useEffect(() => {
    // fetch data
    if (typeof currentDate === "string") {
      // console.log("checking---",currentDate);
      loadReservationData();
    }
  }, [currentDate]);

  // When current date field change or dateReservation change then create a new array of that day specific reservation .
  useEffect(() => {
    setCurrentReservationList(
      dateReservation.filter((info) => info.rdate === currentDate)
    );
  }, [dateReservation, currentDate]);

  useEffect(() => {
    if (isSavingResarvation === false) {
      window.location.href = "#";
    }
  }, [isSavingResarvation]);
  useEffect(() => {
    const warning = { contactName: false, capacity: false };

    setWarningContainer(warning);
  }, []);
  //  ---------------------------------------------------------------- USE EFFECT //
  // modal

  // modal /

  return (
    <>
      {/* <p>here value - {tokenValue}</p> */}
      {errorMsg.length > 2 ? (
        <>
          <p className="text-xl text-center font-semibold text-red-400">
            {errorMsg}
          </p>
        </>
      ) : (
        <>
          {/* <Header /> */}
          {/* stats and  search filed  */}

          <div className="my-2 md:my-10 grid grid-cols-1 md:grid-cols-2 mb-10">
            {/* StAT  */}
            <Stat
              tableList={tableList}
              currentReservationList={currentReservationList}
            />
            {/* StAT  */}
            {/* search  */}
            <div className="flex  justify-between md:justify-end">
              <span className=" md:mr-10 text-gray-800 ">Zgjidh Datën </span>
              <input
                value={currentDate}
                className=" mr-3 text-gray-800 md:mr-10"
                type="date"
                onChange={(event) => selectDate(event)}
              />
            </div>
            {/* search // */}
          </div>

          {/* stats and  search filed  */}
          {/* theme cards   */}

          {/* animation loader  */}
          <section className="relative  bg-white">
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
              <section>
                <h3 className="text-2xl font-bold  text-reserved-200 bg-gray-200 inline-block px-4 pt-2 pb-2 rounded mt-10 mb-5  ml-auto">
                  Të Rezervuara - {currentReservationList.length}
                </h3>
                <div className=" grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 mb-10">
                  {tableList.map((table) => {
                    return currentReservationList.map((reserveInfo) => {
                      return table.id === reserveInfo.table_no &&
                        reserveInfo.is_reserved === 1 ? (
                        <ReservedTable
                          key={table.id}
                          theme={table}
                          reserveInfo={reserveInfo}
                          handleReservationSave={handleReservationSave}
                        ></ReservedTable>
                      ) : (
                        ""
                      );
                    });
                    //    return
                    // return (table.id === 2 ?  <Table key={table.id} theme={table}></Table> : "");
                  })}
                </div>
                <h3 className="text-2xl font-bold text-free-200 bg-gray-200 inline-block px-4 py-2 rounded mt-20 mb-5 text-center md:text-left">
                  Të Lira - {tableList.length - currentReservationList.length}{" "}
                </h3>
                {/* <h3 className="text-2xl font-bold my-5 text-green-400">Të Lira</h3> */}
                <div className=" grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-4 md:my-4 mt-3">
                  {tableList.map((table) => {
                    return (
                      // <Table key={table.id} theme={table}></Table>
                      typeof currentReservationList.find(
                        (reserveInfo) => reserveInfo.table_no === table.id
                      ) == "object" ? (
                        ""
                      ) : (
                        // <div></div>
                        <FreeTable
                          key={table.id}
                          theme={table}
                          bookingConfirmation={bookingConfirmation}
                        ></FreeTable>
                      )
                      // currentReservationList.map((reserveInfo) => {
                      //     return (table.id === reserveInfo.table_no ?   ( "" ) :  <Table key={table.id} theme={table}></Table>)
                      // })
                      //    return
                      // return (table.id === 2 ?  <Table key={table.id} theme={table}></Table> : "");
                    );
                  })}
                </div>
              </section>
            )}
          </section>

          {/* animation loader  */}

          {/* cart  */}

          {/* modal  */}

          <div id="my-modal" className="modal">
            <div className="modal-box  bg-white text-gray-800">
              <h1 className="md:text-xl font-semibold ">
                Konfirmo Rezervimin ?
              </h1>
              <p className="font-semibold flex justify-between md:text-2xl my-5">
                <span className="mr-5">Emri Tavolinës :</span>
                <span>{confirmTableName}</span>
              </p>
              <section>
                <div className="flex items-center my-2">
                  <label
                    htmlFor="company-website"
                    className="inline-block w-28  text-sm font-medium text-gray-700"
                  >
                    Emri <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full">
                    <input
                      value={customerName}
                      onChange={(Event) => setCustomerName(Event.target.value)}
                      placeholder="Emri Rezervimit"
                      type="text"
                      className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                    />
                  </div>
                </div>
                {warningContainer.contactName === "" && (
                  <p className="text-right text-md font-semibold text-yellow-800">
                    Te lutem sheno emrin
                  </p>
                )}

                <div className="flex items-center my-2">
                  <label
                    htmlFor="company-website"
                    className="inline-block  w-28 text-sm font-medium text-gray-700"
                  >
                    Numri Personave <span className="text-red-500">*</span>
                  </label>
                  <div className="w-full">
                    <input
                      value={capacity}
                      onChange={(Event) => setCapacity(Event.target.value)}
                      placeholder="Numri Personave"
                      type="text"
                      className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                    />
                  </div>
                </div>
                {warningContainer.capacity === "" && (
                  <p className="text-right text-md font-semibold text-yellow-800">
                    Te lutem sheno numrin e personave
                  </p>
                )}

                <div className="flex items-center my-2">
                  <label
                    htmlFor="company-website"
                    className="inline-block w-28  text-sm font-medium text-gray-700"
                  >
                    Numri Telefonit
                  </label>
                  <div className="w-full">
                    <input
                      value={contactNumber}
                      onChange={(Event) => setContactNumber(Event.target.value)}
                      placeholder="Numri Telefonit"
                      type="text"
                      className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                    />
                  </div>
                </div>
              </section>
              <div className="">
                {isSavingResarvation ? (
                  <section className="modal-action">
                    <button disabled href="#" className="btn btn-primary">
                      SAVING DATA .....
                      <i className="fas fa-spinner fa-spin"></i>
                    </button>
                  </section>
                ) : (
                  <section className="modal-action">
                    <a href="#" data-dismiss="my-modal" className="btn">
                      Mbyll
                    </a>
                    <button
                      onClick={() => handaleSaveReservation()}
                      href="#"
                      className="btn btn-primary"
                    >
                      Rezervo
                    </button>
                  </section>
                )}
              </div>
            </div>
          </div>
          {/* modal  */}
          {/* modal  */}
          <div id="my-modal-reservation" className="modal">
            <div className="modal-box  bg-white text-gray-800">
              <h1 className="text-xl font-semibold italic ">
                Detajet e Rezervimit{" "}
              </h1>
              <section className="my-5 text-md">
                <div className="flex justify-between">
                  <span className="w-48 font-semibold  text-gray-700">
                    Emri Tavolinës
                  </span>
                  <span>{confirmTableName}</span>
                </div>
                <div className="flex justify-between leading-7">
                  <span className="w-48 font-semibold      text-gray-700">
                    Emri Rezervimit
                  </span>
                  <span>{customerName}</span>
                </div>
                <div className="flex justify-between leading-7">
                  <span className="w-48   font-semibold    text-gray-700">
                    Numri Telefonit
                  </span>
                  <span>{contactNumber}</span>
                </div>
                <div className="flex justify-between  leading-7">
                  <span className="w-48   font-semibold    text-gray-700">
                    Numri Personave
                  </span>
                  <span>{capacity}</span>
                </div>
                <div></div>
              </section>

              <div className="modal-action">
                {isLoadingFreeReservation ? (
                  <section className="modal-action">
                    <button disabled href="#" className="btn btn-primary">
                      duke ngarkuar .....
                      <i className="fas fa-spinner fa-spin"></i>
                    </button>
                  </section>
                ) : (
                  <section className="modal-action">
                    <a href="#" data-dismiss="my-modal" className="btn">
                      Mbyll
                    </a>
                    <button
                      onClick={() => handleFreeTable(reservationId)}
                      href="#"
                      className="btn btn-primary"
                    >
                      Anullo
                    </button>
                    <button
                      onClick={() => clientArrived()}
                      href="#"
                      className="btn btn-primary"
                    >
                      Klienti u paraqit
                    </button>
                  </section>
                )}
              </div>
            </div>
          </div>
          {/* modal  */}
        </>
      )}
    </>
  );
};

export default Homepage;
