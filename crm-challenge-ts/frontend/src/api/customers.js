import axios from 'axios';
import config from '../config';

export const addCustomer = (data) =>
  axios.post(`${config.BACKEND_URL}:${config.BACKEND_PORT}/customer`, data);

export const addTss = (customerId) =>
  axios.post(`${config.BACKEND_URL}:${config.BACKEND_PORT}/customer/${customerId}/tss`);