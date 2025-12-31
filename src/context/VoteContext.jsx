import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { nominees as initialNominees, categories as initialCategories } from '../data/mockData';
import api from '../services/api';

const VoteContext = createContext();

export const useVotes = () => {
    const context = useContext(VoteContext);
    if (!context) {
        throw new Error('useVotes must be used within a VoteProvider');
    }
    return context;
};

export const VoteProvider = ({ children }) => {
    const [nominees, setNominees] = useState(initialNominees);
    const [categories, setCategories] = useState(initialCategories);
    const [transactions, setTransactions] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [useBackend, setUseBackend] = useState(true);

    // Fetch data from backend on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Try to fetch from backend
                const [categoriesData, nomineesData] = await Promise.all([
                    api.getCategories(),
                    api.getNominees(),
                ]);

                const transformNominees = (data) => data.map(n => ({
                    id: n.id,
                    categoryId: n.category_id,
                    name: n.name,
                    song: n.song,
                    votes: n.votes_display || n.votes?.toString() || '0',
                    image: n.image_url,
                    tag: n.tag,
                    description: n.description,
                    bio: n.bio,
                    genre: n.genre,
                    country: n.country,
                    rank: n.rank,
                    listeners: n.listeners,
                    hits: n.hits || [],
                }));

                const transformedCategories = categoriesData.map(c => ({
                    id: c.id,
                    title: c.title,
                    nominees: c.nominees_count,
                    image: c.image_url,
                    featured: c.featured,
                }));

                setCategories(transformedCategories);
                setNominees(transformNominees(nomineesData));
                setUseBackend(true);
                console.log('✅ Connected to backend API');
            } catch (err) {
                console.warn('⚠️ Backend not available, using local data:', err.message);
                setUseBackend(false);

                // Fall back to localStorage if available
                const savedNominees = localStorage.getItem('nominees');
                const savedTransactions = localStorage.getItem('transactions');
                const savedRevenue = localStorage.getItem('totalRevenue');
                if (savedNominees) setNominees(JSON.parse(savedNominees));
                else setNominees(initialNominees);

                if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
                if (savedRevenue) setTotalRevenue(JSON.parse(savedRevenue));

                // Ensure categories are set to initial if backend fails
                setCategories(initialCategories);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Save to localStorage as backup when not using backend
    useEffect(() => {
        if (!useBackend) {
            localStorage.setItem('nominees', JSON.stringify(nominees));
        }
    }, [nominees, useBackend]);

    useEffect(() => {
        if (!useBackend) {
            localStorage.setItem('transactions', JSON.stringify(transactions));
        }
    }, [transactions, useBackend]);

    useEffect(() => {
        if (!useBackend) {
            localStorage.setItem('totalRevenue', JSON.stringify(totalRevenue));
        }
    }, [totalRevenue, useBackend]);

    // Process payment and vote via backend
    const processVote = useCallback(async (nomineeId, count, phoneNumber, paymentMethod) => {
        try {
            const result = await api.initiatePayment({
                nomineeId,
                voteCount: count,
                phoneNumber,
                paymentMethod,
            });

            if (result.success && result.status !== 'pending') {
                // Refresh nominees only if it's already success (Mock mode)
                await refetch();
            }

            return result;
        } catch (err) {
            console.error('Payment failed:', err);
            throw err;
        }
    }, []);

    // Legacy incrementVote for backward compatibility (local mode only)
    const incrementVote = useCallback((nomineeId, count = 1, amount = 0, method = 'MOMO') => {
        const nominee = nominees.find(n => n.id === nomineeId);
        if (!nominee) return;

        // Record Transaction locally
        const newTransaction = {
            id: Date.now(),
            nomineeId,
            nomineeName: nominee.name,
            votes: count,
            amount: amount,
            method: method,
            timestamp: new Date().toISOString()
        };

        setTransactions(prev => [newTransaction, ...prev]);
        setTotalRevenue(prev => prev + amount);

        setNominees(prevNominees =>
            prevNominees.map(n => {
                if (n.id === nomineeId) {
                    const currentVotes = parseFloat(n.votes.replace('k', '')) * (n.votes.includes('k') ? 1000 : 1);
                    const newVotes = currentVotes + count;
                    const formattedVotes = newVotes >= 1000 ? `${(newVotes / 1000).toFixed(1)}k` : newVotes.toString();
                    return { ...n, votes: formattedVotes };
                }
                return n;
            })
        );
    }, [nominees]);

    // Refetch data
    const refetch = useCallback(async () => {
        if (!useBackend) return;

        try {
            const nomineesData = await api.getNominees();
            const transformedNominees = nomineesData.map(n => ({
                id: n.id,
                categoryId: n.category_id,
                name: n.name,
                song: n.song,
                votes: n.votes_display || n.votes?.toString() || '0',
                image: n.image_url,
                tag: n.tag,
                description: n.description,
                bio: n.bio,
                genre: n.genre,
                country: n.country,
                rank: n.rank,
                listeners: n.listeners,
                hits: n.hits || [],
            }));
            setNominees(transformedNominees);
        } catch (err) {
            console.error('Refetch failed:', err);
        }
    }, [useBackend]);

    const getGlobalRankings = useCallback(() => {
        return [...nominees].sort((a, b) => {
            const votesA = parseFloat(a.votes.replace('k', '')) * (a.votes.includes('k') ? 1000 : 1);
            const votesB = parseFloat(b.votes.replace('k', '')) * (b.votes.includes('k') ? 1000 : 1);
            return votesB - votesA;
        });
    }, [nominees]);

    const getCategoryRankings = useCallback((categoryId) => {
        return nominees
            .filter(n => n.categoryId === categoryId)
            .sort((a, b) => {
                const votesA = parseFloat(a.votes.replace('k', '')) * (a.votes.includes('k') ? 1000 : 1);
                const votesB = parseFloat(b.votes.replace('k', '')) * (b.votes.includes('k') ? 1000 : 1);
                return votesB - votesA;
            });
    }, [nominees]);

    const getTotalVotes = useCallback(() => {
        const total = nominees.reduce((acc, nominee) => {
            const votes = parseFloat(nominee.votes.replace('k', '')) * (nominee.votes.includes('k') ? 1000 : 1);
            return acc + votes;
        }, 0);

        return total >= 1000000
            ? `${(total / 1000000).toFixed(1)}M+`
            : total >= 1000
                ? `${(total / 1000).toFixed(1)}k+`
                : total.toString();
    }, [nominees]);

    const value = {
        nominees,
        categories,
        transactions,
        totalRevenue,
        isLoading,
        error,
        useBackend,
        incrementVote,
        processVote,
        refetch,
        getGlobalRankings,
        getCategoryRankings,
        getTotalVotes
    };

    return (
        <VoteContext.Provider value={value}>
            {children}
        </VoteContext.Provider>
    );
};
