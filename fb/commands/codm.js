const axios = require('axios');

module.exports = {
  name: 'codm',
  description: 'Fetch a CODM video link from the API and send it as a video',
  async execute(senderId, args, pageAccessToken, sendMessage) {
    try {
      const response = await axios.get('http://37.114.46.139:6065/codm');
      const videoUrl = response.data.url;

      if (videoUrl) {
        sendMessage(senderId, {
          attachment: {
            type: 'video',
            payload: {
              url: videoUrl,
            },
          },
        }, pageAccessToken);
      } else {
        sendMessage(senderId, { text: 'No video URL found.' }, pageAccessToken);
      }
    } catch (error) {
      console.error('Error fetching CODM video:', error);
      sendMessage(senderId, { text: 'There was an error fetching the video.' }, pageAccessToken);
    }
  },
};
  
