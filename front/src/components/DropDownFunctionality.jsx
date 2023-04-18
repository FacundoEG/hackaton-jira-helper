import React, { useState } from "react";
import { ApiRequests } from "../utils/ApiRequest";
import { functionalities } from "../utils/Functionalities";

const DropDownFunctionality = () => {
  const [selectedOption, setSelectedOption] = useState(""); // Estado para almacenar el valor seleccionado
  const apiRequest = new ApiRequests();
  // Función para manejar el cambio en el dropdown
  const handleDropDownChange = (e) => {
    setSelectedOption(e.target.value); // Actualizar el estado con el valor seleccionado
  };

  // Función para manejar el clic en el botón
  const handleButtonClick = () => {
    // Realizar la solicitud con el valor seleccionado utilizando Axios
    apiRequest.importCsv("", selectedOption)
  };

  return (
    <div className="m-3">
      {/* Dropdown con las opciones A, B y C */}
      <select
        className="rounded-md border-gray-300 focus:border-kovix h-10 focus:ring-1 focus:ring-kovix shadow-sm mr-3"
        value={selectedOption}
        onChange={handleDropDownChange}
      >
        <option value="">Seleccionar opción</option>
        <option value={functionalities.taskAssign}>{functionalities.taskAssign}</option>
        <option value={functionalities.taskEstimate}>{functionalities.taskEstimate}</option>
        <option value={functionalities.taskGenerate}>{functionalities.taskGenerate}</option>
      </select>

      {/* Botón para realizar la solicitud */}
      <button
        className="px-4 py-2 text-white bg-kovix rounded-md hover:bg-white hover:text-kovix hover:cursor-pointer border hover:border-kovix focus:outline-none focus:bg-kovix"
        onClick={handleButtonClick}
        disabled={!selectedOption} // Desactivar el botón si no hay opción seleccionada
      >
        Realizar Solicitud
      </button>
    </div>
  );
};

export default DropDownFunctionality;
