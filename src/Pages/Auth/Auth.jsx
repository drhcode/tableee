import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({ authenticate }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleOnClick = (e) => {
    e.preventDefault();
    setErrorMsg("");
    // authenticate();
    // navigate("add-table");
    // return ;

    // login check
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    setLoading(true);
    // console.log(this.formData);
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/login",
        {
          email: email,
          password: password,
        },
        axiosConfig
      )
      .then((res) => {
        setErrorMsg("");
        setLoading(false);
        console.log(res);
        console.log(res?.data?.token);
        authenticate(res?.data);
        navigate("/");

        // this.setFeedback(res.data.feedback);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error paise", error.response.data);
        const errors = error.response.data.message;
        let errorMsg = "";
        for (const err in errors) {
          errorMsg = errorMsg + " " + errors[err];
        }

        // this.setFeedback(feedbackData);
        console.log("err-", errorMsg);
        setErrorMsg(errorMsg);
      })
      .finally(() => setLoading(false));
    // login check
  };
  return (
    <>
      {/* <section>
        <h1>Please authenticate</h1>
        <button onClick={handleOnClick}>login</button>
      </section> */}
      <section>
        <div className="h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-48 w-auto"
                src="./images/logo.jpg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-xl md:text-3xl font-extrabold text-gray-900">
                Vendosni te dhenat
              </h2>
              {/* <p className="mt-2 text-center text-sm text-gray-600">
                Or
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  start your 14-day free trial
                </a>
              </p> */}
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div> */}

              <div>
                <section>
                  {/* handle submit  */}
                  {loading ? (
                    <section className="modal-action">
                      <button
                        disabled
                        href="#"
                        className="btn btn-primary text-white"
                      >
                        Duke Kontrolluar .....
                        <i className="fas fa-spinner fa-spin"></i>
                      </button>
                    </section>
                  ) : (
                    <section className="">
                      <button
                        onClick={(e) => handleOnClick(e)}
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <svg
                            className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                        Hyr
                      </button>
                      <p className="text-center my-3 text-red-500 font-semibold text-md">
                        {errorMsg}
                      </p>
                    </section>
                  )}
                  {/* handle submit  */}
                </section>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
