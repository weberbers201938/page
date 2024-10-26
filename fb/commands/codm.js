const axios = require("axios");
const name = "codm";

module.exports = {
  name,
  description: "fetch random codm video",
  async run({ api, send }) {
    send("This will take a few minutes, please wait...");

    try {
      const response = await axios.get('http://37.114.46.139:6065/codm');
      const url = response.data.url;

      if (!url) throw new Error("No video URL found.");

      await send({
        attachment: {
          type: "video",
          payload: {
            url,
            is_reusable: true
          }
        }
      });
      
      send(`Video created successfully!\nDownload link: ${url}`);
    } catch (error) {
      send("Error while generating your request. Please try again.\n" + (error.message || error));
    }
  }
};
