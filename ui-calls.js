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
      let result = await fastify.engine.getFinals();
      return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(JSON.stringify(result, replacer));
    },
  });

  fastify.post('/addConstraint', {
    logLevel: 'info',
    handler: async (req, reply) => {
      fastify.engine.addConstraint(req.body.propKey, req.body.value);
      return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send('Ok');
    },
  });

  fastify.post('/addContext', {
    logLevel: 'info',
    handler: async (req, reply) => {
      fastify.engine.addContext(req.body.propKey, req.body.value);
      return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send('Ok');
    },
  });

  fastify.post('/getCurrent', {
    logLevel: 'info',
    handler: async (req, reply) => {
      let result = await fastify.engine.getCurrent();
      return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(result);
    },
  });

  fastify.post('/checkReadyToFinish', {
    logLevel: 'info',
    handler: async (req, reply) => {
      let result = await fastify.engine.checkReadyToFinish();
      return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(result);
    },
  });
  done();
};
