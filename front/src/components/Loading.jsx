import React from "react";
const Loading = () => {

  return (
    <div className="flex flex-col items-center justify-center mt-8 mb-3 justify-start">
      {/* Mensaje de "Cargando..." */}
      <p className="text-gray-700 text-2xl mb-4 animate-bounce">Cargando...</p>
      <div className="relative">
        {/* Imagen de 300x300 en formato SVG */}
        {/* Reemplaza esta línea con tu imagen SVG */}
        <img
          src="/loading.svg"
          alt="Imagen de carga"
          className="mt-4 w-72 h-72"
        />
        <div class="absolute top-0 left-0 right-0 bottom-0 m-auto w-1/2 h-1/2">
          <img
            src="/logo-kx.png"
            alt="Imagen de carga"
            className="w-12 h-6 mt-16 ml-14"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
