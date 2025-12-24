const admin = require('firebase-admin');
const config = require('./env');

let db = null;

try {
    // Check if service account is provided via environment variables
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://studio-3pdzg-default-rtdb.firebaseio.com" // From user config
        });
        db = admin.database(); // Use Realtime Database
        console.log('🔥 Firebase Realtime Database initialized successfully');
    } else {
        console.warn('⚠️ No FIREBASE_SERVICE_ACCOUNT found. Using mock data mode.');
    }
} catch (error) {
    console.error('❌ Firebase initialization failed:', error.message);
}

const getDb = () => db;

module.exports = {
    admin,
    getDb
};
