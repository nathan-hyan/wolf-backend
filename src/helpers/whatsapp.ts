import fs from 'fs';
import {Client} from 'whatsapp-web.js';

const SESSION_FILE_PATH = 'session.json';

const rawSession = fs.readFileSync(SESSION_FILE_PATH);

const client = new Client({
    session: JSON.parse(String(rawSession))
});

client.on('authenticated', (session) => {
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

client.on('qr', (qr) => {console.log('qr received', qr)})

client.on('ready', () => {
    console.log('💬 >> WhatsApp client initialized')
})

client.on('message', msg => {
    if (msg.body == '!ping') {
        console.log(`${msg.from} wrote !ping`)
        msg.reply('Changed this message because whatsapp will kill me if i continue responding *Hacete culeeeaaarrrrrr*');
    }
    if (msg.body == 'nathan') {
        console.log(`${msg.from} wrote nathan`)
        msg.reply('El mas pingudo');
    }
    if (msg.body == 'hola') {
        console.log(`${msg.from} wrote hola`)
        msg.reply('Chupame la bola');
    }
});

export const sendMessage = (body: string) => {
    client.sendMessage(`549${process.env.WHATSAPP_RECEIPT}@c.us`, body)
}

client.initialize();