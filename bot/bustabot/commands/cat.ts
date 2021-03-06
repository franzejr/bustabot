import telegramCommands = require("../../types/telegram_commands");
import BotCommand from "../../types/bot_command";
import TelegramBot = require("node-telegram-bot-api");

const status = [
    100, 101, 200, 201, 202, 204, 206, 207, 300, 301, 302, 303, 304,
    305, 307, 400, 401, 402, 403, 404, 405, 406, 408, 409, 410, 411,
    412, 413, 414, 415, 416, 417, 418, 420, 421, 422, 423, 424, 425,
    426, 429, 431, 444, 450, 451, 500, 504, 506, 507, 508, 509, 510,
    511, 599
];

class Cat extends BotCommand {
    keys = ["cat"];
    description = "Rolls a dice.";
    execute(key: string, params: string[], message: TelegramBot.Message, data: any): void {
        if (params.length > 2) {
            telegramCommands.sendMessage(
                key,
                message.chat.id,
                message.message_id,
                "Too many parameters.");
        }

        let code: number;
        if (params.length == 2) {
            code = parseInt(params[1]);
        } else {
            code = status[Math.floor(Math.random() * status.length)]
        }

        telegramCommands.sendPhoto(
            key,
            message.chat.id,
            message.message_id,
            `https://http.cat/${code}`);
    }

}

export default new Cat();