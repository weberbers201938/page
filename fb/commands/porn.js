const axios = require("axios");
const name = "porn";

module.exports = {
  name,
  description: "18+ command",
  async run({ api, send, args }) {
    const prompt = args.join(" ");
    if (!prompt) return send(`Usage: ${api.prefix + name} [your desired prompt]`);

    send("This will take a few minutes, please wait...");
    
    try {
      const link = await axios.get("http://37.114.46.139:6065/api/cronhub", {
        params: { q: prompt }
      });
      if (!link || !link.data || !link.data.link) throw new Error("Unable to retrieve the link.");

      const url = link.data.link;
      const response = await axios.post(
        'https://xxx.xxvid.download/xxx-download/video-info',
        { url: url, platform: 'pornhub' },
        {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36',
            'Referer': 'https://xxvid.download/pornhub-video-downloader'
          }
        }
      );

      const videoData = response.data?.data?.videos;
      if (!videoData || videoData.length === 0) throw new Error("No videos found for the requested prompt.");

      const link240p = videoData.find(video => video.quality.includes("240p"))?.url;
      const link480p = videoData.find(video => video.quality.includes("480p"))?.url;
      const link720p = videoData.find(video => video.quality.includes("720p"))?.url;

      // Send buttons for the user to select video quality
      await send({
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: `${prompt} created successfully! Select your preferred video quality:`,
            buttons: [
              {
                type: "postback",
                title: "240p",
                payload: JSON.stringify({ quality: "240p", url: link240p })
              },
              {
                type: "postback",
                title: "480p",
                payload: JSON.stringify({ quality: "480p", url: link480p })
              },
              {
                type: "postback",
                title: "720p",
                payload: JSON.stringify({ quality: "720p", url: link720p })
              }
            ]
          }
        }
      });

      // Temporarily create commands for 240p, 480p, and 720p
      this.createTemporaryCommands({ send, link240p, link480p, link720p });

    } catch (error) {
      send("Error while generating your request. Please try again or try another prompt.\n" + error.message);
    }
  },

  // Function to handle postback when a quality is selected
  async handlePostback({ send, postback }) {
    const data = JSON.parse(postback.payload);
    const { quality, url } = data;

    if (url) {
      await send({
        attachment: {
          type: "video",
          payload: {
            url: url,
            is_reusable: true
          }
        }
      });
      // Remove temporary commands after the video is sent
      this.removeTemporaryCommands();
    } else {
      send("Sorry, the selected video quality is unavailable.");
    }
  },

  // Function to create temporary commands
  createTemporaryCommands({ send, link240p, link480p, link720p }) {
    const commands = [
      { quality: "240p", url: link240p },
      { quality: "480p", url: link480p },
      { quality: "720p", url: link720p }
    ];

    commands.forEach(({ quality, url }) => {
      this[quality] = async ({ send }) => {
        if (url) {
          await send({
            attachment: {
              type: "video",
              payload: {
                url: url,
                is_reusable: true
              }
            }
          });
          // Remove temporary commands after sending the selected quality
          this.removeTemporaryCommands();
        } else {
          send(`Sorry, the ${quality} quality video is unavailable.`);
        }
      };
    });
  },

  // Function to remove temporary commands after selection
  removeTemporaryCommands() {
    delete this["240p"];
    delete this["480p"];
    delete this["720p"];
  }
};
