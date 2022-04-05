import Fastify from 'fastify';
import uiCalls from './ui-calls.js';
import cors from 'fastify-cors';

class ApplicationApiServer {
  constructor() {
    this.fastify = Fastify({
      logger: true,
    });

    this.fastify.register(cors, {
      origin: '*',
    });

    // this.fastify.register(auth);
    this.fastify.register(uiCalls, { prefix: '/api/v1' });

    this.fastify.listen(2700, '::');
    this.fastify.ready((err) => {
      if (err) {
        throw err;
      }
    });
  }
}

const applicationApiServer = new ApplicationApiServer();
