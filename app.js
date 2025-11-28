let currentAudio = null;

// Load songs
async function loadSongs() {
  const loading = document.getElementById('loading');
  loading.style.display = "block";

  try {
    const res = await fetch('songs.json');
    const songs = await res.json();
    const list = document.getElementById('songList');
    list.innerHTML = '';

    songs.forEach(song => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="covers/${song.cover}" alt="cover">
        <div>
          <h2>${song.title}</h2>
          <p>${song.artist}</p>
          <audio controls src="songs/${song.filename}"></audio>

          <div class="bar-visualizer">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
      `;

      const audio = card.querySelector('audio');

      // Stop others when one plays
      audio.addEventListener('play', () => {
        if (currentAudio && currentAudio !== audio) {
          currentAudio.pause();
        }
        currentAudio = audio;
      });

      list.appendChild(card);
    });

  } catch (err) {
    console.log("Songs not loaded", err);
  }

  loading.style.display = "none";
}

loadSongs();

/* Search bar filter */
document.getElementById("searchBar").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    card.style.display = title.includes(query) ? "flex" : "none";
  });
});

/* Theme toggle */
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  toggle.textContent = document.body.classList.contains("light-mode")
    ? "🌞 Light Mode"
    : "🌙 Dark Mode";
});

/* Floating hearts */
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (3 + Math.random() * 3) + "s";
  heart.textContent = "💖";
  document.getElementById("hearts-container").appendChild(heart);

  setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 500);
