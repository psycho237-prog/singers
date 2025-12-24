import { Router } from 'express';
import { getSupabase, mockData } from '../config/database.js';

const router = Router();

// In-memory storage for mock mode
let mockTransactions = [];

// POST /api/votes - Submit a vote (called after successful payment)
router.post('/', async (req, res, next) => {
    try {
        const { nomineeId, voteCount, transactionId } = req.body;

        if (!nomineeId || !voteCount) {
            return res.status(400).json({
                error: 'Missing required fields: nomineeId, voteCount'
            });
        }

        const supabase = getSupabase();

        if (!supabase) {
            // Mock mode: update in-memory
            const nominee = mockData.nominees.find(n => n.id === parseInt(nomineeId));
            if (!nominee) {
                return res.status(404).json({ error: 'Nominee not found' });
            }

            nominee.votes += parseInt(voteCount);

            return res.json({
                success: true,
                nomineeId,
                newVoteCount: nominee.votes,
                message: `Successfully added ${voteCount} vote(s) to ${nominee.name}`,
            });
        }

        // Update nominee votes in database
        const { data: nominee, error: fetchError } = await supabase
            .from('nominees')
            .select('votes, name')
            .eq('id', nomineeId)
            .single();

        if (fetchError) throw fetchError;
        if (!nominee) {
            return res.status(404).json({ error: 'Nominee not found' });
        }

        const newVotes = nominee.votes + parseInt(voteCount);

        const { error: updateError } = await supabase
            .from('nominees')
            .update({ votes: newVotes })
            .eq('id', nomineeId);

        if (updateError) throw updateError;

        // Update transaction status if transactionId provided
        if (transactionId) {
            await supabase
                .from('transactions')
                .update({ status: 'completed' })
                .eq('id', transactionId);
        }

        res.json({
            success: true,
            nomineeId,
            newVoteCount: newVotes,
            message: `Successfully added ${voteCount} vote(s) to ${nominee.name}`,
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/votes/total - Get total votes across all nominees
router.get('/total', async (req, res, next) => {
    try {
        const supabase = getSupabase();

        if (!supabase) {
            const total = mockData.nominees.reduce((sum, n) => sum + n.votes, 0);
            return res.json({ total });
        }

        const { data, error } = await supabase
            .from('nominees')
            .select('votes');

        if (error) throw error;

        const total = data.reduce((sum, n) => sum + n.votes, 0);
        res.json({ total });
    } catch (err) {
        next(err);
    }
});

export default router;
