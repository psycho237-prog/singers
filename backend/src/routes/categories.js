import { Router } from 'express';
import { getSupabase, mockData } from '../config/database.js';

const router = Router();

// GET /api/categories - List all categories
router.get('/', async (req, res, next) => {
    try {
        const supabase = getSupabase();

        if (!supabase) {
            // Return mock data if Supabase not configured
            return res.json(mockData.categories);
        }

        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('id');

        if (error) throw error;
        res.json(data);
    } catch (err) {
        next(err);
    }
});

// GET /api/categories/:id - Get single category
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const supabase = getSupabase();

        if (!supabase) {
            const category = mockData.categories.find(c => c.id === parseInt(id));
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
            return res.json(category);
        }

        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(data);
    } catch (err) {
        next(err);
    }
});

export default router;
