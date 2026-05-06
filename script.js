<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Flashcard Translator</title>

<style>
    body {
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        text-align: center;
        padding: 40px;
    }

    h1 {
        margin-bottom: 20px;
    }

    input, select, button {
        padding: 10px;
        margin: 10px;
        border-radius: 8px;
        border: none;
        font-size: 16px;
    }

    button {
        background: #ff7eb3;
        color: white;
        cursor: pointer;
    }

    /* Flashcard container */
    .card-container {
        perspective: 1000px;
        margin-top: 30px;
    }

    .card {
        width: 300px;
        height: 200px;
        margin: auto;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.8s;
        cursor: pointer;
    }

    .card.flip {
        transform: rotateY(180deg);
    }

    .card-face {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        backface-visibility: hidden;
        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    }

    .front {
        background: #ffffff;
        color: #333;
    }

    .back {
        background: #ff7eb3;
        transform: rotateY(180deg);
    }
</style>
</head>

<body>

<h1>📚 Flashcard Translator</h1>

<input type="text" id="wordInput" placeholder="Enter English word">
<select id="language">
    <option value="es">Spanish</option>
    <option value="fr">French</option>
    <option value="hi">Hindi</option>
    <option value="de">German</option>
</select>

<br>
<button onclick="translateWord()">Generate Flashcard</button>

<div class="card-container">
    <div class="card" id="flashcard" onclick="flipCard()">
        <div class="card-face front" id="frontText">Enter a word</div>
        <div class="card-face back" id="backText">Translation</div>
    </div>
</div>

<script>
async function translateWord() {
    const word = document.getElementById("wordInput").value;
    const targetLang = document.getElementById("language").value;

    if (!word) {
        alert("Please enter a word");
        return;
    }

    // Show word on front
    document.getElementById("frontText").innerText = word;
    document.getElementById("backText").innerText = "Translating...";

    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${word}&langpair=en|${targetLang}`
        );

        const data = await response.json();
        const translated = data.responseData.translatedText;

        document.getElementById("backText").innerText = translated;

    } catch (error) {
        document.getElementById("backText").innerText = "Error fetching translation";
    }
}

function flipCard() {
    document.getElementById("flashcard").classList.toggle("flip");
}
</script>

</body>
</html>
