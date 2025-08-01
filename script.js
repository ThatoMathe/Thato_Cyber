/* =============================== 
   Mobile Menu Toggle
   =============================== */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Close Menu on Resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
});

// Close Menu on Link Click
navbar.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
});

/* ===============================
   Pause / Play Slider
   =============================== */
const pauseButton = document.getElementById('pause-slider');
const playButton = document.getElementById('play-slider');
const sliderItems = document.querySelectorAll('.slider .list .item');

if (pauseButton && playButton && sliderItems.length > 0) {
    pauseButton.addEventListener('click', () => {
        sliderItems.forEach(item => {
            item.style.animationPlayState = 'paused';
        });
    });

    playButton.addEventListener('click', () => {
        sliderItems.forEach(item => {
            item.style.animationPlayState = 'running';
        });
    });
}

/* ===============================
   Back to Top Button
   =============================== */
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('show', window.scrollY > 300);
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ===============================
   Swiper Slider
   =============================== */
if (document.querySelector('.swiper-container')) {
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
        },
    });
}

/* ===============================
   Rotating Cybersecurity Job Titles
   =============================== */
document.addEventListener("DOMContentLoaded", function () {
    const positions = document.querySelectorAll(".flashing-text span");
    let index = 0;

    function showNext() {
        positions.forEach(pos => pos.classList.remove("active"));
        positions[index].classList.add("active");
        index = (index + 1) % positions.length;
    }

    if (positions.length > 0) {
        showNext();
        setInterval(showNext, 2500); // Rotate every 2.5s
    }
});

/* ===============================
   Local South Africa Time & Date
   =============================== */
function updateTime() {
    let options = { 
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false,
        timeZone: 'Africa/Johannesburg'
    };
    let now = new Date();
    let timeElement = document.getElementById('local-time');
    if (timeElement) {
        timeElement.innerHTML = now.toLocaleString('en-ZA', options) + " (SAST)";
    }
}
setInterval(updateTime, 1000);
updateTime();

/* ===============================
   Video / Overlay Play-Pause Toggle
   =============================== */
const video = document.querySelector('.bg-video');
const overlay = document.querySelector('.overlay');

function toggleVideo() {
    if (video && !video.paused) {
        video.pause();
    } else if (video) {
        video.play();
    }
}

if (video) video.addEventListener('click', toggleVideo);
if (overlay) overlay.addEventListener('click', toggleVideo);

/* ===============================
   Matrix Code Rain Animation
   =============================== */
const matrixCanvas = document.getElementById("matrix-canvas");

if (matrixCanvas) {
    const matrixCtx = matrixCanvas.getContext("2d");
    matrixCanvas.height = window.innerHeight;
    matrixCanvas.width = window.innerWidth;

    const letters = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    const columns = Math.floor(matrixCanvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function drawMatrix() {
        matrixCtx.fillStyle = "rgba(0, 0, 0, 0.1)";
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        matrixCtx.fillStyle = "#0ff";
        matrixCtx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            matrixCtx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 33);

    window.addEventListener('resize', () => {
        matrixCanvas.height = window.innerHeight;
        matrixCanvas.width = window.innerWidth;
    });
}

/* ===============================
   Quiz Submit
   =============================== */
const quizSubmit = document.getElementById("submitQuiz");

if (quizSubmit) {
    quizSubmit.addEventListener("click", function() {
        let score = 0;
        let totalQuestions = 5;

        for (let i = 1; i <= totalQuestions; i++) {
            let answer = document.querySelector(`input[name="q${i}"]:checked`);
            if (answer) score += parseInt(answer.value);
        }

        let resultText = `You scored ${score} out of ${totalQuestions}. `;
        if (score === 5) {
            resultText += "🌟 Sugoi! Cybersecurity Sensei! 🎉";
            startFireworks();
        } else if (score >= 3) {
            resultText += "👍 Good job! You know your stuff.";
        } else {
            resultText += "😢 Nani?! You need more training, senpai!";
        }

        document.getElementById("quizResult").innerHTML = resultText;
    });
}

/* ===============================
   Fireworks Celebration
   =============================== */
function startFireworks() {
    const fireworksCanvas = document.getElementById('fireworks');
    if (!fireworksCanvas) return;

    const fwCtx = fireworksCanvas.getContext('2d');
    fireworksCanvas.width = window.innerWidth;
    fireworksCanvas.height = window.innerHeight;

    let particles = [];

    function createParticle(x, y) {
        let colors = ["cyan", "magenta", "yellow", "white"];
        particles.push({
            x: x, y: y,
            dx: (Math.random() - 0.5) * 5,
            dy: (Math.random() - 0.5) * 5,
            life: 100,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    function animateFireworks() {
        fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
        particles.forEach((p, i) => {
            p.x += p.dx;
            p.y += p.dy;
            p.life--;
            fwCtx.beginPath();
            fwCtx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            fwCtx.fillStyle = p.color;
            fwCtx.fill();
            if (p.life <= 0) particles.splice(i, 1);
        });
        if (particles.length > 0) requestAnimationFrame(animateFireworks);
    }

    for (let i = 0; i < 100; i++) {
        createParticle(window.innerWidth / 2, window.innerHeight / 2);
    }
    animateFireworks();
}

/* ===============================
   Contact Page Particles
   =============================== */
const contactCanvas = document.getElementById('contactParticles');

if (contactCanvas) {
    const contactCtx = contactCanvas.getContext('2d');
    contactCanvas.width = contactCanvas.offsetWidth;
    contactCanvas.height = contactCanvas.offsetHeight;

    let contactParticles = [];

    for (let i = 0; i < 40; i++) {
        contactParticles.push({
            x: Math.random() * contactCanvas.width,
            y: Math.random() * contactCanvas.height,
            size: Math.random() * 3,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5
        });
    }

    function drawContactParticles() {
        contactCtx.clearRect(0, 0, contactCanvas.width, contactCanvas.height);
        contactCtx.fillStyle = '#00f0ff';
        contactParticles.forEach(p => {
            contactCtx.beginPath();
            contactCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            contactCtx.fill();
        });
    }

    function moveContactParticles() {
        contactParticles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0 || p.x > contactCanvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > contactCanvas.height) p.speedY *= -1;
        });
    }

    function animateContactParticles() {
        drawContactParticles();
        moveContactParticles();
        requestAnimationFrame(animateContactParticles);
    }

    animateContactParticles();

    window.addEventListener('resize', () => {
        contactCanvas.width = contactCanvas.offsetWidth;
        contactCanvas.height = contactCanvas.offsetHeight;
    });
}
document.getElementById("submitQuiz").addEventListener("click", function() {
    let score = 0;
    const total = 5;

    // Check answers
    for (let i = 1; i <= total; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === "1") {
            score++;
        }
    }

    const resultDiv = document.getElementById("quizResult");

    if (score === total) {
        resultDiv.innerHTML = "🎉 Perfect! You nailed it! 🎉";
        resultDiv.style.color = "lime";
    } else if (score >= 3) {
        resultDiv.innerHTML = `👍 Good job! You scored ${score}/${total}`;
        resultDiv.style.color = "yellow";
    } else {
        resultDiv.innerHTML = `😢 You scored ${score}/${total}. Try again!`;
        resultDiv.style.color = "red";
    }

    // Auto-clear answers after 3 seconds
    setTimeout(() => {
        document.getElementById("quizForm").reset();
        resultDiv.innerHTML = "";
    }, 3000);
});
// Futuristic Quotes
const quotes = [
    "The future belongs to those who code it.",
    "Hack the system. Build the future.",
    "Your data is your power — protect it.",
    "Cybersecurity isn’t a job, it’s a responsibility.",
    "Think digital, live futuristic.",
    "Your portfolio is your digital handshake.",
    "Every line of code writes your future.",
    "Security is not a feature, it’s a mindset.",
    "Innovate like there’s no tomorrow.",
    "From idea to code, that’s where magic happens."
];
document.getElementById("quote").textContent =
    quotes[Math.floor(Math.random() * quotes.length)];

// Live Clock
function updateClock() {
    const now = new Date();
    document.getElementById("clock").textContent =
        now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

