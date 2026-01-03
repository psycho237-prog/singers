import { Router, Request, Response, NextFunction } from 'express';
import { mockData } from '../config/database.js';
import { getDb } from '../config/firebase.js';
import { calculatePercentages } from '../utils/percentageCalculator.js';

const router = Router();

// Helper to format votes for display
function formatVotes(votes: number): string {
    if (votes >= 1000000) {
        return `${(votes / 1000000).toFixed(1)}M`;
    }
    if (votes >= 1000) {
        return `${(votes / 1000).toFixed(1)}k`;
    }
    return votes.toString();
}

// GET /api/nominees - List all nominees (with optional category filter)
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { categoryId } = req.query;
        const db = getDb();

        let rawNominees: any[] = [];
        if (!db) {
            rawNominees = mockData.nominees;
        } else {
            const snapshot = await db.ref('nominees').once('value');
            if (snapshot.exists()) {
                snapshot.forEach(child => {
                    rawNominees.push({ id: child.key, ...child.val() });
                    return false;
                });
            } else {
                rawNominees = mockData.nominees;
            }
        }

        if (categoryId) {
            rawNominees = rawNominees.filter(n => String(n.category_id) === String(categoryId));
        }

        const enrichedNominees = calculatePercentages(rawNominees);

        res.json(enrichedNominees.map(n => ({
            ...n,
            votes_display: formatVotes(n.votes || 0)
        })).sort((a, b) => (b.votes || 0) - (a.votes || 0)));
    } catch (err) {
        next(err);
    }
});

// GET /api/nominees/:id - Get single nominee
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const db = getDb();
        if (!db) {
            const nominee = mockData.nominees.find(n => n.id === parseInt(id));
            if (!nominee) return res.status(404).json({ error: 'Nominee not found' });
            return res.json({ ...nominee, votes_display: formatVotes(nominee.votes) });
        }

        const snapshot = await db.ref(`nominees/${id}`).once('value');
        if (!snapshot.exists()) {
            return res.status(404).json({ error: 'Nominee not found' });
        }

        const nominee = snapshot.val();
        res.json({
            id,
            ...nominee,
            votes_display: formatVotes(nominee.votes || 0)
        });
    } catch (err) {
        next(err);
    }
});

// GET /api/nominees/rankings/global - Global rankings
router.get('/rankings/global', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const db = getDb();
        if (!db) {
            const sorted = [...mockData.nominees]
                .sort((a, b) => b.votes - a.votes)
                .map((n, i) => ({ ...n, rank: i + 1, votes_display: formatVotes(n.votes) }));
            return res.json(sorted);
        }

        const snapshot = await db.ref('nominees').once('value');
        let nominees: any[] = [];
        snapshot.forEach(child => {
            nominees.push({ id: child.key, ...child.val() });
            return false;
        });

        const ranked = nominees
            .sort((a, b) => (b.votes || 0) - (a.votes || 0))
            .map((n, i) => ({
                ...n,
                rank: i + 1,
                votes_display: formatVotes(n.votes || 0)
            }));

        res.json(ranked);
    } catch (err) {
        next(err);
    }
});

export default router;
