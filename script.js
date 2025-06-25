// Music player and UI logic for Spotify Clone

// Sample playlist
const songs = [
    {
        name: 'Bahara',
        artist: 'Shreya Ghoshal, Sona Mohapatra',
        file: 'Bahara Full Video - I Hate Luv Storys_Sonam Kapoor, Imran_Shreya Ghoshal, Sona Mohapatra - SonyMusicIndiaVEVO (youtube).mp3',
        cover: 'card1img.jpeg'
    },
    {
        name: 'Carol of the Bells',
        artist: 'Ringtones X',
        file: 'Carol of the Bells Ringtone  Ringtones X - Ringtones X.mp3',
        cover: 'card2img.jpeg'
    },
    {
        name: 'Khoya Hain',
        artist: 'Baahubali - The Beginning',
        file: 'Khoya Hain - Full Video  Baahubali - The Beginning  Prabhas & Tamannaah  M.M Kreem , Manoj M - Zee Music Company.mp3',
        cover: 'card3img.jpeg'
    },
    {
        name: 'Chaha hai tujhko (Flute)',
        artist: 'The tune status',
        file: 'Chaha hai tujhko flute music status #feelthemusic - The tune status.mp3',
        cover: 'card4img.jpeg'
    }
];

let currentSong = 0;
let isPlaying = false;
const audio = new Audio(songs[currentSong].file);

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const playBtn = document.querySelector('.player-icon-control[style*="opacity:1"]');
    const prevBtn = document.querySelectorAll('.player-icon-control')[1];
    const nextBtn = document.querySelectorAll('.player-icon-control')[3];
    const musicName = document.querySelector('.music-name');
    const singerName = document.querySelector('.singer-name');
    const albumImg = document.querySelector('.album img');
    const progressBar = document.querySelector('.progress-bar');
    const curTime = document.querySelector('.cur-time');
    const totTime = document.querySelector('.tot-time');
    const volumeSlider = document.querySelector('.controls input[type="range"]');

    function loadSong(index) {
        audio.src = songs[index].file;
        musicName.textContent = songs[index].name;
        singerName.textContent = songs[index].artist;
        albumImg.src = songs[index].cover;
        progressBar.value = 0;
        curTime.textContent = '00:00';
        audio.addEventListener('loadedmetadata', () => {
            totTime.textContent = formatTime(audio.duration);
        });
    }

    function playSong() {
        audio.play();
        isPlaying = true;
        playBtn.src = 'player_icon4.png'; // Change to pause icon
    }

    function pauseSong() {
        audio.pause();
        isPlaying = false;
        playBtn.src = 'player_icon3.png'; // Change to play icon
    }

    function prevSong() {
        currentSong = (currentSong - 1 + songs.length) % songs.length;
        loadSong(currentSong);
        if (isPlaying) playSong();
    }

    function nextSong() {
        currentSong = (currentSong + 1) % songs.length;
        loadSong(currentSong);
        if (isPlaying) playSong();
    }

    function formatTime(sec) {
        if (isNaN(sec)) return '00:00';
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    // Event listeners
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    audio.addEventListener('timeupdate', () => {
        progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
        curTime.textContent = formatTime(audio.currentTime);
    });
    progressBar.addEventListener('input', () => {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });
    audio.addEventListener('ended', nextSong);

    // Set initial volume
    audio.volume = volumeSlider.value / 100;
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
    });

    // Initial load
    loadSong(currentSong);

    // Dynamically create album cards for each song
    const albumCardsContainer = document.getElementById('album-cards');
    songs.forEach((song, idx) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <img src="${song.cover}" class="card-img">
            <p class="card-title">${song.name}</p>
            <p class="card-info">${song.artist}</p>
        `;
        card.addEventListener('click', () => {
            currentSong = idx;
            loadSong(currentSong);
            playSong();
        });
        albumCardsContainer.appendChild(card);
    });

    // Login Modal functionality
    const userIcon = document.querySelector('.fa-user');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    userIcon.addEventListener('click', () => {
        loginModal.style.display = 'flex';
    });
    closeModal.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
    });
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // You can add authentication logic here
        alert('Logged in as ' + document.getElementById('username').value);
        loginModal.style.display = 'none';
    });
}); 