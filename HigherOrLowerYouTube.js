document.addEventListener("DOMContentLoaded", function () {
    let data = [
        { name: "Paluten", image: "images/paluten.jpg", value: 5560000, hint: "Deutscher YouTuber, bekannt für Minecraft-Videos" },
        { name: "GermanLetsPlay", image: "images/germanletsplay.jpg", value: 3740000, hint: "Gaming-YouTuber mit humorvollen Let’s Plays" },
        { name: "iCrimax", image: "images/icrimax.jpg", value: 3890000, hint: "Junger YouTuber, bekannt für GTA-Content" },
        { name: "StandartSkill", image: "images/standartskill.jpg", value: 3530000, hint: "Gaming-YouTuber mit Fokus auf Fortnite" },
        { name: "ItsAssiVTV", image: "images/itsassivtv.jpg", value: 1190000, hint: "YouTuber mit unterhaltsamen Challenges" },
        { name: "EliasN97", image: "images/elias97.jpg", value: 1460000, hint: "FIFA- und Gaming-Content Creator" },
        { name: "Gronkh", image: "images/gronkh.jpg", value: 5010000, hint: "Deutscher Let’s Play-Pionier" },
        { name: "Rewinside", image: "images/rewinside.jpg", value: 3410000, hint: "YouTuber mit vielfältigem Gaming-Content" },
        { name: "AviveHD", image: "images/avivehd.jpg", value: 3080000, hint: "Gaming-YouTuber mit kreativen Videos" },
        { name: "Zombey", image: "images/zombey.jpg", value: 2150000, hint: "YouTuber mit Fokus auf Minecraft und Indie-Games" },
        { name: "PietSmiet", image: "images/pietsmiet.jpg", value: 2470000, hint: "Gaming-YouTuber mit Team-Content" },
        { name: "HandOfBlood", image: "images/handofblood.jpeg", value: 2810000, hint: "YouTuber mit humorvollem Gaming-Content" },
        { name: "Trymacs", image: "images/trymacs.jpg", value: 2400000, hint: "YouTuber, bekannt für Fortnite und FIFA" },
        { name: "SpontanaBlack", image: "images/spontanablack.jpg", value: 2820000, hint: "YouTuber mit unterhaltsamen Challenges" },
        { name: "Maudado", image: "images/maudado.jpg", value: 1260000, hint: "YouTuber mit Gaming- und Vlog-Content" }
    ];

    function formatValue(num) {
        if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
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
        let leaderboard = JSON.parse(localStorage.getItem("leaderboardYouTube") || "[]");
        leaderboard.push({
            name: playerName,
            score: score,
            timestamp: new Date().toISOString()
        });
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 10);
        localStorage.setItem("leaderboardYouTube", JSON.stringify(leaderboard));
        console.log(`Score gespeichert für YouTube:`, { name: playerName, score: score });
        window.dispatchEvent(new Event("storage"));
    }

    let currentIndex = 0;
    let nextIndex = 1;
    let score = 0;
    let highScore = localStorage.getItem("highScoreYouTube") || 0;
    let timerInterval = null;
    const timeLimit = 10000; // 10 Sekunden pro Runde

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
    const shareButton = document.getElementById("share");
    const mainMenuButton = document.getElementById("mainMenu");
    const gameOverModal = new bootstrap.Modal(document.getElementById("gameOverModal"));
    const finalScoreText = document.getElementById("final-score");
    const finalMessageText = document.getElementById("final-message");
    const gameContainer = document.getElementById("game-container");
    const highScoreDisplay = document.getElementById("high-score-value");
    const progressBar = document.getElementById("progress-bar");

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        let timeLeft = timeLimit;
        progressBar.style.width = "100%";
        progressBar.setAttribute("aria-valuenow", 100);
        const startTime = Date.now();

        timerInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            timeLeft = Math.max(0, timeLimit - elapsed);
            const percentage = (timeLeft / timeLimit) * 100;
            progressBar.style.width = `${percentage}%`;
            progressBar.setAttribute("aria-valuenow", percentage);

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 100);
    }

    function endGame() {
        updateLeaderboard(score);
        gameOverModal.show();
        gameContainer.classList.add("blurred");
        finalScoreText.textContent = `Du hast ${score === 1 ? "1 Punkt" : score + " Punkte"} erreicht!`;
        finalMessageText.textContent = getEndMessage(score);
        higherButton.disabled = true;
        lowerButton.disabled = true;
        clearInterval(timerInterval);
        setTimeout(() => {
            window.location.href = "leaderboard.html"; // Nach Game Over zur Leaderboard
        }, 2000); // 2 Sekunden Verzögerung für Modal-Anzeige
    }

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
        leftValue.textContent = `${formatValue(data[currentIndex].value)} Abonnenten`;
        rightImage.src = data[nextIndex].image;
        rightImage.onerror = () => {
            console.error("Failed to load right image for:", data[nextIndex].name);
            rightImage.src = "images/placeholder.jpg";
        };
        rightName.textContent = data[nextIndex].name;
        scoreDisplay.textContent = `Punkte: ${score}`;
        highScoreDisplay.textContent = highScore;

        document.getElementById("hintTextLeft").textContent = data[currentIndex].hint;
        document.getElementById("hintTextRight").textContent = data[nextIndex].hint;

        startTimer();
    }

    function nextRound(isHigher) {
        clearInterval(timerInterval);
        if ((isHigher && data[nextIndex].value > data[currentIndex].value) || (!isHigher && data[nextIndex].value < data[currentIndex].value)) {
            score++;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("highScoreYouTube", highScore);
                highScoreDisplay.textContent = highScore;
            }
            updateDisplay();
        } else {
            endGame();
        }
    }

    function shareScore() {
        const playerName = localStorage.getItem("playerName") || "Anonym";
        const text = `Ich habe ${score} Punkte in Higher or Lower (YouTube Edition) erreicht! Spiele jetzt: ${window.location.origin}`;
        if (navigator.share) {
            navigator.share({
                title: "Higher or Lower - YouTube Edition",
                text: text,
                url: window.location.origin
            }).catch(err => console.error("Fehler beim Teilen:", err));
        } else {
            navigator.clipboard.writeText(text).then(() => {
                alert("Ergebnis in die Zwischenablage kopiert!");
            }).catch(err => {
                console.error("Fehler beim Kopieren:", err);
                alert("Teilen fehlgeschlagen. Text: " + text);
            });
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

    shareButton.addEventListener("click", shareScore);

    mainMenuButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    shuffleArray(data);
    updateDisplay();
});
