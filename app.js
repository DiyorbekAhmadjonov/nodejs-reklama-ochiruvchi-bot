const TelegramBot = require("node-telegram-bot-api");

const token = '5615018594:AAHcIOB20-QBqohjjK3I2brAQrNL8HxgycI';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const text = "‎Salom👋\nMan ozbekcha va arabcha reklamalarni, ssilkalani guruhlarda ochirib beraman👨🏻‍✈ \n\nMan ishlashim uchun guruhizga qoshib admin berishiz kerak😄"

  
 await bot.sendMessage(chatId, text, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "👨🏻‍✈ Guruhga qo'shish",
            url: "https://t.me/ReklamaOchirishBot?startgroup=new"
          }
        ]
      ]
    }
  });
});

async function deleteads(entitys,chatId,msgId) {
    is_admin = await bot.getChatMember(chatId,fromId).then((data)=>{
   return data.status;
  });
    if (entitys!=undefined && is_admin != 'creator' && is_admin != 'administrator') {
    if (entitys) {
        for (var i=0; i<entitys.length; i++) {
            entity = entitys[i].type;
            const ads_list = ['text_mention','text_link','mention','url'];
            if (ads_list.indexOf(entity) > -1) {
            try {
            await bot.deleteMessage(chatId, msgId);
            } catch (err) {
                console.log("Error: " + err);
            }
            }
        }
        }else if (captions_entitys) {
        for (var i=0; i<captions_entitys.length; i++) {
            entity = captions_entitys[i].type;
            const ads_list = ['text_mention','text_link','mention','url'];
            if (ads_list.indexOf(entity) > -1) {
            try {
            await bot.deleteMessage(chatId, msgId);
            } catch (err) {
                console.log("Error: " + err);
            }
            }
            
        }
        }
    }
}

bot.on('message',async (msg) => {
 const type=msg.chat.type;
 if (type=='group' || type=='supergroup') {
  entitys=msg.entities;
  captions_entitys=msg.caption_entities
  chatId = msg.chat.id;
  fromId = msg.from.id;
  if (entitys){
    await deleteads(entitys,chatId,msg.message_id);
  }else if (captions_entitys){
    await deleteads(captions_entitys,chatId,msg.message_id);
  }
 }

});
bot.on('edited_message',async (msg) => {
 const type=msg.chat.type;
 if (type=='group' || type=='supergroup') {
  entitys=msg.entities;
  captions_entitys=msg.caption_entities
  chatId = msg.chat.id;
  fromId = msg.from.id;
  if (entitys){
    await deleteads(entitys,chatId,msg.message_id);
  }else if (captions_entitys){
    await deleteads(captions_entitys,chatId,msg.message_id);
  }
 }

});
