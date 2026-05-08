document.addEventListener('DOMContentLoaded', () => {
    initHearts();
    handleLoading();
    showScreen('home');

    // Back to Home listener
    document.querySelector('.back-btn').addEventListener('click', () => showScreen('home'));

    // Game selection listeners
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', () => {
            const game = card.dataset.game;
            showScreen(game);
        });
    });
});

function handleLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const loaderText = document.getElementById('loader-text');
    const loadingMessages = [
        "Baking extra love...",
        "Brewing Mama's chai...",
        "Polishing memories...",
        "Inflating hugs...",
        "Counting blessings...",
        "Adding sprinkles of joy...",
        "Almost ready! ✨"
    ];

    let msgIndex = 0;
    const msgInterval = setInterval(() => {
        msgIndex = (msgIndex + 1) % loadingMessages.length;
        if (loaderText) loaderText.innerText = loadingMessages[msgIndex];
    }, 500);

    // Hide loader after 3.5 seconds
    setTimeout(() => {
        clearInterval(msgInterval);
        if (loadingScreen) loadingScreen.classList.add('hidden');
    }, 3500);
}

// Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`${screenId}-screen`).classList.add('active');
    
    // Show/hide back button
    const backBtn = document.querySelector('.back-btn');
    if (screenId === 'home') {
        backBtn.style.display = 'none';
    } else {
        backBtn.style.display = 'block';
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Specific re-init
    initGame(screenId);
}

// Background Hearts
function initHearts() {
    const container = document.querySelector('.hearts-container');
    if (!container) return;
    const heartTypes = ['❤️', '💖', '💝', '💗', '🌸'];
    
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDelay = Math.random() * 20 + 's';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(heart);
    }
}

// Game Initialization Central
function initGame(game) {
    switch(game) {
        case 'gift': initGiftGame(); break;
        case 'balloons': initBalloonsGame(); break;
        case 'stars': initStarsGame(); break;
        case 'quiz': initQuizGame(); break;
        case 'draw': initDrawGame(); break;
        case 'hug': initHugGame(); break;
        case 'calculator': 
            document.querySelector('.heart-fill').style.width = '0%';
            document.getElementById('calc-result').innerText = '';
            break;
    }
}

// 1. Gift Box Game
let currentGiftMsg = 0;
const giftMessages = [
    "Mama, aap ki ek muskurahat mere poore din ko roshan kar deti hai. Happy Mother's Day! 🌸",
    "You have given me everything, Mom — your love is the greatest gift I'll ever receive. Shukriya, Mama. 💝",
    "Aap ne kabhi mujhe girne nahi diya. Har baar mera haath thama. I see it all, and I am so grateful. 🤗",
    "Mom, your duas have always protected me. Main aap ka bahut shukrguzaar hoon. ❤️",
    "The world is a better place because you're in it. Aap jaisee Mama sirf mere naseeb mein thi. 🌷 — Rohan"
];

function initGiftGame() {
    const box = document.querySelector('.box');
    const msgContainer = document.querySelector('.gift-message');
    
    // Reset state
    box.classList.remove('open');
    box.style.transform = 'rotateX(-20deg) rotateY(45deg)';
    msgContainer.style.display = 'none';
    currentGiftMsg = 0;

    box.onclick = () => {
        if (!box.classList.contains('open')) {
            box.classList.add('open');
            // The transform in CSS for .box.open will override box.style.transform
            setTimeout(() => {
                msgContainer.style.display = 'block';
                showNextGiftMsg();
            }, 600);
        }
    };
}

function showNextGiftMsg() {
    const msgText = document.getElementById('gift-msg-text');
    msgText.innerHTML = giftMessages[currentGiftMsg];
    currentGiftMsg = (currentGiftMsg + 1) % giftMessages.length;
}

// 2. Balloons Game
let balloonScore = 0;
let balloonsLeft = 15;
let balloonGameActive = false;

function initBalloonsGame() {
    balloonScore = 0;
    balloonsLeft = 15;
    balloonGameActive = false;
    document.getElementById('balloon-score').innerText = balloonScore;
    document.getElementById('balloons-container').innerHTML = '';
}

function startBalloons() {
    if (balloonGameActive) return;
    initBalloonsGame();
    balloonGameActive = true;
    
    const container = document.getElementById('balloons-container');
    const balloonEmojis = ['🎈', '💖', '💗', '💓', '💝'];
    const popMessages = ["Love!", "Cute!", "Mama!", "Sweet!", "Best!", "Pure!", "Kind!", "Pyaari!"];

    let count = 0;
    const interval = setInterval(() => {
        if (count >= 15 || !document.getElementById('balloons-screen').classList.contains('active')) {
            clearInterval(interval);
            setTimeout(() => {
                if (balloonGameActive) {
                    alert(`Round Over! Final Score: ${balloonScore}/15! Mom loves your pops! 💖`);
                    balloonGameActive = false;
                }
            }, 5000);
            return;
        }

        const b = document.createElement('div');
        b.className = 'balloon';
        b.innerText = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
        b.style.left = (Math.random() * 80 + 10) + '%';
        b.style.bottom = '-100px';
        container.appendChild(b);

        let pos = -100;
        const speed = Math.random() * 3 + 2;
        const moveId = setInterval(() => {
            if (pos > 600 || !b.parentElement) {
                clearInterval(moveId);
                b.remove();
            } else {
                pos += speed;
                b.style.bottom = pos + 'px';
            }
        }, 30);

        b.onclick = () => {
            clearInterval(moveId);
            balloonScore++;
            document.getElementById('balloon-score').innerText = balloonScore;
            
            const pop = document.createElement('div');
            pop.className = 'pop-effect';
            pop.style.left = b.style.left;
            pop.style.bottom = b.style.bottom;
            pop.innerText = popMessages[Math.floor(Math.random() * popMessages.length)];
            container.appendChild(pop);
            
            b.remove();
            setTimeout(() => pop.remove(), 800);
        };

        count++;
    }, 800);
}

// 4. Stars Game
function initStarsGame() {
    const sky = document.getElementById('night-sky');
    sky.innerHTML = '';
    let clickedStars = 0;
    const totalStars = 12;
    const wishes = ["Health 🍎", "Happiness 😊", "Long Life ⏳", "Peace 🕊️", "Blessings ✨", "Smiles 😄", "Comfort 🛋️", "Success 🏆", "Respect 🎖️", "Safety 🛡️", "Love ❤️", "Light 🕯️"];

    for (let i = 0; i < totalStars; i++) {
        const star = document.createElement('div');
        star.innerText = '⭐';
        star.style.position = 'absolute';
        star.style.left = Math.random() * 90 + 2 + '%';
        star.style.top = Math.random() * 80 + 5 + '%';
        star.style.cursor = 'pointer';
        star.style.fontSize = '1.5rem';
        star.style.transition = 'all 0.5s';
        star.style.userSelect = 'none';
        
        star.onclick = () => {
            if (star.style.opacity === '0.2') return;
            
            const toast = document.createElement('div');
            toast.innerText = wishes[i];
            toast.style.position = 'absolute';
            toast.style.left = star.style.left;
            toast.style.top = star.style.top;
            toast.style.color = 'gold';
            toast.style.fontWeight = 'bold';
            toast.style.pointerEvents = 'none';
            sky.appendChild(toast);
            
            star.style.opacity = '0.2';
            star.style.transform = 'scale(0.5)';
            
            setTimeout(() => {
                toast.style.transform = 'translateY(-30px)';
                toast.style.opacity = '0';
                toast.style.transition = 'all 1s';
                setTimeout(() => toast.remove(), 1000);
            }, 100);
            
            clickedStars++;
            if (clickedStars === totalStars) {
                document.getElementById('stars-final-msg').innerText = "All your wishes have been sent to Mom 💫";
            }
        };
        sky.appendChild(star);
    }
}

// 5. Quiz
const quizData = [
    { q: "What's Mom's superpower?", a: ["Cooking", "Hugs", "Wisdom", "All of the above ✅"], correct: 3, feedback: "Mama is basically a superhero! 🦸‍♀️" },
    { q: "Mom's love is like...?", a: ["WiFi — always there", "The sun — always warm", "A hug — always safe", "All of the above ✅"], correct: 3, feedback: "Correct! Mom's love is the strongest force! ☀️" },
    { q: "Who is the favorite child? (Shh...)", a: ["Rohan", "Rohan for sure", "Definitely Rohan", "Mom loves everyone equally! ✅"], correct: 3, feedback: "Aww, so humble! (But we know it's Rohan 😉)" },
    { q: "When Mama says 'Paanch minute', it means...", a: ["Real 5 min", "1 hour", "Whenever she's ready! ✅", "Infinite time"], correct: 2, feedback: "Haha, standard Mama time! ⏰" },
    { q: "The best place in the world is?", a: ["Paris", "Switzerland", "In Mom's lap ✅", "A theme park"], correct: 2, feedback: "Dil se... exactly! Sukoon yahin hai. ❤️" }
];

let currentQuizIdx = 0;
let quizScore = 0;

function initQuizGame() {
    currentQuizIdx = 0;
    quizScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    const container = document.getElementById('quiz-q-container');
    if (currentQuizIdx >= quizData.length) {
        container.innerHTML = `<h3>Quiz Result: ${quizScore}/5</h3><p style="font-size: 1.2rem; margin-top: 10px;">Aap ne Mom ko bilkul sahi pehchana! ❤️</p><button class="btn" onclick="initQuizGame()">Try Again</button>`;
        return;
    }
    const q = quizData[currentQuizIdx];
    container.innerHTML = `<p style="font-size: 0.9rem; color: #888;">Question ${currentQuizIdx + 1} of 5</p><h3>${q.q}</h3>`;
    q.a.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.innerText = opt;
        btn.onclick = () => {
            const isCorrect = idx === q.correct;
            if (isCorrect) quizScore++;
            
            container.innerHTML = `<h3>${isCorrect ? '✅ Sahi Jawab!' : '❤️ Sweet Answer!'}</h3><p style="font-size: 1.2rem">${q.feedback}</p>`;
            setTimeout(() => {
                currentQuizIdx++;
                showQuizQuestion();
            }, 1500);
        };
        container.appendChild(btn);
    });
}

// 6. Draw Game
let canvas, ctx, painting = false;
function initDrawGame() {
    canvas = document.getElementById('draw-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 400; 
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#ff8fb1';

    canvas.onmousedown = (e) => { painting = true; draw(e); };
    canvas.onmouseup = () => { painting = false; ctx.beginPath(); };
    canvas.onmousemove = draw;
    
    canvas.ontouchstart = (e) => { e.preventDefault(); painting = true; draw(e.touches[0]); };
    canvas.ontouchend = () => { painting = false; ctx.beginPath(); };
    canvas.ontouchmove = (e) => { e.preventDefault(); draw(e.touches[0]); };
}

function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
}

function setBrushColor(color) { ctx.strokeStyle = color; }
function setBrushSize(size) { ctx.lineWidth = size; }
function clearCanvas() { ctx.clearRect(0, 0, canvas.width, canvas.height); }
function downloadCanvas() {
    const link = document.createElement('a');
    link.download = 'flower_for_mom.png';
    link.href = canvas.toDataURL();
    link.click();
}

// 7. Love Calculator
function calculateLove() {
    const n1 = document.getElementById('name1').value;
    const n2 = document.getElementById('name2').value;
    if (!n1 || !n2) return;
    
    const fill = document.querySelector('.heart-fill');
    fill.style.width = '0%';
    setTimeout(() => {
        fill.style.width = '100%';
        document.getElementById('calc-result').innerText = "Calculating love...";
        setTimeout(() => {
            document.getElementById('calc-result').innerText = "100% Perfect Match! She gave you life, of course it's 100%! 💖";
            shootConfetti();
        }, 2000);
    }, 100);
}

// 8. Virtual Hug
let hugsSent = 0;
function sendHug() {
    const stage = document.querySelector('.hug-stage');
    if (stage.classList.contains('hugging')) return;
    
    stage.classList.add('hugging');
    hugsSent++;
    document.getElementById('hug-count').innerText = hugsSent;
    
    shootConfetti();
    
    setTimeout(() => {
        stage.classList.remove('hugging');
        document.getElementById('hug-msg').innerText = "Mom received your hug! 🤗💖";
    }, 1000);
}

// 9. Confetti
function shootConfetti() {
    const emojis = ['❤️', '💖', '🌸', '✨', '💝', '💗', '🤗'];
    for(let i=0; i<40; i++) {
        const conf = document.createElement('div');
        conf.innerText = emojis[Math.floor(Math.random()*emojis.length)];
        conf.style.position = 'fixed';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.top = '-50px';
        conf.style.fontSize = (Math.random() * 20 + 20) + 'px';
        conf.style.zIndex = '2000';
        conf.style.transition = `transform ${Math.random()*2 + 2}s cubic-bezier(.17,.67,.83,.67)`;
        document.body.appendChild(conf);
        
        setTimeout(() => {
            conf.style.transform = `translateY(110vh) translateX(${Math.random()*200 - 100}px) rotate(${Math.random()*720}deg)`;
            conf.style.opacity = '0';
        }, 50);
        
        setTimeout(() => conf.remove(), 4000);
    }
}
