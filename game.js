// --- DATEN & SETUP ---
const checkoutTable = {
    170: "T20 T20 BULL", 167: "T20 T19 BULL", 164: "T20 T18 BULL", 161: "T20 T17 BULL", 160: "T20 T20 D20",
    158: "T20 T20 D19", 157: "T20 T19 D20", 156: "T20 T20 D18", 155: "T20 T19 D19", 154: "T20 T18 D20",
    153: "T20 T19 D18", 152: "T20 T20 D16", 151: "T20 T17 D20", 150: "T20 T18 D18", 149: "T20 T19 D16",
    148: "T20 T16 D20", 147: "T20 T17 D18", 146: "T20 T18 D16", 145: "T20 T15 D20", 144: "T20 T20 D12",
    143: "T20 T17 D16", 142: "T20 T14 D20", 141: "T20 T15 D18", 140: "T20 T16 D16", 139: "T20 T13 D20",
    138: "T20 T18 D12", 137: "T20 T19 D10", 136: "T20 T20 D8", 135: "T20 T17 D12", 134: "T20 T14 D16",
    133: "T20 T19 D8", 132: "T20 T16 D12", 131: "T20 T13 D16", 130: "T20 T18 D8", 129: "T19 T16 D12",
    128: "T18 T14 D16", 127: "T20 T17 D8", 126: "T19 T19 D6", 125: "T18 T17 D10", 124: "T20 T16 D8",
    123: "T19 T16 D9", 122: "T18 T20 D4", 121: "T20 T11 D14", 120: "T20 20 D20", 119: "T19 T10 D16",
    118: "T20 18 D20", 117: "T20 17 D20", 116: "T20 16 D20", 115: "T20 15 D20", 114: "T20 14 D20",
    113: "T20 13 D20", 112: "T20 12 D20", 111: "T20 11 D20", 110: "T20 10 D20", 109: "T20 9 D20",
    108: "T20 16 D16", 107: "T19 10 D20", 106: "T20 10 D18", 105: "T19 16 D14", 104: "T18 10 D20",
    103: "T20 3 D20", 102: "T20 10 D16", 101: "T17 10 D20", 100: "T20 D20", 99: "T19 10 D16",
    98: "T20 D19", 97: "T19 D20", 96: "T20 D18", 95: "T19 D19", 94: "T18 D20", 93: "T19 D18",
    92: "T20 D16", 91: "T17 D20", 90: "T18 D18", 89: "T19 D16", 88: "T16 D20", 87: "T17 D18",
    86: "T18 D16", 85: "T15 D20", 84: "T20 D12", 83: "T17 D16", 82: "T14 D20", 81: "T15 D18",
    80: "T20 D10", 79: "T13 D20", 78: "T18 D12", 77: "T19 D10", 76: "T20 D8", 75: "T17 D12",
    74: "T14 D16", 73: "T19 D8", 72: "T16 D12", 71: "T13 D16", 70: "T10 D20", 69: "T15 D12",
    68: "T20 D4", 67: "T17 D8", 66: "T10 D18", 65: "T19 D4", 64: "T16 D8", 63: "T13 D12",
    62: "T10 D16", 61: "T15 D8", 60: "20 D20", 59: "19 D20", 58: "18 D20", 57: "17 D20",
    56: "16 D20", 55: "15 D20", 54: "14 D20", 53: "13 D20", 52: "12 D20", 51: "11 D20",
    50: "10 D20", 49: "9 D20", 48: "16 D16", 47: "7 D20", 46: "6 D20", 45: "13 D16",
    44: "12 D16", 43: "11 D16", 42: "10 D16", 41: "9 D16", 40: "D20", 39: "7 D16",
    38: "D19", 37: "5 D16", 36: "D18", 35: "3 D16", 34: "D17", 33: "1 D16",
    32: "D16", 31: "15 D8", 30: "D15", 29: "13 D8", 28: "D14", 27: "11 D8",
    26: "D13", 25: "9 D8", 24: "D12", 23: "7 D8", 22: "D11", 21: "5 D8",
    20: "D10", 19: "3 D8", 18: "D9", 17: "1 D8", 16: "D8", 15: "7 D4",
    14: "D7", 13: "5 D4", 12: "D6", 11: "3 D4", 10: "D5", 9: "1 D4",
    8: "D4", 7: "3 D2", 6: "D3", 5: "1 D2", 4: "D2", 3: "1 D1", 2: "D1"
};
const BOARD_NEIGHBORS = {
    20: [1, 5], 1: [20, 18], 18: [1, 4], 4: [18, 13], 13: [4, 6],
    6: [13, 10], 10: [6, 15], 15: [10, 2], 2: [15, 17], 17: [2, 3],
    3: [17, 19], 19: [3, 7], 7: [19, 16], 16: [7, 8], 8: [16, 11],
    11: [8, 14], 14: [11, 9], 9: [14, 12], 12: [9, 5], 5: [12, 20],
    25: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] // Bull-Nachbarn
};

let match = { 
    config: {}, players: [], current: 0, multi: 1, 
    starterOfLeg: 0, currentLeg: 1, isOver: false 
};
let botThinking = false;

// --- INITIALISIERUNG (KARRIERE MODUS) ---
window.onload = () => {
    const savedMatch = localStorage.getItem('active_dart_match');
    
    // Falls ein Spiel abgebrochen wurde, laden wir es einfach wieder
    if (savedMatch) {
        match = JSON.parse(savedMatch);
        renderGrid();
        updateUI();
        switchScreen('game-screen');
        checkBotTurn();
        return; 
    }

    const careerPlayer = JSON.parse(localStorage.getItem('career_player'));
    const bracket = JSON.parse(localStorage.getItem('current_bracket'));
    const config = JSON.parse(localStorage.getItem('active_match_config'));

    if (!careerPlayer || !bracket) {
        alert("Keine Karriere-Daten gefunden!");
        window.location.href = 'tournament_view.html';
        return;
    }

    const currentRound = bracket.structure[bracket.currentRound - 1];
    const matchData = currentRound.find(m => (m.p1.n === careerPlayer.name || m.p2.n === careerPlayer.name) && !m.completed);

    if (!matchData) {
        window.location.href = 'tournament_view.html';
        return;
    }

    const opponent = matchData.p1.n === careerPlayer.name ? matchData.p2 : matchData.p1;

    match.config = { 
        start: 501, 
        legsToWin: Math.ceil((config.bo || 11) / 2) 
    };

    match.players = [
        createPlayer(careerPlayer.name, false, careerPlayer.baseAvg),
        createPlayer(opponent.n, true, opponent.a)
    ];

    renderGrid();

    // --- BULL-OFF LOGIK ---
    const starter = localStorage.getItem('match_starter');
    
    if (!starter) {
        // Wenn noch nicht ausgebulllt wurde, schicke den User zum Bull-Off
        window.location.href = 'bulloff.html';
        return;
    }

    // Wer fängt an? (user = Index 0, ai = Index 1)
    match.current = (starter === 'user') ? 0 : 1;
    match.starterOfLeg = match.current; 
    
    // Einmalig löschen, damit beim nächsten Match neu gebullt werden muss
    localStorage.removeItem('match_starter'); 

    updateUI();
    switchScreen('game-screen'); 
    checkBotTurn();
};

function createPlayer(name, isBot, avg) {
    return {
        name: name, isBot: isBot, skill: avg || 45,
        score: 501, visitStart: 501, legs: 0,
        pts: 0, legPts: 0, darts: 0, legDarts: 0,
        first9Pts: 0, first9Darts: 0,
        visitHistory: [], currentVisitScore: 0,
        busts: 0, bestVisit: 0, highestFinish: 0, shortestLeg: 999,
        s180: 0, s140: 0, s100: 0,
        hits: { s: {}, d: {}, t: {} }, checkoutStats: {}, coWon: 0, coAtt: 0
    };
}

// --- GAME LOGIC ---
function setMulti(m) {
    match.multi = m;
    document.querySelectorAll('.multi-btn').forEach(b => b.classList.remove('active-multi'));
    const btn = document.getElementById(`m-${m}`);
    if(btn) btn.classList.add('active-multi');
}

function hit(val) {
    // 1. Abbruch-Bedingungen
    if (match.isOver) return;
    // WICHTIG: Wenn der Bot denkt, darf der Mensch nicht klicken!
    if (botThinking && !match.players[match.current].isBot) return;

    const p = match.players[match.current];
    const points = val * match.multi;
    const newScore = p.score - points;

    trackHit(p, val, match.multi);
    
    p.darts++; 
    p.legDarts++;
    
    // 2. CHECKOUT LOGIK (Sieg)
    if (newScore === 0 && match.multi === 2) {
        p.pts += points; p.legPts += points;
        p.currentVisitScore += points;
        p.coWon++; p.score = 0; p.legs++;
        p.visitHistory.push(p.currentVisitScore);
        
        if(p.visitStart > p.highestFinish) p.highestFinish = p.visitStart;
        if (p.legDarts < p.shortestLeg) p.shortestLeg = p.legDarts;
        
        endVisit(p);
        if (p.legs >= match.config.legsToWin) {
            match.isOver = true;
            updateUI();
            announce("Game Shot and the Match");
            setTimeout(() => saveCareerResult(p.name), 2000);
        } else {
            updateUI();
            announce("Game Shot");
            setTimeout(startNextLeg, 1500);
        }
    } 
    // 3. BUST REGEL (Überworfen oder Rest 1)
    else if (newScore < 2 && newScore !== 0) {
        announce("Bust");
        p.busts++;
        p.score = p.visitStart; // Zurück auf den Stand vor der Aufnahme
        
        // Aufnahme beenden (Darts auf 3 auffüllen für Statistik)
        const dartsInThisVisit = p.legDarts % 3 || 3;
        const penalty = 3 - dartsInThisVisit;
        p.darts += penalty;
        p.legDarts += penalty; 
        
        p.visitHistory.push(0);
        p.currentVisitScore = 0;
        
        // Sofortiger Wechsel zum nächsten Spieler
        setTimeout(nextTurn, 800);
    } 
    // 4. NORMALER WURF
    else {
        p.score = newScore;
        p.pts += points; 
        p.legPts += points;
        p.currentVisitScore += points;
        
        if(p.legDarts <= 9) { 
            p.first9Pts += points; 
            p.first9Darts++; 
        }

        // Ende der 3-Dart-Aufnahme
        if (p.legDarts % 3 === 0) {
            p.visitHistory.push(p.currentVisitScore);
            endVisit(p);
            p.visitStart = p.score; // Neuer Startpunkt für das nächste Mal
            setTimeout(nextTurn, 500);
        }
    }
    
    if (!p.isBot) setMulti(1); // Multiplikator für Mensch zurücksetzen
    updateUI();
    saveCurrentMatchState(); 
}

function nextTurn() {
    if(match.isOver) return;
    match.current = (match.current === 0) ? 1 : 0;
    updateUI();
    checkBotTurn();
}

// --- BOT LOGIK ---

// Hilfsfunktion: Berechnet den optimalen Dart für einen Restscore
function getBestDartForScore(score, dartNumInVisit) {
    // Wenn Score in der Tabelle ist, nimm den Weg
    if (score <= 170 && checkoutTable[score]) {
        const route = checkoutTable[score].split(' ');
        // Wir nehmen immer den ersten Dart der empfohlenen Route für den aktuellen Score
        const targetStr = route[0]; 
        
        let m = 1;
        let t = 0;
        
        if (targetStr.startsWith('T')) { t = parseInt(targetStr.substring(1)); m = 3; }
        else if (targetStr.startsWith('D')) { t = parseInt(targetStr.substring(1)); m = 2; }
        else if (targetStr === "BULL") { t = 25; m = 2; }
        else { t = parseInt(targetStr); m = 1; }
        
        return { target: t, multi: m };
    }
    
    // Default Scoring (auf 20 zielen)
    return { target: 20, multi: 3 };
}

function checkBotTurn() {
    const grid = document.getElementById('num-grid');
    const p = match.players[match.current];
    
    if (p && p.isBot && !botThinking && !match.isOver) {
        botThinking = true;
        if (grid) {
            grid.style.pointerEvents = 'none';
            grid.classList.add('disabled-grid');
        }
        setTimeout(runBotLogic, 1500);
    } else if (p && !p.isBot) {
        botThinking = false;
        if (grid) {
            grid.style.pointerEvents = 'auto';
            grid.classList.remove('disabled-grid');
        }
    }
}

async function runBotLogic() {
    const p = match.players[match.current];
    if (!p || !p.isBot || match.isOver) return;

    const targetAvg = p.skill || 40; 
    
    for (let i = 0; i < 3; i++) {
        if (match.isOver || p.score === 0) break;
        
        await new Promise(r => setTimeout(r, 700 + Math.random() * 400));

        const best = getBestDartForScore(p.score, i);
        let target = best.target;
        let intendedMulti = best.multi;

        const roll = Math.random() * 100;
        let finalVal = 0;
        let finalMulti = 1;

        // --- SCORING LOGIK (Weniger aggressiv) ---
        if (intendedMulti === 3) {
            // Die Triple-Chance wird stark reduziert, damit keine "90+ First 9" entstehen
            // Ein 45er Bot trifft nur in ca. 4-5% der Fälle das Triple
            let tripleLimit = (targetAvg - 30) / 4; 
            
            if (roll < tripleLimit) {
                finalVal = target; finalMulti = 3;
            } else if (roll < 75) { 
                // Hohe Chance auf Single 20 (das hält den Score stabil, ohne zu eskalieren)
                finalVal = target; finalMulti = 1;
            } else {
                // Streuung in 1 oder 5
                finalVal = Math.random() > 0.5 ? 1 : 5;
                finalMulti = 1;
            }
        } 
        // --- CHECKOUT LOGIK (Etwas besser/stabiler) ---
        else if (intendedMulti === 2) {
            // Wir machen die Doppel-Chance berechenbarer
            // 45 Avg -> ca. 12-15% Doppel-Quote (statt vorher fast 0)
            let doubleLimit = (targetAvg / 4); 
            
            if (roll < doubleLimit) {
                finalVal = target; finalMulti = 2;
            } else if (roll < 80) {
                finalVal = target; finalMulti = 1; // Knapp vorbei (Inside)
            } else {
                finalVal = 0; finalMulti = 1; // Komplett vorbei (Outside)
            }
        } 
        else {
            // Normales Single-Spiel
            finalVal = roll < 80 ? target : (Math.random() > 0.5 ? 1 : 5);
            finalMulti = 1;
        }

        // BUST-SCHUTZ
        if (p.score - (finalVal * finalMulti) < 2 && p.score - (finalVal * finalMulti) !== 0) {
            finalVal = 0; finalMulti = 1;
        }

        match.multi = finalMulti;
        hit(finalVal);

        if (match.players[match.current] !== p || p.score === 0) break;
    }
    botThinking = false;
}

// --- STATISTIKEN & ANALYTICS ---
function trackHit(player, val, multi) {
    const type = multi === 3 ? 't' : (multi === 2 ? 'd' : 's');
    if (!player.hits[type][val]) player.hits[type][val] = 0;
    player.hits[type][val]++;

    if(multi === 2 && player.score <= 50) {
        player.coAtt++;
        if(!player.checkoutStats[val]) player.checkoutStats[val] = {hit:0, att:0};
        player.checkoutStats[val].att++;
        if(player.score - (val * 2) === 0) player.checkoutStats[val].hit++;
    }
}

function showStats(playerIdx = 0) {
    const p = match.players[playerIdx];
    const target = document.getElementById('stats-render');
    const avg = (p.pts / (p.darts || 1) * 3).toFixed(1);
    const first9 = (p.first9Pts / (p.first9Darts || 1) * 3).toFixed(1);
    const shortestLegText = p.shortestLeg === 999 ? "-" : p.shortestLeg;
    target.innerHTML = `
        <div class="stats-navigator" style="display:flex; gap:10px; margin-bottom:15px;">
            <button onclick="showStats(0)" style="flex:1; padding:10px; border-radius:8px; border:none; background:${playerIdx===0?'var(--accent)':'#333'}; color:white;">${match.players[0].name}</button>
            <button onclick="showStats(1)" style="flex:1; padding:10px; border-radius:8px; border:none; background:${playerIdx===1?'var(--accent)':'#333'}; color:white;">${match.players[1].name}</button>
        </div>
        <div class="stats-card">
            <div style="text-align:center; margin-bottom:20px; background:rgba(255,255,255,0.05); padding:15px; border-radius:15px;"><span style="font-size:2.5rem; font-weight:900; color:var(--accent); display:block;">${avg}</span><label style="font-size:0.7rem; opacity:0.6;">MATCH AVERAGE</label></div>
            <div class="stat-main-grid" style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:10px; margin-bottom:20px;"><div class="stat-box" style="background:#222; padding:10px; border-radius:8px; text-align:center;"><label style="font-size:0.6rem; display:block;">1st 9</label><b>${first9}</b></div><div class="stat-box" style="background:#222; padding:10px; border-radius:8px; text-align:center;"><label style="font-size:0.6rem; display:block;">CO %</label><b>${((p.coWon/(p.coAtt||1))*100).toFixed(0)}%</b></div><div class="stat-box" style="background:#222; padding:10px; border-radius:8px; text-align:center;"><label style="font-size:0.6rem; display:block;">Busts</label><b>${p.busts}</b></div></div>
            <div class="highlight-strip" style="display:flex; justify-content:space-around; background:rgba(0,0,0,0.2); padding:10px; border-radius:8px; margin-bottom:20px;"><div class="h-item" style="text-align:center;"><label style="font-size:0.6rem; display:block;">BEST VISIT</label><b>${p.bestVisit}</b></div><div class="h-item" style="text-align:center;"><label style="font-size:0.6rem; display:block;">HIGH CO</label><b>${p.highestFinish}</b></div><div class="h-item" style="text-align:center;"><label style="font-size:0.6rem; display:block;">BEST LEG</label><b>${shortestLegText}</b></div></div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">${drawHeatmap(p)}<div style="width:45%; text-align:right;"><div style="font-size:0.8rem; margin-bottom:5px;"><b>${p.s180}</b> x 180s</div><div style="font-size:0.8rem; margin-bottom:5px;"><b>${p.s140}</b> x 140+</div><div style="font-size:0.8rem; margin-bottom:5px;"><b>${p.s100}</b> x 100+</div></div></div>
            ${drawCheckoutChart(p)}
            <div style="margin-top:25px; padding-top:15px; border-top:1px solid rgba(255,255,255,0.1);"><label style="font-size:0.7rem; color:var(--accent); display:block; margin-bottom:10px;">LANGZEIT-TREND</label>${renderMiniHistory()}</div>
        </div>`;
    switchScreen('stats-screen');
}

function drawHeatmap(player) {
    const allHits = [...Object.values(player.hits.s), ...Object.values(player.hits.d), ...Object.values(player.hits.t)];
    const maxHits = Math.max(...allHits) || 1;
    const numbers = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
    
    let svg = `<svg viewBox="0 0 200 200" style="width:100%; max-width:220px; margin: auto; display:block; cursor:pointer;">`;
    svg += `<circle cx="100" cy="100" r="95" fill="#2c3e50" stroke="#3d4656" stroke-width="1"/>`;
    
    const getOp = (val) => 0.05 + (val / maxHits) * 0.95;

    numbers.forEach((num, i) => {
        const angle = (i * 18) - 99;
        const rad1 = Math.PI * angle / 180, rad2 = Math.PI * (angle + 18) / 180;

        const drawPart = (rIn, rOut, hitVal, color, typeLabel, actualHits) => {
            const x1 = 100 + rOut * Math.cos(rad1), y1 = 100 + rOut * Math.sin(rad1);
            const x2 = 100 + rOut * Math.cos(rad2), y2 = 100 + rOut * Math.sin(rad2);
            const x3 = 100 + rIn * Math.cos(rad2), y3 = 100 + rIn * Math.sin(rad2);
            const x4 = 100 + rIn * Math.cos(rad1), y4 = 100 + rIn * Math.sin(rad1);
            
            const fillColor = actualHits > 0 ? `rgba(${color}, ${getOp(hitVal)})` : `rgba(200, 200, 200, 0.1)`;

            return `<path d="M${x1},${y1} A${rOut},${rOut} 0 0,1 ${x2},${y2} L${x3},${y3} A${rIn},${rIn} 0 0,0 ${x4},${y4} Z" 
                fill="${fillColor}" stroke="#1e272e" stroke-width="0.3"
                onclick="showSectorDetails('${typeLabel}', ${num}, ${actualHits})"
                style="transition: 0.2s;"/>`;
        };

        svg += drawPart(75, 82, player.hits.d[num], "5, 196, 107", 'Double', player.hits.d[num]); 
        svg += drawPart(43, 75, player.hits.s[num], "5, 196, 107", 'Single', player.hits.s[num]); 
        svg += drawPart(36, 43, player.hits.t[num], "241, 196, 15", 'Triple', player.hits.t[num]); 
        svg += drawPart(12, 36, player.hits.s[num], "5, 196, 107", 'Single', player.hits.s[num]); 

        const midAngle = rad1 + (Math.PI * 9 / 180);
        const tx = 100 + 90 * Math.cos(midAngle), ty = 100 + 90 * Math.sin(midAngle);
        svg += `<text x="${tx}" y="${ty}" font-size="7" fill="white" text-anchor="middle" alignment-baseline="middle" pointer-events="none" style="opacity:0.6;">${num}</text>`;
    });

    const s25 = player.hits.s[25] || 0;
    const d25 = player.hits.d[25] || 0;
    
    svg += `<circle cx="100" cy="100" r="12" fill="${s25 > 0 ? `rgba(5, 196, 107, ${getOp(s25)})` : 'rgba(200,200,200,0.1)'}" stroke="white" stroke-width="0.2" onclick="showSectorDetails('Single', 'Bull', ${s25})"/>`;
    svg += `<circle cx="100" cy="100" r="5" fill="${d25 > 0 ? `rgba(241, 196, 15, ${getOp(d25)})` : 'rgba(200,200,200,0.1)'}" stroke="white" stroke-width="0.2" onclick="showSectorDetails('Double', 'Bullseye', ${d25})"/>`;
    
    svg += `</svg><div id="heatmap-info" style="text-align:center; margin-top:10px; min-height:20px; font-size:0.8rem; color:var(--accent); font-weight:bold;">Tippe ein Feld an</div>`;
    return svg;
}

function showSectorDetails(type, num, count) {
    const infoBox = document.getElementById('heatmap-info');
    if(infoBox) infoBox.innerHTML = `${type} ${num}: <span style="color:white;">${count} Treffer</span>`;
}

function drawCheckoutChart(player) {
    const stats = player.checkoutStats;
    const doubles = Object.keys(stats).sort((a,b) => b-a);
    if(doubles.length === 0) return "";
    let html = `<div style="margin-top:15px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px;"><label style="font-size:0.7rem; color:var(--accent); display:block; margin-bottom:8px;">CHECKOUT DETAILS</label>`;
    doubles.forEach(d => {
        const s = stats[d];
        const pct = ((s.hit / s.att) * 100).toFixed(0);
        html += `<div style="display:flex; align-items:center; margin-bottom:4px; font-size:0.7rem;"><div style="width:25px; font-weight:bold;">D${d}</div><div style="flex-grow:1; height:8px; background:#3d4656; margin: 0 10px; border-radius:4px; overflow:hidden;"><div style="width:${pct}%; height:100%; background:var(--accent);"></div></div><div style="width:60px; text-align:right; opacity:0.7;">${s.hit}/${s.att} (${pct}%)</div></div>`;
    });
    html += `</div>`;
    return html;
}

function saveMatchToHistory() {
    let archive = JSON.parse(localStorage.getItem('dart_match_archive') || '[]');
    const matchSummary = {
        date: new Date().toLocaleDateString(),
        p1: { name: match.players[0].name, avg: (match.players[0].pts / (match.players[0].darts || 1) * 3).toFixed(1) },
        p2: { name: match.players[1].name, avg: (match.players[1].pts / (match.players[1].darts || 1) * 3).toFixed(1) }
    };
    archive.unshift(matchSummary);
    if(archive.length > 10) archive.pop();
    localStorage.setItem('dart_match_archive', JSON.stringify(archive));
}

function renderMiniHistory() {
    const archive = JSON.parse(localStorage.getItem('dart_match_archive') || '[]');
    if(archive.length === 0) return "<small>Noch keine Daten vorhanden.</small>";
    return archive.map(m => `<div style="display:flex; justify-content:space-between; font-size:0.6rem; opacity:0.7; padding:3px 0; border-bottom:1px solid rgba(255,255,255,0.05);"><span>${m.date}</span><span>${m.p1.avg} - ${m.p2.avg} AVG</span></div>`).join('');
}

// --- UI & SYSTEM ---
function updateUI() {
    match.players.forEach((p, i) => {
        document.getElementById(`d-name-${i}`).innerText = p.name;
        document.getElementById(`score-${i}`).innerText = p.score;
        document.getElementById(`stats-${i}`).innerText = `Legs: ${p.legs}`;
        document.getElementById(`card-${i}`).className = `player-card ${match.current === i ? 'active' : ''}`;
        
        const mAvg = p.darts > 0 ? ((p.pts / p.darts) * 3).toFixed(1) : "0.0";
        const lAvg = p.legDarts > 0 ? ((p.legPts / p.legDarts) * 3).toFixed(1) : "0.0";

        document.getElementById(`avg-container-${i}`).innerHTML = `
            <div class="avg-box">AVG <span>${mAvg}</span></div>
            <div class="avg-box">LEG <span>${lAvg}</span></div>
        `;
    });
    const activeP = match.players[match.current];
    document.getElementById('checkout-box').innerText = (activeP.score <= 170) ? (checkoutTable[activeP.score] || "Score") : "Bereit";
    document.getElementById('leg-indicator').innerText = `LEG ${match.currentLeg}`;
}

function startNextLeg() {
    match.players.forEach(p => { 
        p.score = 501; 
        p.visitStart = 501; 
        p.legDarts = 0; 
        p.legPts = 0; 
    });
    
    // Anwurf-Wechsel: Wer im letzten Leg angefangen hat, wirft jetzt als Zweiter
    match.starterOfLeg = (match.starterOfLeg === 0) ? 1 : 0;
    match.current = match.starterOfLeg;
    
    match.currentLeg++;
    updateUI();
    checkBotTurn();
}

function endVisit(p) {
    const s = p.currentVisitScore;
    if (s === 180) p.s180++; else if (s >= 140) p.s140++; else if (s >= 100) p.s100++;
    p.currentVisitScore = 0;
}

function renderGrid() {
    const g = document.getElementById('num-grid'); g.innerHTML = '';
    const m2 = document.createElement('button'); m2.id='m-2'; m2.className='numpad-btn multi-btn'; m2.innerText='DOUBLE'; m2.onclick=()=>setMulti(2); g.appendChild(m2);
    const m3 = document.createElement('button'); m3.id='m-3'; m3.className='numpad-btn multi-btn'; m3.innerText='TRIPLE'; m3.onclick=()=>setMulti(3); g.appendChild(m3);
    const miss = document.createElement('button'); miss.className='numpad-btn btn-miss'; miss.innerText='MISS'; miss.onclick=()=>hit(0); g.appendChild(miss);
    const bull = document.createElement('button'); bull.className='numpad-btn btn-bull'; bull.style.gridColumn = 'span 2'; bull.innerText='BULL'; bull.onclick=()=>hit(25); g.appendChild(bull);

    for(let i=1; i<=20; i++) {
        const b = document.createElement('button'); b.className = 'numpad-btn';
        b.innerText = i; b.onclick = () => hit(i); g.appendChild(b);
    }
}

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => { s.style.display = 'none'; s.classList.remove('active'); });
    const t = document.getElementById(id); if(t) { t.style.display = 'block'; t.classList.add('active'); }
}

function closeStats() { switchScreen('game-screen'); }

function announce(txt) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(txt));
}

function saveCareerResult(winnerName) {
    let bracket = JSON.parse(localStorage.getItem('current_bracket'));
    const round = bracket.structure[bracket.currentRound - 1];
    const mIdx = round.findIndex(m => (m.p1.n === match.players[0].name || m.p2.n === match.players[0].name) && !m.completed);
    if (mIdx !== -1) {
        round[mIdx].winner = winnerName;
        round[mIdx].score = `${match.players[0].legs}:${match.players[1].legs}`;
        round[mIdx].completed = true;
    }
    localStorage.setItem('current_bracket', JSON.stringify(bracket));
    window.location.href = 'tournament_view.html';
}

/**
 * GAME ENGINE - Reset Logic
 * Setzt alle Scores, Statistiken und den Keller-Speicher zurück
 */
/**
 * GAME ENGINE - Reset Logic (Fix für active_dart_match)
 */
function resetMatch() {
    // 1. Sicherheitsabfrage
    if (!confirm("Möchtest du das aktuelle Match wirklich abbrechen? Der Fortschritt geht verloren.")) {
        return;
    }

    // 2. Den spezifischen Spiel-Speicher löschen
    // Dein System nutzt 'active_dart_match' für den Spielstand
    localStorage.removeItem('active_dart_match');
    
    // Auch den Bull-Off Starter löschen, falls man das Match komplett neu würfeln will
    localStorage.removeItem('match_starter');

    // 3. Globale Variablen im Code zurücksetzen (für den Fall, dass kein Redirect erfolgt)
    match.isOver = false;
    match.currentLeg = 1;
    match.players.forEach(p => {
        p.score = 501;
        p.legs = 0;
        p.pts = 0;
        p.darts = 0;
        p.legDarts = 0;
        p.visitHistory = [];
        // Hier könnten weitere Stats genullt werden, falls nötig
    });

    // 4. Routing-Logik prüfen
    const config = JSON.parse(localStorage.getItem('active_match_config'));

    if (config && config.isCareer) {
        // Zurück zum Turnierbaum (Wichtig: Dateiname prüfen, oft 'tournament_view.html' oder 'bracket.html')
        window.location.href = 'tournament_view.html'; 
    } else {
        // Falls freies Spiel: Einfach alles frisch laden
        window.location.reload();
    }
}

function undo() {
    // Falls du eine History-Logik implementiert hast, hier einfügen
}

function saveCurrentMatchState() {
    if (match.isOver) {
        localStorage.removeItem('active_dart_match'); 
    } else {
        localStorage.setItem('active_dart_match', JSON.stringify(match));
    }
}
