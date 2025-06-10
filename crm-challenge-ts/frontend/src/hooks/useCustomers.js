import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [error,     setError]     = useState(null);
  const [loading,   setLoading]   = useState(false);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${config.BACKEND_URL}:${config.BACKEND_PORT}/customers`);
      setCustomers(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load customers');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  return { customers, error, loading, fetchCustomers };
}