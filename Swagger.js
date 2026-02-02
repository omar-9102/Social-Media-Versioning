require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc')

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
            description: 'REST API'
    },
    servers: [
        { url: `http://localhost:${process.env.PORT}` }
    ],
    components: {
        securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
        }
    },
    security: [{ bearerAuth: [] }]
    },
    apis: [
    'src/routes/*.js',
    'Modules/**/**/*.js'
    ]
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

module.exports = swaggerSpec
