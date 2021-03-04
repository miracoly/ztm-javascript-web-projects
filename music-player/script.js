// Music data
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design"
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design"
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design"
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design"
  },
];

function initiateMusicPlayer(songs) {

  function loadSong(songIndex) {
    let song = songs[songIndex];
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    audio.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
  }

  function playMusic() {
    audio.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  }

  function stopMusic() {
    audio.pause();
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
  }

  function togglePlayButton() {
    if (audio.paused) {
      playMusic()
    } else {
      stopMusic();
    }
  }

  function decreaseSongIndex() {
    if (curSongIndex === 0) {
      curSongIndex = songs.length - 1;
    } else {
      curSongIndex--;
    }
  }

  function increaseSongIndex() {
    if (curSongIndex === songs.length - 1) {
      curSongIndex = 0;
    } else {
      curSongIndex++;
    }
  }

  function playNextSong() {
    increaseSongIndex(); 
    loadSong(curSongIndex);
    togglePlayButton();
  }

  function playPrevSong() {
    decreaseSongIndex()
    loadSong(curSongIndex);
    togglePlayButton();
  }

  function convertSecToMinSec(sec) {
    const min = Math.floor(sec / 60);
    let remainingSec = Math.floor(sec % 60);
    if (remainingSec < 10) {
      remainingSec = `0${remainingSec}`;
    }
    return `${min}:${remainingSec}`;
  }

  function updateProgressBar({ srcElement: { currentTime, duration } }) {
    if (!audio.paused) {
      // Calculate und set width of progress-bar
      const progressPercent = currentTime / duration * 100;
      progress.style.width = `${progressPercent}%`;
      // Calcuate duration in minutes and seconds
      if (duration) {
        durationElem.textContent = convertSecToMinSec(duration);
      }
      // Calcuate current time in minutes ands seconds
      currentTimeElem.textContent = convertSecToMinSec(currentTime);
    }
  }

  function setProgressBar({ offsetX }) {
    const width = this.clientWidth;
    const { duration } = audio;
    audio.currentTime = (offsetX / width) * duration;
    playMusic();
  }

  // Get elements
  const audio = document.querySelector("audio");
  const image = document.querySelector("img");
  const title = document.getElementById("title");
  const artist = document.getElementById("artist");
  const prevBtn = document.getElementById("prev");
  const playBtn = document.getElementById("play");
  const nextBtn = document.getElementById("next");
  const progressContainer = document.getElementById("progress-container");
  const progress = document.getElementById("progress");
  const currentTimeElem = document.getElementById("current-time");
  const durationElem = document.getElementById("duration");
  // initiate current song index
  let curSongIndex = 0;
  // Load initial Song
  loadSong(0);
  // Set EventListeners
  playBtn.addEventListener("click", togglePlayButton);
  nextBtn.addEventListener("click", playNextSong);
  prevBtn.addEventListener("click", playPrevSong);
  audio.addEventListener("timeupdate", updateProgressBar);
  audio.addEventListener("ended", playNextSong);
  progressContainer.addEventListener("click", setProgressBar);
}

initiateMusicPlayer(songs);
