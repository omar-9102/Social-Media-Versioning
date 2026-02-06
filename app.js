require('dotenv').config();
const express = require("express");
const prisma = require('./lib/prisma');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./Swagger')
const cors = require('cors')


const userRoutes = require('./Modules/user/user.routes');
const authRoutes = require('./Modules/auth/auth.routes');
const postRoutes = require('./Modules/post/post.routes');
const uploadRoutes = require('./Modules/upload/upload.routes')


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(express.static('public'))
app.use(cors())
app.use(express.urlencoded({ extended: true }));   // Middleware to parse URL-encoded bodies


app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/upload', uploadRoutes)


async function startServer() {
    try {
        await prisma.$connect();
        console.log('✅ Database connected');
        const PORT = process.env.PORT
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(new Date())
    });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});


startServer()






