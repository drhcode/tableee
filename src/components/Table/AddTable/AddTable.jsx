import axios from "axios";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { ThreeDots } from "react-loader-spinner";

const AddTable = () => {
  //  ---------------------------------------------------------------- useState
  // const params = useParams();

  const [tableName, setTableName] = useState("");
  const [tableArea, setTableArea] = useState("");
  const [note, setNote] = useState("");
  const [background, setBackground] = useState("#d7d7d7");
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [loadingLabel, setLoadingLabel] = useState("Saving table info....");
  const [isUpdating, setIsUpdating] = useState(false);

  const [warningContainer, setWarningContainer] = useState({});
  //  ---------------------------------------------------------------- useState //

  //  ---------------------------------------------------------------- FUNCTION
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
      setResponseMsg("");
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      formData.append("table_name", tableName);
      formData.append("table_location", tableArea);
      formData.append("color", background);
      setIsUpdating(true);
      await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/restaurant-tables",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((result) => {
          setIsUpdating(false);
          setResponseMsg("Table added successfully.");
        })
        .catch((error) => {
          setIsUpdating(false);
          alert("Error in the Code" + error);
        });
    }
  };
  const handleAddNewTable = () => {
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
        process.env.REACT_APP_BACKEND_URL + "/api/restaurant-tables",
        {
          table_name: tableName,
          table_location: tableArea,
          note: note,
          color: background,
          file: selectedFile,
        },
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

  //  ---------------------------------------------------------------- FUNCTION //

  //  ---------------------------------------------------------------- USE EFFECT
  useEffect(() => {
    const warning = { tableName: false };

    setWarningContainer(warning);
  }, []);
  //  ---------------------------------------------------------------- USE EFFECT
  return (
    <>
      <section className="shadow-xl shadow-orange-200/50 rounded py-10 px-2 md:px-10 pb-48">
        <section>
          <h1 className="text-3xl text-gray-800 font-semibold font-uppercase my-5 uppercase ">
            Shto Tavolinë Të Re
          </h1>
        </section>
        {loading ? (
          <section>
            <div className="flex justify-center">
              <ThreeDots color="#00BFFF" height={80} width={80} />
            </div>
            <p className="text-center text-gray-800 block font-semibold">
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
                  Emri Tavolines <span className="text-red-500">*</span>
                </label>
                <div className="w-full">
                  <input
                    onBlur={(Event) => setTableName(Event.target.value)}
                    placeholder="Emri ose Numri Tavolinës"
                    type="text"
                    className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                  />
                </div>
              </div>
              {warningContainer.tableName === "" && (
                <p className="text-right text-md font-semibold text-yellow-800">
                  Emri Tavolines eshte i detyruar te shenohet
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
                    onBlur={(Event) => setTableArea(Event.target.value)}
                    placeholder="Vëndi Ku Ndodhet Tavolina"
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
                    onBlur={(Event) => setNote(Event.target.value)}
                    placeholder="Shëno dicka PSH Tav VIP"
                    type="text"
                    className="py-2 px-2 text-xl w-full rounded bg-green-100/50 border-2 border-gray-100 focus:outline-none focus:border-orange-200 focus:ring-1 focus:ring-orange-200"
                  />
                </div>
              </div>
              {/* removed cause this features are not using  */}
              {/* <section>
                <div className="flex justify-end items-center my-2">
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
                <section className="flex  justify-end">
                  <input
                    type="file"
                    name="file"
                    className="mb-4 text-gray-800"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </section>
              </section> */}
              {/* removed cause this features are not using  */}
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
                  Ruaj
                </button>
              </section>
            )}
          </div>
        </section>
      </section>
      <section>
        {/* modal  */}

        <div id="color-modal" className="modal">
          <div className="modal-box bg-white" style={{ width: "300px" }}>
            <h1 className="text-xl font-semibold mb-2  text-gray-800">
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

export default AddTable;
