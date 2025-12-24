import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from '../config/env.js';
import { getSupabase } from '../config/database.js';

const router = Router();

// Default admin credentials (change in production!)
const DEFAULT_ADMIN = {
    email: 'admin@africansingawards.com',
    // Default password: 'parrot' (hashed)
    passwordHash: '$2b$10$5RvKpTzX6MNV2OJL5x5Zp.LXjJ8OwKBnbBOJJYJbHl5K7Q7E5LvTe',
};

// POST /api/auth/login - Admin login
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required',
            });
        }

        const supabase = getSupabase();
        let admin = null;

        if (!supabase) {
            // Mock mode: use default admin
            if (email === DEFAULT_ADMIN.email || email === 'admin') {
                admin = DEFAULT_ADMIN;
            }
        } else {
            // Check database for admin
            const { data, error } = await supabase
                .from('admins')
                .select('*')
                .eq('email', email)
                .single();

            if (!error && data) {
                admin = data;
            }
        }

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        // For mock mode, accept 'parrot' as password
        const isValidPassword = supabase
            ? await bcrypt.compare(password, admin.passwordHash || admin.password_hash)
            : (password === 'parrot' || await bcrypt.compare(password, DEFAULT_ADMIN.passwordHash));

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                email: admin.email,
                role: admin.role || 'admin',
            },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );

        res.json({
            success: true,
            token,
            expiresIn: config.jwt.expiresIn,
            admin: {
                email: admin.email,
                role: admin.role || 'admin',
            },
        });
    } catch (err) {
        next(err);
    }
});

// POST /api/auth/verify - Verify JWT token
router.post('/verify', async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ valid: false, error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, config.jwt.secret);
            res.json({
                valid: true,
                admin: {
                    email: decoded.email,
                    role: decoded.role,
                },
            });
        } catch (err) {
            res.status(401).json({ valid: false, error: 'Invalid token' });
        }
    } catch (err) {
        next(err);
    }
});

export default router;
