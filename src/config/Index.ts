export default {
    secret: 'thisIsASecretKeyForParsingToken',
    database: 'mongodb://localhost/tes',
    port: 8081,
    api_url: '/api/v1/',
    defaultUser: {
      email: 'admin@admin.admin',
      firstName: 'admin',
      lastName: 'admin',
      password: 'admin',
      username: 'admin',
      role: 10,
    },
    permissions: {
      findAll: 10,
      create: 10,
      findOne: 1,
      update: 1,
      delete: 1,
      authenticate: 0,
    },
    role: {
      admin: 10,
      user: 1,
      pending: 0
    }
};