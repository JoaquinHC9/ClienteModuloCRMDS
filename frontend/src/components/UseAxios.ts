import axios from 'axios';
import { useEffect, useState } from 'react';

interface Response<T> {
  data: T | undefined;
  error: string | undefined;
  isLoading: boolean;
}

export function useAxios<T> (url: string): Response<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError('Error al obtener los datos');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading };
}