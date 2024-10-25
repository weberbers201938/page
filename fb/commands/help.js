module.exports = {
  description: "See available commands",
  async run({ api, send }) {
    const quickReplies = api.commands.map((name) => ({
      content_type: "text",
      title: `${api.prefix}${name}`,
      payload: name.toUpperCase()
    }));

    const message = {
      quick_replies: quickReplies,
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "🤖 | Available Commands:\n🔎 | Click a command to see its usage.",
          buttons: [
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
    };

    try {
      send(message);
    } catch (err) {
      send(err.message || err);
    }
  }
};
