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
        { id: 1, title: 'Album de l\'année', nominees_count: '10 Nommés', image_url: 'https://images.unsplash.com/photo-1514525253361-bee871871771?q=80&w=1000', featured: true },
        { id: 2, title: 'Chanson de l\'année', nominees_count: '9 Nommés', image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000', featured: false },
        { id: 3, title: 'Enregistrement de l\'année', nominees_count: '8 Nommés', image_url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000', featured: false },
        { id: 4, title: 'Meilleur nouvel artiste', nominees_count: '10 Nommés', image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1000', featured: false },
        { id: 5, title: 'Meilleur clip vidéo', nominees_count: '6 Nommés', image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000', featured: false },
        { id: 6, title: 'Producteur de l\'année', nominees_count: '8 Nommés', image_url: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=1000', featured: false },
        { id: 7, title: 'Meilleure chorégraphie dans un clip', nominees_count: '6 Nommés', image_url: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1000', featured: false },
        { id: 8, title: 'Meilleure direction artistique dans un clip', nominees_count: '6 Nommés', image_url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000', featured: false },
        { id: 9, title: 'Meilleure chanson de rap', nominees_count: '10 Nommés', image_url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000', featured: false },
        { id: 10, title: 'Meilleure performance rap', nominees_count: '8 Nommés', image_url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1000', featured: false },
        { id: 11, title: 'Meilleure collaboration rap/chant', nominees_count: '8 Nommés', image_url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000', featured: false },
        { id: 12, title: 'Meilleure chanson afropop', nominees_count: '10 Nommés', image_url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000', featured: false },
    ],
    nominees: [
        {
            id: 1,
            category_id: 1,
            name: 'Mr Leo',
            song: 'Coeur de Lion',
            votes: 0,
            image_url: '/assets/nominees/album_of_the_year/Coeur_de_Lion_Mr_Leo.jpg',
            tag: null,
            description: 'Nominee in category 1',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 2,
            category_id: 1,
            name: 'Beri Boys Club',
            song: 'Deluxe Vol 1',
            votes: 0,
            image_url: '/assets/nominees/album_of_the_year/Deluxe_Vol_1_Beri_Boys_Club.jpg',
            tag: null,
            description: 'Nominee in category 1',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 3,
            category_id: 1,
            name: 'Lucky+2',
            song: 'Ecouralors',
            votes: 0,
            image_url: '/assets/nominees/album_of_the_year/Ecouralors_Lucky+2.jpg',
            tag: null,
            description: 'Nominee in category 1',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 4,
            category_id: 1,
            name: 'Krys M',
            song: 'Empreinte',
            votes: 0,
            image_url: '/assets/nominees/album_of_the_year/Empreinte_krys_M.jpg',
            tag: null,
            description: 'Nominee in category 1',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 5,
            category_id: 1,
            name: 'Cysoul',
            song: 'Entracte',
            votes: 0,
            image_url: '/assets/nominees/album_of_the_year/Entracte_Cysoul.jpg',
            tag: null,
            description: 'Nominee in category 1',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 6,
            category_id: 1,
            name: 'Dice OMG',
            song: 'Holiday Season',
            votes: 0,
            image_url: '/assets/nominees/album_of_the_year/Holiday_season_Dice_OMG.jpg',
            tag: null,
            description: 'Nominee in category 1',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 7,
            category_id: 1,
            name: 'Nguebo',
            song: 'Le Saint Graal',
            votes: 0,
            image_url: '/assets/nominees/album_of_the_year/Le_Saint_Graal_Nguebo.jpg',
            tag: null,
            description: 'Nominee in category 1',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 8,
            category_id: 1,
            name: 'Phillbill',
            song: 'The Soundman',
            votes: 0,
            image_url: '/assets/nominees/album_of_the_year/The_Soundman_Phillbill.jpg',
            tag: null,
            description: 'Nominee in category 1',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 9,
            category_id: 1,
            name: 'Lady Ponce',
            song: 'Legende',
            votes: 0,
            image_url: '/assets/nominees/album_of_the_year/legende_lady_ponce.jpg',
            tag: null,
            description: 'Nominee in category 1',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 10,
            category_id: 1,
            name: 'Locko',
            song: 'Purple Love',
            votes: 0,
            image_url: '/assets/nominees/album_of_the_year/purple_Love_Locko.jpg',
            tag: null,
            description: 'Nominee in category 1',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 11,
            category_id: 2,
            name: 'King Luca',
            song: 'Fragile',
            votes: 0,
            image_url: '/assets/nominees/song_of_the_year/Fragile_King_Luca.jpg',
            tag: null,
            description: 'Nominee in category 2',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 12,
            category_id: 2,
            name: 'Bad Nova',
            song: 'Hala Madrid',
            votes: 0,
            image_url: '/assets/nominees/song_of_the_year/Hala_Madrid_Bad_Nova.jpg',
            tag: null,
            description: 'Nominee in category 2',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 13,
            category_id: 2,
            name: 'Lady Ponce',
            song: 'Je veux danser',
            votes: 0,
            image_url: '/assets/nominees/song_of_the_year/Je_veux_danser_Lady_Ponce.jpg',
            tag: null,
            description: 'Nominee in category 2',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 14,
            category_id: 2,
            name: 'Cysoul',
            song: 'Koulos',
            votes: 0,
            image_url: '/assets/nominees/song_of_the_year/Koulos_Cysoul.jpg',
            tag: null,
            description: 'Nominee in category 2',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 15,
            category_id: 2,
            name: 'La Chacala ft Yendel',
            song: 'La Vie du Poulet',
            votes: 0,
            image_url: '/assets/nominees/song_of_the_year/La_Vie_du_Poulet_La_Chacala_ft_Yendel.jpg',
            tag: null,
            description: 'Nominee in category 2',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 16,
            category_id: 2,
            name: 'Tchakala VIP',
            song: 'Lo Gout',
            votes: 0,
            image_url: '/assets/nominees/song_of_the_year/Lo_Gout_Tchakala_VIP.jpg',
            tag: null,
            description: 'Nominee in category 2',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 17,
            category_id: 2,
            name: 'Beri Boys Club',
            song: 'On fonctionne',
            votes: 0,
            image_url: '/assets/nominees/song_of_the_year/On_fonctionne_Beri_Boys_Club.jpg',
            tag: null,
            description: 'Nominee in category 2',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 18,
            category_id: 2,
            name: 'Kocee ft KS Bloom',
            song: 'Stranger',
            votes: 0,
            image_url: '/assets/nominees/song_of_the_year/Stranger_Kocee_ft_KS_Bloom.jpg',
            tag: null,
            description: 'Nominee in category 2',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 19,
            category_id: 2,
            name: 'Blacky Star',
            song: 'Tu le sera',
            votes: 0,
            image_url: '/assets/nominees/song_of_the_year/Tu_le_sera_Blacky_Star.jpg',
            tag: null,
            description: 'Nominee in category 2',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 20,
            category_id: 3,
            name: 'Kem\'s On The Beatz',
            song: 'Hala Madrid',
            votes: 0,
            image_url: '/assets/nominees/record_of_the_year/Hala_Madrid_Kem\'s_On_The_Beatz.jpg',
            tag: null,
            description: 'Nominee in category 3',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 21,
            category_id: 3,
            name: 'Kash Maker',
            song: 'Je veux danser',
            votes: 0,
            image_url: '/assets/nominees/record_of_the_year/Je_veux_danser_Kash_Maker.jpg',
            tag: null,
            description: 'Nominee in category 3',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 22,
            category_id: 3,
            name: 'SMJ Abega',
            song: 'La Vie du Poulet',
            votes: 0,
            image_url: '/assets/nominees/record_of_the_year/La_Vie_du_Poulet_SMJ_Abega.jpg',
            tag: null,
            description: 'Nominee in category 3',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 23,
            category_id: 3,
            name: 'LB on the Crack ft Daniel wifi',
            song: 'Leve-tio',
            votes: 0,
            image_url: '/assets/nominees/record_of_the_year/Leve-tio_LB_on_the_Crack_ft_Daniel_wifi.jpg',
            tag: null,
            description: 'Nominee in category 3',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 24,
            category_id: 3,
            name: 'Tchakap by Zeus',
            song: 'Lo Gout',
            votes: 0,
            image_url: '/assets/nominees/record_of_the_year/Lo_Gout_Tchakap_by_Zeus.jpg',
            tag: null,
            description: 'Nominee in category 3',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 25,
            category_id: 3,
            name: 'Ludovic Tchouate',
            song: 'On fonctionne',
            votes: 0,
            image_url: '/assets/nominees/record_of_the_year/On_fonctionne_Ludovic_Tchouate.jpg',
            tag: null,
            description: 'Nominee in category 3',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 26,
            category_id: 3,
            name: 'Smash Laser',
            song: 'Stranger',
            votes: 0,
            image_url: '/assets/nominees/record_of_the_year/Stranger_Smash_Laser.jpg',
            tag: null,
            description: 'Nominee in category 3',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 27,
            category_id: 3,
            name: 'Fento Solo',
            song: 'Tu le seras',
            votes: 0,
            image_url: '/assets/nominees/record_of_the_year/Tu_le_seras_Fento_Solo.jpg',
            tag: null,
            description: 'Nominee in category 3',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 28,
            category_id: 4,
            name: 'Abbo Bayero',
            song: 'Abbo Bayero',
            votes: 0,
            image_url: '/assets/nominees/best_new_artist/Abbo_Bayero.jpg',
            tag: null,
            description: 'Nominee in category 4',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 29,
            category_id: 4,
            name: 'Beri Boys Club',
            song: 'Beri Boys Club',
            votes: 0,
            image_url: '/assets/nominees/best_new_artist/Beri_Boys_Club.jpg',
            tag: null,
            description: 'Nominee in category 4',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 30,
            category_id: 4,
            name: 'Brayan M',
            song: 'Brayan M',
            votes: 0,
            image_url: '/assets/nominees/best_new_artist/Brayan_M.jpg',
            tag: null,
            description: 'Nominee in category 4',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 31,
            category_id: 4,
            name: 'Cabaraiz',
            song: 'Cabaraiz',
            votes: 0,
            image_url: '/assets/nominees/best_new_artist/Cabaraiz.jpg',
            tag: null,
            description: 'Nominee in category 4',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 32,
            category_id: 4,
            name: 'Dice OMG',
            song: 'Dice OMG',
            votes: 0,
            image_url: '/assets/nominees/best_new_artist/Dice_OMG.jpg',
            tag: null,
            description: 'Nominee in category 4',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 33,
            category_id: 4,
            name: 'Ebanga',
            song: 'Ebanga',
            votes: 0,
            image_url: '/assets/nominees/best_new_artist/Ebanga.jpg',
            tag: null,
            description: 'Nominee in category 4',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 34,
            category_id: 4,
            name: 'Genie Solo',
            song: 'Genie Solo',
            votes: 0,
            image_url: '/assets/nominees/best_new_artist/Genie_Solo.jpg',
            tag: null,
            description: 'Nominee in category 4',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 35,
            category_id: 4,
            name: 'King Luca',
            song: 'King Luca',
            votes: 0,
            image_url: '/assets/nominees/best_new_artist/King_Luca.jpg',
            tag: null,
            description: 'Nominee in category 4',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 36,
            category_id: 4,
            name: 'Vidin',
            song: 'Vidin',
            votes: 0,
            image_url: '/assets/nominees/best_new_artist/Vidin.jpg',
            tag: null,
            description: 'Nominee in category 4',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 37,
            category_id: 4,
            name: 'Wizdom Og',
            song: 'Wizdom Og',
            votes: 0,
            image_url: '/assets/nominees/best_new_artist/Wizdom_Og.jpg',
            tag: null,
            description: 'Nominee in category 4',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 38,
            category_id: 5,
            name: 'Adah Akenji',
            song: 'Ennemies',
            votes: 0,
            image_url: '/assets/nominees/best_music_video/Ennemies_Adah_Akenji.jpg',
            tag: null,
            description: 'Nominee in category 5',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 39,
            category_id: 5,
            name: 'H\'arts stories',
            song: 'Hebi',
            votes: 0,
            image_url: '/assets/nominees/best_music_video/Hebi_H\'arts_stories.jpg',
            tag: null,
            description: 'Nominee in category 5',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 40,
            category_id: 5,
            name: 'Adah Akenji',
            song: 'Koulos',
            votes: 0,
            image_url: '/assets/nominees/best_music_video/Koulos_Adah_Akenji.jpg',
            tag: null,
            description: 'Nominee in category 5',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 41,
            category_id: 5,
            name: 'Adah Akenji',
            song: 'Le Temps',
            votes: 0,
            image_url: '/assets/nominees/best_music_video/Le_Temps_Adah_Akenji.jpg',
            tag: null,
            description: 'Nominee in category 5',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 42,
            category_id: 5,
            name: 'Bushboy Films',
            song: 'Stranger',
            votes: 0,
            image_url: '/assets/nominees/best_music_video/Stranger_Bushboy_Films.jpg',
            tag: null,
            description: 'Nominee in category 5',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
        {
            id: 43,
            category_id: 5,
            name: 'Ndukong',
            song: 'Un peu un peu',
            votes: 0,
            image_url: '/assets/nominees/best_music_video/Un_peu_un_peu_Ndukong.jpg',
            tag: null,
            description: 'Nominee in category 5',
            genre: 'AFRO-POP',
            country: '🇨🇲 Cameroon'
        },
    ],
    transactions: [],
};
