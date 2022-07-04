import React from "react";
import "./FreeTable.css";
const FreeTable = (props, bookingConfirmation) => {
  const { id, table_name, table_location, image, color } = props.theme;
  return (
    <>
      <div className="table w-40 h-40 md:w-48 md:h-48 before:bg-free-100 after:bg-free-100 mb-10" style={{backgroundColor: "#ccc"}}>
        <div className="content text-white bg-free-200"  >
          <div className="table_info">
            <p className="uppercase text-xs "> <span>{table_name}</span> {table_location && <span>- {table_location}</span>} </p>
            {/* <p className="table_button pt-1 pb-1 text-xl">BOOK NOW</p> */}
            <button
              onClick={(Event) =>
                props.bookingConfirmation(Event, table_name, id)
              }
              data-modal-toggle="example"
              data-modal-action="open"
              className="table_button  pt-1 pb-1 text-xl border-b-4 border-free-200 hover:border-free-100  transition-all duration-300 "
              // className="table_button pt-1 pb-1 text-xl hover:bg-purple-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 "
            >
              REZERVO
            </button>
            {/* <p className="uppercase text-sm ">DORJAN - 5 PEOPLE </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FreeTable;
