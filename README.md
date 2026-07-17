<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Chat</title>
<script src='https://cdn.scaledrone.com/scaledrone.min.js'></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Arial;background:#0a0a0a;color:#fff;height:100vh;display:flex;flex-direction:column}
#login{padding:20px;text-align:center;margin:auto}
input,select,button{width:100%;padding:12px;margin:8px 0;border-radius:8px;border:none;font-size:16px}
button{background:#ff2d55;color:#fff;font-weight:bold}
#chat{display:none;flex:1;flex-direction:column}
#msgs{flex:1;overflow-y:auto;padding:10px}
.msg{margin:8px 0;padding:10px;border-radius:10px;max-width:70%}
.m{margin-left:auto;background:#ff2d55}
.o{background:#2c2c2e}
.sys{text-align:center;color:#888;font-size:12px}
#send{display:flex;padding:10px;background:#1c1c1e}
#txt{flex:1;margin-right:8px;background:#2c2c2e;color:#fff}
</style>
</head>
<body>
<div id="login">
<h2>Sohbete Gir</h2>
<input id="nick" placeholder="Nickname">
<select id="gender"><option>Erkek</option><option>Kadın</option></select>
<button onclick="join()">Giriş</button>
</div>
<div id="chat">
<div id="msgs"></div>
<div id="send">
<input id="txt" placeholder="Mesaj yaz..." onkeypress="if(event.key==='Enter')sendMsg()">
<button onclick="sendMsg()">Gönder</button>
</div>
</div>
<script>
let drone,nick,gender;
function join(){
nick=document.getElementById('nick').value.trim();
gender=document.getElementById('gender').value;
if(!nick)return alert('Nick yaz');
document.getElementById('login').style.display='none';
document.getElementById('chat').style.display='flex';
drone=new ScaleDrone('4QNsOLybISnHy3Ze'); //Public kanal
drone.on('open',e=>{if(e) return console.error(e)});
const room=drone.subscribe('observable-chat');
room.on('message',m=>addMsg(m.data));
room.on('members',(m)=>addSys(m.length+' kişi online'));
}
function sendMsg(){
let t=document.getElementById('txt');
if(!t.value.trim())return;
drone.publish({room:'observable-chat',message:{nick,gender,text:t.value,type:'msg'}});
t.value='';
}
function addMsg(d){
let div=document.createElement('div');
div.className='msg '+(d.nick===nick?'m':'o');
div.innerHTML=`<b>${d.nick} ${d.gender==='Erkek'?'♂':'♀'}</b><br>${d.text}`;
document.getElementById('msgs').appendChild(div);
document.getElementById('msgs').scrollTop=1e9;
}
function addSys(t){
let div=document.createElement('div');
div.className='sys';div.textContent=t;
document.getElementById('msgs').appendChild(div);
}
</script>
</body>
</html>cd /var/www/seslihobi/public && cat > sohbet.html << 'SON'
<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"><title>SesliHobi</title><script src="/socket.io/socket.io.js"></script><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial;background:#e8e0d8 url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" opacity="0.05"><g fill="none" stroke="%23000" stroke-width="1.5"><rect x="30" y="30" width="50" height="35" rx="4"/><circle cx="120" cy="47" r="15"/><rect x="170" y="32" width="60" height="30" rx="3"/><path d="M60 110h80v50h-80z"/><circle cx="180" cy="135" r="20"/><rect x="230" y="120" width="50" height="35"/><path d="M35 200l25-20 25 20-25 20z"/><rect x="110" y="200" width="55" height="30" rx="4"/><circle cx="210" cy="215" r="22"/><rect x="30" y="270" width="45" height="25"/><circle cx="115" cy="282" r="14"/><path d="M160 260h70v40h-70z"/></g></svg>');height:100vh;display:flex;flex-direction:column;overflow:hidden}.bar{background:#2196F3;color:white;padding:12px 16px;font-size:18px;display:flex;justify-content:space-between;align-items:center;position:relative;flex-shrink:0;z-index:400}.bar::after{content:'';position:absolute;bottom:0;left:0;width:95px;height:3px;background:white;transition:all 0.3s}#odaAdi{cursor:pointer;padding:2px 4px;border-radius:4px}.sag{display:flex;gap:22px;align-items:center;font-size:24px}.sag span{cursor:pointer;opacity:0.7;position:relative;padding:4px;transition:all 0.2s}.sag span.aktif{opacity:1;border-bottom:3px solid white}.sayi{position:absolute;background:#fff;color:#000;font-size:11px;padding:1px 5px;border-radius:3px;top:-4px;right:-8px;font-weight:bold;border:1px solid #2196F3}.sayfa{flex:1;display:none;flex-direction:column;overflow:hidden}.sayfa.aktif{display:flex}.kisiTab{background:white;padding:12px 16px;display:flex;justify-content:center;border-bottom:1px solid #eee}.tabKutu{display:flex;background:#e0e0e0;border-radius:25px;overflow:hidden;width:100%;max-width:360px}.tabBtn{flex:1;padding:10px 12px;border:none;background:transparent;font-size:15px;font-weight:600;color:#2196F3;cursor:pointer;white-space:nowrap}.tabBtn.aktif{background:#2196F3;color:white}.arama{padding:10px 16px;background:white;border-bottom:1px solid #ddd;display:flex;align-items:center;gap:10px}.arama input{flex:1;border:none;outline:none;font-size:15px;background:#f5f5f5;padding:10px 16px;border-radius:22px}.panelIcerik{flex:1;overflow-y:auto;background:white}.kisiItem{display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid #f0f0f0}.kisiItem:active{background:#f5f5f5}.avatar{width:48px;height:48px;border-radius:50%;background:#e3f2fd;margin-right:14px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}.avatar svg{width:26px;height:26px;fill:#2196F3}.avatar img{width:100%;height:100%;object-fit:cover}.kisiBilgi{flex:1}.kisiAd{font-size:16px;font-weight:500;color:#212121}.kisiStatu{font-size:14px;color:#757575;margin-top:3px}.panelSol{position:fixed;left:-100%;top:0;width:75%;height:100%;background:#f5f5f5;transition:all 0.3s;z-index:500;box-shadow:2px 0 10px rgba(0,0,0,0.3)}.panelSol.acik{left:0}.panelBaslik{background:#2196F3;color:white;padding:12px 16px;font-size:18px;display:flex;align-items:center;gap:12px}.geriBtn{font-size:24px;cursor:pointer;font-weight:bold}.odaSatir{display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid #eee;background:white}.odaSatir:active{background:#f0f0f0}.odaSatir.aktif.odaAd{color:#2196F3;font-weight:600}.kalp{font-size:22px;color:#bbb;margin-right:12px}.odaAd{flex:1;font-size:16px}.odaBadge{background:#2196F3;color:white;font-size:12px;padding:2px 7px;border-radius:4px;margin-right:8px;font-weight:bold;min-width:18px;text-align:center}.kilit{color:#2196F3;font-size:18px;margin-right:8px}.okIkon{color:#999;font-size:18px}.mikAlan{padding:16px 0 45px;position:relative;flex-shrink:0}.mikKutu{margin:0 4px;display:flex;justify-content:space-between;align-items:flex-start}.mikItem{display:flex;flex-direction:column;align-items:center;gap:3px;z-index:5}.mik{width:48px;height:48px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.3);cursor:pointer}.mik svg{width:22px;height:22px;fill:#2196F3}.mik.aktif{background:#4CAF50}.mik.aktif svg{fill:white}.mikYazi{font-size:10px;color:#666;font-weight:500}.ok{position:absolute;top:95px;width:40px;height:50px;background:white;display:flex;align-items:center;justify-content:center;font-size:24px;color:#2196F3;box-shadow:0 3px 8px rgba(0,0,0,0.3);cursor:pointer;font-weight:bold;z-index:40}.ok.sol{left:0;border-radius:0 25px 25px 0;padding-left:6px}.ok.sag{right:0;border-radius:25px 0 0 25px;padding-right:6px}.bildirim{position:absolute;top:-4px;right:-4px;background:#2196F3;color:white;font-size:10px;min-width:16px;height:16px;padding:0 4px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-weight:bold;border:2px solid white}.kural{background:white;padding:6px 18px;border-radius:18px;text-align:center;margin:35px auto 10px;width:130px;box-shadow:0 2px 5px rgba(0,0,0,0.15);font-size:13px}.mesajAlan{flex:1;padding:12px 8px 140px;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;justify-content:flex-start}.msgSatir{display:flex;margin-bottom:12px;align-items:flex-end;gap:6px;padding:0 4px}.msgSatir.benim{justify-content:flex-end}.msgAvatar{width:36px;height:36px;border-radius:50%;background:#e3f2fd;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}.msgAvatar svg{width:20px;height:20px;fill:#2196F3}.msgAvatar img{width:100%;height:100%;object-fit:cover}.msg{max-width:75%;padding:7px 10px 18px 10px;border-radius:12px;font-size:15px;word-wrap:break-word;box-shadow:0 1px 2px rgba(0,0,0,0.15);position:relative;min-width:60px}.msg.sol{background:#f1f1f1;color:#000;border-bottom-left-radius:4px;margin-left:6px}.msg.sol::before{content:'';position:absolute;left:-6px;bottom:0;width:0;height:0;border-style:solid;border-width:0 6px 0;border-color:transparent #f1f1f1 transparent transparent}.msg.sag{background:#d9fdd3;color:#000;border-bottom-right-radius:4px;margin-right:6px}.msg.sag::after{content:'';position:absolute;right:-6px;bottom:0;width:0;height:0;border-style:solid;border-width:0 0 6px 6px;border-color:transparent transparent #d9fdd3 transparent}.msgNick{font-size:13px;font-weight:600;margin-bottom:2px;color:#2196F3;display:block;width:100%}.msgText{line-height:1.4;padding-bottom:2px;display:block;width:100%}.msgSaat{position:absolute;bottom:4px;right:8px;font-size:11px;color:#7a7a}.msg.sag.msgSaat{color:#4a4a4a}.msg.sistem{align-self:center;background:#fff3cd;color:#856404;font-style:italic;max-width:90%;text-align:center;border-radius:12px;padding:6px 12px}.msg.sistem::before,.msg.sistem::after{display:none}.altBar{position:fixed;bottom:0;left:0;right:0;background:white;padding:8px 10px;display:flex;gap:8px;align-items:center;border-top:1px solid #ddd;z-index:100}.altBar input{flex:1;padding:11px 16px;border:none;border-radius:22px;background:#f5f5;font-size:15px;outline:none}.altBar button{width:36px;height:36px;border:none;background:none;font-size:24px;cursor:pointer;color:#666;display:flex;align-items:center;justify-content:center}.gonder{color:#2196F3!important;font-weight:bold}.hediye{position:fixed;bottom:78px;right:14px;width:54px;height:54px;background:#616161;border-radius:50%;border:none;box-shadow:0 4px 12px rgba(0,0,0,0.4);z-index:50;display:flex;align-items:center;justify-content:center}</style></head><body><div class="bar"><span id="odaAdi" onclick="sayfaGec('sohbet')">Boş oda</span><div class="sag"><span id="tabKisi" onclick="sayfaGec('kisiler')">👥<span class="sayi" id="kisiSayisi">0</span></span><span id="tabMesaj" onclick="sayfaGec('mesajlar')">💬</span><span id="tabAra" onclick="sayfaGec('arama')">📞</span><span id="tabAyar" onclick="sayfaGec('ayarlar')">⚙️</span></div></div>

<!-- SOHBET SAYFASI -->
<div class="sayfa aktif" id="sayfaSohbet">
<div class="panelSol" id="panelSol"><div class="panelBaslik"><span class="geriBtn" onclick="panelKapat('sol')">←</span><span style="display:flex;align-items:center;gap:8px"><span style="font-size:22px">♡</span><span>Odalar</span></span></div><div class="arama"><span>🔍</span><input type="text" placeholder="Ara..." id="odaAra" oninput="odaFiltre()"></div><div class="panelIcerik" id="odaListesi"></div></div>
<div class="mikAlan"><div class="ok sol" onclick="panelAc('sol')">›</div><div class="mikKutu">
<div class="mikItem"><div class="mik" onclick="this.classList.toggle('aktif')"><svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3S9 3.34 9 5v6c0 1.66 1.34 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg></div><div class="mikYazi">Mikrofon</div></div>
<div class="mikItem"><div class="mik" onclick="this.classList.toggle('aktif')"><svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg></div><div class="mikYazi">Mikrofon</div></div>
<div class="mikItem"><div class="mik" onclick="this.classList.toggle('aktif')"><svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg></div><div class="mikYazi">Mikrofon</div></div>
<div class="mikItem"><div class="mik" onclick="this.classList.toggle('aktif')"><svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg></div><div class="mikYazi">Mikrofon</div></div>
<div class="mikItem"><div class="mik" onclick="this.classList.toggle('aktif')"><svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg></div><div class="mikYazi">Mikrofon</div></div>
</div><div class="ok sag" onclick="sayfaGec('kisiler')"><span class="bildirim" id="odaBildirim">0</span>‹</div><div class="kural">Oda Kuralı</div></div>
<div class="mesajAlan" id="mesajAlan"></div>
<button class="hediye"><svg viewBox="0 0 24 24"><path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0.35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1.45 1 1s-.45 1-1-.45-1-1.45-1 1-1zM9 4c.55 0 1.45 1 1s-.45 1-1-.45-1-1.45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 9 11 10.75l1.5-2 1.5 2L16.38 9 18 10.83 15.92 12H20v2z"/></svg></button>
<div class="altBar"><button>😊</button><input id="yazi" placeholder="Mesaj..." onkeypress="if(event.key=='Enter')gonder()"><button>📷</button><button>📻</button><button class="gonder" onclick="gonder()">➤</button></div>
</div>

<!-- KİŞİLER SAYFASI -->
<div class="sayfa" id="sayfaKisiler">
<div class="kisiTab"><div class="tabKutu"><button class="tabBtn aktif" onclick="tabDegistir('herkes')">Herkes (<span id="odaKisiSayi">0</span>)</button><button class="tabBtn" onclick="tabDegistir('favori')">Favorilerim</button><button class="tabBtn" onclick="tabDegistir('arkadas')">Arkadaşlarım</button></div></div>
<div class="arama"><span>🔍</span><input type="text" placeholder="Tüm kişilerde ara..." id="kisiAra" oninput="kisiFiltre()"></div>
<div class="panelIcerik" id="kisiListesi"></div>
</div>

<!-- MESAJLAR SAYFASI -->
<div class="sayfa" id="sayfaMesajlar">
<div style="padding:40px;text-align:center;color:#999">Mesajlar sayfası</div>
</div>

<!-- ARAMA SAYFASI -->
<div class="sayfa" id="sayfaArama">
<div style="padding:40px;text-align:center;color:#999">Arama sayfası</div>
</div>

<!-- AYARLAR SAYFASI -->
<div class="sayfa" id="sayfaAyarlar">
<div style="padding:40px;text-align:center;color:#999">Ayarlar sayfası</div>
</div>

<script>
let nick=localStorage.nick;
if(!nick||nick=="undefined"||nick=="null"){nick=prompt("Nick yaz:")||"Misafir";localStorage.nick=nick}
let socket=io();let odaIndex=0;let kisiler=[];let tumKisiler=[];let odalar=[];let odaKisiSayi=0;let aktifTab='herkes';let aktifSayfa='sohbet';

socket.emit('odaGir',{oda:odaIndex,nick});

socket.on('toplamGuncelle',s=>{document.getElementById("kisiSayisi").innerText=s});

socket.on('odaBilgi',d=>{
  odalar=d.odalar;odaIndex=d.odaIndex;kisiler=d.kisiler||[];tumKisiler=[...kisiler];odaKisiSayi=d.odaKisi||0;
  document.getElementById("odaAdi").innerText=odalar[odaIndex].ad;
  sayiGuncelle();
  if(d.girisMesaj)sistemMesaj(d.girisMesaj);
  setTimeout(()=>{document.getElementById("mesajAlan").scrollTop=9e9},100);
});

socket.on('kisiGirdi',d=>{
  if(!tumKisiler.find(k=>k.ad==d.nick)){
    tumKisiler.push({ad:d.nick,statu:"Üye"});
    kisiler.push({ad:d.nick,statu:"Üye"});
  }
  odaKisiSayi=d.odaKisi;
  sayiGuncelle();
  sistemMesaj(d.nick+" odaya giriş yaptı");
  kisiListele();
});

socket.on('kisiCikti',d=>{
  tumKisiler=tumKisiler.filter(k=>k.ad!=d.nick);
  kisiler=kisiler.filter(k=>k.ad!=d.nick);
  odaKisiSayi=d.odaKisi;
  sayiGuncelle();
  sistemMesaj(d.nick+" odadan ayrıldı");
  kisiListele();
});

socket.on('mesaj',d=>{
  let benim=d.nick==nick;
  let satir=document.createElement("div");
  satir.className="msgSatir"+(benim?" benim":"");

  let saat=new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'});

  if(!benim){
    let avatar=document.createElement("div");
    avatar.className="msgAvatar";
    avatar.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4 1.79-4 4 1.79 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
    satir.appendChild(avatar);
  }

  let m=document.createElement("div");
  m.className="msg "+(benim?"sag":"sol");
  if(benim){
    m.innerHTML=`<span class="msgText">${d.mesaj}</span><span class="msgSaat">${saat}</span>`;
  }else{
    m.innerHTML=`<span class="msgNick">${d.nick}</span><span class="msgText">${d.mesaj}</span><span class="msgSaat">${saat}</span>`;
  }
  satir.appendChild(m);

  if(benim){
    let avatar=document.createElement("div");
    avatar.className="msgAvatar";
    avatar.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
    satir.appendChild(avatar);
  }

  document.getElementById("mesajAlan").appendChild(satir);
  setTimeout(()=>{document.getElementById("mesajAlan").scrollTop=9e9},50);
});

function sayiGuncelle(){
  document.getElementById("odaKisiSayi").innerText=odaKisiSayi;
  document.getElementById("odaBildirim").innerText=odaKisiSayi;
  document.getElementById("odaBildirim").style.display="flex";
  document.getElementById("kisiSayisi").innerText=odaKisiSayi;
}

function sayfaGec(s){
  document.querySelectorAll('.sayfa').forEach(p=>p.classList.remove('aktif'));
  document.querySelectorAll('.sag span').forEach(i=>i.classList.remove('aktif'));
  aktifSayfa=s;
  if(s=='sohbet')document.getElementById('sayfaSohbet').classList.add('aktif');
  else if(s=='kisiler'){document.getElementById('sayfaKisiler').classList.add('aktif');document.getElementById('tabKisi').classList.add('aktif');kisiListele()}
  else if(s=='mesajlar'){document.getElementById('sayfaMesajlar').classList.add('aktif');document.getElementById('tabMesaj').classList.add('aktif')}
  else if(s=='arama'){document.getElementById('sayfaArama').classList.add('aktif');document.getElementById('tabAra').classList.add('aktif')}
  else if(s=='ayarlar'){document.getElementById('sayfaAyarlar').classList.add('aktif');document.getElementById('tabAyar').classList.add('aktif')}
}

function panelAc(yon){
  document.getElementById("panelSol").classList.remove("acik");
  if(yon=="sol"){odaListele();document.getElementById("panelSol").classList.add("acik")}
}
function panelKapat(yon){document.getElementById("panel"+yon.charAt(0).toUpperCase()+yon.slice(1)).classList.remove("acik")}

function tabDegistir(t){
  aktifTab=t;
  document.querySelectorAll('.tabBtn').forEach(b=>b.classList.remove('aktif'));
  event.target.classList.add('aktif');
  kisiListele();
}
function kisiListele(){
  let h="";
  let liste=[];
  if(aktifTab=='herkes') liste=tumKisiler;
  else if(aktifTab=='favori') liste=[];
  else liste=[];
  liste.forEach(k=>{
    h+=`<div class="kisiItem"><div class="avatar"><svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4 1.79-4 4 1.79 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div><div class="kisiBilgi"><div class="kisiAd">${k.ad}</div><div class="kisiStatu">${k.statu}</div></div></div>`;
  });
  document.getElementById("kisiListesi").innerHTML=h||'<div style="padding:20px;text-align:center;color:#999">Kişi yok</div>';
}
function kisiFiltre(){let v=document.getElementById("kisiAra").value.toLowerCase();let f=tumKisiler.filter(k=>k.ad.toLowerCase().includes(v));let h="";f.forEach(k=>{h+=`<div class="kisiItem"><div class="avatar"><svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div><div class="kisiBilgi"><div class="kisiAd">${k.ad}</div><div class="kisiStatu">${k.statu}</div></div>`});document.getElementById("kisiListesi").innerHTML=h}
function odaListele(){let h="";odalar.forEach((o,i)=>{let badge=o.kisi>0?`<span class="odaBadge">${o.kisi}</span>`:'';let kilit=o.kilit?'<span class="kilit">🔒</span>':'';h+=`<div class="odaSatir ${i==odaIndex?'aktif':''}" onclick="odaGec(${i})"><span class="kalp">♡</span><span class="odaAd">${o.ad}</span>${kilit}${badge}<span class="okIkon">›</span></div>`});document.getElementById("odaListesi").innerHTML=h}
function odaFiltre(){let v=document.getElementById("odaAra").value.toLowerCase();let f=odalar.filter(o=>o.ad.toLowerCase().includes(v));let h="";f.forEach((o,i)=>{let badge=o.kisi>0?`<span class="odaBadge">${o.kisi}</span>`:'';let kilit=o.kilit?'<span class="kilit">🔒</span>':'';h+=`<div class="odaSatir ${o.ad==odalar[odaIndex].ad?'aktif':''}" onclick="odaGec(${odalar.indexOf(o)})"><span class="kalp">♡</span><span class="odaAd">${o.ad}</span>${kilit}${badge}<span class="okIkon">›</span></div>`});document.getElementById("odaListesi").innerHTML=h}
function odaGec(i){if(odalar[i].kilit){alert("Bu oda kilitli");return}socket.emit('odaDegistir',{oda:i});panelKapat('sol')}
function sistemMesaj(m){
  let satir=document.createElement("div");
  satir.className="msgSatir";
  satir.style.justifyContent="center";
  let d=document.createElement("div");
  d.className="msg sistem";
  d.innerText="* "+m;
  satir.appendChild(d);
  document.getElementById("mesajAlan").appendChild(satir);
  setTimeout(()=>{document.getElementById("mesajAlan").scrollTop=9e9},50);
}
function gonder(){let t=document.getElementById("yazi");if(t.value.trim()){socket.emit('mesaj',{mesaj:t.value,nick});t.value="";document.getElementById("yazi").focus()}}
</script></body></html>
SON
pm2 restart allcd /var/www/seslihobi/public && cat > sohbet.html << 'SON'
<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no"><title>SesliHobi</title><script src="/socket.io/socket.io.js"></script><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial;background:#e8e0d8 url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" opacity="0.05"><g fill="none" stroke="%23000" stroke-width="1.5"><rect x="30" y="30" width="50" height="35" rx="4"/><circle cx="120" cy="47" r="15"/><rect x="170" y="32" width="60" height="30" rx="3"/><path d="M60 110h80v50h-80z"/><circle cx="180" cy="135" r="20"/><rect x="230" y="120" width="50" height="35"/><path d="M35 200l25-20 25 20-25 20z"/><rect x="110" y="200" width="55" height="30" rx="4"/><circle cx="210" cy="215" r="22"/><rect x="30" y="270" width="45" height="25"/><circle cx="115" cy="282" r="14"/><path d="M160 260h70v40h-70z"/></g></svg>');height:100vh;display:flex;flex-direction:column;overflow:hidden}.bar{background:#2196F3;color:white;padding:12px 16px;font-size:18px;display:flex;justify-content:space-between;align-items:center;position:relative;flex-shrink:0;z-index:400}.bar::after{content:'';position:absolute;bottom:0;left:0;width:95px;height:3px;background:white;transition:all 0.3s}#odaAdi{cursor:pointer;padding:2px 4px;border-radius:4px}.sag{display:flex;gap:22px;align-items:center;font-size:24px}.sag span{cursor:pointer;opacity:0.7;position:relative;padding:4px;transition:all 0.2s}.sag span.aktif{opacity:1;border-bottom:3px solid white}.sayi{position:absolute;background:#fff;color:#000;font-size:11px;padding:1px 5px;border-radius:3px;top:-4px;right:-8px;font-weight:bold;border:1px solid #2196F3}.sayfa{flex:1;display:none;flex-direction:column;overflow:hidden}.sayfa.aktif{display:flex}.kisiTab{background:white;padding:12px 16px;display:flex;justify-content:center;border-bottom:1px solid #eee}.tabKutu{display:flex;background:#e0e0e0;border-radius:25px;overflow:hidden;width:100%;max-width:360px}.tabBtn{flex:1;padding:10px 12px;border:none;background:transparent;font-size:15px;font-weight:600;color:#2196F3;cursor:pointer;white-space:nowrap}.tabBtn.aktif{background:#2196F3;color:white}.arama{padding:10px 16px;background:white;border-bottom:1px solid #ddd;display:flex;align-items:center;gap:10px}.arama input{flex:1;border:none;outline:none;font-size:15px;background:#f5f5f5;padding:10px 16px;border-radius:22px}.panelIcerik{flex:1;overflow-y:auto;background:white}.kisiItem{display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid #f0f0f0}.kisiItem:active{background:#f5f5f5}.avatar{width:48px;height:48px;border-radius:50%;background:#e3f2fd;margin-right:14px;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0}.avatar svg{width:26px;height:26px;fill:#2196F3}.avatar img{width:100%;height:100%;object-fit:cover}.kisiBilgi{flex:1}.kisiAd{font-size:16px;font-weight:500;color:#212121}.kisiStatu{font-size:14px;color:#757575;margin-top:3px}.panelSol{position:fixed;left:-100%;top:0;width:75%;height:100%;background:#f5f5f5;transition:all 0.3s;z-index:500;box-shadow:2px 0 10px rgba(0,0,0,0.3)}.panelSol.acik{left:0}.panelBaslik{background:#2196F3;color:white;padding:12px 16px;font-size:18px;display:flex;align-items:center;gap:12px}.geriBtn{font-size:24px;cursor:pointer;font-weight:bold}.odaSatir{display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid #eee;background:white}.odaSatir:active{background:#f0f0f0}.odaSatir.aktif.odaAd{color:#2196F3;font-weight:600}.kalp{font-size:22px;color:#bbb;margin-right:12px}.odaAd{flex:1;font-size:16px}.odaBadge{background:#2196F3;color:white;font-size:12px;padding:2px 7px;border-radius:4px;margin-right:8px;font-weight:bold;min-width:18px;text-align:center}.kilit{color:#2196F3;font-size:18px;margin-right:8px}.okIkon{color:#999;font-size:18px}.mikAlan{padding:16px 0 45px;position:relative;flex-shrink:0}.mikKutu{margin:0 4px;display:flex;justify-content:space-between;align-items:flex-start}.mikItem{display:flex;flex-direction:column;align-items:center;gap:3px;z-index:5}.mik{width:48px;height:48px;background:white;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.3);cursor:pointer}.mik svg{width:22px;height:22px;fill:#2196F3}.mik.aktif{background:#4CAF50}.mik.aktif svg{fill:white}.mikYazi{font-size:10px;color:#666;font-weight:500}.ok{position:absolute;top:95px;width:40px;height:50px;background:white;display:flex;align-items:center;justify-content:center;font-size:24px;color:#2196F3;box-shadow:0 3px 8px rgba(0,0,0,0.3);cursor:pointer;font-weight:bold;z-index:40}.ok.sol{left:0;border-radius:0 25px 25px 0;padding-left:6px}.ok.sag{right:0;border-radius:25px 0 0 25px;padding-right:6px}.bildirim{position:absolute;top:-4px;right:-4px;background:#2196F3;color:white;font-size:10px;min-width:16px;height:16px;padding:0 4px;border-radius:3px;display:flex;align-items:center;justify-content:center;font-weight:bold;border:2px solid white}.kural{background:white;padding:6px 18px;border-radius:18px;text-align:center;margin:35px auto 10px;width:130px;box-shadow:0 2px 5px rgba(0,0,0,0.15);font-size:13px}.mesajAlan{flex:1;padding:12px 8px 140px;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column;justify-content:flex-start}.msgSatir{display:flex;margin-bottom:12px;align-items:flex-end;gap:6px;padding:0 4px}.msgSatir.benim{justify-content:flex-end}.msgAvatar{width:36px;height:36px;border-radius:50%;background:#e3f2fd;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}.msgAvatar svg{width:20px;height:20px;fill:#2196F3}.msgAvatar img{width:100%;height:100%;object-fit:cover}.msg{max-width:75%;padding:7px 10px 18px 10px;border-radius:12px;font-size:15px;word-wrap:break-word;box-shadow:0 1px 2px rgba(0,0,0,0.15);position:relative;min-width:60px}.msg.sol{background:#f1f1f1;color:#000;border-bottom-left-radius:4px;margin-left:6px}.msg.sol::before{content:'';position:absolute;left:-6px;bottom:0;width:0;height:0;border-style:solid;border-width:0 6px 0;border-color:transparent #f1f1f1 transparent transparent}.msg.sag{background:#d9fdd3;color:#000;border-bottom-right-radius:4px;margin-right:6px}.msg.sag::after{content:'';position:absolute;right:-6px;bottom:0;width:0;height:0;border-style:solid;border-width:0 0 6px 6px;border-color:transparent transparent #d9fdd3 transparent}.msgNick{font-size:13px;font-weight:600;margin-bottom:2px;color:#2196F3;display:block;width:100%}.msgText{line-height:1.4;padding-bottom:2px;display:block;width:100%}.msgSaat{position:absolute;bottom:4px;right:8px;font-size:11px;color:#7a7a}.msg.sag.msgSaat{color:#4a4a4a}.msg.sistem{align-self:center;background:#fff3cd;color:#856404;font-style:italic;max-width:90%;text-align:center;border-radius:12px;padding:6px 12px}.msg.sistem::before,.msg.sistem::after{display:none}.altBar{position:fixed;bottom:0;left:0;right:0;background:white;padding:8px 10px;display:flex;gap:8px;align-items:center;border-top:1px solid #ddd;z-index:100}.altBar input{flex:1;padding:11px 16px;border:none;border-radius:22px;background:#f5f5;font-size:15px;outline:none}.altBar button{width:36px;height:36px;border:none;background:none;font-size:24px;cursor:pointer;color:#666;display:flex;align-items:center;justify-content:center}.gonder{color:#2196F3!important;font-weight:bold}.hediye{position:fixed;bottom:78px;right:14px;width:54px;height:54px;background:#616161;border-radius:50%;border:none;box-shadow:0 4px 12px rgba(0,0,0,0.4);z-index:50;display:flex;align-items:center;justify-content:center}</style></head><body><div class="bar"><span id="odaAdi" onclick="sayfaGec('sohbet')">Boş oda</span><div class="sag"><span id="tabKisi" onclick="sayfaGec('kisiler')">👥<span class="sayi" id="kisiSayisi">0</span></span><span id="tabMesaj" onclick="sayfaGec('mesajlar')">💬</span><span id="tabAra" onclick="sayfaGec('arama')">📞</span><span id="tabAyar" onclick="sayfaGec('ayarlar')">⚙️</span></div></div>

<!-- SOHBET SAYFASI -->
<div class="sayfa aktif" id="sayfaSohbet">
<div class="panelSol" id="panelSol"><div class="panelBaslik"><span class="geriBtn" onclick="panelKapat('sol')">←</span><span style="display:flex;align-items:center;gap:8px"><span style="font-size:22px">♡</span><span>Odalar</span></span></div><div class="arama"><span>🔍</span><input type="text" placeholder="Ara..." id="odaAra" oninput="odaFiltre()"></div><div class="panelIcerik" id="odaListesi"></div></div>
<div class="mikAlan"><div class="ok sol" onclick="panelAc('sol')">›</div><div class="mikKutu">
<div class="mikItem"><div class="mik" onclick="this.classList.toggle('aktif')"><svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3S9 3.34 9 5v6c0 1.66 1.34 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg></div><div class="mikYazi">Mikrofon</div></div>
<div class="mikItem"><div class="mik" onclick="this.classList.toggle('aktif')"><svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg></div><div class="mikYazi">Mikrofon</div></div>
<div class="mikItem"><div class="mik" onclick="this.classList.toggle('aktif')"><svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg></div><div class="mikYazi">Mikrofon</div></div>
<div class="mikItem"><div class="mik" onclick="this.classList.toggle('aktif')"><svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg></div><div class="mikYazi">Mikrofon</div></div>
<div class="mikItem"><div class="mik" onclick="this.classList.toggle('aktif')"><svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/></svg></div><div class="mikYazi">Mikrofon</div></div>
</div><div class="ok sag" onclick="sayfaGec('kisiler')"><span class="bildirim" id="odaBildirim">0</span>‹</div><div class="kural">Oda Kuralı</div></div>
<div class="mesajAlan" id="mesajAlan"></div>
<button class="hediye"><svg viewBox="0 0 24 24"><path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0.35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1.45 1 1s-.45 1-1-.45-1-1.45-1 1-1zM9 4c.55 0 1.45 1 1s-.45 1-1-.45-1-1.45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 9 11 10.75l1.5-2 1.5 2L16.38 9 18 10.83 15.92 12H20v2z"/></svg></button>
<div class="altBar"><button>😊</button><input id="yazi" placeholder="Mesaj..." onkeypress="if(event.key=='Enter')gonder()"><button>📷</button><button>📻</button><button class="gonder" onclick="gonder()">➤</button></div>
</div>

<!-- KİŞİLER SAYFASI -->
<div class="sayfa" id="sayfaKisiler">
<div class="kisiTab"><div class="tabKutu"><button class="tabBtn aktif" onclick="tabDegistir('herkes')">Herkes (<span id="odaKisiSayi">0</span>)</button><button class="tabBtn" onclick="tabDegistir('favori')">Favorilerim</button><button class="tabBtn" onclick="tabDegistir('arkadas')">Arkadaşlarım</button></div></div>
<div class="arama"><span>🔍</span><input type="text" placeholder="Tüm kişilerde ara..." id="kisiAra" oninput="kisiFiltre()"></div>
<div class="panelIcerik" id="kisiListesi"></div>
</div>

<!-- MESAJLAR SAYFASI -->
<div class="sayfa" id="sayfaMesajlar">
<div style="padding:40px;text-align:center;color:#999">Mesajlar sayfası</div>
</div>

<!-- ARAMA SAYFASI -->
<div class="sayfa" id="sayfaArama">
<div style="padding:40px;text-align:center;color:#999">Arama sayfası</div>
</div>

<!-- AYARLAR SAYFASI -->
<div class="sayfa" id="sayfaAyarlar">
<div style="padding:40px;text-align:center;color:#999">Ayarlar sayfası</div>
</div>

<script>
let nick=localStorage.nick;
if(!nick||nick=="undefined"||nick=="null"){nick=prompt("Nick yaz:")||"Misafir";localStorage.nick=nick}
let socket=io();let odaIndex=0;let kisiler=[];let tumKisiler=[];let odalar=[];let odaKisiSayi=0;let aktifTab='herkes';let aktifSayfa='sohbet';

socket.emit('odaGir',{oda:odaIndex,nick});

socket.on('toplamGuncelle',s=>{document.getElementById("kisiSayisi").innerText=s});

socket.on('odaBilgi',d=>{
  odalar=d.odalar;odaIndex=d.odaIndex;kisiler=d.kisiler||[];tumKisiler=[...kisiler];odaKisiSayi=d.odaKisi||0;
  document.getElementById("odaAdi").innerText=odalar[odaIndex].ad;
  sayiGuncelle();
  if(d.girisMesaj)sistemMesaj(d.girisMesaj);
  setTimeout(()=>{document.getElementById("mesajAlan").scrollTop=9e9},100);
});

socket.on('kisiGirdi',d=>{
  if(!tumKisiler.find(k=>k.ad==d.nick)){
    tumKisiler.push({ad:d.nick,statu:"Üye"});
    kisiler.push({ad:d.nick,statu:"Üye"});
  }
  odaKisiSayi=d.odaKisi;
  sayiGuncelle();
  sistemMesaj(d.nick+" odaya giriş yaptı");
  kisiListele();
});

socket.on('kisiCikti',d=>{
  tumKisiler=tumKisiler.filter(k=>k.ad!=d.nick);
  kisiler=kisiler.filter(k=>k.ad!=d.nick);
  odaKisiSayi=d.odaKisi;
  sayiGuncelle();
  sistemMesaj(d.nick+" odadan ayrıldı");
  kisiListele();
});

socket.on('mesaj',d=>{
  let benim=d.nick==nick;
  let satir=document.createElement("div");
  satir.className="msgSatir"+(benim?" benim":"");

  let saat=new Date().toLocaleTimeString('tr-TR',{hour:'2-digit',minute:'2-digit'});

  if(!benim){
    let avatar=document.createElement("div");
    avatar.className="msgAvatar";
    avatar.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4 1.79-4 4 1.79 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
    satir.appendChild(avatar);
  }

  let m=document.createElement("div");
  m.className="msg "+(benim?"sag":"sol");
  if(benim){
    m.innerHTML=`<span class="msgText">${d.mesaj}</span><span class="msgSaat">${saat}</span>`;
  }else{
    m.innerHTML=`<span class="msgNick">${d.nick}</span><span class="msgText">${d.mesaj}</span><span class="msgSaat">${saat}</span>`;
  }
  satir.appendChild(m);

  if(benim){
    let avatar=document.createElement("div");
    avatar.className="msgAvatar";
    avatar.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
    satir.appendChild(avatar);
  }

  document.getElementById("mesajAlan").appendChild(satir);
  setTimeout(()=>{document.getElementById("mesajAlan").scrollTop=9e9},50);
});

function sayiGuncelle(){
  document.getElementById("odaKisiSayi").innerText=odaKisiSayi;
  document.getElementById("odaBildirim").innerText=odaKisiSayi;
  document.getElementById("odaBildirim").style.display="flex";
  document.getElementById("kisiSayisi").innerText=odaKisiSayi;
}

function sayfaGec(s){
  document.querySelectorAll('.sayfa').forEach(p=>p.classList.remove('aktif'));
  document.querySelectorAll('.sag span').forEach(i=>i.classList.remove('aktif'));
  aktifSayfa=s;
  if(s=='sohbet')document.getElementById('sayfaSohbet').classList.add('aktif');
  else if(s=='kisiler'){document.getElementById('sayfaKisiler').classList.add('aktif');document.getElementById('tabKisi').classList.add('aktif');kisiListele()}
  else if(s=='mesajlar'){document.getElementById('sayfaMesajlar').classList.add('aktif');document.getElementById('tabMesaj').classList.add('aktif')}
  else if(s=='arama'){document.getElementById('sayfaArama').classList.add('aktif');document.getElementById('tabAra').classList.add('aktif')}
  else if(s=='ayarlar'){document.getElementById('sayfaAyarlar').classList.add('aktif');document.getElementById('tabAyar').classList.add('aktif')}
}

function panelAc(yon){
  document.getElementById("panelSol").classList.remove("acik");
  if(yon=="sol"){odaListele();document.getElementById("panelSol").classList.add("acik")}
}
function panelKapat(yon){document.getElementById("panel"+yon.charAt(0).toUpperCase()+yon.slice(1)).classList.remove("acik")}

function tabDegistir(t){
  aktifTab=t;
  document.querySelectorAll('.tabBtn').forEach(b=>b.classList.remove('aktif'));
  event.target.classList.add('aktif');
  kisiListele();
}
function kisiListele(){
  let h="";
  let liste=[];
  if(aktifTab=='herkes') liste=tumKisiler;
  else if(aktifTab=='favori') liste=[];
  else liste=[];
  liste.forEach(k=>{
    h+=`<div class="kisiItem"><div class="avatar"><svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4 1.79-4 4 1.79 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div><div class="kisiBilgi"><div class="kisiAd">${k.ad}</div><div class="kisiStatu">${k.statu}</div></div></div>`;
  });
  document.getElementById("kisiListesi").innerHTML=h||'<div style="padding:20px;text-align:center;color:#999">Kişi yok</div>';
}
function kisiFiltre(){let v=document.getElementById("kisiAra").value.toLowerCase();let f=tumKisiler.filter(k=>k.ad.toLowerCase().includes(v));let h="";f.forEach(k=>{h+=`<div class="kisiItem"><div class="avatar"><svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div><div class="kisiBilgi"><div class="kisiAd">${k.ad}</div><div class="kisiStatu">${k.statu}</div></div>`});document.getElementById("kisiListesi").innerHTML=h}
function odaListele(){let h="";odalar.forEach((o,i)=>{let badge=o.kisi>0?`<span class="odaBadge">${o.kisi}</span>`:'';let kilit=o.kilit?'<span class="kilit">🔒</span>':'';h+=`<div class="odaSatir ${i==odaIndex?'aktif':''}" onclick="odaGec(${i})"><span class="kalp">♡</span><span class="odaAd">${o.ad}</span>${kilit}${badge}<span class="okIkon">›</span></div>`});document.getElementById("odaListesi").innerHTML=h}
function odaFiltre(){let v=document.getElementById("odaAra").value.toLowerCase();let f=odalar.filter(o=>o.ad.toLowerCase().includes(v));let h="";f.forEach((o,i)=>{let badge=o.kisi>0?`<span class="odaBadge">${o.kisi}</span>`:'';let kilit=o.kilit?'<span class="kilit">🔒</span>':'';h+=`<div class="odaSatir ${o.ad==odalar[odaIndex].ad?'aktif':''}" onclick="odaGec(${odalar.indexOf(o)})"><span class="kalp">♡</span><span class="odaAd">${o.ad}</span>${kilit}${badge}<span class="okIkon">›</span></div>`});document.getElementById("odaListesi").innerHTML=h}
function odaGec(i){if(odalar[i].kilit){alert("Bu oda kilitli");return}socket.emit('odaDegistir',{oda:i});panelKapat('sol')}
function sistemMesaj(m){
  let satir=document.createElement("div");
  satir.className="msgSatir";
  satir.style.justifyContent="center";
  let d=document.createElement("div");
  d.className="msg sistem";
  d.innerText="* "+m;
  satir.appendChild(d);
  document.getElementById("mesajAlan").appendChild(satir);
  setTimeout(()=>{document.getElementById("mesajAlan").scrollTop=9e9},50);
}
function gonder(){let t=document.getElementById("yazi");if(t.value.trim()){socket.emit('mesaj',{mesaj:t.value,nick});t.value="";document.getElementById("yazi").focus()}}
</script></body></html>
SON
pm2 restart allcat > public/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>SesliHobi</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        * { margin:0; padding:0; box-sizing:border-box; font-family:Arial; }
        html, body { background:#e8e0d8; height:100%; overflow:hidden; }
        .girisEkrani { display:flex; align-items:flex-start; justify-content:center; height:100vh; background:#f5f1ed; padding-top:60px; }
        .girisKutu { background:#fff; padding:20px 18px; border-radius:12px; width:90%; max-width:320px; box-shadow:0 4px 15px rgba(0,0,0,0.1); }
        .logoBaslik { text-align:center; color:#666; font-size:15px; margin-bottom:18px; position:relative; }
        .logoBaslik::before, .logoBaslik::after { content:''; position:absolute; top:50%; width:28%; height:1px; background:#ddd; }
        .logoBaslik::before { left:0; }
        .logoBaslik::after { right:0; }
        .nickSatir { display:flex; border:2px solid #2196F3; border-radius:8px; overflow:hidden; margin-bottom:12px; }
        .nickSatir input { flex:1; padding:11px; border:none; outline:none; font-size:15px; }
        .nickSatir .shLogo { background:#2196F3; color:#fff; width:48px; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:17px; }
        .cinsiyet { display:flex; background:#e0e0e0; border-radius:8px; overflow:hidden; margin-bottom:12px; }
        .cinsiyet button { flex:1; padding:11px; border:none; background:transparent; cursor:pointer; font-size:15px; color:#555; }
        .cinsiyet button.aktif { background:#bdbdbd; color:#000; font-weight:bold; }
        .baglanBtn { width:100%; padding:13px; background:#FFC107; color:#333; border:none; border-radius:25px; font-size:17px; font-weight:bold; cursor:pointer; margin-bottom:15px; }
        .altLinkler { display:flex; justify-content:space-around; font-size:14px; font-weight:600; color:#555; border-top:1px solid #eee; padding-top:14px; }
        .altLinkler span { cursor:pointer; }
        .modal { display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:9999; }
        .modalIcerik { background:#fff; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:85%; max-width:400px; border-radius:16px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.3); }
        .modalBaslik { font-size:22px; font-weight:bold; text-align:center; padding:20px 20px 15px; color:#333; }
        .modalMetinKutu { max-height:350px; overflow-y:auto; padding:0 20px 20px; margin-right:8px; }
        .modalMetin { font-size:14px; line-height:1.7; color:#333; white-space:pre-wrap; }
        .modalButon { width:100%; padding:16px; background:#9C7AFF; color:#fff; border:none; font-size:16px; font-weight:bold; cursor:pointer; border-radius:0 0 16px 16px; }
        .anaEkran { display:none; height:100vh; flex-direction:column; background:#e8e0d8 url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" opacity="0.08"><g fill="%23999"><path d="M20 20h10v10H20zM40 20h10v10H40zM60 20h10v10H60z"/><path d="M15 40c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5-2.2-5-5zm30 0c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5-2.2-5-5z"/><circle cx="25" cy="70" r="8"/><circle cx="55" cy="70" r="8"/></g></svg>'); }
        .odaBar { background:#2196F3; color:white; padding:12px 15px; display:flex; align-items:center; gap:15px; position:relative; }
        .odaBar .odaIsim { font-size:17px; font-weight:bold; }
        .odaBar .ortaBos { flex:1; }
        .odaBar .iconlar { display:flex; gap:18px; align-items:center; }
        .odaBar .kisiSayi { display:flex; align-items:center; gap:5px; background:#fff; color:#2196F3; padding:3px 8px; border-radius:4px; font-size:13px; font-weight:bold; cursor:pointer; }
        .odaBar .iconBtn { font-size:20px; cursor:pointer; }
        .odaBar::after { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:#fff; width:80px; }
        .micAlani { padding:15px 8px 5px; display:flex; justify-content:space-around; }
        .micSlot { display:flex; flex-direction:column; align-items:center; gap:4px; }
        .micSlot .micBtn { width:58px; height:58px; border-radius:50%; background:#fff; border:none; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(0,0,0,0.2); cursor:pointer; }
        .micSlot .micBtn i { color:#2196F3; font-size:24px; }
        .micSlot .micYazi { font-size:11px; color:#fff; text-shadow:0 1px 2px rgba(0,0,0,0.3); }
        .odaKurali { display:flex; justify-content:center; margin-top:5px; }
        .odaKurali span { background:#fff; padding:7px 18px; border-radius:15px; font-size:13px; color:#555; box-shadow:0 2px 5px rgba(0,0,0,0.15); cursor:pointer; }
        .yanOk { position:fixed; top:50%; transform:translateY(-50%); background:#fff; width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 10px rgba(0,0,0,0.25); cursor:pointer; z-index:100; }
        .yanOk.sol { left:8px; }
        .yanOk.sag { right:8px; }
        .yanOk i { color:#2196F3; font-size:22px; }
        .yanOk .badge { position:absolute; top:-4px; right:-4px; background:#2196F3; color:#fff; font-size:11px; padding:2px 6px; border-radius:10px; font-weight:bold; min-width:18px; text-align:center; }
        .ortaAlan { flex:1; overflow-y:auto; padding-bottom:50px; }
        .altBar { background:#fff; padding:8px 10px; display:flex; align-items:center; gap:12px; border-top:1px solid #ddd; }
        .altBar .emojiBtn { font-size:24px; color:#666; cursor:pointer; }
        .altBar .mesajInput { flex:1; display:flex; align-items:center; }
        .altBar .mesajInput input { flex:1; border:none; background:none; outline:none; font-size:16px; color:#333; }
        .altBar .mesajInput input::placeholder { color:#999; }
        .altBar .iconBtn { font-size:22px; color:#666; cursor:pointer; }
        .hediyeBtn { position:fixed; bottom:70px; right:15px; background:#555; width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.3); cursor:pointer; z-index:50; }
        .hediyeBtn i { color:#fff; font-size:20px; }
        .ozelKlavye { display:none; position:fixed; bottom:0; left:0; right:0; background:#d1d5db; padding:5px 3px; z-index:999; box-shadow:0 -2px 10px rgba(0,0,0,0.2); }
        .klavyeSatir { display:flex; justify-content:center; gap:4px; margin-bottom:5px; }
        .klavyeTus { flex:1; max-width:32px; height:42px; background:#fff; border:none; border-radius:5px; font-size:16px; font-weight:500; color:#000; box-shadow:0 1px 2px rgba(0,0,0,0.2); cursor:pointer; }
        .klavyeTus:active { background:#e5e5e5; }
        .klavyeTus.buyuk { max-width:50px; background:#a0aec0; color:#fff; font-size:18px; }
        .klavyeTus.bosluk { flex:5; max-width:180px; }
        .klavyeTus.enter { max-width:70px; background:#2196F3; color:#fff; font-size:20px; }
        .klavyeTus.sil { background:#a0aec0; color:#fff; font-size:18px; }
        .klavyeTus.sayilar { max-width:50px; background:#a0aec0; color:#fff; font-size:14px; }
        .panelSol { display:none; position:fixed; top:0; left:0; width:85%; max-width:320px; height:100%; background:#fff; z-index:998; overflow:auto; box-shadow:2px 0 8px rgba(0,0,0,0.3); }
        .panelSag { display:none; position:fixed; top:0; right:0; width:85%; max-width:320px; height:100%; background:#fff; z-index:998; overflow:auto; box-shadow:-2px 0 8px rgba(0,0,0,0.3); }
        .panelBaslik { background:#2196F3; color:#fff; padding:14px 15px; display:flex; align-items:center; gap:15px; font-weight:bold; font-size:17px; }
        .panelBaslik .geri { font-size:22px; cursor:pointer; }
        .aramaKutu { padding:10px 15px; border-bottom:1px solid #eee; display:flex; align-items:center; gap:10px; background:#fff; }
        .aramaKutu i { color:#999; font-size:18px; }
        .aramaKutu input { flex:1; border:none; outline:none; font-size:15px; }
        .kisi { padding:12px 15px; border-bottom:1px solid #eee; display:flex; align-items:center; gap:12px; }
        .kisi img { width:45px; height:45px; border-radius:50%; object-fit:cover; }
        .kisi .kisiBilgi b { display:block; font-size:15px; color:#333; }
        .kisi .kisiBilgi span { font-size:13px; color:#666; }
        .odaListe { padding:14px 15px; border-bottom:1px solid #eee; display:flex; align-items:center; justify-content:space-between; cursor:pointer; }
        .odaListe:active { background:#f0f0f0; }
        .odaListe .odaIsmi { font-weight:600; color:#333; font-size:15px; }
        .odaListe .odaSayi { background:#2196F3; color:#fff; padding:2px 10px; border-radius:12px; font-size:13px; font-weight:bold; }
    </style>
</head>
<body>
<div class="girisEkrani" id="girisEkrani">
    <div class="girisKutu">
        <div class="logoBaslik">SesliHobi</div>
        <div class="nickSatir">
            <input type="text" id="nickInput" placeholder="Rumuz..." maxlength="15">
            <div class="shLogo">SH</div>
        </div>
        <div class="cinsiyet">
            <button class="aktif" id="erkekBtn" onclick="cinsiyetSec('Erkek')">Erkek</button>
            <button id="kadinBtn" onclick="cinsiyetSec('Kadın')">Kadın</button>
        </div>
        <button class="baglanBtn" onclick="baglan()">Bağlan!</button>
        <div class="altLinkler">
            <span onclick="gizlilikAc()">Gizlilik</span>
            <span onclick="kurallarAc()">Kurallar</span>
            <span onclick="siteSahibiAc()">Site Sahibi</span>
        </div>
    </div>
</div>
<div id="gizlilikModal" class="modal">
    <div class="modalIcerik">
        <div class="modalBaslik">Gizlilik</div>
        <div class="modalMetinKutu">
            <div class="modalMetin">Servislerimizi kullanmak için BAĞLAN butonuna tıklayıp giriş yaptığınız/yapamadığınız andan itibaren aşağıda listelenen maddeleri sitesi için bütünüyle kabul etmiş olacaksınız; eğer kabul etmiyorsanız, hür iradenizle sitemizden hemen şimdi AYRILIN.

T.C. Yasalarında var olan bütün hükümler doğrudan ve olduğu gibi servislerimizin kullanımı için de geçerlidir. Sizi tanımamız, sizi korumamız ve kendi güvenliğimizi idame etmemiz için kullandığınız tarayıcı (browser) teknolojisi ve İZNİNİZ dahilinde ve ÖZEL OLMAYAN bilgi/cookie/tarayıcı yeteneklerini/IP adresini alıyoruz. ALINAN BİLGİLERİ AŞAĞIDA LİSTELEDİK:

İP Adresiniz: 5651 Sayılı İnternet Yasası Gereğince alınmaktadır. 123.123.123.123 gibi sayılar içerir. 1-2 dakika sonra aynı adresi başkası da kullanabilir ve şahsınıza özel bilgi değildir.

Telefon mu, bilgisayar mı?: Giriş yaptığınızda size uygun tasarımı göstermek için kullanıyoruz. Telefon ya da bilgisayar olup olmadığını söyler, şahsınıza özel bilgi değildir.

Ekran çözünürlüğünüz: Size uygun ekran boyutunu ve tasarımı sunmak maksatlı alınmaktadır. 360, 420 gibi sayıları içerir, özel bilgi değildir.

Tarayıcı üst bilgisi: İsteseniz de istemeseniz de her girdiğiniz siteye mecburen verdiğiniz bilgidir, bir sürü manasız ve ilginizi çekmeyen ÖZEL OLMAYAN teknik bilgiler içerir. Örneğin; kullandığınız tarayıcının Chrome'u yoksa Explorer mı olduğunu anlamak için kullanılır, bu sayede ses yayına girebilir veya giremezsiniz. Bu da özel bilgi değildir.

Cookie / Çerez: Sitemizi daha önce ziyaret edip etmediğinizi anlamımıza yarayan teknolojik bir yetenektir. Bunu da aynı şekilde Kullanıcı Giriş'i olan her türlü siteyle paylaşmak ZORUNDASINIZ. Ayrıca bu da özel bilgi değildir ve özel bilgilerinizi içermez.

Söz konusu bilgiler, ziyaret ettiğiniz bütün İnternet sitelerinin de aldığı ve alabileceği bilgilerdir. Bizim farkımız ise, yasalara uygun olarak bu bilgileri sadece güvenliğinizi sağlamak maksatlı temin ettiğimizi size detaylı bir şekilde söylememizdir. Ayrıca bu bilgilerin hiçbiri ÖZEL bilgileriniz değildir, standart ve anonim bilgilerdir. Kısacası endişelenmenize gerek yoktur. Buna rağmen hâlâ endişeleriniz varsa lütfen servislerimize bağlanmayınız.

T.C. Yasalarına göre suç teşkil edebilecek/eden hiçbir unsuru servislerimizi kullanırken gerçekleştiremezsiniz, böylesi bir durumda sorumluluk tamamen size ait olduğu gibi, servislerimizden uzaklaştırılacak ve gerekirse hakkınızda yasal işlemlerin başlatılması için gerekli adli mercilere başvurmamız gizli kalmak kaydıyla verileriniz tarafımızca da hıfz edilecektir.

Sistemde var olan bütün hareketleriniz, tarafımızca IP adresiniz ve işlem saati ile beraber kayıt altına alınır. Tarafımızca yasalar gereği kayıt altına alınan her türlü bilgiyi, istenildiğinde resmi makamlara iletmekle yükümlüyüz.

Servislerimizi kullanırken kendi orijinal IP adresinizi kullanabilirsiniz, Proxy IP (sahte/vekil ip) kullanan tespit edildiğinde direkt olarak uzaklaştırılacaktır.</div>
        </div>
        <button class="modalButon" onclick="gizlilikKapat()">Okudum, anladım.</button>
    </div>
</div>
<div id="kurallarModal" class="modal">
    <div class="modalIcerik">
        <div class="modalBaslik">Kurallar</div>
        <div class="modalMetinKutu">
            <div class="modalMetin">1. T.C. yasalarının tamamına site içerisinde uymak.
2. Evrensel ahlak kurallarını çiğnememek.
3. Hakaret, küfür, rencide edici davranışlardan uzak durmak.
4. Farklı internet sitelerinin reklamını yapmamak.
5. Irk, din, dil, cinsiyet ayrımı yapmamak.
6. Pornometin, pornografik veya pornoses paylaşımlar yapmamak.
7. Sistemden uzaklaştırıldığında "İLLE DE GELECEĞİM" mantığından uzak durup, ceza süresinin bitmesini beklemek.</div>
        </div>
        <button class="modalButon" onclick="kurallarKapat()">Okudum, anladım.</button>
    </div>
</div>
<div id="siteSahibiModal" class="modal">
    <div class="modalIcerik">
        <div class="modalBaslik">Site Sahibi</div>
        <div class="modalMetinKutu">
            <div class="modalMetin">• Sitemizde; Site Sahibi ve Site Yönetimi Bilgisi Dışında Olan Yaşanan Tüm Konular Kişilerin Kendi Sorunudur!

- Seslihobi Sitesi, Site Sahibi, Site Yönetimi Sorumlu Tutulamaz!</div>
        </div>
        <button class="modalButon" onclick="siteSahibiKapat()">Okudum, anladım.</button>
    </div>
</div>
<div class="anaEkran" id="anaEkran">
    <div class="odaBar">
        <div class="odaIsim">Boş oda</div>
        <div class="ortaBos"></div>
        <div class="iconlar">
            <div class="kisiSayi" onclick="odadakileriGoster()">
                <i class="fa fa-users"></i>
                <span id="odaKisiSayi">1</span>
            </div>
            <i class="fa fa-comment iconBtn"></i>
            <i class="fa fa-phone iconBtn"></i>
            <i class="fa fa-cog iconBtn"></i>
        </div>
    </div>
    <div class="micAlani">
        <div class="micSlot"><button class="micBtn"><i class="fa fa-microphone"></i></button><span class="micYazi">Mikrofon</span></div>
        <div class="micSlot"><button class="micBtn"><i class="fa fa-microphone"></i></button><span class="micYazi">Mikrofon</span></div>
        <div class="micSlot"><button class="micBtn"><i class="fa fa-microphone"></i></button><span class="micYazi">Mikrofon</span></div>
        <div class="micSlot"><button class="micBtn"><i class="fa fa-microphone"></i></button><span class="micYazi">Mikrofon</span></div>
        <div class="micSlot"><button class="micBtn"><i class="fa fa-microphone"></i></button><span class="micYazi">Mikrofon</span></div>
    </div>
    <div class="odaKurali"><span onclick="odaKuraliAc()">Oda Kuralı</span></div>
    <div class="yanOk sol" onclick="odalarPanelAc()">
        <i class="fa fa-chevron-right"></i>
    </div>
    <div class="yanOk sag" onclick="odadakileriGoster()">
        <span class="badge" id="odadakiSayi">1</span>
        <i class="fa fa-chevron-left"></i>
    </div>
    <div class="hediyeBtn">
        <i class="fa fa-gift"></i>
    </div>
    <div class="ortaAlan"></div>
    <div class="altBar">
        <i class="fa fa-smile emojiBtn"></i>
        <div class="mesajInput">
            <input type="text" placeholder="Mesaj..." id="mesajYaz" readonly onclick="klavyeAc()">
        </div>
        <i class="fa fa-microphone iconBtn"></i>
        <i class="fa fa-camera iconBtn"></i>
        <i class="fa fa-broadcast-tower iconBtn"></i>
        <i class="fa fa-plus iconBtn"></i>
    </div>
    <div class="ozelKlavye" id="ozelKlavye">
        <div class="klavyeSatir">
            <button class="klavyeTus" onclick="tusBas('1')">1</button>
            <button class="klavyeTus" onclick="tusBas('2')">2</button>
            <button class="klavyeTus" onclick="tusBas('3')">3</button>
            <button class="klavyeTus" onclick="tusBas('4')">4</button>
            <button class="klavyeTus" onclick="tusBas('5')">5</button>
            <button class="klavyeTus" onclick="tusBas('6')">6</button>
            <button class="klavyeTus" onclick="tusBas('7')">7</button>
            <button class="klavyeTus" onclick="tusBas('8')">8</button>
            <button class="klavyeTus" onclick="tusBas('9')">9</button>
            <button class="klavyeTus" onclick="tusBas('0')">0</button>
        </div>
        <div class="klavyeSatir">
            <button class="klavyeTus" onclick="tusBas('q')">q</button>
            <button class="klavyeTus" onclick="tusBas('w')">w</button>
            <button class="klavyeTus" onclick="tusBas('e')">e</button>
            <button class="klavyeTus" onclick="tusBas('r')">r</button>
            <button class="klavyeTus" onclick="tusBas('t')">t</button>
            <button class="klavyeTus" onclick="tusBas('y')">y</button>
            <button class="klavyeTus" onclick="tusBas('u')">u</button>
            <button class="klavyeTus" onclick="tusBas('i')">i</button>
            <button class="klavyeTus" onclick="tusBas('o')">o</button>
            <button class="klavyeTus" onclick="tusBas('p')">p</button>
        </div>
        <div class="klavyeSatir">
            <button class="klavyeTus" onclick="tusBas('a')">a</button>
            <button class="klavyeTus" onclick="tusBas('s')">s</button>
            <button class="klavyeTus" onclick="tusBas('d')">d</button>
            <button class="klavyeTus" onclick="tusBas('f')">f</button>
            <button class="klavyeTus" onclick="tusBas('g')">g</button>
            <button class="klavyeTus" onclick="tusBas('h')">h</button>
            <button class="klavyeTus" onclick="tusBas('j')">j</button>
            <button class="klavyeTus" onclick="tusBas('k')">k</button>
            <button class="klavyeTus" onclick="tusBas('l')">l</button>
        </div>
        <div class="klavyeSatir">
            <button class="klavyeTus buyuk" onclick="shiftBas()"><i class="fa fa-arrow-up"></i></button>
            <button class="klavyeTus" onclick="tusBas('z')">z</button>
            <button class="klavyeTus" onclick="tusBas('x')">x</button>
            <button class="klavyeTus" onclick="tusBas('c')">c</button>
            <button class="klavyeTus" onclick="tusBas('v')">v</button>
            <button class="klavyeTus" onclick="tusBas('b')">b</button>
            <button class="klavyeTus" onclick="tusBas('n')">n</button>
            <button class="klavyeTus" onclick="tusBas('m')">m</button>
            <button class="klavyeTus sil" onclick="silBas()"><i class="fa fa-backspace"></i></button>
        </div>
        <div class="klavyeSatir">
            <button class="klavyeTus sayilar" onclick="sayiGecis()">?123</button>
            <button class="klavyeTus" onclick="tusBas(',')">,</button>
            <button class="klavyeTus bosluk" onclick="tusBas(' ')"></button>
            <button class="klavyeTus" onclick="tusBas('.')">.</button>
            <button class="klavyeTus enter" onclick="mesajGonder()"><i class="fa fa-arrow-left"></i></button>
        </div>
    <div class="panelSol" id="odalarPanel">
