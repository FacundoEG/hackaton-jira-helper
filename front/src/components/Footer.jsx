import React from 'react';

const Footer = () => {
  return (
<footer className="flex-shrink-0 bg-kovix text-white p-4">

      {/* Clases de estilo de Tailwind CSS */}
      <p className="text-center">© 2023 Jira Helper. Todos los derechos reservados.</p>
      <ul className="flex justify-center mt-2">
        <li className="mx-2">Términos de uso</li>
        <li className="mx-2">Política de privacidad</li>
        <li className="mx-2">Aviso legal</li>
      </ul>
    </footer>
  );
};

export default Footer;
