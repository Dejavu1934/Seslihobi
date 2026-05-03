const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

io.on('connection', (socket) => {
  console.log('Kullanıcı bağlandı:', socket.id);
  
  socket.on('giris', (data) => {
    console.log('Giriş yapan:', data.nickname, data.gender);
    socket.nickname = data.nickname;
    socket.gender = data.gender;
    socket.emit('giris_basarili');
  });
  
  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı:', socket.nickname);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log('Sunucu çalışıyor: ' + PORT);
});
