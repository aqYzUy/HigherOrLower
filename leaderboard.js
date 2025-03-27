document.addEventListener("DOMContentLoaded", function () {
    const leaderboardList = document.getElementById("leaderboard-list");
    const modeFollowerButton = document.getElementById("modeFollower");
    const modeFootballButton = document.getElementById("modeFootball");
    const modeYouTubeButton = document.getElementById("modeYouTube");

    // Funktion, um die Bestenliste zu laden und anzuzeigen
    function loadLeaderboard(mode) {
        const scores = JSON.parse(localStorage.getItem(mode)) || [];
        scores.sort((a, b) => b.score - a.score);
        leaderboardList.innerHTML = "";
        if (scores.length === 0) {
            leaderboardList.innerHTML = "<p>Keine Scores vorhanden.</p>";
        } else {
            scores.slice(0, 10).forEach((entry, index) => {
                const entryElement = document.createElement("div");
                entryElement.classList.add("leaderboard-entry");
                let rankDisplay = `${index + 1}.`;
                if (index === 0) rankDisplay += " 🥇";
                else if (index === 1) rankDisplay += " 🥈";
                else if (index === 2) rankDisplay += " 🥉";
                entryElement.innerHTML = `
                    <span class="rank">${rankDisplay}</span>
                    <span class="name">${entry.name || "Anonym"}</span>
                    <span class="score">${entry.score}</span>
                `;
                leaderboardList.appendChild(entryElement);
            });
        }
    }

    function setActiveMode(button, mode) {
        modeFollowerButton.classList.remove("active");
        modeFootballButton.classList.remove("active");
        modeYouTubeButton.classList.remove("active");
        button.classList.add("active");
        loadLeaderboard(mode);
    }

    modeFollowerButton.addEventListener("click", () => setActiveMode(modeFollowerButton, "leaderboardFollower"));
    modeFootballButton.addEventListener("click", () => setActiveMode(modeFootballButton, "leaderboardFootball"));
    modeYouTubeButton.addEventListener("click", () => setActiveMode(modeYouTubeButton, "leaderboardYouTube"));

    // Echtzeit-Aktualisierung der Bestenliste bei Änderungen
    window.addEventListener("storage", () => {
        if (modeFollowerButton.classList.contains("active")) {
            loadLeaderboard("leaderboardFollower");
        } else if (modeFootballButton.classList.contains("active")) {
            loadLeaderboard("leaderboardFootball");
        } else if (modeYouTubeButton.classList.contains("active")) {
            loadLeaderboard("leaderboardYouTube");
        }
    });

    // Standardmodus "Follower" beim Laden der Seite auswählen
    setActiveMode(modeFollowerButton, "leaderboardFollower");
});
