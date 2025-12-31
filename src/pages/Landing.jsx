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
                    className="w-full max-w-4xl mx-auto mb-8 shadow-2xl rounded-2xl overflow-hidden border border-white/10"
                >
                    <img
                        src="/sanza-banner.jpg"
                        alt="Sanza Music Awards Banner"
                        className="w-full h-auto object-cover"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="w-full max-w-xs"
                >
                    <Link to="/categories">
                        <Button className="w-full text-sm py-4 rounded-full bg-secondary hover:bg-secondary/90 text-white border-none font-bold shadow-[0_10px_30px_rgba(217,70,239,0.3)]">
                            Start Voting Now →
                        </Button>
                    </Link>
                    <div className="mt-4 flex flex-col items-center gap-2">
                        <p className="text-[9px] text-gray-400 font-bold">+237 672 2747 12 | AUGERBIDJANG@GMAIL.COM</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Landing;
