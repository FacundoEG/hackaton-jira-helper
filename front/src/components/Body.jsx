import React, { useState } from "react";
import CsvFileUploader from "./CsvFileUploader";
import Loading from "./Loading";
import DropDownFunctionality from "./DropDownFunctionality";
import { ApiRequest } from "../utils/ApiRequest";
import Error from "./Error";
import { functionalities } from "../utils/Functionalities";

const Body = () => {
  const [csvData, setCsvData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [option, setOption] = useState(null);
  const [data, setData] = useState({});
  const [description, setDescription] = useState("")
  const handleCsvDataChange = (data) => {
    setCsvData(data);
  };

  const handleTextAreaChange = (e) => {
    setDescription(e.target.value);
  };

  const handleButtonClick = () => {
    const apiRequest = new ApiRequest();

    if(option === functionalities.taskGenerate)apiRequest.importCsvDescription(csvData, description, option, setData, setLoading, setError);

    // Realizar la solicitud con el valor seleccionado utilizando Axios
    apiRequest.importCsv(csvData, option, setData, setLoading, setError);
  };

  return (
    <main>
      {error ? (
        <Error />
      ) : loading ? (
        <Loading />
      ) : data.text ? (
        <div className="p-2 gap-y-2">
          <p>{data.text}</p>
        </div>
      ) : (
        <>
          <section>
            <CsvFileUploader onCsvFileUpload={handleCsvDataChange} />
          </section>
          <div className="flex">
          <DropDownFunctionality setOption={setOption} option={option} />
          {option === functionalities.taskGenerate && <textarea value={description} onChange={handleTextAreaChange} className="border border-black-200 w-full items-start"/>}
          </div>
          <button
            className="px-4 py-2 text-white bg-kovix rounded-md hover:bg-white hover:text-kovix hover:cursor-pointer border hover:border-kovix focus:outline-none focus:bg-kovix"
            onClick={handleButtonClick}
            disabled={!option} // Desactivar el botón si no hay opción seleccionada
          >
            Realizar Solicitud
          </button>
        </>
      )}
    </main>
  );
};

export default Body;
