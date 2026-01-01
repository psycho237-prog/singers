import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { nominees } from './src/data/mockData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(distDir)) {
    console.error('Dist directory not found. Run build first.');
    process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

nominees.forEach(nominee => {
    const profileDir = path.join(distDir, 'profile', nominee.id.toString());
    fs.mkdirSync(profileDir, { recursive: true });

    let html = template;

    // Prepare content
    const title = `VOTE FOR ${nominee.name.toUpperCase()} - Sanza Music Awards`; // Simplified title
    // Construct absolute image URL (Unsplash URLs are already absolute)
    const image = nominee.image;
    const url = `https://singers-phi.vercel.app/profile/${nominee.id}`;
    // Escape quotes in description just in case
    const description = (nominee.description || `Vote for ${nominee.name}`).replace(/"/g, '&quot;');

    // Helper to replace content attribute of a meta tag
    const replaceMeta = (property, content) => {
        // Matches <meta property="og:title" ... content="..." ... /> or similar, handling multi-line
        const regex = new RegExp(`<meta property="${property}"[^>]*content="[^"]*"[^>]*>`, 'g');
        // We replace implementation with a clean single-line version
        html = html.replace(regex, `<meta property="${property}" content="${content}" />`);
    };

    const replaceName = (name, content) => {
        const regex = new RegExp(`<meta name="${name}"[^>]*content="[^"]*"[^>]*>`, 'g');
        html = html.replace(regex, `<meta name="${name}" content="${content}" />`);
    };

    // Replace Title
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);

    // Replace Meta Tags
    replaceName('title', title);
    // Note: The description in index.html spans multiple lines, so we accept [\s\S]*?
    const descRegexName = /<meta name="description"[\s\S]*?content="[\s\S]*?" \/>/g;
    html = html.replace(descRegexName, `<meta name="description" content="${description}" />`);

    // Open Graph
    replaceMeta('og:title', title);

    const descRegexOg = /<meta property="og:description"[\s\S]*?content="[\s\S]*?" \/>/g;
    html = html.replace(descRegexOg, `<meta property="og:description" content="${description}" />`);

    replaceMeta('og:image', image);
    replaceMeta('og:url', url);

    // Twitter
    replaceMeta('twitter:title', title);

    const descRegexTw = /<meta property="twitter:description"[\s\S]*?content="[\s\S]*?" \/>/g;
    html = html.replace(descRegexTw, `<meta property="twitter:description" content="${description}" />`);

    replaceMeta('twitter:image', image);
    replaceMeta('twitter:url', url);

    fs.writeFileSync(path.join(profileDir, 'index.html'), html);
});

console.log(`Generated static profiles for ${nominees.length} nominees.`);
