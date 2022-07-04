
const GetCurrentDate = (separator = "") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  

  const formatedMonth  = () => month<10 ? `0${month}` : month; 
  const formatedDate  = () => date<10 ? `0${date}` : date; 
//   const formatedMonth  = () => 1<10 ? 1 : 2; 
  const  currentDate = `${year}-${formatedMonth()}-${formatedDate()}`
  return currentDate
};

export default GetCurrentDate;
