import { db } from './firebase-config.js';
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", function () {
    const leaderboardList = document.getElementById("leaderboard-list");
    const modeFollowerButton = document.getElementById("modeFollower");
    const modeFootballButton = document.getElementById("modeFootball");
    const modeYouTubeButton = document.getElementById("modeYouTube");

    async function loadLeaderboard(mode) {
        leaderboardList.innerHTML = "<p>Lade Bestenliste...</p>";
        try {
            const q = query(collection(db, `leaderboards/${mode}/scores`), orderBy("score", "desc"), limit(10));
            const querySnapshot = await getDocs(q);
            const scores = [];
            querySnapshot.forEach(doc => {
                scores.push(doc.data());
            });

            leaderboardList.innerHTML = "";
            if (scores.length === 0) {
                leaderboardList.innerHTML = "<p>Keine Scores vorhanden.</p>";
            } else {
                scores.forEach((entry, index) => {
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
        } catch (error) {
            console.error("Fehler beim Laden der Bestenliste:", error);
            leaderboardList.innerHTML = "<p>Fehler beim Laden der Bestenliste.</p>";
        }
    }

    function setActiveMode(button, mode) {
        modeFollowerButton.classList.remove("active");
        modeFootballButton.classList.remove("active");
        modeYouTubeButton.classList.remove("active");
        button.classList.add("active");
        loadLeaderboard(mode);
    }

    modeFollowerButton.addEventListener("click", () => setActiveMode(modeFollowerButton, "follower"));
    modeFootballButton.addEventListener("click", () => setActiveMode(modeFootballButton, "football"));
    modeYouTubeButton.addEventListener("click", () => setActiveMode(modeYouTubeButton, "youtube"));

    // Standardmodus "Follower" beim Laden der Seite
    setActiveMode(modeFollowerButton, "follower");
});
