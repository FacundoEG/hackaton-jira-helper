import React from "react";
const Error = () => {

  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-3 justify-start">
      <p className="text-gray-700 text-2xl mb-4">¡Algo salió mal!</p>
      <p className="text-gray-700 text-lg mb-4">Por favor intenta de nuevo más tarde. Si el problema persiste, comunicate con nosotros.</p>

      <div className="relative">
        <img
          src="/error.svg"
          alt="Imagen de carga"
          className="mt-4 w-72 h-72"
        />
       
      </div>
    </div>
  );
};

export default Error;
