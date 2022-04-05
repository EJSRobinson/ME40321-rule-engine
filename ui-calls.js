export default (fastify, opts, done) => {
  fastify.post('/test', {
    logLevel: 'info',
    handler: async (req, reply) => {
      console.log('Whippley Wobbley Woo');
      return reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send('Hello World');
    },
  });
  done();
};
