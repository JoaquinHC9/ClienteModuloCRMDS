import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [contrasena, setContrasena] = useState("");
    const [correo, setCorreo] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/login", { contrasena, correo });
            if (response.status === 200) {
                navigate("/");
            } else {
                setError("Credenciales incorrectas");
            }
        } catch (error) {
            setError("Error en el inicio de sesión");
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-4">Iniciar Sesión</h1>
                    {error && <p className="text-danger">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="contrasena" className="form-label">
                                Contraseña:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="contrasena"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label">
                                Correo Electrónico:
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
