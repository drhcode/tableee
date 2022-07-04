
const Stat = (props) => {
  const tableList = props.tableList; 
  const currentReservationList = props.currentReservationList; 
    return (
       <>
       {/* stat  */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4 text-sm font-semibold py-4 md:py-0">
            <div className="mr-3 md:mr-10 flex justify-between md:justify-start items-center">
              <p className="text-gray-800">Totali Tavolinave</p>
              
              <div className="rounded-lg  text-white font-semibold bg-blue-600 py-1 px-2 md:ml-2">
               
                {tableList.length}
              </div>{" "}
            </div>
            <div className="mr-3 md:mr-10 flex justify-between md:justify-start items-center">
             
              <span className="text-gray-800"> Tavolina të lira{" "}</span>
              <span className="rounded-lg  text-white font-semibold bg-green-400 py-1 px-2 md:ml-2">
                {" "}
                {tableList.length - currentReservationList.length}
              </span>{" "}
            </div>
            <div className="mr-3 flex justify-between md:justify-start items-center">
            <span className="text-gray-800">   Tavolina të rezervuara{" "}</span>
            
              <span className="rounded-lg  text-white font-semibold bg-red-500 py-1 px-2 md:ml-2">
                {" "}
                {currentReservationList.length}
              </span>{" "}
            </div>
          </div>
          {/* stat  */}
       </>
    );
};

export default Stat;