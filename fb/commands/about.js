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
              url: "https://www.facebook.com/profile.php?id=61567168155518",
              title: "Cubic Ai Page"
            },
            {
              type: "web_url",
              url: "https://www.facebook.com/learnfromber",
              title: "Facebook"
            },
            {
              type: "web_url",
              url: "https://www.instagram.com/qxr_ber/profilecard/?igsh=MXZqdnV2b3JvemlnOA==",
              title: "Instagram"
            }
          ]
        }
      }
    }), 2*1000);
  }
}
