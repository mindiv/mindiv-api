export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mindiv',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Mindiv',
        url: 'https://mindivapp.com',
        email: 'info@mindivapp.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['.ts'],
};
