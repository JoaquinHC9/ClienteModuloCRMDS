// PdfExport.js
import React from 'react';
import jsPDF from 'jspdf';

const PdfExport = ({ searchResults }) => {
  const exportToPDF = () => {
    const pdf = new jsPDF();
    pdf.text('Cliente Data', 10, 10);

    searchResults.forEach((result, index) => {
      const yPos = 20 + index * 10;
      pdf.text(`DNI: ${result.dni}, Nombre: ${result.nombre}, Apellido: ${result.apellido}`, 10, yPos);
      // Agregar otros campos según sea necesario
    });

    pdf.save('cliente_data.pdf');
  };

  return (
    <button className='boton-export' onClick={exportToPDF}>
      Exportar a PDF
    </button>
  );
};

export default PdfExport;