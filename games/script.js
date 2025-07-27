const animeList = [
  "Naruto",
  "Bleach",
  "One Piece",
  "Attack on Titan",
  "Demon Slayer",
  "Death Note",
  "My Hero Academia",
  "Jujutsu Kaisen",
  "Tokyo Ghoul",
  "Dragon Ball Z"
];

// Chibi image map
const chibiMap = {
  "Naruto Uzumaki": "https://i.imgur.com/FHukD1Z.png",
  "Ichigo Kurosaki": "https://i.imgur.com/Khr2AC1.png",
  "Luffy": "https://i.imgur.com/3HTjODP.png",
  "Goku": "https://i.imgur.com/RYuFy1D.png",
  "Tanjiro Kamado": "https://i.imgur.com/x0uPfEk.png",
  "Light Yagami": "https://i.imgur.com/MuVqBOo.png",
  "Izuku Midoriya": "https://i.imgur.com/7VZjbEo.png",
  "Gojo Satoru": "https://i.imgur.com/K6aTRfz.png",
  "Ken Kaneki": "https://i.imgur.com/W3RM6xF.png"
};

// Fallback chibi stickers
const fallbackChibis = [
  "https://i.imgur.com/5Vu6s4q.png",
  "https://i.imgur.com/ZlLtzKm.png",
  "https://i.imgur.com/LF3UPjE.png"
];

let correctAnswer = "";
let scoreCorrect = 0;
let scoreWrong = 0;

const quoteText = document.getElementById('quote');
const characterText = document.getElementById('character');
const optionsDiv = document.getElementById('options');
const resultText = document.getElementById('result');
const nextBtn = document.getElementById('nextBtn');
const chibiImg = document.getElementById('chibi-img');

function fetchQuote() {
  resultText.textContent = '';
  optionsDiv.innerHTML = '';
  quoteText.textContent = "Loading...";
  characterText.textContent = '';
  chibiImg.src = "";
  nextBtn.style.display = "none";

  fetch("https://animechan.xyz/api/random")
    .then(res => res.json())
    .then(data => {
      correctAnswer = data.anime;
      quoteText.textContent = "${data.quote}";
      characterText.textContent = — ${data.character};

      // Show chibi image
      chibiImg.src = chibiMap[data.character] || getRandomItem(fallbackChibis);

      const options = generateOptions(correctAnswer);
      displayOptions(options);
    })
    .catch(err => {
      quoteText.textContent = "Failed to load quote 💔";
      console.error(err);
    });
}

function generateOptions(correct) {
  const filtered = animeList.filter(anime => anime !== correct);
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  const fakeOptions = shuffled.slice(0, 3);
  const allOptions = [...fakeOptions, correct];
  return allOptions.sort(() => Math.random() - 0.5);
}

function displayOptions(options) {
  options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => checkAnswer(option);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === correctAnswer) {
    resultText.textContent = "✅ Correct!";
    scoreCorrect++;
  } else {
    resultText.textContent = ❌ Wrong! It was ${correctAnswer};
    scoreWrong++;
  }

  updateScore();
  nextBtn.style.display = "inline-block";
}

function updateScore() {
  document.getElementById("score-correct").textContent = scoreCorrect;
  document.getElementById("score-wrong").textContent = scoreWrong;
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

nextBtn.onclick = fetchQuote;
fetchQuote();