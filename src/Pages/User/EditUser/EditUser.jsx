import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const params = useParams();
  //  ---------------------------------------------------------------- useState

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [loadingLabel, setLoadingLabel] = useState("Saving table info....");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);

  const [warningContainer, setWarningContainer] = useState({});
  //  ---------------------------------------------------------------- useState //
  //  ---------------------------------------------------------------- FUNCTION //
  const handleSubmission = async (e) => {
    
    setWarningContainer({
        userName: userName,
        userEmail: userEmail,
        //   password: password,
      });
    if(isChangePassword && password ==="" ){
        setWarningContainer({
            userName: userName,
            userEmail: userEmail,
            password: password,
          });
        return ; // for blank password
    }
    
   
    if (userName === "" || userEmail === "") {
      return;
    } else {
      setResponseMsg("");
      const formData = new FormData();

      formData.append("name", userName);
      formData.append("email", userEmail);
      formData.append("contact_number", userContact);
      console.log("formData-", formData, userName);
      
      if(isChangePassword){
           formData.append("password", password);
      }
      setIsUpdating(true);
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/users/update/" + params.id,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) {
        setIsUpdating(false);
        const message = `An error has occured: ${response.status}`;
        throw new setResponseMsg(message);
      }
      const serverResult = await response.json(response);

      console.log(response.status);
      setIsUpdating(false);
      if (response.status >= 200 && response.status <= 299) {
        setResponseMsg("User added successfully.");
      } else {
        // Show error msg
        console.log(serverResult);
        setResponseMsg("Error code - " + response.status);
        let errorMsgList = "";
        for (const error in serverResult.errorMsg) {
          serverResult.errorMsg[error].map(
            (error) => (errorMsgList += " " + error)
          );
        }
        setResponseMsg(errorMsgList);
      }
      // .then((result) => {
      //   setIsUpdating(false);
      //   console.log("server response - ",result)
      //   console.log("server status - ",result.status)

      //   if(result.status >=200  && result.status <=299 ){
      //     setResponseMsg("User added successfully.");
      //   }else{
      //     // Show error msg
      //     console.log(result)
      //     setResponseMsg("Error code - "+ result.status);

      //   }
      // })
      // .catch((error) => {
      //   setIsUpdating(false);
      //   alert("Error in the Code" + error);
      // });
    }
  };

  const loadTableInfo = () => {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/users/" + params.id)
      .then((res) => {
        setLoading(false);
        setLoadingLabel("Loading user info....");
        ///
        // console.log(res);
        // console.log(res.data.color);
        setUserName(res.data.name);
        setUserEmail(res.data.email);
        setUserContact(res.data.contact_number);
      })
      .catch((error) => {
        console.log("error paise", error);
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
      .finally(() => setLoading(false));
  };

  //  ---------------------------------------------------------------- FUNCTION //
  //  ---------------------------------------------------------------- USE EFFECT
  useEffect(() => {
    const warning = {
      userName: false,
      userEmail: false,
      password: false,
    };

    setWarningContainer(warning);
    loadTableInfo();
  }, []);

  //  ---------------------------------------------------------------- USE EFFECT
  return (
    <>
      <section className="shadow-xl shadow-orange-200/50 rounded pt-10 pb-10 mb-20 px-2 md:px-10 ">
        <section>
          <h1 className="text-3xl text-gray-800 font-semibold font-uppercase my-5 uppercase ">
          Ndrysho
          </h1>
        </section>
        {loading ? (
          <section>
            <div className="flex justify-center">
              <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>
            <p className="text-center  text-gray-800 block font-semibold">
              {loadingLabel}
            </p>
          </section>
        ) : (
          <div>
            <section className="text-gray-800">
              <div className="flex items-center my-2">
                <label
                  htmlFor="company-website"
                  className="block w-32 text-sm font-medium text-gray-700"
                >
                  User Name <span className="text-red-500">*</span>
                </label>
                <div className="w-full">
                  <input
                    value={userName}
                    onChange={(Event) => setUserName(Event.target.value)}
                    placeholder="username"
                    type="text"
                    className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                  />
                </div>
              </div>
              {warningContainer.userName === "" && (
                <p className="text-right text-md font-semibold text-yellow-800">
                  Username field is required
                </p>
              )}
              <div className="flex items-center my-2">
                <label
                  htmlFor="company-website"
                  className="block w-32 text-sm font-medium text-gray-700"
                >
                  Email<span className="text-red-500">*</span>
                </label>
                <div className="w-full">
                  <input
                    value={userEmail}
                    onChange={(Event) => setUserEmail(Event.target.value)}
                    placeholder="email"
                    type="text"
                    className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                  />
                </div>
              </div>
              {warningContainer.userEmail === "" && (
                <p className="text-right text-md font-semibold text-yellow-800">
                  Email field is required
                </p>
              )}
              <section>
                <p className="block  text-gray-700">
                  {" "}
                  <input
                    onChange={(event) =>
                      setIsChangePassword(event.target.checked)
                    }
                    className=" text-sm font-medium"
                    type="checkbox"
                  />{" "}
                  <span className="md:text-sm font-semibold block-inline">
                    {" "}
                    Change Password ?{" "}
                  </span>{" "}
                </p>
              </section>
              {isChangePassword && (
                <>
                  <div className="flex items-center my-2">
                    <label
                      htmlFor="company-website"
                      className="block w-32 text-sm font-medium text-gray-700"
                    >
                      Password<span className="text-red-500">*</span>
                    </label>
                    <div className="w-full">
                      <input
                        onChange={(Event) => setPassword(Event.target.value)}
                        type="password"
                        className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                      />
                    </div>
                  </div>
                  {warningContainer.password === "" && (
                    <p className="text-right text-md font-semibold text-yellow-800">
                      Password is required
                    </p>
                  )}
                </>
              )}

              <div className="flex items-center my-2">
                <label
                  htmlFor="company-website"
                  className="block w-32 text-sm font-medium text-gray-700"
                >
                  Numri Telefonit
                </label>
                <div className="w-full">
                  <input
                    value={userContact}
                    onChange={(Event) => setUserContact(Event.target.value)}
                    placeholder=""
                    type="text"
                    className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        <section className="flex justify-end items-center">
          <div className="flex justify-end items-center">
            {isUpdating ? (
              <section className="modal-action">
                <button disabled href="#" className="btn btn-primary">
                  SAVING DATA .....
                  <i className="fas fa-spinner fa-spin"></i>
                </button>
              </section>
            ) : (
              <section className="flex justify-end items-center">
                <p className="text-sm  md:text-lg font-semibold mr-7 text-gray-800">
                  {responseMsg}
                </p>
                <button
                  onClick={() => handleSubmission()}
                  className="btn btn-outline btn-accent w-28 text-xl"
                >
                  SAVE
                </button>
              </section>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default EditUser;
