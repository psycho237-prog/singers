import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { getSupabase, mockData } from '../config/database.js';
import { mockTransactions } from './payments.js';

const router = Router();

// All admin routes require authentication
router.use(authMiddleware);

// GET /api/admin/stats - Dashboard statistics
router.get('/stats', async (req, res, next) => {
    try {
        const supabase = getSupabase();

        if (!supabase) {
            // Mock mode
            const totalVotes = mockData.nominees.reduce((sum, n) => sum + n.votes, 0);
            const totalRevenue = mockTransactions
                .filter(t => t.status === 'success')
                .reduce((sum, t) => sum + t.amount, 0);
            const totalTransactions = mockTransactions.length;
            const successfulTransactions = mockTransactions.filter(t => t.status === 'success').length;
            const pendingTransactions = mockTransactions.filter(t => t.status === 'pending').length;
            const failedTransactions = mockTransactions.filter(t => t.status === 'failed').length;

            return res.json({
                totalVotes,
                totalRevenue,
                totalTransactions,
                successfulTransactions,
                pendingTransactions,
                failedTransactions,
                successRate: totalTransactions > 0
                    ? ((successfulTransactions / totalTransactions) * 100).toFixed(1)
                    : 0,
            });
        }

        // Get stats from database
        const [
            { data: nominees },
            { data: transactions },
        ] = await Promise.all([
            supabase.from('nominees').select('votes'),
            supabase.from('transactions').select('amount, status'),
        ]);

        const totalVotes = nominees?.reduce((sum, n) => sum + n.votes, 0) || 0;
        const successTx = transactions?.filter(t => t.status === 'success') || [];
        const totalRevenue = successTx.reduce((sum, t) => sum + t.amount, 0);
        const totalTransactions = transactions?.length || 0;
        const successfulTransactions = successTx.length;
        const pendingTransactions = transactions?.filter(t => t.status === 'pending').length || 0;
        const failedTransactions = transactions?.filter(t => t.status === 'failed').length || 0;

        res.json({
            totalVotes,
            totalRevenue,
            totalTransactions,
            successfulTransactions,
            pendingTransactions,
            failedTransactions,
            successRate: totalTransactions > 0
                ? ((successfulTransactions / totalTransactions) * 100).toFixed(1)
                : 0,
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/admin/transactions - List all transactions (real-time)
router.get('/transactions', async (req, res, next) => {
    try {
        const { status, limit = 50, offset = 0 } = req.query;
        const supabase = getSupabase();

        if (!supabase) {
            // Mock mode
            let txs = [...mockTransactions];

            if (status) {
                txs = txs.filter(t => t.status === status);
            }

            // Add nominee name to each transaction
            txs = txs.map(tx => {
                const nominee = mockData.nominees.find(n => n.id === tx.nominee_id);
                return {
                    ...tx,
                    nominee_name: nominee?.name || 'Unknown',
                };
            });

            const paginated = txs.slice(parseInt(offset), parseInt(offset) + parseInt(limit));

            return res.json({
                transactions: paginated,
                total: txs.length,
                limit: parseInt(limit),
                offset: parseInt(offset),
            });
        }

        let query = supabase
            .from('transactions')
            .select('*, nominees(name)', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

        if (status) {
            query = query.eq('status', status);
        }

        const { data, error, count } = await query;

        if (error) throw error;

        res.json({
            transactions: data.map(tx => ({
                ...tx,
                nominee_name: tx.nominees?.name || 'Unknown',
            })),
            total: count,
            limit: parseInt(limit),
            offset: parseInt(offset),
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/admin/top-nominees - Top nominees by votes
router.get('/top-nominees', async (req, res, next) => {
    try {
        const { limit = 10 } = req.query;
        const supabase = getSupabase();

        if (!supabase) {
            const sorted = [...mockData.nominees]
                .sort((a, b) => b.votes - a.votes)
                .slice(0, parseInt(limit));
            return res.json(sorted);
        }

        const { data, error } = await supabase
            .from('nominees')
            .select('*')
            .order('votes', { ascending: false })
            .limit(parseInt(limit));

        if (error) throw error;
        res.json(data);
    } catch (err) {
        next(err);
    }
});

// GET /api/admin/recent-activity - Recent transactions for live feed
router.get('/recent-activity', async (req, res, next) => {
    try {
        const { limit = 20 } = req.query;
        const supabase = getSupabase();

        if (!supabase) {
            const recent = mockTransactions
                .slice(0, parseInt(limit))
                .map(tx => {
                    const nominee = mockData.nominees.find(n => n.id === tx.nominee_id);
                    return {
                        ...tx,
                        nominee_name: nominee?.name || 'Unknown',
                    };
                });
            return res.json(recent);
        }

        const { data, error } = await supabase
            .from('transactions')
            .select('*, nominees(name)')
            .order('created_at', { ascending: false })
            .limit(parseInt(limit));

        if (error) throw error;

        res.json(data.map(tx => ({
            ...tx,
            nominee_name: tx.nominees?.name || 'Unknown',
        })));
    } catch (err) {
        next(err);
    }
});

export default router;
