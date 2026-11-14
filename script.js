
let currentSlide = 0;
const totalSlides = 9;

const slides = document.querySelectorAll(".slide");
const counter = document.getElementById("slideCounter");

function showSlide(index) {
  currentSlide = Math.max(0, Math.min(index, totalSlides - 1));

  slides.forEach(slide => slide.classList.remove("active"));
  slides[currentSlide].classList.add("active");

  document.body.classList.toggle("first-page-video", currentSlide === 0);
  document.body.classList.toggle("slide-one-video", currentSlide === 1);
  document.body.classList.toggle("slide-two-video", currentSlide === 2);
  document.body.classList.toggle("slide-three-video", currentSlide === 3);
  document.body.classList.toggle("slide-four-video", currentSlide === 4);
  document.body.classList.toggle("slide-five-video", currentSlide === 5);
  document.body.classList.toggle("slide-six-video", currentSlide === 6);
  document.body.classList.toggle("slide-seven-video", currentSlide === 7);

  counter.textContent = currentSlide === 0
    ? "Welcome"
    : currentSlide === 8
    ? "Final Wishes"
    : `Slide ${currentSlide} of 7`;

  syncMusicWithSlide();
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    if (currentSlide === 0 && !playing) {
      toggleMusic();
    }
    showSlide(currentSlide + 1);
  }
}

function previousSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  }
}

function restart() {
  showSlide(0);
}

// Keyboard navigation
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") previousSlide();
  if (e.key === "Escape") closeVideo();
});

// Video overlay
const overlay = document.getElementById("videoOverlay");
const video = document.getElementById("videoPlayer");

function openVideo(source) {
  video.src = source;
  overlay.classList.add("show");
  video.play().catch(() => {});
}

function closeVideo() {
  video.pause();
  video.removeAttribute("src");
  video.load();
  overlay.classList.remove("show");
}

// Background music
const music = document.getElementById("bgMusic");
const finalMusic = document.getElementById("finalMusic");
const musicBtn = document.getElementById("musicBtn");
const musicSelect = document.getElementById("musicSelect");

let playing = false;
music.volume = 0.12;
finalMusic.volume = 1;

function syncMusicWithSlide() {
  const isFinalSlide = currentSlide === totalSlides - 1;

  if (isFinalSlide) {
    if (playing) {
      music.volume = 0.08;
      music.play().catch(() => {});
      finalMusic.volume = 1;
      finalMusic.play().catch(() => {});
      musicBtn.textContent = "♫ Music: ON";
    } else {
      musicBtn.textContent = "♫ Music: OFF";
    }
    return;
  }

  finalMusic.pause();
  finalMusic.currentTime = 0;

  if (playing) {
    music.volume = 0.2;
    music.play().catch(() => {});
    musicBtn.textContent = "♫ Music: ON";
  } else {
    musicBtn.textContent = "♫ Music: OFF";
  }
}

async function toggleMusic() {
  if (playing) {
    music.pause();
    finalMusic.pause();
    playing = false;
    musicBtn.textContent = "♫ Music: OFF";
  } else {
    try {
      music.volume = 0.2;
      await music.play();
      playing = true;

      if (currentSlide === totalSlides - 1) {
        music.volume = 0.08;
        finalMusic.volume = 1;
        finalMusic.play().catch(() => {});
      }

      musicBtn.textContent = "♫ Music: ON";
    } catch {
      musicBtn.textContent = "♫ Select music";
    }
  }
}

function changeMusic() {
  const wasPlaying = playing;
  music.pause();
  finalMusic.pause();
  playing = false;
  music.src = musicSelect.value;

  if (wasPlaying) {
    toggleMusic();
  }
}

// Floating festive particles
const particleBox = document.getElementById("particles");
const symbols = ["🌼", "🌸", "✨", "🪔", "🌺"];

for (let i = 0; i < 25; i++) {
  const particle = document.createElement("span");

  particle.className = "particle";
  particle.textContent =
    symbols[Math.floor(Math.random() * symbols.length)];

  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDuration =
    (7 + Math.random() * 10) + "s";

  particle.style.animationDelay =
    (Math.random() * 10) + "s";

  particle.style.fontSize =
    (15 + Math.random() * 18) + "px";

  particleBox.appendChild(particle);
}

// Start with the welcome screen
showSlide(0);
