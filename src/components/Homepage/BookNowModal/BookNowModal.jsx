import axios from "axios";
import React, { useEffect, useState } from "react";

const BookNowModal = (props, loadReservationData) => {
//   const tableNo = props.tableNo;
  const currentDate = props.currentDate;
  const [tableNo, setTableNo] = useState("");
  const [tableName, setTableName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [contactNumber, setContactNumber] = useState("");
  const [isSavingResarvation, setIsSavingResarvation] = useState(false);

  console.log("date---", currentDate);
  // ----------------------------------------------------------------------- Functions
  const handaleSaveReservation = (event) => {
    // alert("test"+currentDate);

    // return;
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
        process.env.REACT_APP_BACKEND_URL+"/api/reservation-listes",
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
        console.log(res);
        props.loadReservationData();
        
      })
      .catch((error) => {
        console.log("error paise", error.response.data);
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
  };

  const bookingConfirmation = (event, name, id) => {
    event.preventDefault();
    // alert("hello");
    setTableName(name);
    setTableNo(id);
    setCustomerName("")
    setCapacity("")
    setContactNumber("")
    window.location.href = "#my-modal";

    // window.open("#my-modal")
  };
  // ----------------------------------------------------------------------- Functions //
  //  ---------------------------------------------------------------- USE EFFECT //
  useEffect(() => {
    if (isSavingResarvation === false) {
      window.location.href = "#";
    }
  }, [isSavingResarvation]);
  //  ---------------------------------------------------------------- USE EFFECT //
  return (
    <>
      <div id="my-modal" className="modal">
        <div className="modal-box">
          <h1 className="text-xl font-semibold">
            Do you want to confirm this table reservation ?{" "}
          </h1>
          <p className="font-bold text-2xl my-5">
            <i className="fas fa-mug-hot"></i> {"confirmTableName"}
          </p>
          <section>
            <div className="flex items-center my-2">
              <label
                htmlFor="company-website"
                className="block-inline w-28  text-sm font-medium text-gray-700"
              >
                Reservation Name <span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <input
                  value={customerName}
                  onChange={(Event) => setCustomerName(Event.target.value)}
                  placeholder="contact person name"
                  type="text"
                  className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                />
              </div>
            </div>

            <div className="flex items-center my-2">
              <label
                htmlFor="company-website"
                className="block-inline  w-28 text-sm font-medium text-gray-700"
              >
                Capcity <span className="text-red-500">*</span>
              </label>
              <div className="w-full">
                <input
                  value={capacity}
                  onChange={(Event) => setCapacity(Event.target.value)}
                  placeholder="capacity"
                  type="text"
                  className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                />
              </div>
            </div>
            <div className="flex items-center my-2">
              <label
                htmlFor="company-website"
                className="block-inline w-28  text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <div className="w-full">
                <input
                  value={contactNumber}
                  onChange={(Event) => setContactNumber(Event.target.value)}
                  placeholder="contact number"
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
                  CLOSE
                </a>
                <button
                  onClick={() => handaleSaveReservation()}
                  href="#"
                  className="btn btn-primary"
                >
                  SAVE
                </button>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookNowModal;
