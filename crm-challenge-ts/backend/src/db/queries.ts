import queryDb from './postgres';
import { Customer } from '../types/Customer'
import { CustomerInput } from '../types/CustomerInput';
import { v4 as uuidv4 } from 'uuid';


export async function getAllCustomers(): Promise<Customer[]> {
  const queryString: string = `
    SELECT customer_id, first_name, last_name, mail, ARRAY_AGG(tss_id) AS tss_ids
    FROM customers
    GROUP BY customer_id, first_name, last_name, mail
  `;

  const result = await queryDb(queryString);
  return result;
}


export async function getCustomerById(customer_id: string): Promise<Customer[]> {
  const queryString: string = `
  SELECT customer_id, first_name, last_name, mail, ARRAY_AGG(tss_id) AS tss_ids
  FROM customers
  WHERE customer_id = $1
  GROUP BY customer_id, first_name, last_name, mail
  `;

  const result = await queryDb({
    text: queryString,
    values: [customer_id]
  });

  return result;
}

export async function createCustomer(data: CustomerInput): Promise<{ success: boolean; message: string }> {

   const lookup = await queryDb({
    text: `
      SELECT customer_id
      FROM customers
      WHERE first_name = $1 AND last_name = $2 AND mail = $3
      LIMIT 1
    `,
    values: [data.first_name, data.last_name, data.mail],
  });

  const customerId = lookup.length ? lookup[0].customer_id : uuidv4(); 
  const tssId = uuidv4();

  const query = `
  INSERT INTO customers (customer_id, first_name, last_name, mail, tss_id)
  VALUES ($1, $2, $3, $4, $5) 
  `;

  await queryDb({ text: query, values: [customerId, data.first_name, data.last_name, data.mail, tssId] });
  return { success: true, message: customerId }
}


export async function createNewTssForCustomer(customerId: string): Promise<{ success: boolean; message: string; tss_id?: string }> {
  const tssId = uuidv4();

  // Check if customer exists
  const checkQuery = `SELECT 1 FROM customers WHERE customer_id = $1 LIMIT 1`;
  const exists = await queryDb({ text: checkQuery, values: [customerId] });

  if (exists.length === 0) {
    return { success: false, message: 'Customer does not exist' };
  }

  // Get name, lastName and mail from existing entry
  const getQuery = `
    SELECT first_name, last_name, mail
    FROM customers
    WHERE customer_id = $1
    LIMIT 1
  `;
  const [{ first_name, last_name, mail }] = await queryDb({ text: getQuery, values: [customerId] });

  // Create new row with same info + new tss
  const insertQuery = `
    INSERT INTO customers (customer_id, first_name, last_name, mail, tss_id)
    VALUES ($1, $2, $3, $4, $5)
  `;
  await queryDb({ text: insertQuery, values: [customerId, first_name, last_name, mail, tssId] });
  return { success: true, message: 'TSS created', tss_id: tssId };
}
