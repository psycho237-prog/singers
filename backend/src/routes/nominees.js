import { Router } from 'express';
import { getSupabase, mockData } from '../config/database.js';

const router = Router();

// Helper to format votes for display
function formatVotes(votes) {
    if (votes >= 1000000) {
        return `${(votes / 1000000).toFixed(1)}M`;
    }
    if (votes >= 1000) {
        return `${(votes / 1000).toFixed(1)}k`;
    }
    return votes.toString();
}

// GET /api/nominees - List all nominees (with optional category filter)
router.get('/', async (req, res, next) => {
    try {
        const { categoryId } = req.query;
        const supabase = getSupabase();

        if (!supabase) {
            // Return mock data if Supabase not configured
            let nominees = mockData.nominees;
            if (categoryId) {
                nominees = nominees.filter(n => n.category_id === parseInt(categoryId));
            }
            // Format votes for display
            nominees = nominees.map(n => ({
                ...n,
                votes_display: formatVotes(n.votes),
            }));
            return res.json(nominees);
        }

        let query = supabase.from('nominees').select('*');

        if (categoryId) {
            query = query.eq('category_id', categoryId);
        }

        const { data, error } = await query.order('votes', { ascending: false });

        if (error) throw error;

        // Format votes for display
        const nominees = data.map(n => ({
            ...n,
            votes_display: formatVotes(n.votes),
        }));

        res.json(nominees);
    } catch (err) {
        next(err);
    }
});

// GET /api/nominees/:id - Get single nominee
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const supabase = getSupabase();

        if (!supabase) {
            const nominee = mockData.nominees.find(n => n.id === parseInt(id));
            if (!nominee) {
                return res.status(404).json({ error: 'Nominee not found' });
            }
            return res.json({
                ...nominee,
                votes_display: formatVotes(nominee.votes),
            });
        }

        const { data, error } = await supabase
            .from('nominees')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) {
            return res.status(404).json({ error: 'Nominee not found' });
        }

        res.json({
            ...data,
            votes_display: formatVotes(data.votes),
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/nominees/rankings/global - Global rankings
router.get('/rankings/global', async (req, res, next) => {
    try {
        const supabase = getSupabase();

        if (!supabase) {
            const sorted = [...mockData.nominees]
                .sort((a, b) => b.votes - a.votes)
                .map((n, i) => ({
                    ...n,
                    rank: i + 1,
                    votes_display: formatVotes(n.votes),
                }));
            return res.json(sorted);
        }

        const { data, error } = await supabase
            .from('nominees')
            .select('*')
            .order('votes', { ascending: false });

        if (error) throw error;

        const ranked = data.map((n, i) => ({
            ...n,
            rank: i + 1,
            votes_display: formatVotes(n.votes),
        }));

        res.json(ranked);
    } catch (err) {
        next(err);
    }
});

export default router;
