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
      if (!link) throw new Error("Unable to retrieve the link.");

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
      
      const videoData = response.data.videos;
      const link240p = videoData.find(video => video.quality.includes("240p"))?.url;
      const link480p = videoData.find(video => video.quality.includes("480p"))?.url;
      const link720p = videoData.find(video => video.quality.includes("720p"))?.url;
      
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

    } catch (error) {
      send("Error while generating your request. Please try again or try another prompt.\n" + error.message || error);
    }
  },

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
      send(`Here is your video in ${quality}!`);
    } else {
      send(`Sorry, the video in ${quality} quality is unavailable.`);
    }
  }
};
