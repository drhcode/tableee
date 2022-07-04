import axios from "axios";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { ThreeDots } from "react-loader-spinner";
import { useParams } from "react-router-dom";

const EditTable = () => {
  //  ---------------------------------------------------------------- useState
  const params = useParams();
  //   const [isEdit, setIsEdit] = useState(false);
  const [tableName, setTableName] = useState("");
  const [tableArea, setTableArea] = useState("");
  const [note, setNote] = useState("");
  const [background, setBackground] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [localImageUrl, setLocalImageUrl] = useState("");
  const [remoteImageUrl, setRemoteImageUrl] = useState("");
  const [removeRemoteImageUrl, setRemoveRemoteImageUrl] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Loading table info....");
  const [warningContainer, setWarningContainer] = useState({});
  //  ---------------------------------------------------------------- useState //

  //  ---------------------------------------------------------------- FUNCTION
  const hanldeImageFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setLocalImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };
  const handleChangeComplete = (color) => {
    // alert("hello"+color.hex)
    // this.setState({ background: color.hex });
    console.log(color.hex);
    setBackground(color.hex);
  };

  const handleSubmission = async (e) => {
    setWarningContainer({
      tableName: tableName,
    });
    if (tableName === "") {
      return;
    } else {
      setIsUpdating(true);
      setResponseMsg("");
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      formData.append("table_name", tableName);
      formData.append("table_location", tableArea);
      formData.append("color", background);
      formData.append("removeRemoteImageUrl", removeRemoteImageUrl);
      console.log(removeRemoteImageUrl);
      // setLoading(true);
      await fetch(
        process.env.REACT_APP_BACKEND_URL +
          "/api/restaurant-tables/update/" +
          params.id,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((result) => {
          setIsUpdating(false);
          setResponseMsg("U ndryshua me sukses");
        })
        .catch(() => {
          setIsUpdating(false);
          alert("Error in the Code");
        });
    }
  };

  const handleUpdate = () => {
    // alert("handle update");
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    setLoading(true);
    setLoadingLabel("Updating data...");
    const formData = new FormData();
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    formData.append("table_name", tableName);
    formData.append("table_location", tableArea);
    formData.append("color", background);
    // console.log(this.formData);
    axios
      .put(
        process.env.REACT_APP_BACKEND_URL +
          "/api/restaurant-tables/" +
          params.id,
        formData,
        axiosConfig
      )
      .then((res) => {
        setLoading(false);
        console.log(res);
        // this.setFeedback(res.data.feedback);
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
      .finally(() => setLoading(false));
  };

  const loadTableInfo = () => {
    setLoading(true);
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/api/restaurant-tables/" +
          params.id
      )
      .then((res) => {
        setLoading(false);
        setLoadingLabel("Loading table info....");
        ///
        // console.log(res);
        // console.log(res.data.color);
        setTableName(res.data.table_name);
        setTableArea(res.data.table_location);
        setNote(res.data.note);
        setBackground(res.data.color ? res.data.color : "#000000");
        setRemoteImageUrl(res.data.image);
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

  //  ---------------------------------------------------------------- USE EFFECT
  useEffect(() => {
    const warning = { tableName: false };

    setWarningContainer(warning);
  }, []);
  //  ---------------------------------------------------------------- USE EFFECT
  useEffect(() => {
    // console.log("params- " + params.id);
    // if (params.id > 0) {
    //   setIsEdit(true);
    // }else {
    //   setIsEdit(false);
    // }

    loadTableInfo();
  }, []);

  //  ---------------------------------------------------------------- USE EFFECT //
  return (
    <>
      <section className="shadow-xl shadow-orange-200/50 rounded pt-10 px-3 md:px-10  pb-48">
        <section>
          <h1 className=" text-2xl md:text-3xl font-semibold font-uppercase my-5 uppercase text-gray-800 text-center md:text-left ">
            Ndrysho Emri
          </h1>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-1 ">
          <div>
            {loading ? (
              <section>
                <div className="flex justify-center">
                  <ThreeDots color="#00BFFF" height={80} width={80} />
                </div>
                <p className="text-center block font-semibold">
                  {loadingLabel}
                </p>
              </section>
            ) : (
              <section>
                <section className="text-gray-800">
                  <div className="flex items-center my-2">
                    <label
                      htmlFor="company-website"
                      className="block w-32 text-sm font-medium text-gray-700"
                    >
                      Emri Tavolinës <span className="text-red-500">*</span>
                    </label>
                    <div className="w-full">
                      <input
                        value={tableName}
                        onChange={(Event) => setTableName(Event.target.value)}
                        placeholder="name of this table"
                        type="text"
                        className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                      />
                    </div>
                  </div>
                  {warningContainer.tableName === "" && (
                    <p className="text-right text-md font-semibold text-yellow-800">
                      Table Name field is required
                    </p>
                  )}
                  <div className="flex items-center my-2">
                    <label
                      htmlFor="company-website"
                      className="block w-32 text-sm font-medium text-gray-700"
                    >
                      Vëndndodhja
                    </label>
                    <div className="w-full">
                      <input
                        value={tableArea}
                        onChange={(Event) => setTableArea(Event.target.value)}
                        placeholder="where the table is located"
                        type="text"
                        className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                      />
                    </div>
                  </div>
                  <div className="flex items-center my-2">
                    <label
                      htmlFor="company-website"
                      className="block w-32 text-sm font-medium text-gray-700"
                    >
                      Shënim
                    </label>
                    <div className="w-full">
                      <input
                        value={note}
                        onChange={(Event) => setNote(Event.target.value)}
                        placeholder=""
                        type="text"
                        className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                      />
                    </div>
                  </div>
                  {/* removed cause this features are not using  */}

                  {/* <div className="flex items-center my-2">
                    <label
                      htmlFor="company-website"
                      className="block w-32 text-sm font-medium text-gray-700"
                    >
                      Table Color
                    </label>
                    <div className="w-full">
                      <div
                        className="rounded shadow border-2 border-gray-400"
                        onClick={() => (window.location.href = "#color-modal")}
                        style={{
                          backgroundColor: background,
                          height: "50px",
                          width: "50px",
                        }}
                      ></div>
                    </div>
                  </div>
                  <section>
                    <input
                      type="file"
                      name="file"
                      className="mb-4"
                      onChange={(e) => hanldeImageFileChange(e)}
                    />
                  </section>
                  
                  <section>
                    <p className="block  text-gray-700">
                      {" "}
                      <input
                        onChange={(event) =>
                          setRemoveRemoteImageUrl(event.target.checked)
                        }
                        className=" text-lg font-medium"
                        type="checkbox"
                      />{" "}
                      <span className="md:text-xl font-semibold block-inline">
                        {" "}
                        Remove Image ?{" "}
                      </span>{" "}
                    </p>
                  </section> */}
                  {/* removed cause this features are not using  */}
                </section>
                <section className="">
                  <div className="flex justify-end items-center">
                    {isUpdating ? (
                      <section className="modal-action">
                        <button disabled href="#" className="btn btn-primary">
                          Duke Ruajtur .....
                          <i className="fas fa-spinner fa-spin"></i>
                        </button>
                      </section>
                    ) : (
                      <section className="flex justify-end items-center">
                        <p className="text-gray-800 text-sm md:text-lg font-semibold mr-7">
                          {responseMsg}
                        </p>
                        <button
                          onClick={() => handleSubmission()}
                          className="btn btn-outline btn-accent w-28 text-xl"
                        >
                          Ndrysho
                        </button>
                      </section>
                    )}
                  </div>
                </section>
              </section>
            )}
          </div>
          {/* start preview  */}
          {/* <section className="flex justify-center items-center mt-5 md:mt-0">
            <div className=" md:w-6/12 rapper  antialiased text-gray-900 mb-10 ">
              {console.log(
                "localImageUrl",
                `http://restaurant-reservation-backend.test/${remoteImageUrl}`
              )}
              <div className="">
                {(selectedFile || remoteImageUrl) && !removeRemoteImageUrl ? (
                  <img
                    src={
                      localImageUrl
                        ? localImageUrl
                        : process.env.REACT_APP_BACKEND_URL +
                          "/" +
                          remoteImageUrl
                    }
                    alt=" "
                    className="bg-blue-300 w-full object-cover object-center rounded-lg shadow-md md:h-60 h-36"
                  />
                ) : (
                  <div
                    style={{ backgroundColor: background }}
                    className=" w-full object-cover object-center rounded-lg shadow-md md:h-60 h-36"
                  ></div>
                )}

                <div className="relative px-4 -mt-16  ">
                  <div className="  bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center">
                      <h4
                        title={tableName}
                        className="mt-1 text-lg font-semibold uppercase leading-tight truncate"
                      >
                        {" "}
                        {tableName}
                      </h4>
                    </div>
                    <div className="relative ">
                      <div className="bg-white w-full  block text-right my-1 absolute"></div>
                      <div className="text-sm mt-1 mb-3 ">
                        Area : {tableArea}
                      </div>
                    </div>

                    <div className="flex justify-center items-center">
                      <button
                        data-modal-toggle="example"
                        data-modal-action="open"
                        className=" text-sm bg-indigo-600 font-semibold text-white px-2 py-1 rounded hover:bg-purple-700 focus:outline-none focus:ring shadow-lg hover:shadow-none transition-all duration-300 mr-2"
                      >
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          {/* start preview  */}
        </section>
      </section>
      <section>
        {/* modal  */}

        <div id="color-modal" className="modal">
          <div className="modal-box" style={{ width: "300px" }}>
            <h1 className="text-xl font-semibold mb-2">
              Select the table color{" "}
            </h1>
            <SketchPicker
              color={background}
              onChangeComplete={handleChangeComplete}
            />
            <div className="modal-action">
              <a href="#" className="btn btn-primary">
                DONE
              </a>
            </div>
          </div>
        </div>
        {/* modal  */}
      </section>
    </>
  );
};

export default EditTable;
