import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const GraficoBarrasFacturasPagadas = ({ datosFacturas }) => {
    useEffect(() => {
        return () => {
          // Limpiar el gráfico al desmontar el componente          
          if (typeof Chart !== 'undefined' && Chart.helpers && Chart.helpers.each) {
            Chart.helpers.each(Chart.instances, instance => {
              instance.destroy();
            });
          }
        };
      }, []);

  // Estructura de los datos para el gráfico
  const datosPorMes = datosFacturas.reduce((acumulador, factura) => {
    const mes = new Date(factura.fecha_pago).getMonth();
    const monto = parseFloat(factura.precio);

    if (!acumulador[mes]) {
      acumulador[mes] = 0;
    }

    acumulador[mes] += monto;

    return acumulador;
  }, []);

  const labels = Object.keys(datosPorMes).map(mes => {
    const nombreMeses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return nombreMeses[parseInt(mes, 10)];
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Monto Total',
        data: Object.values(datosPorMes),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        barThickness: 100,
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
        max: 100, 
      },
    },
  };

  return (
    <div>
      <h2>Gráfico de Barras - Monto Total por Mes</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraficoBarrasFacturasPagadas;
