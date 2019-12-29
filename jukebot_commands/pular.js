const telegramCommands = require("../bot_core/telegram_commands");
const jb = require("../bot_core/jukebot_common");

module.exports = {
    keys: ["pular"],
    description: "Pular (também com confirmação)",
    execute: function (key, params, req) {
        let chatId = req.message.chat.id;

        let sendMessage = function (message) {
            telegramCommands.sendMessage(
                key,
                chatId,
                req.message.message_id,
                message);
        }

        let document = data.doc(jb.docName + chatId);
        document.get()
            .then(doc => {
                let data = {
                    pool: [],
                    next: ""
                }
                if (doc.exists) {
                    data = doc.data();
                }

                let previous = data.next;

                if (data.pool.length > 0) {
                    let index = Math.floor(Math.random() * data.pool.length);
                    data.next = data.pool[index];
                    data.pool.splice(index, 1);
                    document.set(data);
                } else {
                    if (data.next != "") {
                        data.next = "";
                        document.set(data);
                    }
                }

                let msg = "Usuário " + previous + " pulado.\n";
                msg += "Próximo: @" + data.next + "\n";
                msg += "Em seguida: \n";
                for (let i = 0; i < data.pool.length; i++) {
                    msg += data.pool[i] + "\n";
                }
                sendMessage(msg);
            })
            .catch(err => {
                console.log("Error getting document", err);
            })
    }
}