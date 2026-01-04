let isLoggedIn=false;
let favorites=JSON.parse(localStorage.getItem("favSongs"))||[];

const audio=document.getElementById("audio");
const video=document.getElementById("video");
const progress = document.getElementById("progress");
const songList=document.getElementById("songList");



/* SONG PROGRESS UPDATE */
audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
});

/* SEEK SONG (AAGE / PICHE) */
progress.addEventListener("input", () => {
  if (!isNaN(audio.duration)) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});
const data={
  hindi:[
    {title:"Tum Hi Ho",artist:"Arijit Singh",src:"songs/song3.mp7",video:"videos/bg1.mp4"}
    
  ],
  bollywood:[
    {title:"Dil Ki Abaj",artist:"Ahaan aneet",src:"songs/song1.mp3",video:"songs/videoplayback.mp4"},
    {title:"Aaj Ki Rat",artist:"Taammana Bhatia",src:"songs/song2.mp3",video:"songs/song2.mp3"},
    {title:"Mashup",artist:"Arijit Singh",src:"songs/song1.mp3",video:"songs/song1.mp3"},
     {title:"Tujh Mein Rab Dikhta",artist:"Roop Kumar",src:"songs/song2.mp3",video:"songs/song2.mp3"}

  ],
  english:[
    {title:"Perfect",artist:"Ed Sheeran",src:"songs/song4.mp3",video:"songs/song.mp3"}
  ]
};

let category="hindi";
let current=0;

/* LOGIN */
function loginUser(){
  if(!email.value||!password.value) return alert("Fill details");
  isLoggedIn=true;
  alert("🎉 Welcome my free music listen");
  modal.style.display="none";
}

/* SONG LIST */
function renderSongs(list){
  songList.innerHTML="";
  list.forEach((s,i)=>{
    let liked=favorites.some(f=>f.title===s.title)?"❤️":"🤍";
    songList.innerHTML+=`
      <div class="song" onclick="playSong(${i})">
        <div><b>${s.title}</b><br><small>${s.artist}</small></div>
        <span class="fav" onclick="event.stopPropagation();toggleFav('${s.title}')">${liked}</span>
      </div>`;
  });
  gsap.from(".song",{x:-30,opacity:0,stagger:.1});
}

/* PLAY */
function playSong(i){
  if(!isLoggedIn){openModal();return;}
  current=i;
  let s=data[category][i];
  audio.src=s.src;
  video.src=s.video;
  title.innerText=s.title;
  artist.innerText=s.artist;
  audio.play();
  video.play();
  playBtn.innerText="⏸";
}

function togglePlay(){
  if(!isLoggedIn){openModal();return;}
  audio.paused?(audio.play(),video.play(),playBtn.innerText="⏸"):
               (audio.pause(),video.pause(),playBtn.innerText="▶");
}

function nextSong(){playSong((current+1)%data[category].length)}
function prevSong(){playSong((current-1+data[category].length)%data[category].length)}

function toggleFav(title){
  let song=data[category].find(s=>s.title===title);
  let i=favorites.findIndex(f=>f.title===title);
  i>-1?favorites.splice(i,1):favorites.push(song);
  localStorage.setItem("favSongs",JSON.stringify(favorites));
  renderSongs(data[category]);
}

function showFavorites(){renderSongs(favorites)}

function loadCategory(cat,e){
  category=cat;
  document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));
  e.target.classList.add("active");
  renderSongs(data[cat]);
}

function openModal(){modal.style.display="flex"}

loadCategory("hindi",{target:document.querySelector(".tabs button")});