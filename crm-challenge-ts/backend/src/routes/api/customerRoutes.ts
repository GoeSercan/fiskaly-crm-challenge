import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { getCustomerById, createCustomer, getAllCustomers, createNewTssForCustomer } from '../../db/queries';
import { CustomerInput } from '../../types/CustomerInput';
import { Customer } from '../../types/Customer';


// FastifyRequesttypes
type GetCustomerRequest = FastifyRequest<{ Params: { id: string } }>;
type CreateCustomerRequest = FastifyRequest<{ Body: CustomerInput }>;

export default async function customerRoutes(fastify: FastifyInstance) {

  // GET ALL CUSTOMERS
  fastify.get('/customers', {
    handler: async (_request: FastifyRequest, reply: FastifyReply) => {
      try {
        const customers: Customer[] = await getAllCustomers();
        if (!customers.length) {
          return reply.code(404).send({ error: 'Customer not found' });
        }
        return reply.send(customers);
      } catch (err) {
        return reply.code(500).send({ error: 'Failed to fetch customers.' });
      }
    }
  });

  // GET CUSTOMER BY ID
  fastify.get<{ Params: { id: string } }>('/customer/:id', {
    handler: async (request: GetCustomerRequest, reply: FastifyReply) => {
      try {
        const { id } = request.params;
        const customer: Customer[] = await getCustomerById(id);
        if (!customer.length) {
          return reply.code(404).send({ error: 'Customer not found' });
        }
        return reply.send(customer);
      } catch (err) {
        return reply.code(500).send({ error: 'Failed to retrieve customer' });
      }
    }
  });

  // CREATE A NEW CUSTOMER
  fastify.post<{ Body: CustomerInput }>('/customer', {
    schema: {
      body: {
        type: 'object',
        required: ['first_name', 'last_name', 'mail'],
        properties: {
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          mail: { type: 'string' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    },

    handler: async (request: CreateCustomerRequest, reply: FastifyReply) => {
      try {
        const result = await createCustomer(request.body);
        if (!result.success) {
          return reply.code(400).send({ error: result.message });
        }
        return reply.code(201).send(result);
      } catch (err) {       
        return reply.code(500).send({ error: 'Server error during customer creation' });
      }
    }
  });

  //CREATE NEW TSS-ID 
  fastify.post<{ Params: { id: string } }>('/customer/:id/tss', {
    handler: async (request, reply) => {
      try {
        const { id } = request.params;
        const result = await createNewTssForCustomer(id);
        if (!result.success) {
          return reply.code(404).send({ error: result.message });
        }
        return reply.code(201).send(result);
      } catch (err) {
        return reply.code(500).send({ error: 'Failed to create new TSS' });
      }
    }
  });
}
