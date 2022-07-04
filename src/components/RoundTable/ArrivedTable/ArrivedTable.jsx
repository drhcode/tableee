import React from "react";

const ArrivedTable = (props, handleReservationSave) => {
  const { id, table_name, table_location, image, color, note } = props.theme;
  const { customer_name, capacity, contact_info } = props.reserveInfo;
  return (
    <>
      <div
        className="table w-40 h-40 md:w-48 md:h-48  before:bg-arrived-100 after:bg-arrived-100   mb-10"
        style={{ backgroundColor: "#ccc" }}
      >
        <div className="content text-white bg-arrived-200">
          <div className="table_info">
            <p className="uppercase text-xs ">
              {" "}
              <span>{table_name}</span>{" "}
              {table_location && <span>- {table_location}</span>}{" "}
            </p>
            {/* <p className="table_button pt-1 pb-1 text-xl">RESERVED</p> */}
            <button
              onClick={(Event) =>
                props.handleReservationSave(
                  Event,
                  table_name,
                  id,
                  customer_name,
                  capacity,
                  contact_info,
                  props.reserveInfo.id
                )
              }
              data-modal-toggle="example"
              data-modal-action="open"
              className="table_button pt-2 pb-1 text-xl border-b-4 border-arrived-200 hover:border-arrived-100  transition-all duration-300 "
              // className="table_button pt-1 pb-1 text-xl hover:bg-purple-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 "
            >
              U Paraqit
            </button>
            <p className="uppercase text-xs ">
              {" "}
              <span>{customer_name}</span>{" "}
              {capacity && <span>- {capacity} Persona </span>}{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArrivedTable;
