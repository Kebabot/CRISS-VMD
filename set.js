const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUI0Rm44eklBK2lMbFk2dmdYS2VtTGJ4NElXUVhtZGJaL3JqMHNKdk5XWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVRIMGdqWkVTTERCWTJUR204MVBsVE9NVXZ0WmtqRStKVGh3N3dNQzRUOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1Rm4yYjFqdUZEeU12dkNvNlFVZnhzVEs5UEJOME4rajFaaDhuc1VLOFhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTlJVN3hMOTk3bk5WdGpFWjhvam9VS1BwcEJyZWZ4QkczTG42dFdjL21ZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllCbWpwVi9hcitYeG41eEN4dHpydmlDazFsTDBvcDk0M2NSaml4VzVhVlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im04NmxRM0ozRDNCcEovTWtoeC9Hd0tkV0h2WjVyNGxrOFAwSi96Qk1ubDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUURhSTFMM3p4TmthSGxVcjBtekQyZko1ZlNzWFVtS0lsM2VpTGd5VVdWaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0d1YmJDZHVqYmVlbUJhU2UzbHdxWnBiOVE4SFVlVUlqM1phN1lrNUlCUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpabjFJeEFiaWpONEVmSG5MT1owNWpvTGtzZE5QWnE5eWFLbUZpeG8rNUZoT1FuNllHU2RmMkpLZXdEcUhoSG1HajlpdG9ReEtJalluMEhIU0J1aEJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQsImFkdlNlY3JldEtleSI6InZwRHJFem1xSmF0SnF0ZXZ0aHF1VHFBM3g0TTZicEtTNVJuM2c5d3RTNjA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlM5eVhYdV9CUVYtbS1DTUxOQlk4T2ciLCJwaG9uZUlkIjoiM2NiZGI3ZWUtYTdjMC00ZjM5LThlZTAtMTBmYzkxZDM2ZjY1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InA2dHBmazc5Z0MxYURBOFJHU2ZaRkFZN3FNbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOVTJvYURLL1ZtblZNVTVia0xBQXNkcUREeW89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiTlZYRDJSS0MiLCJtZSI6eyJpZCI6IjkxODc5ODg3OTUyNDo3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuS4reWciyBjaG9vdSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3o3bzhJSEVMR2lpcjRHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZWg1ZEJMMS80SFMwUHpXSGNOVzJwSUxmNFQxM2lEZW10RmFaT3lSWUZRWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoidmpiQjYzb3I5cU9ZTWJiZE5oUmJsU1FJcjViT3hrZHpkM09hcXN0ZEFPbGl2TFJYcHlRdXBleExQUXRxSExvcFc2cE5PMzB3bkJrc1hwMXZNSUc3QXc9PSIsImRldmljZVNpZ25hdHVyZSI6ImlCQktQM3ROWC9XSlZJU0xBRVR4V3ZYTjhDdEF5Z3NodHNEbkhlZm85cTMwbnY4RWpnNmJZQVJoYXdEcExyWElxNGUxUkk2RldPZVhMUWNRbGtMRUNRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE4Nzk4ODc5NTI0OjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWG9lWFFTOWYrQjB0RDgxaDNEVnRxU0MzK0U5ZDRnM3ByUldtVHNrV0JVRyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MDgwNDQxNH0=',
    PREFIXE: process.env.PREFIX || "/",
    OWNER_NAME: process.env.OWNER_NAME || "𝐂𝐑𝐈𝐒𝐒 𝐕𝐄𝐕𝐎",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255687068672",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'ᴅᴜʟʟᴀʜ-xᴍᴅ v²',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hhwdau.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                 ANTIDELETE3 : process.env.ANTIDELETE2 || 'yes',
                  CRISS_CHATBOT : process.env.DULLAH_CHATBOT || 'yes',
                
    ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'yes',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'no',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'no',
                  AUTO_BIO : process.env.AUTO_BIO || 'no',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
