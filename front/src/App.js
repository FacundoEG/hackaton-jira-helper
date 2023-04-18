import React from "react";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Heaeder";

const App = () => {
  return (
    
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Encabezado */}
        <Header />

        {/* Contenido */}
        <Body />
      </div>
      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default App;
