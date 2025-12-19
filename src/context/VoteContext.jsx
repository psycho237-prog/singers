import { createContext, useContext, useState, useEffect } from 'react';
import { nominees as initialNominees, categories as initialCategories } from '../data/mockData';

const VoteContext = createContext();

export const useVotes = () => {
    const context = useContext(VoteContext);
    if (!context) {
        throw new Error('useVotes must be used within a VoteProvider');
    }
    return context;
};

export const VoteProvider = ({ children }) => {
    const [nominees, setNominees] = useState(() => {
        const saved = localStorage.getItem('nominees');
        return saved ? JSON.parse(saved) : initialNominees;
    });
    const [categories, setCategories] = useState(initialCategories);
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('transactions');
        return saved ? JSON.parse(saved) : [];
    });
    const [totalRevenue, setTotalRevenue] = useState(() => {
        const saved = localStorage.getItem('totalRevenue');
        return saved ? JSON.parse(saved) : 0;
    });

    useEffect(() => {
        localStorage.setItem('nominees', JSON.stringify(nominees));
    }, [nominees]);

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('totalRevenue', JSON.stringify(totalRevenue));
    }, [totalRevenue]);

    const incrementVote = (nomineeId, count = 1, amount = 0, method = 'MOMO') => {
        const nominee = nominees.find(n => n.id === nomineeId);
        if (!nominee) return;

        // Record Transaction
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
                    // Convert '12.4k' to number, increment, and convert back
                    const currentVotes = parseFloat(n.votes.replace('k', '')) * (n.votes.includes('k') ? 1000 : 1);
                    const newVotes = currentVotes + count;
                    const formattedVotes = newVotes >= 1000 ? `${(newVotes / 1000).toFixed(1)}k` : newVotes.toString();
                    return { ...n, votes: formattedVotes };
                }
                return n;
            })
        );
    };

    const getGlobalRankings = () => {
        return [...nominees].sort((a, b) => {
            const votesA = parseFloat(a.votes.replace('k', '')) * (a.votes.includes('k') ? 1000 : 1);
            const votesB = parseFloat(b.votes.replace('k', '')) * (b.votes.includes('k') ? 1000 : 1);
            return votesB - votesA;
        });
    };

    const getCategoryRankings = (categoryId) => {
        return nominees
            .filter(n => n.categoryId === categoryId)
            .sort((a, b) => {
                const votesA = parseFloat(a.votes.replace('k', '')) * (a.votes.includes('k') ? 1000 : 1);
                const votesB = parseFloat(b.votes.replace('k', '')) * (b.votes.includes('k') ? 1000 : 1);
                return votesB - votesA;
            });
    };

    const getTotalVotes = () => {
        const total = nominees.reduce((acc, nominee) => {
            const votes = parseFloat(nominee.votes.replace('k', '')) * (nominee.votes.includes('k') ? 1000 : 1);
            return acc + votes;
        }, 0);

        return total >= 1000000
            ? `${(total / 1000000).toFixed(1)}M+`
            : total >= 1000
                ? `${(total / 1000).toFixed(1)}k+`
                : total.toString();
    };

    const value = {
        nominees,
        categories,
        transactions,
        totalRevenue,
        incrementVote,
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
