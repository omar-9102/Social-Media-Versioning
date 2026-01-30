require('dotenv').config();
const express = require("express");
const prisma = require('./lib/prisma');
const { PrismaClient } = require('@prisma/client');


const userRoutes = require('./Modules/user/user.routes');
const authRoutes = require('./Modules/auth/auth.routes');


const app = express();

app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)


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






