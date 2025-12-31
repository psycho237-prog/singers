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
                    className="w-full relative min-h-[70vh] flex flex-col items-center justify-center p-6"
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center rounded-3xl overflow-hidden shadow-2xl"
                        style={{ backgroundImage: 'url("/hero-bg-2.jpg")' }}
                    />

                    {/* Content Overlay */}
                    <div className="relative z-10 flex flex-col items-center w-full max-w-4xl pt-8">
                        {/* Logo Icon */}
                        <motion.img
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            src="/sanza-logo-transparent.png"
                            alt="Sanza Trophy"
                            className="w-24 md:w-32 h-auto mb-4 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                        />

                        {/* Title Text */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-8xl font-bold mb-0 tracking-tight drop-shadow-lg text-center bg-gradient-to-b from-[#FFD700] via-[#FDB931] to-[#C49102] bg-clip-text text-transparent"
                            style={{ fontFamily: 'serif' }}
                        >
                            Sanza
                        </motion.h1>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-2xl md:text-5xl font-medium mb-8 uppercase tracking-widest drop-shadow-md text-center bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#C49102] bg-clip-text text-transparent"
                        >
                            Music Awards
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-white/90 text-xs md:text-sm tracking-[0.3em] uppercase mb-12 font-light text-center"
                        >
                            LÀ OÙ LES ÉTOILES DE LA MUSIQUE BRILLENT
                        </motion.p>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col md:flex-row gap-6 items-center mb-16 w-full justify-center"
                        >
                            <Link to="/categories">
                                <button className="px-8 py-4 bg-gradient-to-b from-[#FFD700] via-[#FDB931] to-[#B8860B] text-white font-bold uppercase tracking-wider text-sm rounded-md shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-105 transition-transform min-w-[220px] border border-[#FFD700]/50">
                                    VOTEZ MAINTENANT
                                </button>
                            </Link>
                            <button
                                onClick={() => window.open('https://youtube.com', '_blank')}
                                className="flex items-center gap-3 text-white/90 uppercase text-xs tracking-widest hover:text-white transition-colors group px-6 py-4 border border-white/20 rounded-md hover:bg-white/5"
                            >
                                <span className="w-8 h-8 rounded-full border border-[#FFD700] flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-colors text-[#FFD700]">
                                    ▶
                                </span>
                                REGARDER LA VIDÉO
                            </button>
                        </motion.div>

                        {/* Category Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full px-4 mb-8"
                        >
                            {[
                                { title: "MEILLEUR ARTISTE", subtitle: "MASCULIN" },
                                { title: "MEILLEURE ARTISTE", subtitle: "FÉMININE" },
                                { title: "CHANSON DE", subtitle: "L'ANNÉE" }
                            ].map((card, idx) => (
                                <div key={idx} className="bg-dark/60 backdrop-blur-md border border-primary/30 p-4 text-center hover:bg-primary/10 transition-colors cursor-pointer group rounded-lg relative overflow-hidden">
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <h3 className="text-secondary text-[9px] uppercase tracking-widest mb-1 group-hover:text-white transition-colors">{card.title}</h3>
                                    <p className="text-white font-bold text-sm tracking-widest">{card.subtitle}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Footer Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 flex flex-col items-center gap-3 text-center"
                >
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-primary/60 text-[10px] font-bold tracking-widest">
                        <span className="flex items-center gap-2">📞 +237 672 2747 12</span>
                        <span className="hidden md:block text-primary/20">|</span>
                        <span className="flex items-center gap-2">✉️ AUGERBIDJANG@GMAIL.COM</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Landing;
