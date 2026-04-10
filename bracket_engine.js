/**
 * UNIVERSAL BRACKET ENGINE - Version 4.4 (UK Open & Open Draw Edition)
 * Integration: Dynamische Formate, Open Draw Logik & Amateur-Generierung
 */

let currentEvent = null;
let currentUser = null;
let currentBracket = null;
let finalResultsToSync = [];

window.onload = initTournament;

function initTournament() {
    if (typeof injectSidebar === 'function') injectSidebar();

    currentEvent = JSON.parse(localStorage.getItem('current_tournament'));
    currentUser = JSON.parse(localStorage.getItem('career_player'));
    currentBracket = JSON.parse(localStorage.getItem('current_bracket'));

    if (!currentEvent || !currentUser) {
        window.location.href = 'career_hub.html';
        return;
    }

    if (!currentBracket) {
        resetAndCreateNew();
    }
    
    startEngine();
}

function startEngine() {
    const currentRound = currentBracket.currentRound;
    const dynamicBo = typeof getMatchFormat === 'function' ? getMatchFormat(currentEvent, currentRound) : currentEvent.bo;
    
    const isSets = (currentEvent.format === "World_Championship" || currentEvent.format === "World_Grand_Prix");
    const unit = isSets ? "Sets" : "Legs";

    document.getElementById('tournament-title').innerText = `${currentEvent.country} ${currentEvent.name}`;
    document.getElementById('tournament-info').innerText = 
        `${currentEvent.type} | ${currentEvent.location} | Best of ${dynamicBo} ${unit} | Feld: ${currentEvent.req}`;
    
    renderBracket();
    updateActionButtons();
}

/**
 * UK OPEN AMATEUR GENERATOR
 * Erstellt die "Riley's Qualifiers" oder Amateure, um das 160er Feld zu füllen.
 */
function getUKOpenFullField() {
    let players = JSON.parse(localStorage.getItem('pdc_world_players')) || [];
    players.sort((a, b) => (a.r || 999) - (b.r || 999));

    const regions = [
        { c: "", first: ["Jack", "Billy", "Dave", "Terry", "Harry"], last: ["Miller", "Cook", "Baker", "Webb"] },
        { c: "", first: ["Niels", "Jordy", "Bram", "Lars"], last: ["van Dijk", "de Vries", "Bakker", "Janssen"] },
        { c: "", first: ["Hamish", "Callum", "Fraser"], last: ["MacLeod", "Douglas", "Robertson"] },
        { c: "", first: ["Lukas", "Max", "Finn"], last: ["Müller", "Schmidt", "Schneider"] }
    ];

    // Sicherstellen, dass der User Teil des Feldes ist
    if (!players.find(p => p.n === currentUser.name)) {
        players.push({ n: currentUser.name, c: currentUser.c || "", a: currentUser.baseAvg || 50, r: currentUser.rank || 161 });
    }

    while (players.length < 160) {
        const region = regions[Math.floor(Math.random() * regions.length)];
        players.push({
            n: `Q: ${region.first[Math.floor(Math.random() * region.first.length)]} ${region.last[Math.floor(Math.random() * region.last.length)]}`,
            c: region.c,
            a: Math.floor(Math.random() * 11) + 72, // Realistischerer Amateur-Avg
            r: players.length + 1,
            isAmateur: true
        });
    }
    return players;
}

function createNewBracket(event, user) {
    const isUK = (event.req === 160);
    const isET = (event.req === 48);
    let structure = [];
    let allPlayers = isUK ? getUKOpenFullField() : (JSON.parse(localStorage.getItem('pdc_world_players')) || []);

    if (isUK) {
        // UK OPEN: R1 startet mit Plätzen 97-160
        const r1Participants = shuffleArray(allPlayers.slice(96, 160));
        let r1 = [];
        for (let i = 0; i < r1Participants.length; i += 2) {
            r1.push({ p1: r1Participants[i], p2: r1Participants[i+1], score: "0:0", winner: null, completed: false });
        }
        structure.push(r1);
        return { eventId: event.id, currentRound: 1, structure: structure, isUKOpen: true };
    } 

    if (isET) {
        let participants = allPlayers.slice(0, 48);
        if (!participants.find(p => p.n === user.name)) {
            participants[47] = { n: user.name, c: user.c || "", a: user.baseAvg || 50, r: user.rank || 129 };
        }
        const top16 = participants.slice(0, 16);
        const qualifiers = shuffleArray(participants.slice(16, 48));
        let r1 = [];
        for (let i = 0; i < 32; i += 2) {
            r1.push({ p1: qualifiers[i], p2: qualifiers[i+1], score: "0:0", winner: null, completed: false });
        }
        structure.push(r1);
        let r2 = [];
        for (let i = 0; i < 16; i++) {
            r2.push({ p1: top16[i], p2: { n: "Sieger R1", a: 50, placeholder: true }, score: "0:0", winner: null, completed: false });
        }
        structure.push(r2);
        return { eventId: event.id, currentRound: 1, structure: structure, isUKOpen: false };
    } 

    // STANDARD 128er Feld
    let reqCount = event.req || 128;
    let participants = allPlayers.slice(0, reqCount);
    if (!participants.find(p => p.n === user.name)) {
        participants[participants.length - 1] = { n: user.name, c: user.c || "", a: user.baseAvg || 50, r: user.rank || 129 };
    }
    const seeded = participants.slice(0, 32);
    const unseeded = shuffleArray(participants.slice(32));
    const finalDraw = shuffleArray([...seeded, ...unseeded]);
    let r1 = [];
    for (let i = 0; i < finalDraw.length; i += 2) {
        r1.push({ p1: finalDraw[i], p2: finalDraw[i+1], score: "0:0", winner: null, completed: false });
    }
    structure.push(r1);
    return { eventId: event.id, currentRound: 1, structure: structure, isUKOpen: false };
}

function renderBracket() {
    const display = document.getElementById('bracket-display');
    if (!display) return;
    display.innerHTML = '';
    
    const isUK = currentBracket.isUKOpen;
    const isET = (currentEvent.req === 48);
    const totalRounds = isUK ? 9 : (isET ? 6 : Math.ceil(Math.log2(currentEvent.req)));
    
    for (let rIdx = 0; rIdx < totalRounds; rIdx++) {
        const roundDiv = document.createElement('div');
        roundDiv.className = 'round';
        const title = document.createElement('div');
        title.className = 'round-title';
        title.innerText = getRoundName(rIdx, totalRounds, isUK);
        roundDiv.appendChild(title);

        const matchesInData = currentBracket.structure[rIdx] || [];
        
        // Match-Vorschau Logik
        let expectedMatches = 0;
        if (isUK) {
            if (rIdx < 4) expectedMatches = 32; // R1 bis R4 haben immer 32 Matches durch Neueinsteiger
            else expectedMatches = 32 / Math.pow(2, rIdx - 3);
        } else if (isET) {
            expectedMatches = [16, 16, 8, 4, 2, 1][rIdx];
        } else {
            expectedMatches = currentEvent.req / Math.pow(2, rIdx + 1);
        }

        for (let mIdx = 0; mIdx < expectedMatches; mIdx++) {
            const match = matchesInData[mIdx];
            const matchWrap = document.createElement('div');
            matchWrap.className = 'match-wrap';
            
            if (match) {
                const isUser = (match.p1.n === currentUser.name || (match.p2 && match.p2.n === currentUser.name));
                const s = match.score.split(':');
                matchWrap.innerHTML = `
                    <div class="match-card ${isUser ? 'is-player-match' : ''} ${match.completed ? 'completed' : ''}">
                        <div class="player-line ${match.winner === match.p1.n ? 'winner' : ''}">
                            <span class="player-name">${match.p1.n}</span>
                            <span class="player-score">${s[0]}</span>
                        </div>
                        <div class="player-line ${match.p2 && match.winner === match.p2.n ? 'winner' : ''}">
                            <span class="player-name">${match.p2 ? (match.p2.placeholder ? 'TBD' : match.p2.n) : 'TBD'}</span>
                            <span class="player-score">${s[1]}</span>
                        </div>
                    </div>`;
            } else {
                matchWrap.innerHTML = `<div class="match-card tbd-card">TBD</div>`;
            }
            roundDiv.appendChild(matchWrap);
        }
        display.appendChild(roundDiv);
    }
}

function getRoundName(idx, total, isUK) {
    if (isUK) return ["R1 (97-160)", "R2 (+65-96)", "R3 (+33-64)", "R4 (+Top 32)", "L32", "R16", "QF", "SF", "Finale"][idx];
    if (currentEvent.req === 48) return ["Runde 1", "Runde 2 (Seed)", "Runde 3", "Viertelfinale", "Halbfinale", "Finale"][idx];
    const diff = total - 1 - idx;
    if (diff === 0) return "Finale";
    if (diff === 1) return "Halbfinale";
    if (diff === 2) return "Viertelfinale";
    if (diff === 3) return "Achtelfinale";
    return `Runde ${idx+1}`;
}

function advanceToNextRound() {
    const currentRoundIdx = currentBracket.currentRound - 1;
    const currentMatches = currentBracket.structure[currentRoundIdx];
    
    // Gewinner sammeln
    const winners = currentMatches.map(m => (m.winner === m.p1.n ? m.p1 : m.p2));

    if (currentBracket.isUKOpen) {
        let allPlayers = getUKOpenFullField();
        let nextPool = [...winners];

        // UK Open: Neueinsteiger hinzufügen
        if (currentBracket.currentRound === 1) nextPool.push(...allPlayers.slice(64, 96));
        else if (currentBracket.currentRound === 2) nextPool.push(...allPlayers.slice(32, 64));
        else if (currentBracket.currentRound === 3) nextPool.push(...allPlayers.slice(0, 32));

        // OPEN DRAW: Alles mischen
        const shuffledPool = shuffleArray(nextPool);
        let nextRoundMatches = [];
        for (let i = 0; i < shuffledPool.length; i += 2) {
            nextRoundMatches.push({
                p1: shuffledPool[i], p2: shuffledPool[i+1],
                score: "0:0", winner: null, completed: false
            });
        }
        currentBracket.structure.push(nextRoundMatches);
    } else {
        // STANDARD PROGRESSION
        if (currentEvent.req === 48 && currentRoundIdx === 0) {
            for (let i = 0; i < currentMatches.length; i++) {
                currentBracket.structure[1][i].p2 = { n: currentMatches[i].winner, a: 90, placeholder: false };
            }
        } else {
            const nextRoundMatches = [];
            for (let i = 0; i < currentMatches.length; i += 2) {
                const m1 = currentMatches[i]; const m2 = currentMatches[i+1];
                if (m1 && m2) {
                    nextRoundMatches.push({
                        p1: { n: m1.winner, a: 90 }, p2: { n: m2.winner, a: 90 },
                        score: "0:0", winner: null, completed: false
                    });
                }
            }
            if (!currentBracket.structure[currentRoundIdx + 1]) currentBracket.structure.push(nextRoundMatches);
            else currentBracket.structure[currentRoundIdx + 1] = nextRoundMatches;
        }
    }
    currentBracket.currentRound++;
    saveAndReload();
}

function calculateReachKey(matchCount, roundIdx) {
    if (currentBracket.isUKOpen) {
        const r = roundIdx + 1;
        if (r === 1) return "r160";
        if (r === 2) return "r128";
        if (r === 3) return "r96";
        if (r === 4) return "r64";
        if (r === 5) return "r32";
        if (r === 6) return "r16";
        if (r === 7) return "qf";
        if (r === 8) return "semi";
        if (r === 9) return "runnerUp";
    }
    if (matchCount === 64) return "r128";
    if (matchCount === 32) return "r64";
    if (matchCount === 16) return (currentEvent.req === 48 && roundIdx === 1) ? "r32" : "r32";
    if (matchCount === 8) return "r16";
    if (matchCount === 4) return "qf";
    if (matchCount === 2) return "semi";
    if (matchCount === 1) return "runnerUp";
    return "r128";
}

function finalizeTournament() {
    finalResultsToSync = [];
    const rounds = currentBracket.structure;

    rounds.forEach((round, rIdx) => {
        round.forEach(match => {
            if (!match.completed) return;
            const loser = (match.winner === match.p1.n) ? (match.p2 ? match.p2.n : "TBD") : match.p1.n;
            if (loser !== "TBD" && !loser.includes("Sieger")) {
                let reachKey = calculateReachKey(round.length, rIdx);
                finalResultsToSync.push({ name: loser, reach: reachKey });
            }
            if (rIdx === rounds.length - 1) {
                finalResultsToSync.push({ name: match.winner, reach: "winner" });
            }
        });
    });

    const userResult = finalResultsToSync.find(r => r.name === currentUser.name) || { reach: "r128" };
    const lookupKey = currentEvent.breakdown || "ProTour";
    const bd = PDC_TOUR_DATA.breakdowns[lookupKey] || PDC_TOUR_DATA.breakdowns["ProTour"];
    let userPrize = bd[userResult.reach] || 0;

    document.getElementById('prize-amount').innerText = `£${userPrize.toLocaleString()}`;
    document.getElementById('prize-overlay').style.display = 'flex';
}

function updateActionButtons() {
    const roundIdx = currentBracket.currentRound - 1;
    const matches = currentBracket.structure[roundIdx];
    if(!matches) return;
    const allDone = matches.every(m => m.completed);
    const userMatch = matches.find(m => (m.p1.n === currentUser.name || (m.p2 && m.p2.n === currentUser.name)) && !m.completed);
    
    document.getElementById('btn-start-user').style.display = userMatch ? 'inline-block' : 'none';
    document.getElementById('btn-cheat-sim').style.display = userMatch ? 'inline-block' : 'none';
    document.getElementById('btn-simulate-all').style.display = (!allDone) ? 'inline-block' : 'none';
    
    const nextBtn = document.getElementById('btn-next-round');
    const totalRounds = currentBracket.isUKOpen ? 9 : (currentEvent.req === 48 ? 6 : Math.ceil(Math.log2(currentEvent.req)));
    
    if (allDone) {
        nextBtn.style.display = 'inline-block';
        nextBtn.innerText = (currentBracket.currentRound === totalRounds) ? "Turnier beenden" : "Nächste Runde";
        nextBtn.onclick = (currentBracket.currentRound === totalRounds) ? finalizeTournament : advanceToNextRound;
    } else {
        nextBtn.style.display = 'none';
    }
}

function saveAndGoHome() {
    try {
        if (typeof syncTournamentResults === 'function') syncTournamentResults(finalResultsToSync);
        const archive = JSON.parse(localStorage.getItem('tournament_archive') || "[]");
        archive.push({
            tournament: currentEvent.name,
            type: currentEvent.type,
            date: new Date().toLocaleDateString(),
            prize: document.getElementById('prize-amount').innerText
        });
        localStorage.setItem('tournament_archive', JSON.stringify(archive));
        localStorage.removeItem('current_bracket');
        localStorage.removeItem('current_tournament');
        window.location.href = 'career_hub.html';
    } catch (error) { console.error(error); window.location.href = 'career_hub.html'; }
}

function findAndStartUserMatch() {
    const savedMatch = localStorage.getItem('active_dart_match');
    
    // Prüfen, ob bereits ein Spielstand existiert
    if (savedMatch) {
        // Modal anzeigen (Wir nutzen die Logik vom Turnier-Resume-Modal)
        showResumeMatchModal();
    } else {
        // Kein Spielstand da -> Ganz normaler Start über Bull-Off
        proceedToMatch(false);
    }
}

// Hilfsfunktion für den eigentlichen Start
function proceedToMatch(isResume) {
    const currentRound = currentBracket.currentRound;
    const dynamicBo = typeof getMatchFormat === 'function' ? getMatchFormat(currentEvent, currentRound) : currentEvent.bo;
    
    localStorage.setItem('active_match_config', JSON.stringify({ 
        bo: dynamicBo, 
        isCareer: true, 
        format: currentEvent.format, 
        tournamentName: currentEvent.name 
    }));

    if (isResume) {
        // Direkt zum Spiel, da Spielstand in 'active_dart_match' bereits existiert
        window.location.href = 'game.html';
    } else {
        // Alles Alte löschen und zum Bull-Off
        localStorage.removeItem('active_dart_match');
        localStorage.removeItem('match_starter');
        window.location.href = 'bulloff.html';
    }
}

// Modal-Funktionen (Sollten in tournament_view.html vorhanden sein oder ergänzt werden)
function showResumeMatchModal() {
    // Falls du das vorhandene resume-modal in tournament_view.html nutzen willst:
    const modal = document.getElementById('resume-modal');
    if (modal) {
        modal.querySelector('h2').innerText = "Match fortsetzen?";
        modal.querySelector('p').innerText = "Es wurde ein laufender Spielstand für dieses Match gefunden.";
        
        // Buttons umbiegen
        const actions = modal.querySelector('.modal-actions');
        actions.innerHTML = `
            <button class="btn-action primary" onclick="proceedToMatch(true)">Fortsetzen</button>
            <button class="btn-action secondary" onclick="proceedToMatch(false)">Neustart</button>
        `;
        modal.style.display = 'flex';
    } else {
        // Fallback falls kein Modal-HTML da ist: Einfaches Confirm
        if(confirm("Laufendes Match fortsetzen? (Abbrechen für Neustart)")) {
            proceedToMatch(true);
        } else {
            proceedToMatch(false);
        }
    }
}


function simulateAIOnly() {
    const rIdx = currentBracket.currentRound - 1;
    const dynamicBo = typeof getMatchFormat === 'function' ? getMatchFormat(currentEvent, currentBracket.currentRound) : currentEvent.bo;
    const target = Math.ceil(dynamicBo / 2);

    currentBracket.structure[rIdx].forEach(m => {
        if (!m.completed && m.p1.n !== currentUser.name && (!m.p2 || m.p2.n !== currentUser.name)) {
            if (m.p2 && m.p2.placeholder) return; 
            const avg1 = m.p1.a || 50; const avg2 = (m.p2 ? m.p2.a : 50);
            const winProb1 = Math.pow(avg1, 4) / (Math.pow(avg1, 4) + Math.pow(avg2, 4));
            if (Math.random() < winProb1) {
                m.winner = m.p1.n; m.score = `${target}:${Math.floor(Math.random() * target)}`;
            } else {
                m.winner = m.p2.n; m.score = `${Math.floor(Math.random() * target)}:${target}`;
            }
            m.completed = true;
        }
    });
    saveAndReload();
}

function cheatSimTournament() {
    const rIdx = currentBracket.currentRound - 1;
    const m = currentBracket.structure[rIdx].find(match => match.p1.n === currentUser.name || (match.p2 && match.p2.n === currentUser.name));
    if (m) {
        const dynamicBo = typeof getMatchFormat === 'function' ? getMatchFormat(currentEvent, currentBracket.currentRound) : currentEvent.bo;
        const target = Math.ceil(dynamicBo / 2);
        m.winner = currentUser.name;
        m.score = m.p1.n === currentUser.name ? `${target}:0` : `0:${target}`;
        m.completed = true;
    }
    simulateAIOnly();
}

function saveAndReload() {
    localStorage.setItem('current_bracket', JSON.stringify(currentBracket));
    renderBracket();
    updateActionButtons();
}

function resetAndCreateNew() {
    currentBracket = createNewBracket(currentEvent, currentUser);
    localStorage.setItem('current_bracket', JSON.stringify(currentBracket));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
