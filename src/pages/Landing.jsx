import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { LayoutGrid, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

const Landing = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselItems = [
        {
            image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000&auto=format&fit=crop",
            tag: "Trending",
            title: "Discover the Voice",
            description: "The continent's top talent awaits your vote"
        },
        {
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
            tag: "Featured",
            title: "Rhythm of Africa",
            description: "Support your favorite artists today"
        },
        {
            image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=1000&auto=format&fit=crop",
            tag: "New Era",
            title: "Next Generation",
            description: "The future of African music is here"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-dark text-white pb-24">
            {/* Header */}
            <div className="flex items-center justify-between p-6 pt-8">
                <Link to="/categories" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                    <LayoutGrid size={24} />
                </Link>
                <h1 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-400">Sanza Music Awards</h1>
                <Link to="/results" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors relative">
                    <Trophy size={24} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-black" />
                </Link>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full relative min-h-[500px] flex flex-col items-center justify-center p-6"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center rounded-3xl overflow-hidden"
                        style={{ backgroundImage: 'url("/hero-bg.png")' }}
                    />

                    {/* Content Overlay */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logo Icon */}
                        <motion.img
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            src="/sanza-logo.png"
                            alt="Sanza Trophy"
                            className="w-32 h-auto mb-4 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                        />

                        {/* Title Text */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-6xl font-bold mb-2 tracking-tight text-primary drop-shadow-lg"
                            style={{ fontFamily: 'serif' }} // Using serif to match the elegant look
                        >
                            Sanza
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl text-primary/90 font-medium mb-8 uppercase tracking-widest drop-shadow-md"
                        >
                            Music Awards
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-white/80 text-xs tracking-[0.3em] uppercase mb-12 font-light"
                        >
                            LÀ OÙ LES ÉTOILES DE LA MUSIQUE BRILLENT
                        </motion.p>

                        <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center gap-2 text-primary/80 text-[10px] font-bold tracking-widest">
                                <span>📞 +237 672 2747 12</span>
                                <span>|</span>
                                <span>✉️ AUGERBIDJANG@GMAIL.COM</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="w-full max-w-xs relative z-20 mt-[-40px]"
                >
                    <Link to="/categories">
                        <Button className="w-full text-sm py-4 rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-black border-none font-bold shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all transform hover:scale-105">
                            Start Voting Now →
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Landing;
