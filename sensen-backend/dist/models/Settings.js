"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema for Social Link sub-document
const socialLinkSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true },
}, { _id: false }); // Do not create _id for subdocuments if not needed
// Define the Mongoose schema for Settings
const settingsSchema = new mongoose_1.Schema({
    siteName: { type: String, default: 'Sensen Games' },
    logoUrl: { type: String, default: '/public/images/logo.jpg' }, // Updated default path to public folder
    iconUrl: { type: String, default: '/public/images/icon.png' }, // Default icon path
    primaryColor: { type: String, default: '#3B82F6' }, // Example: blue-500 from Tailwind
    secondaryColor: { type: String, default: '#10B981' }, // Example: emerald-500 from Tailwind
    fontFamily: { type: String, default: 'sans-serif' },
    generalTextColor: { type: String, default: '#333333' },
    pageBackgroundColor: { type: String, default: '#ffffff' },
    generalBackgroundColor: { type: String, default: '#f0f0f0' },
    headerBackgroundColor: { type: String, default: '#ffffff' },
    footerBackgroundColor: { type: String, default: '#ffffff' },
    homepageTitle: { type: String, default: 'Experimente a próxima geração de jogos' },
    catalogPageTitle: { type: String, default: 'Nosso Catálogo de Jogos Incríveis' },
    homepageFeaturedSectionTitle: { type: String, default: 'TÍTULOS EM DESTAQUE' },
    // homepageFeaturedSectionImageUrl: { type: String, default: '' }, // Removed
    homepageAboutUsTitle: { type: String, default: 'ALIMENTANDO AVENTURA E IMAGINAÇÃO' },
    homepageAboutUsText: {
        type: String,
        default: 'Somos dois irmãos que jogam juntos desde as eras do Super Nintendo e PlayStation 1 & 2. Jogávamos as séries Megaman X, Castlevania SotN, Super Metroid, Aero Fighters, Guitar Hero e outros clássicos o dia todo naquela época! Depois de alguns anos trabalhando como programador web e web designer, decidimos começar a fazer jogos no estilo que amamos jogar: desafiadores e divertidos!'
    },
    aboutUsImageUrl: { type: String, default: '' }, // Default
    mailingListImageUrl: { type: String, default: '' }, // New default for mailing list image
    homepageMailingListTitle: { type: String, default: 'ENTRE PARA NOSSA LISTA DE E-MAILS' },
    socialLinks: {
        type: [socialLinkSchema],
        default: [
            { name: 'Facebook', url: 'https://fb.com/sensengames', icon: 'FaFacebook' },
            { name: 'Twitter', url: 'https://x.com/sensengames', icon: 'FaTwitter' },
            { name: 'Instagram', url: 'https://instagram.com/sensengames', icon: 'FaInstagram' },
            { name: 'Steam', url: 'https://store.steampowered.com/developer/sensengames', icon: 'FaSteam' },
            { name: 'Bluesky', url: 'https://bsky.app/profile/sensengames.com', icon: 'BlueskyIcon' },
        ],
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});
// Create and export the Settings model
const Settings = (0, mongoose_1.model)('Settings', settingsSchema);
exports.default = Settings;
