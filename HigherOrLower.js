document.addEventListener("DOMContentLoaded", function () {
    let data = [
        { name: "Cristiano Ronaldo", image: "images/cristiano_ronaldo.jpg", value: 650000000, hint: "Fußball-Superstar, bekannt für Rekorde und Social-Media-Präsenz" },
        { name: "Selena Gomez", image: "images/selena_gomez.jpg", value: 421000000, hint: "Popstar und Schauspielerin mit riesiger Instagram-Followerschaft" },
        { name: "Kylie Jenner", image: "images/kylie_jenner.jpg", value: 394000000, hint: "Reality-Star und Unternehmerin mit Kosmetikmarke" },
        { name: "Dwayne Johnson", image: "images/dwayne_johnson.jpg", value: 394000000, hint: "Schauspieler und ehemaliger Wrestler, bekannt als 'The Rock'" },
        { name: "Kim Kardashian", image: "images/kim_kardashian.jpg", value: 357000000, hint: "Reality-Star und Unternehmerin mit globalem Einfluss" },
        { name: "Ariana Grande", image: "images/ariana_grande.jpg", value: 376000000, hint: "Popstar mit weltweiten Chart-Hits" },
        { name: "Beyoncé", image: "images/beyonce.jpg", value: 312000000, hint: "Musik-Ikone mit riesiger Fangemeinde" },
        { name: "Justin Bieber", image: "images/justin_bieber.jpg", value: 295000000, hint: "Kanadischer Popstar mit treuer Fanbase" },
        { name: "Taylor Swift", image: "images/taylor_swift.jpg", value: 282000000, hint: "Singer-Songwriterin mit globalem Einfluss" },
        { name: "Neymar Jr", image: "images/neymar_jr.jpg", value: 229000000, hint: "Brasilianischer Fußballer, bekannt für seine Tricks" },
        { name: "Kendall Jenner", image: "images/kendel_jenner.jpg", value: 288000000, hint: "Model und Reality-Star aus der Kardashian-Familie" },
        { name: "Billie Eilish", image: "images/billie_eilish.jpg", value: 123000000, hint: "Junge Popstar mit einzigartigem Stil" },
        { name: "Virat Kohli", image: "images/virat_kohli.jpg", value: 270000000, hint: "Indischer Cricket-Star mit riesiger Fangemeinde" },
        { name: "Kylian Mbappé", image: "images/kylian_mbappe.jpg", value: 123000000, hint: "Junger französischer Fußballer mit großem Potenzial" },
        { name: "Karim Benzema", image: "images/karim_benzema.jpg", value: 76000000, hint: "Französischer Stürmer, Ballon d'Or-Gewinner" },
        { name: "Mohamed Salah", image: "images/mohamed_salah.jpg", value: 65000000, hint: "Ägyptischer Fußballer, bekannt für seine Tore" },
        { name: "Kevin De Bruyne", image: "images/kevin_de_bruyne.jpg", value: 26000000, hint: "Belgischer Mittelfeldspieler, Passgenie" },
        { name: "Erling Haaland", image: "images/erling_haaland.jpg", value: 38000000, hint: "Norwegischer Stürmer mit Torinstinkt" },
        { name: "Robert Lewandowski", image: "images/robert_lewandowski.jpg", value: 37000000, hint: "Polnischer Stürmer, Rekordtorschütze" },
        { name: "Tom Holland", image: "images/tom_holland.jpg", value: 68000000, hint: "Schauspieler, bekannt als Spider-Man" },
        { name: "Chris Hemsworth", image: "images/chris_hemsworth.jpg", value: 58000000, hint: "Schauspieler, bekannt als Thor" },
        { name: "Leonardo DiCaprio", image: "images/leonardo_dicaprio.jpg", value: 60000000, hint: "Hollywood-Star mit ikonischen Rollen" },
        { name: "Will Smith", image: "images/will_smith.jpg", value: 69000000, hint: "Schauspieler und Musiker mit globaler Bekanntheit" },
        { name: "Zendaya", image: "images/zendaya.jpg", value: 180000000, hint: "Schauspielerin und Sängerin, bekannt aus Euphoria" },
        { name: "Shakira", image: "images/shakira.jpg", value: 92000000, hint: "Kolumbianische Sängerin mit weltweiten Hits" },
        { name: "Drake", image: "images/drake.jpg", value: 143000000, hint: "Kanadischer Rapper mit Chart-Rekorden" },
        { name: "Kanye West", image: "images/kanye_west.jpg", value: 20000000, hint: "Rapper und Produzent mit kontroverser Präsenz" },
        { name: "Elon Musk", image: "images/elon_musk.jpg", value: 43000000, hint: "Tech-Unternehmer, bekannt für Tesla und SpaceX" },
        { name: "MrBeast", image: "images/mrbeast.jpg", value: 67000000, hint: "YouTuber mit riesigen Charity-Aktionen" },
        { name: "Rihanna", image: "images/rihanna.jpg", value: 149000000, hint: "Sängerin und Unternehmerin mit Fenty" }
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
        let leaderboard = JSON.parse(localStorage.getItem("leaderboardFollower") || "[]");
        leaderboard.push({
            name: playerName,
            score: score,
            timestamp: new Date().toISOString()
        });
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 10);
        localStorage.setItem("leaderboardFollower", JSON.stringify(leaderboard));
        console.log(`Score gespeichert für Follower:`, { name: playerName, score: score });
        window.dispatchEvent(new Event("storage"));
    }

    let currentIndex = 0;
    let nextIndex = 1;
    let score = 0;
    let highScore = localStorage.getItem("highScoreFollower") || 0;
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
        leftValue.textContent = `${formatValue(data[currentIndex].value)} Follower`;
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
                localStorage.setItem("highScoreFollower", highScore);
                highScoreDisplay.textContent = highScore;
            }
            updateDisplay();
        } else {
            endGame();
        }
    }

    function shareScore() {
        const playerName = localStorage.getItem("playerName") || "Anonym";
        const text = `Ich habe ${score} Punkte in Higher or Lower (Follower Edition) erreicht! Spiele jetzt: ${window.location.origin}`;
        if (navigator.share) {
            navigator.share({
                title: "Higher or Lower - Follower Edition",
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
