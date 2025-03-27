document.addEventListener("DOMContentLoaded", function () {
    let data = [
        { name: "Cristiano Ronaldo", image: "images/cristiano_ronaldo.jpg", value: 650000000 },
        { name: "Lionel Messi", image: "images/lionel_messi.jpg", value: 505000000 },
        { name: "Selena Gomez", image: "images/selena_gomez.jpg", value: 421000000 },
        { name: "Kylie Jenner", image: "images/kylie_jenner.jpg", value: 394000000 },
        { name: "Dwayne Johnson", image: "images/dwayne_johnson.jpg", value: 394000000 },
        { name: "Kim Kardashian", image: "images/kim_kardashian.jpg", value: 357000000 },
        { name: "Ariana Grande", image: "images/ariana_grande.jpg", value: 376000000 },
        { name: "Beyoncé", image: "images/beyonce.jpg", value: 312000000 },
        { name: "Justin Bieber", image: "images/justin_bieber.jpg", value: 295000000 },
        { name: "Taylor Swift", image: "images/taylor_swift.jpg", value: 282000000 },
        { name: "Neymar Jr", image: "images/neymar_jr.jpg", value: 229000000 },
        { name: "Kendall Jenner", image: "images/kendel_jenner.jpg", value: 288000000 },
        { name: "Billie Eilish", image: "images/billie_eilish.jpg", value: 123000000 },
        { name: "Virat Kohli", image: "images/virat_kohli.jpg", value: 270000000 },
        { name: "Kylian Mbappé", image: "images/kylian_mbappe.jpg", value: 123000000 },
        { name: "Karim Benzema", image: "images/karim_benzema.jpg", value: 76000000 },
        { name: "Mohamed Salah", image: "images/mohamed_salah.jpg", value: 65000000 },
        { name: "Kevin De Bruyne", image: "images/kevin_de_bruyne.jpg", value: 26000000 },
        { name: "Erling Haaland", image: "images/erling_haaland.jpg", value: 38000000 },
        { name: "Robert Lewandowski", image: "images/robert_lewandowski.jpg", value: 37000000 },
        { name: "Tom Holland", image: "images/tom_holland.jpg", value: 68000000 },
        { name: "Chris Hemsworth", image: "images/chris_hemsworth.jpg", value: 58000000 },
        { name: "Leonardo DiCaprio", image: "images/leonardo_dicaprio.jpg", value: 60000000 },
        { name: "Will Smith", image: "images/will_smith.jpg", value: 69000000 },
        { name: "Zendaya", image: "images/zendaya.jpg", value: 180000000 },
        { name: "Shakira", image: "images/shakira.jpg", value: 92000000 },
        { name: "Drake", image: "images/drake.jpg", value: 143000000 },
        { name: "Kanye West", image: "images/kanye_west.jpg", value: 20000000 },
        { name: "Elon Musk", image: "images/elon_musk.jpg", value: 43000000 },
        { name: "MrBeast", image: "images/mrbeast.jpg", value: 67000000 },
        { name: "Rihanna", image: "images/rihanna.jpg", value: 149000000 }
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
        let leaderboard = JSON.parse(localStorage.getItem("leaderboardFollower")) || [];
        leaderboard.push({
            name: playerName,
            score: score
        });
        // Sort and limit to top 10
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 10);
        localStorage.setItem("leaderboardFollower", JSON.stringify(leaderboard));
        window.dispatchEvent(new Event("storage"));
    }

    let currentIndex = 0;
    let nextIndex = 1;
    let score = 0;
    let highScore = localStorage.getItem("highScoreFollower") || 0;

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
        leftValue.textContent = `${formatValue(data[currentIndex].value)} Follower`;
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
                localStorage.setItem("highScoreFollower", highScore);
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
