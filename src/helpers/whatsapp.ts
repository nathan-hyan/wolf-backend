import fs from "fs";
import { Client, ClientSession } from "whatsapp-web.js";

const SESSION_FILE_PATH = "session.json";

// let rawSession = {};
// let session: ClientSession | undefined = undefined;

// try {
//   rawSession = fs.readFileSync(SESSION_FILE_PATH);
//   session = JSON.parse(String(rawSession));
// } catch (err) {
//   console.log(err.message, "// Creating a new session file...");
// }

let client = new Client({});

const restartServer = () => {
  console.log("❌ >> Attempting to delete the session file");
  
  try {
    fs.unlinkSync(SESSION_FILE_PATH);
    console.log("✅ >> Session file deleted!");
  } catch ({ message }) {
    console.log("❌ >> Error deleting session file >>", message);
  }
  
  
  console.log("💬 >> Restarting WhatsApp Bot.");
  client.destroy();
  client.initialize();
}

    client.on("authenticated", (session) => {
      fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
          console.log("❌ >> WhatsApp client NOT initialized >>", err.message);
        }
      });
    });

    client.on("auth_failure", (msg) => {
      console.log("❌ >> WhatsApp client NOT initialized >>", msg);

      restartServer();
    });

    client.on("qr", (qr) => {
      console.log("🔑 >> QR Code emmited");
    });

    client.on("ready", () => {
      console.log("💬 >> Phone connected");
      console.log("💬 >> WhatsApp client initialized");
    });

    client.on("disconnected", () => {
      console.log("💬 >> Phone disconnected");
      restartServer();
    });

    client.on("message", (msg) => {
      if (msg.body == "!ping") {
        console.log(`💬 >> ${msg.from} wrote !ping`);
        msg.reply(
          "Changed this message because whatsapp will kill me if i continue responding *Hacete culeeeaaarrrrrr*"
        );
      }
      if (msg.body == "nathan") {
        console.log(`💬 >> ${msg.from} wrote nathan`);
        msg.reply("El mas pingudo");
      }
      if (msg.body == "hola") {
        console.log(`💬 >> ${msg.from} wrote hola`);
        msg.reply("Chupame la bola");
      }
    });

client.initialize();

export const sendMessage = (body: string) => {
  client.sendMessage(`549${process.env.WHATSAPP_RECEIPT}@c.us`, body);
};
