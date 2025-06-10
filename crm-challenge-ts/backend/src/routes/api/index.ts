import { FastifyInstance } from 'fastify';
import customer from './customerRoutes';

declare module 'fastify' {
    interface FastifyInstance {
    }
}

export default async function(fastify: FastifyInstance) {
    fastify.register(customer);
};
