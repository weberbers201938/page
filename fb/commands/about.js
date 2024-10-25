module.exports = {
  description: "What is Cubic Ai?",
  async run({ api, send, admin }){
    await send({
      attachment: {
        type: "image",
        payload: {
          url: "https://ibb.co/PcLbjPJ",
          is_reusable: true
        }
      }
    });
    setTimeout(async () => await send({
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: `🤖 About Cubic Ai:
Cubic Ai is your intelligent and versatile personal assistant.

💡 The name "Cubic Ai" reflects its multifaceted capabilities, designed to assist you in various tasks seamlessly.

❓ If you encounter any issues or have questions regarding the bot, please contact our admins, and we will do our best to assist you. Thank you for choosing me as your personal assistant!`,
          buttons: [
            {
              type: "web_url",
              url: "https://www.facebook.com/profile.php?id=61566907376981",
              title: "Like/Follow our Page"
            },
            {
              type: "web_url",
              url: "https://www.facebook.com/kennethfranciscoaceberos",
              title: "Contact Admin 1"
            },
            {
              type: "web_url",
              url: "https://www.facebook.com/wieginesalpocialechavez",
              title: "Contact Admin 2"
            }
          ]
        }
      }
    }), 2*1000);
  }
}