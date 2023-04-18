import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const CsvFileUploader = ({ onCsvFileUpload }) => {
  // Función de devolución de llamada para manejar la carga del archivo CSV
  const handleCsvFileUpload = useCallback(
    (acceptedFiles) => {
      // Leer el archivo CSV y llamar a la función de devolución de llamada con los datos del archivo
     onCsvFileUpload(acceptedFiles)
      /*  const reader = new FileReader();
      reader.onload = () => {
        const csvData = reader.result;
        onCsvFileUpload(csvData);
        reader.readAsText(acceptedFiles[0]);
      }; */
    },
    [onCsvFileUpload]
  );

  // Configuración de la zona de soltar
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: '.csv',
    onDrop: handleCsvFileUpload,
  });

  return (
    <div
      {...getRootProps()}
      className={`bg-gray-200 border-dashed border-gray-400 border-2 rounded-md p-4 m-3 text-center ${
        isDragActive ? 'bg-gray-300' : ''
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta el archivo CSV aquí...</p>
      ) : (
        <p className="text-gray-600">
          Arrastra y suelta un archivo CSV aquí o haz clic para seleccionarlo
        </p>
      )}
    </div>
  );
};

export default CsvFileUploader;
