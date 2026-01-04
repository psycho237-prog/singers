import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config, validateConfig } from './config/env.js';
import categoriesRouter from './routes/categories.js';
import nomineesRouter from './routes/nominees.js';
import votesRouter from './routes/votes.js';
import paymentsRouter from './routes/payments.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import { errorHandler } from './middleware/errorHandler.js';

// Validate config
validateConfig();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: [config.frontendUrl, 'https://singers-*.vercel.app'],
    credentials: true,
}));

// Body parsing
app.use(express.json());

// Rate limiting - 1000+ requests per minute per IP
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 1000, // 1000 requests per minute
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests, please try again later.' },
});
app.use(limiter);

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: config.nodeEnv,
    });
});

// API Routes
app.use('/api/categories', categoriesRouter);
app.use('/api/nominees', nomineesRouter);
app.use('/api/votes', votesRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

import { getDb } from './config/firebase.js';
import { mockData } from './config/database.js';

// Maintenance Route - Seed/Reset Database (Temporary)
app.post('/api/maintenance/seed-db', async (_req: Request, res: Response) => {
    try {
        const db = getDb();
        if (!db) {
            return res.status(503).json({ error: 'Firebase not initialized' });
        }

        console.log('🌱 Starting database seeding from API trigger...');

        // 1. Seed Categories
        const categoriesRef = db.ref('categories');
        const categoriesObj: Record<string, unknown> = {};
        mockData.categories.forEach(cat => {
            categoriesObj[cat.id] = {
                title: cat.title,
                nominees_count: cat.nominees_count,
                image_url: cat.image_url,
                featured: cat.featured
            };
        });
        await categoriesRef.set(categoriesObj);

        // 2. Seed Nominees
        const nomineesRef = db.ref('nominees');
        const nomineesObj: Record<string, unknown> = {};
        mockData.nominees.forEach(nom => {
            nomineesObj[nom.id] = {
                category_id: nom.category_id,
                name: nom.name,
                song: nom.song,
                votes: nom.votes,
                image_url: nom.image_url,
                tag: nom.tag,
                description: nom.description,
                bio: nom.bio || '',
                genre: nom.genre,
                country: nom.country
            };
        });
        await nomineesRef.set(nomineesObj);

        res.json({ success: true, message: 'Database seeded successfully with new data' });
    } catch (err: any) {
        console.error('Seeding error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`🚀 African Singing Awards API running on port ${PORT}`);
    console.log(`📊 Environment: ${config.nodeEnv}`);
    console.log(`🔗 Frontend URL: ${config.frontendUrl}`);
    console.log(`⚡ Rate limit: 1000 requests/minute`);
});

export default app;
