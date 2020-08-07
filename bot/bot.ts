import TelegramBot = require("node-telegram-bot-api");
import BotInfoEntry from "./types/bot_info_entry";
import BotCommand from "./types/bot_command";

const statisticsDocumentName = "statistics";

class Bot {
    alias: string;

    constructor(alias: string, commands: Array<BotCommand>) {
        this.alias = alias;
    }

    init(botInfo: BotInfoEntry, isProd: boolean) {
        let options: TelegramBot.ConstructorOptions = isProd ? {} : {
            polling: true
        }

        var bot = new TelegramBot(botInfo.token, options);

        bot.onText(/\/echo (.+)/, function onEchoText(msg, match) {
            const resp = match[1];
            bot.sendMessage(msg.chat.id, resp);
        });

        bot.on('message', (msg) => {
            const chatId = msg.chat.id;

            // send a message to the chat acknowledging receipt of their message
            bot.sendMessage(chatId, 'Received your message');
        });
    }
}

//     // Used to print the /help command.
//     printHelpCommand(key: string, _params: Array<string>, message: TelegramBot.Message, _data: any) {
//         console.log("Logging Help!");

//         let helpString = `<b>${this.botName} Help:</b>\n`;
//         for (let i in this.commands) {
//             let command = this.commands[i];
//             if (command.wip) {
//                 continue;
//             }
//             helpString += `/${command.keys[0]} - ${command.description}\n`;
//         }

//         telegramCommands.sendMessage(
//             key,
//             message.chat.id,
//             message.message_id,
//             helpString);
//     }

//     //  Prints the command list using /getcom. Used to configure the bot auto completion list.
//     printCommandList(key: string, _params: Array<string>, message: TelegramBot.Message, _data: any) {
//         console.log("Logging Command list!");

//         let comString = "help - Mostra a lista de comandos do bot.\n";
//         for (let i in this.commands) {
//             let command = this.commands[i];
//             comString += `${command.keys[0]} - ${command.description}\n`;
//         }

//         telegramCommands.sendMessage(
//             key,
//             message.chat.id,
//             message.message_id,
//             comString);
//     }

//     incrementCommandStatistics(data: { doc: (arg0: string) => any; }, command: string) {
//         let document = data.doc(statisticsDocumentName);
//         document.get()
//             .then((doc: { exists: any; data: () => any; }) => {
//                 if (!doc.exists) {
//                     console.log("Document not set. Creating empty one.")
//                     document.set({
//                         total: 0
//                     });
//                 } else {
//                     let totalKey = "total";
//                     let commandKey = `command_${command}`;

//                     let statistics = doc.data();
//                     statistics[totalKey] = (totalKey in statistics) ? (statistics[totalKey] + 1) : 1;
//                     statistics[commandKey] = (commandKey in statistics) ? (statistics[commandKey]) + 1 : 1;

//                     console.log(`Updating statistics for command ${command}`);
//                     console.log(statistics);

//                     document.set(statistics);
//                 }
//             })
//             .catch(err => {
//                 console.log("Error getting document", err);
//             })
//     }

//     // Initializes the bot internal state
//     init(db: any, botInfo: BotInfoEntry) {
//         if (botInfo === undefined) {
//             console.log("Bot info undefined. Skipping.")
//             return;
//         }
//         this.botName = "@" + botInfo.name;
//         this.botKey = botInfo.token;

//         this.data = db.collection(`${this.botAlias}_data`);
//         this.initialized = true;
//         console.log(`Initializing Bot ${this.botAlias}`);
//     };

//     // The handler for the bot requests made by telegram webhook.
//     handleTelegramMessage(message: TelegramBot.Message) {
//         // Ensure the message contains body
//         if (!message || !message.text) {
//             return;
//         }
//         let text = message.text;

//         // And the message is a bot command
//         if (!text.startsWith("/")) {
//             return;
//         }

//         // And it is a somewhat valid command
//         let splitText = text.split(/\s+/);
//         if (!splitText) return;
//         let key = splitText[0];
//         if (key == null || key == "") return;

//         // And that command is not directed to another bot
//         splitText[0] = key = key.substring(1, key.endsWith(this.botName) ? key.length - this.botName.length : key.length)

//         // Not a valid command or directed to another bot
//         if (!(key in this.commandMap)) {
//             return;
//         }

//         console.log("Command accepted: " + key);

//         this.incrementCommandStatistics(this.data, key);

//         // Call the command
//         // Thanks @Danisson for figuring out.
//         // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
//         let command = this.commandMap[key].bind(this);
//         command(this.botKey, splitText, message, this.data);
//     };

//     setWebhook(url: string) {
//         if (!this.initialized) return;
//         telegramCommands.setWebhook(url, this.botKey, this.botName);
//     }

//     getUpdates(timeout: number) {
//         if (!this.initialized) return;
//         telegramCommands.getUpdates(this.botKey, this.lastUpdate, timeout, this);
//     }

//     setLastUpdate(update: number) {
//         this.lastUpdate = Math.max(this.lastUpdate, update + 1);
//     }
// }

export default Bot;