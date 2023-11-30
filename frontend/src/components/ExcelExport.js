import React from 'react';
import * as XLSX from 'xlsx';
import '../styles/Busqueda.css'
const ExcelExport = ({ data }) => {
  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const exportToExcel = () => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error('No hay datos para exportar a Excel.');      
      return;
    }
    
    const flattenedData = Array.isArray(data[0]) ? data[0] : data;

    // Formatear las fechas
    const dataFormatted = flattenedData.map(item => ({
      ...item,
      fechanac: formatFecha(item.fechanac), // Reemplazar 'fechaNac' con el nombre real de tu campo de fecha
      fechaafili: formatFecha(item.fechaafili), // Reemplazar 'fechaafili' con el nombre real de tu campo de fecha
    }));

    const ws = XLSX.utils.json_to_sheet(dataFormatted);
    const wb = XLSX.utils.book_new();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `infoclientes_${formattedDate}.xlsx`);
  };

  return (
    <button className='boton-exportar' onClick={exportToExcel}>
      Exportar a Excel
    </button>
  );
};

export default ExcelExport;
