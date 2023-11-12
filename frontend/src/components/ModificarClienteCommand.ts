import axios from 'axios';
import { API_URL } from '../config';

interface DetallesCliente {
    direccion: string;
    codigo_postal: string;
    trabajo: string;
    hobie: string;
    estado_civil: string;
    num_hijos: string;
    contac_externo: string;
  }
  
  export interface ModificarInterface {
    execute(): Promise<any>;
    undo(): Promise<any>; // Agregar método para deshacer cambios si es necesario
  }
  
  class ModificarClienteCommand implements ModificarInterface {
    private clienteDNI: string;
    private nuevosDetalles: DetallesCliente;  
  
    constructor(clienteDNI: string, nuevosDetalles: DetallesCliente) {
      this.clienteDNI = clienteDNI;
      this.nuevosDetalles = nuevosDetalles;
    }
  
    async execute(): Promise<any> {
      try {
        const response = await axios.get(`${API_URL}/detallesCliente/buscarClienteDetalladoPorDNI/${this.clienteDNI}`);            
        if (response.data.dni === undefined) {        
          await axios.post(`${API_URL}/detallesCliente/agregarDetallesCliente`, {
            dni: this.clienteDNI,
            ...this.nuevosDetalles,
          });
        } else {        
          await axios.put(`${API_URL}/detallesCliente/actualizarDetallesCliente/${this.clienteDNI}`, {
            dni: this.clienteDNI,
            ...this.nuevosDetalles,
          });
        }
        return response.data;
      } catch (error) {
        throw new Error('Error al ejecutar el comando de modificación del cliente');
      }
    }
    async undo(): Promise<any> {
        try {          
        } catch (error) {
          throw new Error('Error al deshacer el comando de modificación del cliente');
        }
      }
  }
  
  export default ModificarClienteCommand;