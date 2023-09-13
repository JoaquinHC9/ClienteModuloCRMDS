import { Helmet } from 'react-helmet';
import React, { Component } from 'react';

class Main extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Modulo Cliente</title>
                </Helmet>
                <h1 style={{ textAlign: 'center' }}>Bienvenido al Módulo de Clientes</h1>
                <p style={{ textAlign: 'center' }}>Este módulo te permite registrar clientes, gestionar las líneas asociadas y visualizar sus estados de cuenta</p>
                <h2 style={{ textAlign: 'center' }}>¿Cómo utilizar este módulo?</h2>
                <ul style={{ textAlign: 'center', listStyleType: 'none', padding: 0 }}>
                    <li style={{ marginLeft: '20px' }}>1. Registra nuevos clientes.</li>
                    <li style={{ marginLeft: '20px' }}>2. Realiza búsquedas de clientes existentes.</li>
                    <li style={{ marginLeft: '20px' }}>3. Gestiona las líneas de clientes.</li>
                    <li style={{ marginLeft: '20px' }}>4. Vistas de estado de Cuenta.</li>
                </ul>
            </div>
        );
    }
}

export default Main;