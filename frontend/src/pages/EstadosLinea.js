// EstadoLinea.js

import React from 'react';

const EstadoLinea = ({ estado }) => {
  const getEstadoLabel = () => {
    switch (estado) {
      case 0:
        return 'Activo';
      case 1:
        return 'Servicio Suspendido';
      case 2:
        return 'Servicio Cancelado';
      default:
        return 'Desconocido';
    }
  };

  return <span>{getEstadoLabel()}</span>;
};

export default EstadoLinea;
