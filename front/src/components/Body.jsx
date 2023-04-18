import React, { useState } from "react";
import CsvFileUploader from "./CsvFileUploader";
import Loading from "./Loading";
import DropDownFunctionality from "./DropDownFunctionality";

const Body = () => {
  const [csvData, setCsvData] = useState("");
  const handleCsvDataChange = (data) => {
    setCsvData(data);
  };

  

  return (
    <main>
      {/* Aquí puedes agregar tu contenido del cuerpo */}
      <DropDownFunctionality />
      <section>
        <CsvFileUploader onCsvFileUpload={handleCsvDataChange} />
        {<Loading />}
      </section>
    </main>
  );
};

export default Body;
