import React, { useState } from "react";
import { ApiRequests } from "../utils/ApiRequest";
import { functionalities } from "../utils/Functionalities";

const DropDownFunctionality = ({option, setOption}) => {
  const handleDropDownChange = (e) => {
    setOption(e.target.value); // Actualizar el estado con el valor seleccionado
  };

  // Función para manejar el clic en el botón


  return (
    <div className="m-3">
      <select
        className="rounded-md border-gray-300 focus:border-kovix h-10 focus:ring-1 focus:ring-kovix shadow-sm mr-3"
        value={option}
        onChange={handleDropDownChange}
      >
        <option value="">Seleccionar opción</option>
        <option value={functionalities.taskAssign}>Asignación de tareas</option>
        <option value={functionalities.taskGenerate}>Generación de nuevas tareas</option>
      </select>
    </div>
  );
};

export default DropDownFunctionality;
