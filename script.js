const PASSWORD = "FUCKTHEGOVERNMENT";
const birthday = new Date(2026, 7, 24, 1, 0, 0); 
let index = 0;
let mainStarted = false;
let starsMusicStarted = false;
let grandFinaleTriggered = false;
let claraRainStarted = false;
let claraSpawnTimer = null;
let claraAnimationId = null;
let claraSpawnCount = 0;
const claraItems = [];
const CLARA_MAX_ON_SCREEN = 260;

// ===== TOGETHER TIMER =====
const togetherStart = new Date(2023, 11, 12, 18, 47, 0); // December 12, 2023 18:47

const reasons = [];
for (let i = 1; i <= 100; i++) {
  if (i === 1) reasons.push("Reason 1: You make me laugh every single day.");
  else if (i === 2) reasons.push("Reason 2: The way you look at me when you smile.");
  else if (i === 3) reasons.push("Reason 3: You are my absolute best friend.");
  else if (i === 100) reasons.push("Because you are YOU."); 
  else reasons.push(`Reason ${i}`); 
}

const finalLetterLines = [
  "Thank you for being a part of my life.",
  "You always make my day every single time you text me, and I am forever grateful for it.",
  "I really hope you liked this site that I created only for you.",
  "Yours forever truly,<br/>Gökhan 'HollowAst'<br/>(Your babygirl, shut up.)",
  "Happy Birthday!!!"
];

const finalReasonLine = 'Reason 100: <span class="final-reason-text">Because you are <span class="rainbow-you">YOU</span></span>';

const gateScreen = document.getElementById("gate-screen");
const proceedBtn = document.getElementById("proceedBtn");
const countdownScreen = document.getElementById("countdown-screen");
const countdownEl = document.getElementById("countdown");
const enterBtn = document.getElementById("enterBtn");
const devBtn = document.getElementById("devBtn");
const passwordOverlay = document.getElementById("password-overlay");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const error = document.getElementById("error");
const devMessage = document.getElementById("devMessage");
const introScreen = document.getElementById("intro-screen");
const introText = document.getElementById("intro-text");
const mainScreen = document.getElementById("main-screen");
const sky = document.getElementById("sky");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const finalScreen = document.getElementById("final-screen");
const loginMusic = document.getElementById("loginMusic");
const bgMusic = document.getElementById("bgMusic");
const writingSound = document.getElementById("writingSound");
const starsMusic = document.getElementById("starsMusic");

updateCountdown();
setInterval(updateCountdown, 1000); 
createAmbientSpace(); 
setInterval(launchShootingStar, 6000); 

function updateTogetherTimer() {
  const now = new Date();
  let diff = now - togetherStart;
  if (diff < 0) diff = 0;

  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours   = Math.floor(diff / (1000 * 60 * 60)) % 24;

  let years = now.getFullYear() - togetherStart.getFullYear();
  let months = now.getMonth() - togetherStart.getMonth();
  let dayDiff = now.getDate() - togetherStart.getDate();

  if (dayDiff < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    dayDiff += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const el = document.getElementById("together-count");
  if (el) {
    el.textContent = `${years}y · ${months}m · ${dayDiff}d · ${hours}h · ${minutes}m · ${seconds}s`;
  }
}

function updateCountdown() {
  const now = new Date();
  const diff = birthday - now;
  if (diff <= 0) {
    if (countdownEl) countdownEl.innerText = "It's ready.";
    if (enterBtn) enterBtn.classList.remove("hidden");
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  if (countdownEl) countdownEl.innerText = `${d}d ${h}h ${m}m ${s}s`;
}

function isCountdownScreenVisible() {
  return countdownScreen && !countdownScreen.classList.contains("hidden");
}

function tryPlayLoginMusic() {
  if (!loginMusic || !isCountdownScreenVisible()) return;
  loginMusic.volume = 0.6;
  loginMusic.play().catch(() => {});
}

function stopLoginMusic() {
  if (!loginMusic) return;
  loginMusic.pause();
  loginMusic.currentTime = 0;
}

function playMusic() {
  if (!bgMusic) return;
  bgMusic.volume = 1;
  bgMusic.play().catch(() => {
    document.body.addEventListener("click", () => {
      if (!mainStarted) bgMusic.play().catch(() => {});
    }, { once: true });
  });
}

function stopBackgroundMusic() {
  if (!bgMusic) return;
  bgMusic.pause();
  bgMusic.currentTime = 0;
}

function playWritingSound() {
  if (!writingSound) return;
  writingSound.pause();
  writingSound.currentTime = 0;
  writingSound.volume = 0.36;
  writingSound.play().catch(() => {});
}

function stopWritingSound() {
  if (!writingSound) return;
  writingSound.pause();
  writingSound.currentTime = 0;
  writingSound.volume = 0.36;
}

function startStarsMusicSubtle() {
  if (!starsMusic) return;
  starsMusic.muted = false;
  starsMusic.volume = 0.14;
  if (!starsMusicStarted) {
    starsMusicStarted = true;
    starsMusic.currentTime = 0;
  }
  starsMusic.play().catch(() => {});
}

function raiseStarsMusicForHeart() {
  if (!starsMusic) return;
  starsMusic.muted = false;
  starsMusic.volume = 0.42;
  if (starsMusic.paused) {
    starsMusic.play().catch(() => {
      document.body.addEventListener("pointerdown", () => {
        if (mainStarted && starsMusic.paused) {
          starsMusic.volume = 0.42;
          starsMusic.play().catch(() => {});
        }
      }, { once: true });
    });
  }
}

function stopStarsMusic() {
  if (!starsMusic) return;
  starsMusic.muted = false;
  starsMusic.pause();
  starsMusic.currentTime = 0;
}

function stopAllMusic() {
  stopBackgroundMusic();
  stopStarsMusic();
  const omori = document.getElementById("omoriMusic");
  if (omori) { omori.pause(); omori.currentTime = 0; }
  const premonition = document.getElementById("premonitionMusic");
  if (premonition) { premonition.pause(); premonition.currentTime = 0; }
  const sans = document.getElementById("sansMusic");
  if (sans) { sans.pause(); sans.currentTime = 0; }
}

function proceedToCountdown() {
  if (!gateScreen || !countdownScreen || gateScreen.classList.contains("hidden")) return;
  gateScreen.classList.add("hidden");
  countdownScreen.classList.remove("hidden");
  tryPlayLoginMusic();
}

if (proceedBtn) {
  proceedBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    proceedToCountdown();
  });
  proceedBtn.addEventListener("pointerup", (event) => {
    event.preventDefault();
    event.stopPropagation();
    proceedToCountdown();
  });
}

enterBtn.onclick = () => {
  countdownScreen.classList.add("hidden");
  stopLoginMusic();
  startStarsMusicSubtle();
  playMusic(); 
  startIntro();
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function typeLine(text) {
  const line = document.createElement("div");
  const typedText = document.createElement("span");
  const cursor = document.createElement("span");
  line.className = "intro-line";
  cursor.className = "type-cursor";
  line.appendChild(typedText);
  line.appendChild(cursor);
  introText.appendChild(line);

  return new Promise((resolve) => {
    let charIndex = 0;
    playWritingSound();
    const interval = setInterval(() => {
      typedText.textContent += text[charIndex];
      charIndex++;
      if (charIndex >= text.length) {
        clearInterval(interval);
        stopWritingSound();
        cursor.remove();
        resolve();
      }
    }, 54);
  });
}

async function startIntro() {
  introScreen.classList.remove("hidden");
  introScreen.classList.remove("intro-clearing");
  introScreen.classList.remove("intro-focus-out");
  introText.innerHTML = "";

  const introLines = [
    "Hiiii babyyy!!",
    "I spent a lot of time making this only for you.",
    "Because you deserve the whole world (and a cute website too).",
    "Take your time and enjoy every bit of it."
  ];

  for (let i = 0; i < introLines.length; i++) {
    await typeLine(introLines[i]);
    await sleep(i === introLines.length - 1 ? 1300 : 650);
    stopWritingSound();
  }

  await sleep(250);
  introScreen.classList.add("intro-clearing");
  await sleep(700);
  introScreen.classList.add("intro-focus-out");
  await sleep(2500);
  introScreen.classList.add("hidden");
  introText.innerHTML = "";
  introScreen.classList.remove("intro-clearing");
  introScreen.classList.remove("intro-focus-out");
  startMain();
}

function startMain() {
  mainStarted = true;
  stopBackgroundMusic();
  raiseStarsMusicForHeart();
  mainScreen.classList.remove("hidden");
  mainScreen.classList.remove("main-preparing");
  progress.innerText = "0 / 100"; 
  createStarsSymmetrical(); 
  setupSmartClicks();
  updateTogetherTimer();
  setInterval(updateTogetherTimer, 1000);
}

function createAmbientSpace() {
  const ambientStarCount = 65; 
  for (let i = 0; i < ambientStarCount; i++) {
    const ambientStar = document.createElement("div");
    ambientStar.classList.add("ambient-background-star");
    ambientStar.style.left = Math.random() * 100 + "vw";
    ambientStar.style.top = Math.random() * 100 + "vh";
    const size = Math.random() * 3 + 1.5; 
    ambientStar.style.width = size + "px";
    ambientStar.style.height = size + "px";
    ambientStar.style.animation = `ambientTwinkle ${Math.random() * 3 + 2.5}s infinite ease-in-out ${Math.random() * 5}s`;
    document.body.appendChild(ambientStar);
  }
}

function launchShootingStar() {
  if (mainScreen.classList.contains("hidden") || !popup.classList.contains("hidden")) return;
  const meteor = document.createElement("div");
  meteor.classList.add("shooting-star-particle");
  const startX = Math.random() * 100;
  const startY = Math.random() * 20; 
  meteor.style.left = startX + "vw";
  meteor.style.top = startY + "vh";
  const angle = Math.random() * 30 + 30; 
  const duration = Math.random() * 300 + 500; 
  const travelDistance = Math.random() * 20 + 20; 
  meteor.style.transitionProperty = "transform, opacity";
  meteor.style.transitionTimingFunction = "linear";
  meteor.style.transitionDuration = `${duration}ms`;
  meteor.style.transform = `rotate(-${angle}deg) translate(0, 0) scaleX(0)`;
  document.body.appendChild(meteor);
  setTimeout(() => {
    meteor.style.opacity = "1";
    meteor.style.transform = `rotate(-${angle}deg) translate(-${travelDistance}vw, 0) scaleX(0.4)`;
    setTimeout(() => { meteor.style.opacity = "0"; }, duration * 0.5);
  }, 30);
  setTimeout(() => { meteor.remove(); }, duration + 50);
}

function createStarsSymmetrical() {
  sky.innerHTML = ""; 
  const scaleX = 1.45;   
  const scaleY = 2.4;    
  const offsetY = -6;     
  function getHeartPos(t) {
    let x = 16 * Math.pow(Math.sin(t), 3);
    let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    return { x: 50 + x * scaleX, y: 50 - y * scaleY + offsetY };
  }
  const halfPoints = [];
  const resolution = 1000;
  for (let i = 0; i <= resolution; i++) {
    const t = Math.PI + (i / resolution) * Math.PI;
    halfPoints.push(getHeartPos(t));
  }
  const distances = [];
  let totalLength = 0;
  for (let i = 1; i < halfPoints.length; i++) {
    totalLength += Math.hypot(halfPoints[i].x - halfPoints[i - 1].x, halfPoints[i].y - halfPoints[i - 1].y);
    distances.push(totalLength);
  }
  const sideTotalRight = 49; 
  const sideTotalLeft = 48;
  let delayIndex = 0;
  function deployStar(pos, delayTime) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = pos.x + "%";
    star.style.top = pos.y + "%";
    star.style.animationDelay = `${delayTime}ms`;
    sky.appendChild(star);
  }
  const topCenterPos = halfPoints[0];
  deployStar(topCenterPos, 0);
  delayIndex++;
  const maxSides = Math.max(sideTotalRight, sideTotalLeft);
  for (let i = 1; i <= maxSides; i++) {
    const dynamicDelay = delayIndex * 45;
    if (i <= sideTotalRight) {
      const targetDistRight = (i / (sideTotalRight + 1)) * totalLength;
      let idxR = 0;
      while (idxR < distances.length - 1 && distances[idxR] < targetDistRight) idxR++;
      deployStar(halfPoints[idxR], dynamicDelay);
    }
    if (i <= sideTotalLeft) {
      const targetDistLeft = (i / (sideTotalLeft + 1)) * totalLength;
      let idxL = 0;
      while (idxL < distances.length - 1 && distances[idxL] < targetDistLeft) idxL++;
      const rightPosForLeft = halfPoints[idxL];
      deployStar({ x: 50 - (rightPosForLeft.x - 50), y: rightPosForLeft.y }, dynamicDelay);
    }
    delayIndex++;
  }
  deployStar(halfPoints[halfPoints.length - 1], delayIndex * 45);
}

function setupSmartClicks() {
  sky.onclick = (e) => {
    if (!popup.classList.contains("hidden")) return;
    const stars = Array.from(document.querySelectorAll(".star:not(.used)"));
    if (stars.length === 0) return;
    let closestStar = null;
    let minDistance = Infinity;
    stars.forEach((star) => {
      const rect = star.getBoundingClientRect();
      const distance = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
      if (distance < minDistance) {
        minDistance = distance;
        closestStar = star;
      }
    });
    if (closestStar && minDistance < 15) {
      e.stopPropagation();
      clickStar(closestStar);
    }
  };
}

function createStarBurst(x, y) {
  for (let i = 0; i < 10; i++) {
    const spark = document.createElement("div");
    spark.classList.add("click-spark-particle");
    spark.style.left = x + "px";
    spark.style.top = y + "px";
    const size = Math.random() * 2 + 2;
    spark.style.width = size + "px";
    spark.style.height = size + "px";
    document.body.appendChild(spark);
    const angle = (i / 10) * Math.PI * 2 + (Math.random() * 0.5);
    const distance = Math.random() * 40 + 30; 
    setTimeout(() => {
      spark.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
      spark.style.opacity = "0";
    }, 10);
    setTimeout(() => spark.remove(), 800);
  }
}

function maybeTriggerGrandFinale() {
  if (grandFinaleTriggered) return;
  if (index < 99) return;
  if (!popup.classList.contains("hidden")) return;
  grandFinaleTriggered = true;
  triggerGrandFinale();
}

function clickStar(star) {
  if (star.classList.contains("used")) return;
  star.classList.add("used");
  star.style.opacity = ""; 
  const rect = star.getBoundingClientRect();
  createStarBurst(rect.left + rect.width / 2, rect.top + rect.height / 2); 
  popup.classList.remove("hidden");
  popupText.innerText = reasons[index++];
  progress.innerText = `${index} / 100`;
  nextBtn.onclick = () => {
    popup.classList.add("hidden");
    maybeTriggerGrandFinale();
  };
}

function triggerGrandFinale() {
  if (document.querySelector("#main-screen h1")) {
    document.querySelector("#main-screen h1").classList.add("fade-out-titles");
  }
  if (progress) progress.classList.add("fade-out-titles");
  document.querySelectorAll(".ambient-background-star").forEach((s) => {
    s.style.transition = "opacity 1.5s ease";
    s.style.opacity = "0";
  });
  stopBackgroundMusic();
  stopStarsMusic();
  const omoriMusic = document.getElementById("omoriMusic");
  if (omoriMusic) {
    omoriMusic.currentTime = 0;
    omoriMusic.play().catch(() => {});
  }
  setTimeout(() => {
    const finalStar = document.createElement("div");
    finalStar.classList.add("star", "grand-final-star");
    finalStar.style.left = "50%";
    finalStar.style.top = "44%";
    sky.appendChild(finalStar);
    setTimeout(() => { finalStar.style.opacity = "1"; }, 100);
    finalStar.onclick = (e) => {
      e.stopPropagation();
      if (finalStar.classList.contains("used-final")) return;
      finalStar.classList.add("used-final");
      mainScreen.classList.add("hidden"); 
      finalScreen.classList.remove("hidden"); 
      finalScreen.innerHTML = `
        <div class="final-heart-field">
          <div id="typewriter-container"></div>
        </div>
      `;
      createFinalHearts();
      startTypewriterAnimation(0);
    };
  }, 1600);
}

function createFinalHearts() {
  const field = finalScreen.querySelector(".final-heart-field");
  if (!field) return;
  for (let i = 0; i < 46; i++) {
    const heart = document.createElement("div");
    heart.classList.add("final-floating-heart");
    heart.innerText = Math.random() > 0.5 ? "♡" : "♥";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.top = Math.random() * 100 + "%";
    heart.style.fontSize = Math.random() * 28 + 18 + "px";
    heart.style.animationDelay = Math.random() * 5 + "s";
    heart.style.animationDuration = Math.random() * 5 + 6 + "s";
    field.appendChild(heart);
  }
}

function typeHtmlIntoElement(element, rawLine, callback) {
  let currentCharIdx = 0;
  let renderedHtml = "";
  const interval = setInterval(() => {
    if (currentCharIdx >= rawLine.length) {
      clearInterval(interval);
      callback();
      return;
    }
    if (rawLine[currentCharIdx] === "<") {
      const tagEnd = rawLine.indexOf(">", currentCharIdx);
      if (tagEnd !== -1) {
        renderedHtml += rawLine.slice(currentCharIdx, tagEnd + 1);
        currentCharIdx = tagEnd + 1;
        element.innerHTML = renderedHtml;
        return;
      }
    }
    renderedHtml += rawLine[currentCharIdx];
    currentCharIdx++;
    element.innerHTML = renderedHtml;
  }, 45);
}

function startTypewriterAnimation(lineIdx) {
  const container = document.getElementById("typewriter-container");
  if (!container) return;
  const displayLines = [...finalLetterLines, finalReasonLine];
  if (lineIdx < displayLines.length) {
    const lineWrapper = document.createElement("div");
    lineWrapper.classList.add("final-line");
    if (displayLines[lineIdx] === finalReasonLine) lineWrapper.classList.add("final-reason-line");
    container.appendChild(lineWrapper);
    typeHtmlIntoElement(lineWrapper, displayLines[lineIdx], () => {
      setTimeout(() => startTypewriterAnimation(lineIdx + 1), 1000);
    });
    return;
  }
  const scoreWrapper = document.createElement("div");
  scoreWrapper.classList.add("final-score");
  scoreWrapper.textContent = "100 / 100 <3";
  container.appendChild(scoreWrapper);
  setTimeout(() => {
    scoreWrapper.classList.add("visible");
    startClaraRain();
    setTimeout(() => showSecretButton(), 15000);
  }, 100);
}

function showSecretButton() {
  const field = finalScreen.querySelector(".final-heart-field");
  if (!field) return;
  const btn = document.createElement("button");
  btn.id = "secret-btn";
  btn.innerText = "...";
  btn.style.cssText = `
    position: absolute;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    background: transparent;
    border: none;
    color: rgba(255, 220, 235, 0.22);
    font-size: 20px;
    cursor: pointer;
    padding: 6px 12px;
    transition: all 0.35s ease;
    letter-spacing: 3px;
  `;
  btn.onmouseover = () => { btn.style.color = "rgba(255, 200, 220, 0.6)"; };
  btn.onmouseout = () => { btn.style.color = "rgba(255, 220, 235, 0.22)"; };
  btn.onclick = () => startAfterCredits();
  field.appendChild(btn);
}

function startAfterCredits() {
  stopAllMusic();

  let premonition = document.getElementById("premonitionMusic");
  if (!premonition) {
    premonition = document.createElement("audio");
    premonition.id = "premonitionMusic";
    premonition.src = "Premonition.mp3";
    premonition.loop = true;
    document.body.appendChild(premonition);
  }
  premonition.currentTime = 0;
  premonition.volume = 0.7;
  premonition.play().catch(() => {});

  finalScreen.innerHTML = "";
  finalScreen.style.background = "#000";
  finalScreen.style.display = "flex";
  finalScreen.style.alignItems = "center";
  finalScreen.style.justifyContent = "center";

  const textContainer = document.createElement("div");
  textContainer.style.cssText = `
    color: #ffe3ee;
    font-size: 21px;
    text-align: center;
    line-height: 1.9;
    max-width: 640px;
    padding: 20px;
  `;
  finalScreen.appendChild(textContainer);

  const sentences = [
    "Oh. So you found it.",
    "That makes my job a lot easier.",
    "Now, let's talk about the real thing."
  ];

  let sentenceIndex = 0;

  function typeSentence() {
    if (sentenceIndex >= sentences.length) {
      setTimeout(() => {
        textContainer.style.transition = "opacity 1.6s ease";
        textContainer.style.opacity = "0";
        setTimeout(() => startDislikeStars(), 1800);
      }, 2500);
      return;
    }

    const sentence = sentences[sentenceIndex];
    const words = sentence.split(" ");
    let wordIndex = 0;

    function typeWord() {
      if (wordIndex >= words.length) {
        // Finished this sentence → add a space after the period, then wait
        textContainer.appendChild(document.createTextNode(" "));
        sentenceIndex++;
        setTimeout(typeSentence, 1100);
        return;
      }

      // Add space before the word (except the first word of the sentence)
      if (wordIndex > 0) {
        textContainer.appendChild(document.createTextNode(" "));
      }

      const span = document.createElement("span");
      span.textContent = words[wordIndex];
      span.style.cssText = `
        opacity: 0;
        transform: translateY(18px);
        transition: all 0.55s ease;
        display: inline;
      `;
      textContainer.appendChild(span);

      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      }, 20);

      wordIndex++;
      setTimeout(typeWord, 270);
    }

    typeWord();
  }

  typeSentence();
}

function startDislikeStars() {
  finalScreen.classList.add("hidden");
  mainScreen.classList.remove("hidden");
  mainScreen.style.opacity = "1";

  // Hide timer and "Made with love"
  const timer = document.querySelector(".together-timer");
  if (timer) timer.style.display = "none";
  const madeWithLove = document.querySelector(".made-with-love");
  if (madeWithLove) madeWithLove.style.display = "none";

  // Center the title + changed to HATE
  const title = document.querySelector("#main-screen h1");
  if (title) {
    title.innerText = "100 Reasons I HATE About You";
    title.classList.remove("fade-out-titles");
    title.style.position = "absolute";
    title.style.top = "48%";
    title.style.left = "50%";
    title.style.transform = "translate(-50%, -50%)";
    title.style.zIndex = "30";
    title.style.margin = "0";
    title.style.textAlign = "center";
    title.style.width = "90%";
  }

  progress.style.display = "none";

  sky.innerHTML = "";
  index = 0;
  grandFinaleTriggered = false;
  createStarsSymmetrical();

  sky.onclick = (e) => {
    if (!popup.classList.contains("hidden")) return;
    const stars = Array.from(document.querySelectorAll(".star:not(.used)"));
    if (stars.length === 0) return;
    let closestStar = null;
    let minDistance = Infinity;
    stars.forEach((star) => {
      const rect = star.getBoundingClientRect();
      const distance = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
      if (distance < minDistance) {
        minDistance = distance;
        closestStar = star;
      }
    });
    if (closestStar && minDistance < 20) {
      e.stopPropagation();
      clickDislikeStar(closestStar);
    }
  };
}

function clickDislikeStar(star) {
  if (star.classList.contains("used")) return;
  star.classList.add("used");
  star.style.opacity = "0.25";

  stopAllMusic();

  popup.classList.remove("hidden");
  popupText.innerText = "None. Not a single thing.";

  nextBtn.onclick = () => {
    popup.classList.add("hidden");
    mainScreen.style.transition = "opacity 2s ease";
    mainScreen.style.opacity = "0";

    setTimeout(() => {
      mainScreen.classList.add("hidden");
      finalScreen.classList.remove("hidden");
      finalScreen.innerHTML = "";
      finalScreen.style.background = "#000";
      finalScreen.style.display = "flex";
      finalScreen.style.flexDirection = "column";
      finalScreen.style.alignItems = "center";
      finalScreen.style.justifyContent = "center";
      finalScreen.style.padding = "40px 20px";
      finalScreen.style.opacity = "1";

      // Play sans.mp3 (looping)
      let sans = document.getElementById("sansMusic");
      if (!sans) {
        sans = document.createElement("audio");
        sans.id = "sansMusic";
        sans.src = "sans.mp3";
        sans.loop = true;
        document.body.appendChild(sans);
      }
      sans.currentTime = 0;
      sans.volume = 0.75;
      sans.play().catch(() => {});

      // Centered text stream
      const textStream = document.createElement("div");
      textStream.id = "final-text-stream";
      textStream.style.cssText = `
        width: min(92vw, 560px);
        color: #ffe3ee;
        font-size: 18px;
        line-height: 1.8;
        text-align: center;
        margin-bottom: 20px;
      `;
      finalScreen.appendChild(textStream);

      // Fixed secret button (stays forever)
      const fixedBtn = document.createElement("button");
      fixedBtn.innerText = "...";
      fixedBtn.style.cssText = `
        display: none;
        margin: 10px auto 30px;
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,200,220,0.3);
        color: #ffd6e8;
        padding: 9px 26px;
        border-radius: 999px;
        font-size: 18px;
        letter-spacing: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
      `;
      fixedBtn.onmousedown = () => {
        fixedBtn.style.transform = "scale(0.93)";
        fixedBtn.style.background = "rgba(255,180,210,0.2)";
      };
      fixedBtn.onmouseup = () => {
        fixedBtn.style.transform = "scale(1)";
        fixedBtn.style.background = "rgba(255,255,255,0.07)";
      };
      fixedBtn.onmouseleave = () => {
        fixedBtn.style.transform = "scale(1)";
        fixedBtn.style.background = "rgba(255,255,255,0.07)";
      };
      fixedBtn.onclick = (e) => e.preventDefault();
      finalScreen.appendChild(fixedBtn);

      // Hutao image at the end
      const hutaoImg = document.createElement("img");
      hutaoImg.src = "hutao.png";
      hutaoImg.style.cssText = `
        display: none;
        width: 90px;
        margin-top: 20px;
        opacity: 0;
        transition: opacity 1.5s ease;
      `;
      finalScreen.appendChild(hutaoImg);

      const messages = [
        { text: "You fell for it didn't you?", delay: 2000 },
        { text: "I can imagine you got tense.", delay: 2000 },
        { text: "But I know you're gonna deny it even if you did just a little bit.", delay: 2000 },
        { text: "Anyways, that's a win in my book.", delay: 2000 },
        { text: "Wish I could have seen your face throughout all of these.", delay: 2000 },
        { text: "I could have asked you to record yourself but nahhh I'll let my imagination play.", delay: 2000 },
        { text: "Creating this site took WAY MORE than I thought.", delay: 2000 },
        { text: "So I'll end it here.", delay: 2000 },
        { text: "There is nothing to see anymore.", delay: 2000 },
        { text: "No secret buttons.", delay: 2000 },
        { text: "I phromise.", delay: 2000 },
        { text: "You can believe me.", delay: 2000 },
        { text: "Happy birthday again my love.", delay: 60000 }, // 1 minute
        { text: "Are you still here?", delay: 2000 },
        { text: "You don't want it to end do you?", delay: 2000 },
        { text: "How cute...", delay: 2000 },
        { text: "But really", delay: 2000 },
        { text: "There is nothing", delay: 2000 },
        { text: "Other than me yapping for you to leave the site", delay: 2000 },
        { text: "So goodbye", delay: 30000 }, // 30 seconds
        { text: "Oh you are determined.", delay: 2000 },
        { text: "Alright fine.", delay: 2000 },
        { text: "You win.", delay: 2000 },
        { text: "I'll give you your secret button.", delay: 2000 },
        { text: "There.", delay: 2000, showButton: true },
        { text: "Happy now?", delay: 2000 },
        { text: "You can click on it infinite amount of times since you really wanted that button.", delay: 2000 },
        { text: "That's really it.", delay: 2000 },
        { text: "There is nothing more.", delay: 2000 },
        { text: "If you wait more for something to come up", delay: 2000 },
        { text: "You will be very VERY disappointed.", delay: 2000 },
        { text: "So I advise you to leave before that happens.", delay: 2000 },
        { text: "I'll stop right now.", delay: 2000, showHutao: true }
      ];

      let msgIndex = 0;
      const maxVisible = 6;

      function addNextMessage() {
        if (msgIndex >= messages.length) return;

        const current = messages[msgIndex];

        // Keep only recent lines
        while (textStream.children.length >= maxVisible) {
          textStream.removeChild(textStream.firstChild);
        }

        const line = document.createElement("div");
        line.style.cssText = `
          margin-bottom: 20px;
          opacity: 0;
          transform: translateY(24px);
          transition: all 0.7s ease;
        `;
        line.innerText = current.text;
        textStream.appendChild(line);

        setTimeout(() => {
          line.style.opacity = "1";
          line.style.transform = "translateY(0)";
        }, 50);

        if (current.showButton) {
          fixedBtn.style.display = "block";
        }

        if (current.showHutao) {
          setTimeout(() => {
            hutaoImg.style.display = "block";
            setTimeout(() => {
              hutaoImg.style.opacity = "1";
            }, 100);
          }, 800);
        }

        msgIndex++;
        setTimeout(addNextMessage, current.delay);
      }

      addNextMessage();
    }, 2100);
  };
}

function startClaraRain() {
  if (claraRainStarted) return;
  const field = finalScreen.querySelector(".final-heart-field");
  if (!field) return;
  claraRainStarted = true;
  const layer = document.createElement("div");
  layer.classList.add("clara-layer");
  field.appendChild(layer);
  for (let i = 0; i < 12; i++) {
    setTimeout(() => spawnCharacter(layer), i * 180);
  }
  claraSpawnTimer = setInterval(() => spawnCharacter(layer), 650);
  if (!claraAnimationId) {
    claraAnimationId = requestAnimationFrame(updateCharacters);
  }
}

function spawnCharacter(layer) {
  const rect = layer.getBoundingClientRect();
  const width = rect.width || window.innerWidth;
  const height = rect.height || window.innerHeight;
  if (claraItems.length >= CLARA_MAX_ON_SCREEN) {
    const oldest = claraItems.shift();
    if (oldest && oldest.el) oldest.el.remove();
  }
  const size = Math.random() * 48 + 52;
  const img = document.createElement("img");
  img.classList.add("clara-fall");
  img.draggable = false;
  const characters = ["clara.png", "hutao.png", "mona.png"];
  img.src = characters[Math.floor(Math.random() * characters.length)];
  img.style.setProperty("--clara-size", size + "px");
  layer.appendChild(img);
  const startX = Math.random() * Math.max(width - size, 1);
  const targetColumnX = Math.random() * width * 0.8;
  const item = {
    el: img,
    x: startX,
    y: -size - Math.random() * 220,
    vx: (targetColumnX - startX) * 0.008 + (Math.random() * 2.8 - 1.4),
    vy: Math.random() * 1.6,
    rotation: Math.random() * 360,
    vr: Math.random() * 5 - 2.5,
    size,
    restY: height * 0.85 + Math.random() * 60,
    gravity: 0.16 + Math.random() * 0.06,
    settled: false,
    isDragging: false
  };
  makeDraggable(item);
  claraItems.push(item);
  claraSpawnCount++;
  requestAnimationFrame(() => img.classList.add("visible"));
}

function makeDraggable(item) {
  const el = item.el;
  let isDragging = false;
  let offsetX, offsetY;
  el.style.cursor = "grab";
  el.style.userSelect = "none";
  el.style.touchAction = "none";
  const startDrag = (clientX, clientY) => {
    isDragging = true;
    item.isDragging = true;
    el.style.cursor = "grabbing";
    el.style.zIndex = 99999;
    const rect = el.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
  };
  const moveDrag = (clientX, clientY) => {
    if (!isDragging) return;
    item.x = clientX - offsetX;
    item.y = clientY - offsetY;
    item.vx = 0;
    item.vy = 0;
    el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0) rotate(${item.rotation}deg)`;
  };
  const endDrag = () => {
    if (isDragging) {
      isDragging = false;
      item.isDragging = false;
      el.style.cursor = "grab";
    }
  };
  el.addEventListener("mousedown", (e) => { startDrag(e.clientX, e.clientY); e.preventDefault(); });
  document.addEventListener("mousemove", (e) => { if (isDragging) moveDrag(e.clientX, e.clientY); });
  document.addEventListener("mouseup", endDrag);
  el.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  }, { passive: false });
  document.addEventListener("touchmove", (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      moveDrag(touch.clientX, touch.clientY);
      e.preventDefault();
    }
  }, { passive: false });
  document.addEventListener("touchend", endDrag);
}

function updateCharacters() {
  const field = finalScreen.querySelector(".final-heart-field");
  const width = field ? field.clientWidth : window.innerWidth;
  claraItems.forEach((item, index) => {
    if (item.isDragging) {
      item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0) rotate(${item.rotation}deg)`;
      return;
    }
    item.vy += item.gravity;
    item.vx *= item.settled ? 0.96 : 0.995;
    item.vy *= 0.995;
    item.x += item.vx;
    item.y += item.vy;
    item.rotation += item.vr;
    if (item.x <= 0) {
      item.x = 0;
      item.vx = Math.abs(item.vx) * 0.75;
      item.vr *= -0.7;
    }
    if (item.x + item.size >= width) {
      item.x = width - item.size;
      item.vx = -Math.abs(item.vx) * 0.75;
      item.vr *= -0.7;
    }
    if (item.y >= item.restY) {
      item.y = item.restY;
      if (Math.abs(item.vy) > 0.6) {
        item.vy *= -0.45;
        item.vx += Math.random() * 1.1 - 0.55;
        item.vr *= 0.8;
      } else {
        item.vy = 0;
        item.vx *= 0.88;
        item.vr *= 0.88;
        item.settled = true;
      }
    }
    for (let j = index + 1; j < claraItems.length; j++) {
      const other = claraItems[j];
      const dx = item.x + item.size / 2 - (other.x + other.size / 2);
      const dy = item.y + item.size / 2 - (other.y + other.size / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < (item.size + other.size) / 1.6 && dist > 0) {
        const angle = Math.atan2(dy, dx);
        const overlap = (item.size + other.size) / 1.6 - dist;
        item.x += Math.cos(angle) * overlap * 0.3;
        item.y += Math.sin(angle) * overlap * 0.3;
        other.x -= Math.cos(angle) * overlap * 0.3;
        other.y -= Math.sin(angle) * overlap * 0.3;
        item.vx += Math.cos(angle) * 1.2;
        item.vy += Math.sin(angle) * 0.8;
        other.vx -= Math.cos(angle) * 1.2;
        other.vy -= Math.sin(angle) * 0.8;
      }
    }
    item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0) rotate(${item.rotation}deg)`;
  });
  claraAnimationId = requestAnimationFrame(updateCharacters);
}

devBtn.onclick = () => {
  passwordOverlay.classList.remove("hidden");
  passwordOverlay.style.display = "flex";
  devMessage.innerText = "Nuh uh I'm not giving you the code. ehe";
  tryPlayLoginMusic();
};

unlockBtn.onclick = () => {
  if (passwordInput.value === PASSWORD) {
    passwordOverlay.classList.add("hidden");
    passwordOverlay.style.display = "none";
    enterBtn.classList.remove("hidden");
    tryPlayLoginMusic();
  } else {
    error.innerText = "Wrong code";
  }
};

function closeReasonPopup() {
  if (popup && !popup.classList.contains("hidden")) {
    popup.classList.add("hidden");
    maybeTriggerGrandFinale();
  }
}

popup.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const clickedPopup = event.target.closest("#popup");
  const clickedStar = event.target.closest(".star");
  if (!popup.classList.contains("hidden") && !clickedPopup && !clickedStar) {
    closeReasonPopup();
  }
});