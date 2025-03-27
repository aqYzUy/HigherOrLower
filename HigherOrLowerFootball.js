document.addEventListener("DOMContentLoaded", function () {
    let data = [
        { name: "Cristiano Ronaldo", image: "images/cristiano_ronaldo.jpg", value: 895 },
        { name: "Lionel Messi", image: "images/lionel_messi.jpg", value: 829 },
        { name: "Pelé", image: "images/pele.jpg", value: 757 },
        { name: "Romário", image: "images/romario.jpg", value: 772 },
        { name: "Ferenc Puskás", image: "images/ferenc_puskas.jpg", value: 741 },
        { name: "Gerd Müller", image: "images/gerd_muller.jpg", value: 735 },
        { name: "Robert Lewandowski", image: "images/robert_lewandowski.jpg", value: 650 },
        { name: "Zlatan Ibrahimović", image: "images/zlatan_ibrahimovic.jpg", value: 570 },
        { name: "Luis Suárez", image: "images/luis_suarez.jpg", value: 540 },
        { name: "Neymar Jr", image: "images/neymar_jr.jpg", value: 436 },
        { name: "Kylian Mbappé", image: "images/kylian_mbappe.jpg", value: 310 },
        { name: "Erling Haaland", image: "images/erling_haaland.jpg", value: 270 },
        { name: "Karim Benzema", image: "images/karim_benzema.jpg", value: 490 },
        { name: "Mohamed Salah", image: "images/mohamed_salah.jpg", value: 370 },
        { name: "Thomas Müller", image: "images/thomas_muller.jpg", value: 240 },
        { name: "Harry Kane", image: "images/harry_kane.jpg", value: 430 },
        { name: "Ángel Di María", image: "images/angel_di_maria.jpg", value: 200 },
        { name: "Edinson Cavani", image: "images/edinson_cavani.jpg", value: 440 },
        { name: "Ronaldo (Brazil)", image: "images/ronaldo_brazil.jpg", value: 414 },
        { name: "Thierry Henry", image: "images/thierry_henry.jpg", value: 411 }
    ];

    function formatValue(num) {
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num;
    }

    function getEndMessage(score) {
        if (score <= 5) return "Du musst besser werden";
        if (score <= 10) return "Du wirst immer besser";
        if (score <= 20) return "Langsam ein Naturtalent";
        if (score <= 40) return "Respekt";
        return "Hast du auch ein Leben?";
    }

    function updateLeaderboard(score) {
        const playerName = localStorage.getItem("playerName") || "Anonym";
        let leaderboard = JSON.parse(localStorage.getItem("leaderboardFootball")) || [];
        leaderboard.push({
            name: playerName,
            score: score
        });
        // Sort and limit to top 10
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 10);
        localStorage.setItem("leaderboardFootball", JSON.stringify(leaderboard));
        window.dispatchEvent(new Event("storage"));
    }

    let currentIndex = 0;
    let nextIndex = 1;
    let score = 0;
    let highScore = localStorage.getItem("highScoreFootball") || 0;

    const leftImage = document.getElementById("left-image");
    const rightImage = document.getElementById("right-image");
    const leftName = document.getElementById("left-name");
    const rightName = document.getElementById("right-name");
    const leftValue = document.getElementById("left-value");
    const scoreDisplay = document.getElementById("score");
    const messageDisplay = document.getElementById("message");
    const higherButton = document.getElementById("higher");
    const lowerButton = document.getElementById("lower");
    const restartButton = document.getElementById("restart");
    const gameOverModal = new bootstrap.Modal(document.getElementById("gameOverModal"));
    const finalScoreText = document.getElementById("final-score");
    const finalMessageText = document.getElementById("final-message");
    const gameContainer = document.getElementById("game-container");
    const highScoreDisplay = document.getElementById("high-score-value");

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(data);

    function updateDisplay() {
        if (currentIndex >= data.length - 1) {
            shuffleArray(data);
            currentIndex = 0;
            nextIndex = 1;
        } else {
            currentIndex++;
            nextIndex = currentIndex + 1;
        }

        if (nextIndex >= data.length) {
            nextIndex = 0;
        }

        while (data[currentIndex].name === data[nextIndex].name) {
            nextIndex++;
            if (nextIndex >= data.length) {
                nextIndex = 0;
            }
        }

        leftImage.src = data[currentIndex].image;
        leftImage.onerror = () => {
            console.error("Failed to load left image for:", data[currentIndex].name);
            leftImage.src = "images/placeholder.jpg";
        };
        leftName.textContent = data[currentIndex].name;
        leftValue.textContent = `${formatValue(data[currentIndex].value)} Tore`;
        rightImage.src = data[nextIndex].image;
        rightImage.onerror = () => {
            console.error("Failed to load right image for:", data[nextIndex].name);
            rightImage.src = "images/placeholder.jpg";
        };
        rightName.textContent = data[nextIndex].name;
        scoreDisplay.textContent = `Punkte: ${score}`;
        highScoreDisplay.textContent = highScore;
    }

    function nextRound(isHigher) {
        if ((isHigher && data[nextIndex].value > data[currentIndex].value) || (!isHigher && data[nextIndex].value < data[currentIndex].value)) {
            score++;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScoreFootball", highScore);
                highScoreDisplay.textContent = highScore;
            }
            updateDisplay();
        } else {
            updateLeaderboard(score);
            gameOverModal.show();
            gameContainer.classList.add("blurred");
            finalScoreText.textContent = `Du hast ${score === 1 ? "1 Punkt" : score + " Punkte"} erreicht!`;
            finalMessageText.textContent = getEndMessage(score);
            higherButton.disabled = true;
            lowerButton.disabled = true;
        }
    }

    higherButton.addEventListener("click", () => nextRound(true));
    lowerButton.addEventListener("click", () => nextRound(false));

    restartButton.addEventListener("click", () => {
        score = 0;
        currentIndex = -1;
        nextIndex = 0;
        shuffleArray(data);
        gameOverModal.hide();
        gameContainer.classList.remove("blurred");
        higherButton.disabled = false;
        lowerButton.disabled = false;
        updateDisplay();
    });

    updateDisplay();
});