import Fastify from 'fastify';
import uiCalls from './ui-calls.js';
import cors from 'fastify-cors';
import Engine from './engine.js';

class ApplicationApiServer {
  constructor() {
    const port = 2700;
    this.fastify = Fastify({
      logger: false,
    });

    this.engine = new Engine();
    this.fastify.decorate('engine', this.engine);

    this.fastify.register(cors, {
      origin: '*',
    });

    // this.fastify.register(auth);
    this.fastify.register(uiCalls, { prefix: '/api/v1' });

    this.fastify.listen(port, '::');
    console.log(`>> Started UI API server on port ${port} <<`);
    this.fastify.ready((err) => {
      if (err) {
        throw err;
      }
    });
  }
}

const applicationApiServer = new ApplicationApiServer();
