const telegramCommands = require('../bot_core/telegram_commands');

var status = [
    100,101,200,201,202,204,206,207,300,301,302,303,304,
    305,307,400,401,402,403,404,405,406,408,409,410,411,
    412,413,414,415,416,417,418,420,421,422,423,424,425,
    426,429,431,444,450,451,500,504,506,507,508,509,510,
    511,599
];

module.exports = {
    keys: ["cat"],
    description: "Rolls a dice.",
    execute: function (params, req) {
        if(params.length > 2){
            telegramCommands.sendMessage(
                req.message.chat.id,
                "Too many parameters.");
        }

        if(params.length==2){
            code = parseInt(params[1]);
        }else{
            code = status[Math.floor(Math.random()*status.length)]
        }

        telegramCommands.sendPhoto(
            req.message.chat.id,
            "https://http.cat/"+code);
    }
}