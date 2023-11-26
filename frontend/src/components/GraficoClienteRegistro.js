import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { API_URL } from '../config.js';

const GraficoClientesRegistrados = () => {
  const [clientesRegistrados, setClientesRegistrados] = useState([]);

  useEffect(() => {
    const obtenerClientesRegistrados = async () => {
      try {
        const respuesta = await axios.get(`${API_URL}/clientes`);        
        setClientesRegistrados(respuesta.data);
      } catch (error) {
        console.error('Error al obtener todos los clientes', error);
      }
    };

    obtenerClientesRegistrados();
  }, []);

  const datosPorMes = clientesRegistrados.reduce((acumulador, cliente) => {
    const fechaAfiliacion = new Date(cliente.fechaafili);
    
    if (!isNaN(fechaAfiliacion.getTime())) { // Revisa si la fecha de valida
      const mes = fechaAfiliacion.getMonth() + 1; // Enero es 0 en el vector
      const label = getMonthName(mes);

      if (!acumulador[label]) {
        acumulador[label] = 0;
      }
      acumulador[label] += 1;
    }

    return acumulador;
  }, {});

  const labels = Object.keys(datosPorMes);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Clientes Registrados',
        data: labels.map((mes) => datosPorMes[mes]),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        stepSize: 1,
      },
    },
  };

  return (
    <div>
      <h2>Clientes Registrados por Mes</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

// Helper function to get month name from its number
const getMonthName = (mesNumero) => {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return months[mesNumero - 1];
};

export default GraficoClientesRegistrados;
