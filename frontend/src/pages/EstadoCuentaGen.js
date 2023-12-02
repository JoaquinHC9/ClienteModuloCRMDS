import { useParams } from 'react-router-dom';
import { useAxios } from '../components/UseAxios.ts';
import { Helmet } from 'react-helmet';
import { API_URL, VENTAS_URL } from '../config.js';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import GraficoBarrasFacturasPagadas from '../components/GraficoBarrasFacturasPagadas'; // Importa el componente del gráfico
import '../styles/EstadoCuenta.css';


export default function EstadoCuentaGen() {
  const { dni } = useParams();
  const { data: clienteData, error: clienteError, isLoading: clienteIsLoading } = useAxios(`${API_URL}/clientes/buscarPorDNI/${dni}`);
  const hasClienteData = clienteData && Object.keys(clienteData).length > 0;

  const { data: lineaData, error: lineaError, isLoading: lineaIsLoading } = useAxios(`${VENTAS_URL}/getlineas/${dni}`);  
  const { data: reciboData, error: reciboError, isLoading: reciboIsLoading } = useAxios(`${VENTAS_URL}/searchpaidbilldni/${dni}`);
  const columnasDatosLinea = ['Numero de Telefono', 'Plan', 'Fecha de Compra', 'Ultimo Pago', 'Monto Mensual', 'Estado'];
  return (
    <div>
      <Helmet>
        <title>Estado de cuenta</title>
      </Helmet>
      <div className='estadocuenta-contenedor'>
        <h1>Estado de cuenta</h1>
        <div className="contenedor-cuenta">
          {hasClienteData ? (
            <div>
              <h2>Nombre: {clienteData.nombre} {clienteData.apellido} DNI:{clienteData.dni}</h2>
              <h2>Resumen general cuenta del cliente</h2>
              <TableContainer component={Paper} className='resultado-busqueda'>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columnasDatosLinea.map((column) => (
                        <TableCell key={column}>{column}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lineaData ? (
                      lineaData.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell>{result.numero}</TableCell>
                          <TableCell>{result.plan}</TableCell>
                          <TableCell>{new Date(result.fecha_compra).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(result.ultimo_pago).toLocaleDateString()}</TableCell>
                          <TableCell>{result.monto_pago}</TableCell>
                          <TableCell>{result.estado === 0 ? 'Activo' : 'No activo'}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columnasDatosLinea.length}>No se encontraron líneas asociadas.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : clienteIsLoading ? (
            <p>Cargando...</p>
          ) : (
            <p>Error al cargar datos del cliente: {clienteError}</p>
          )}
        </div>
        <div className='contenedor-grafico'>
            <div>            
                {reciboData ? (
                <GraficoBarrasFacturasPagadas datosFacturas={reciboData} />
                ) : reciboIsLoading ? (
                <p>Cargando gráfico...</p>
                ) : (
                <p>No se encontraron facturas: {reciboError}</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
