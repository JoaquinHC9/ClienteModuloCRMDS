import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../config';
import '../styles/Login.css';
export default function Login() {
    const [contrasena, setContrasena] = useState("");
    const [correo, setCorreo] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/admin/login`, { correo, contrasena });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('correo', correo);                
                navigate("/Main");
                window.location.reload();
            } else {
                setError("Credenciales incorrectas");
            }
        } catch (error) {
            setError("Error en el inicio de sesión");
            console.error(error);
        }
    };

    return (
        <div>
            <div className="fondo-celeste"></div>
            <div className="login-contenedor">            
            <div className="row justify-content-center">
                <div className="col-md-6">                    
                    <h1 className="text-center mb-4">CRM Modulo Cliente</h1>
                    <h1 className="text-center mb-4">Iniciar Sesión</h1>
                    {error && <p className="text-danger">{error}</p>}
                    <form onSubmit={handleLogin}>
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
                        <div className="mb-3">
                            <label htmlFor="contrasena" className="form-label">
                                Contraseña:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="contrasena"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Iniciar Sesión
                        </button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    );
}
