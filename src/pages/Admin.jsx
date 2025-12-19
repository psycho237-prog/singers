import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    TrendingUp,
    DollarSign,
    Clock,
    Search,
    Filter,
    Download,
    Lock,
    ArrowRight,
    ChevronLeft,
    Trophy,
    Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useVotes } from '../context/VoteContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Admin = () => {
    const { transactions, totalRevenue, nominees, getTotalVotes } = useVotes();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'parrot') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-[#1a1a1a] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl"
                >
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center border border-secondary/30 mb-4">
                            <Lock className="text-secondary" size={32} />
                        </div>
                        <h1 className="text-2xl font-black tracking-tight mb-2">Admin Access</h1>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Enter password to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-secondary transition-colors font-bold text-sm text-white"
                            />
                            {error && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-widest">{error}</p>}
                        </div>
                        <Button type="submit" className="w-full py-4 rounded-2xl font-bold">
                            Login to Dashboard
                        </Button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pb-32">
            {/* Header */}
            <div className="p-6 pt-12 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center border border-secondary/30">
                        <LayoutDashboard className="text-secondary" size={20} />
                    </div>
                    <div>
                        <h1 className="text-lg font-black tracking-tight">Admin Dashboard</h1>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                            <Clock size={10} />
                            {currentTime.toLocaleTimeString()} • {currentTime.toLocaleDateString()}
                        </div>
                    </div>
                </div>
                <Link to="/">
                    <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest">
                        Exit
                    </Button>
                </Link>
            </div>

            <div className="p-6 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="p-6 border-none bg-[#1a1a1a] rounded-[2rem] relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Activity size={100} />
                        </div>
                        <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-2">Total Votes</p>
                        <h2 className="text-3xl font-black tracking-tighter">{getTotalVotes()}</h2>
                    </Card>
                    <Card className="p-6 border-none bg-[#1a1a1a] rounded-[2rem] relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <DollarSign size={100} />
                        </div>
                        <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mb-2">Revenue (XAF)</p>
                        <h2 className="text-3xl font-black tracking-tighter">{totalRevenue.toLocaleString()}</h2>
                    </Card>
                    <Card className="p-6 border-none bg-[#1a1a1a] rounded-[2rem] relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Users size={100} />
                        </div>
                        <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-2">Transactions</p>
                        <h2 className="text-3xl font-black tracking-tighter">{transactions.length}</h2>
                    </Card>
                    <Card className="p-6 border-none bg-[#1a1a1a] rounded-[2rem] relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Trophy size={100} />
                        </div>
                        <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest mb-2">Event Year</p>
                        <h2 className="text-3xl font-black tracking-tighter">2026</h2>
                    </Card>
                </div>

                {/* Real-time Monitoring */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-black tracking-tight flex items-center gap-2">
                            <Activity size={16} className="text-secondary" />
                            Live Transactions
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Real-time</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {transactions.length === 0 ? (
                            <div className="p-12 text-center bg-[#1a1a1a] rounded-[2rem] border border-white/5">
                                <Clock size={48} className="mx-auto mb-4 text-gray-700" />
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">No transactions yet</p>
                            </div>
                        ) : (
                            transactions.map((tx, index) => (
                                <motion.div
                                    key={tx.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="p-4 bg-[#1a1a1a] rounded-2xl border border-white/5 flex items-center justify-between group hover:border-secondary/30 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-xs text-secondary">
                                            {tx.method === 'MOMO' ? 'MTN' : 'OM'}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold">{tx.nomineeName}</h4>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                                {new Date(tx.timestamp).toLocaleTimeString()} • {tx.votes} Votes
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-white">+{tx.amount} XAF</p>
                                        <p className="text-[8px] text-green-500 font-bold uppercase tracking-widest">Success</p>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Top Nominees */}
                <div>
                    <h3 className="text-sm font-black tracking-tight mb-6 flex items-center gap-2">
                        <Trophy size={16} className="text-yellow-500" />
                        Top Nominees
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        {nominees.slice(0, 5).sort((a, b) => {
                            const votesA = parseFloat(a.votes.replace('k', '')) * (a.votes.includes('k') ? 1000 : 1);
                            const votesB = parseFloat(b.votes.replace('k', '')) * (b.votes.includes('k') ? 1000 : 1);
                            return votesB - votesA;
                        }).map((nominee, index) => (
                            <div key={nominee.id} className="p-4 bg-[#1a1a1a] rounded-2xl border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center font-black text-xs text-secondary">
                                        #{index + 1}
                                    </div>
                                    <h4 className="text-sm font-bold">{nominee.name}</h4>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-white">{nominee.votes}</p>
                                    <p className="text-[8px] text-gray-500 font-bold uppercase tracking-widest">Total Votes</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
