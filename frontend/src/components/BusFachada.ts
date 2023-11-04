import axios from 'axios';
import { API_URL } from '../config';

export interface BusquedaFachada {
  buscarClientePorDNI(dni: string): Promise<any>;
  buscarLineasPorDNI(dni: string): Promise<any>;
  buscarClientesPorNombre(nombre: string): Promise<any>;
  buscarClientesPorApellido(apellido: string): Promise<any>;
}

const BusFachada = (): BusquedaFachada => {
  const instance = axios.create({ baseURL: API_URL });

  const buscarClientePorDNI = async (dni: string) => {
    try {
      const response = await instance.get(`/buscarPorDNI/${dni}`);
      return response.data;
    } catch (error) {
      console.error('Error al buscar cliente por DNI:', error);
      throw error;
    }
  };

  const buscarLineasPorDNI = async (dni: string) => {
    try {
      const response = await instance.get(`/buscarLineasPorDNI/${dni}`);
      return response.data;
    } catch (error) {
      console.error('Error al buscar líneas por DNI:', error);
      throw error;
    }
  };

  const buscarClientesPorNombre = async (nombre: string) => {
    try {
      const response = await instance.get(`/buscarPorNombre/${nombre}`);
      return response.data;
    } catch (error) {
      console.error('Error al buscar clientes por nombre:', error);
      throw error;
    }
  };

  const buscarClientesPorApellido = async (apellido: string) => {
    try {
      const response = await instance.get(`/buscarPorApellido/${apellido}`);
      return response.data;
    } catch (error) {
      console.error('Error al buscar clientes por apellido:', error);
      throw error;
    }
  };

  return {
    buscarClientePorDNI,
    buscarLineasPorDNI,
    buscarClientesPorNombre,
    buscarClientesPorApellido,
  };
};

export default BusFachada;
