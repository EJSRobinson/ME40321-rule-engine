export default (fastify, opts, done) => {
  fastify.post('/test', {
    logLevel: 'info',
    handler: async (req, reply) => {
      // console.log(req.body.Test * 2);
      let result = fastify.engine.test();
      return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send(result);
    },
  });

  // fastify.post('/finish', {
  //   logLevel: 'info',
  //   handler: async (req, reply) => {
  //     console.log(req.body.Test * 2);
  //     result = await
  //     return reply.code(200).header('Content-Type', 'application/json; charset=utf-8').send('Ok');
  //   },
  // });
  done();
};
