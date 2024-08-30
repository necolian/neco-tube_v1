const express = require('express');
const path = require('path');
const ytdl = require('ytdl-core');
const cors = require('cors');
const app = express();

const getYoutubeVideoLinks = async (url) => {
    try {
        const info = await ytdl.getInfo(url);
        const formats = info.formats;

        const videoLinks = formats.map(format => ({
            url: format.url,
            quality: format.qualityLabel,
            type: format.mimeType
        }));

        return videoLinks;
    } catch (error) {
        console.error('Error fetching video links:', error);
        return [];
    }
};

// CORS対応
app.use(cors());

// siteディレクトリを静的ファイルとして提供
app.use(express.static('file/site'));

app.get('/dl', (req, res) => {
    const videoURL = req.query.url;
    const quolity = req.query.q;
    const filetype = req.query.ft;

    if (!videoURL) {
        return res.status(400).send('URLが指定されていません');
    }

    const responce = getYoutubeVideoLinks(videoURL);


});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'file/site/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`サーバーがポート${PORT}で動作中`);
});
