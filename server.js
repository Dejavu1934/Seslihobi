const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: { origin: "*" }
});

app.use(express.static('public'));

const botNames = [
  "Zeynep_34", "Ahmet_Kral", "Elif_Sohbet", "Mehmet_1905", "Ayşe_Güzeli",
  "Can_Bey", "Deniz_Yıldız", "Emre_Reis", "Fatma_Sultan", "Gizem_Tatlı",
  "Hakan_Abi", "Irmak_Su", "Kaan_Boss", "Leyla_Mecnun", "Murat_57",
  "Nazlı_Kız", "Okan_Güçlü", "Pınar_Deniz", "Rıza_Baba", "Seda_Nur"
];

const rooms = {
  "Genel Sohbet": [], "Oyun": [], "Müzik": [], "Gece Kuşları": []
};

Object.keys(rooms).forEach(room => {
  for(let i = 0; i < 50; i++) {
    const randomBot = botNames[Math.floor(Math.random() * botNames.length)];
    rooms[room].push({
      id: `bot_${room}_${i}`,
      name: randomBot + "_" + Math.floor(Math.random() * 999),
      isBot: true
    });
  }
});

io.on('connection', (socket) => {
  console.log('Kullanıcı bağlandı');
  
  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    socket.emit('roomUsers', rooms[roomName]);
    
    setInterval(() => {
      if(rooms[roomName].length > 0) {
        const randomBot = rooms[roomName][Math.floor(Math.random() * rooms[roomName].length)];
        const mesajlar = ["slm", "nbr", "iyi akşamlar", "müzik açın", "kim var", "ses ver", "mik açın"];
        io.to(roomName).emit('message', {
          user: randomBot.name,
          text: mesajlar[Math.floor(Math.random() * mesajlar.length)],
          isBot: true
        });
      }
    }, 3000);
  });
  
  socket.on('voice', (data) => {
    socket.to(data.room).emit('voice', data);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Pangi çalışıyor: ${PORT}`));
