import React from 'react';  

 
const Header = () => {
  return (
    <header className="bg-kovix text-white p-4 flex flex-col justify-center items-center">
      {/* Clases de estilo de Tailwind CSS */}
      <img
          src={"/logo.png"} // Ruta de la imagen PNG importada
          alt="Jira Helper"
          className="inline-block object-cover drop-shadow-2xl w-64" // Tamaño de la imagen con clases de Tailwind CSS
        /> 
      <nav className="flex justify-center mt-4">
        <ul className="flex">
          <li className="mx-2">Inicio</li>
          <li className="mx-2">Acerca de</li>
          <li className="mx-2">Contacto</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
