// deno-lint-ignore-file
import { config } from './env.js';

export interface Category {
    id: string | number;
    title: string;
    nominees_count: string;
    image_url: string;
    featured: boolean;
}

export interface Nominee {
    id: string | number;
    category_id: string | number;
    name: string;
    song: string;
    votes: number;
    image_url: string;
    tag: string | null;
    description: string;
    bio?: string;
    genre: string;
    country: string;
    rank?: string;
    listeners?: string;
    votes_display?: string;
}

export interface Transaction {
    id: string | number;
    nominee_id: number;
    nominee_name: string;
    votes_count: number;
    amount: number;
    payment_method: 'MOMO' | 'OM';
    phone_number: string;
    status: 'pending' | 'success' | 'failed' | 'completed';
    payment_ref?: string;
    external_tx_id?: string;
    created_at: string;
    error?: string;
}

// Mock data for seeding Firebase
export const mockData: {
    categories: Category[];
    nominees: Nominee[];
    transactions: Transaction[];
} = {
    categories: [
        { id: 1, title: 'Album of The Year', nominees_count: '10 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: true },
        { id: 2, title: 'Song of The Year', nominees_count: '9 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 3, title: 'Record of The Year', nominees_count: '8 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: false },
        { id: 4, title: 'Best New Artist', nominees_count: '10 Nommés', image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000', featured: false },
        { id: 5, title: 'Best Music Video', nominees_count: '6 Nommés', image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000', featured: false },
        { id: 6, title: 'Producer of The Year', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: false },
        { id: 7, title: 'Best Choregraphy in a Music Video', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000', featured: false },
        { id: 8, title: 'Best Art Direction in a Music Video', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000', featured: false },
        { id: 9, title: 'Best Visual Effects in a Music Video', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000', featured: false },
        { id: 10, title: 'Best Rap Song', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 11, title: 'Best Rap Performance', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000', featured: false },
        { id: 12, title: 'Best Rap/Sung Collab', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000', featured: false },
        { id: 13, title: 'Best Rap Album/Ep', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: false },
        { id: 14, title: 'Best Afropop Song', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 15, title: 'Best Afropop Song by Duo or Group', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 16, title: 'Best Afropop Album/Ep', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: false },
        { id: 17, title: 'Best Bikutsi Song', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 18, title: 'Best Bikutsi Song by Duo or Group', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 19, title: 'Best Bikutsi Album/Ep', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: false },
        { id: 20, title: 'Best Mbole Song', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 21, title: 'Best Mbole Song by Duo or Group', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 22, title: 'Best Makossa Song', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 23, title: 'Best Makossa Song by Duo or Group', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 24, title: 'Best Makossa Album/Ep', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: false },
        { id: 25, title: 'Best Traditional Music Song', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 26, title: 'Best Kpalum Music Song', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 27, title: 'Best Bendskin Song', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 28, title: 'Best Gospel Music Song', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 29, title: 'Best Gospel Music Album/Ep', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: false },
        { id: 30, title: 'Best Contemporary Music Song', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 31, title: 'Best Contemporary Music Album/Ep', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: false },
        { id: 32, title: 'Best Soundtrack for Visual Media', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: false },
        { id: 33, title: 'Best Music Film', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: false },
        { id: 34, title: 'Best Album Cover', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: false },
        { id: 35, title: 'Best Songwriter of The Year', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 36, title: 'Best Diaspora Artist', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000', featured: false },
        { id: 37, title: 'Best Reggae/Dance hall song', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 38, title: 'Best Makune Song', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 39, title: 'Best Live Performance', nominees_count: '0 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: false },
    ],
    nominees: [

    ],
    transactions: [],
};
