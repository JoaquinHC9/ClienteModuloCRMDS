import React from "react";
import { Link } from "react-router-dom";

const AccesoDenegado = () => (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="alert alert-danger" role="alert">
          <h2 className="alert-heading">No tienes acceso a esta página.</h2>
          <p>
            Lo sentimos, parece que no tienes permisos para acceder a esta página. Si crees que esto es un error,
            puedes contactar al administrador del sistema.
          </p>
          <hr />
          <p className="mb-0">
            ¿Quieres volver a la página de inicio? <Link to="/">Haz clic aquí</Link>.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default AccesoDenegado;
