function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

export default (fastify, opts, done) => {
  fastify.post('/finish', {
    logLevel: 'info',
    handler: async (req, reply) => {
      await fastify.engine.finish();
      return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: 'Ok' });
    },
  });

  fastify.post('/addConstraintSet', {
    logLevel: 'info',
    handler: async (req, reply) => {
      fastify.engine.addConstraintsSet(req.body.value);
      return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: 'Ok' });
    },
  });

  fastify.post('/addContextSet', {
    logLevel: 'info',
    handler: async (req, reply) => {
      fastify.engine.addContextSet(req.body.value);
      return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: 'Ok' });
    },
  });

  fastify.post('/getCurrent', {
    logLevel: 'info',
    handler: async (req, reply) => {
      let result = await fastify.engine.getCurrent();
      return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ data: JSON.stringify(result, replacer) });
    },
  });

  fastify.post('/getFinals', {
    logLevel: 'info',
    handler: async (req, reply) => {
      let result = await fastify.engine.getFinals();
      return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ data: JSON.stringify(result, replacer) });
    },
  });

  fastify.post('/checkReadyToFinish', {
    logLevel: 'info',
    handler: (req, reply) => {
      let result = fastify.engine.getReadyToFinish();
      return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ data: result });
    },
  });

  fastify.post('/reset', {
    logLevel: 'info',
    handler: (req, reply) => {
      let result = fastify.engine.reset();
      return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ status: 'Ok' });
    },
  });
  done();
};
