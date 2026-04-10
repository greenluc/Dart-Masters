// --- DATEN & KONSTANTEN ---
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

let match = { config: {}, players: [], current: 0, multi: 1, history: [], starterOfLeg: 0, currentSet: 1, currentLeg: 1 };
let pendingCheckout = null;
let botThinking = false;

// Dynamisches CSS für das Numpad
const style = document.createElement('style');
style.innerHTML = `.disabled-grid { opacity: 0.3; pointer-events: none; transition: 0.3s; }`;
document.head.appendChild(style);

// --- UI HELFER ---
function toggleBotLevel() {
    const type = document.getElementById('p2-type').value;
    document.getElementById('bot-level-group').style.display = type === 'bot' ? 'block' : 'none';
    if(type === 'bot') document.getElementById('p2-name').value = "Bot Level " + document.getElementById('bot-difficulty').value;
}

function announce(text) {
    if (!window.speechSynthesis) return;
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'en-GB';
    msg.rate = 0.85;
    msg.pitch = 0.8;
    window.speechSynthesis.speak(msg);
}

const getOrdinal = (n) => ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"][n-1] || n + "th";

// --- INITIALISIERUNG ---
window.onload = () => {
    const savedP1 = localStorage.getItem('dart_p1_name');
    const savedP2 = localStorage.getItem('dart_p2_name');
    if(savedP1) document.getElementById('p1-name').value = savedP1;
    if(savedP2) document.getElementById('p2-name').value = savedP2;
    if(localStorage.getItem('dart_match_running') === 'true') {
        if(confirm("Laufendes Spiel fortsetzen?")) resumeGame();
        else clearMatchStorage();
    }
};

function saveToLocalStorage() {
    localStorage.setItem('dart_match_data', JSON.stringify(match));
    localStorage.setItem('dart_match_running', 'true');
}

function resumeGame() {
    const data = localStorage.getItem('dart_match_data');
    if(data) {
        match = JSON.parse(data);
        renderGrid();
        switchScreen('game-screen');
        updateUI();
        checkBotTurn();
    }
}

function clearMatchStorage() {
    localStorage.removeItem('dart_match_running');
    localStorage.removeItem('dart_match_data');
}

// --- SOUNDS ---
function playDartSound(type) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        if(type === 'hit') {
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
        } else if(type === 'win') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
        }
        osc.start(); osc.stop(ctx.currentTime + 0.3);
    } catch(e) {}
}

// --- BOT LOGIC ---
function checkBotTurn() {
    const grid = document.getElementById('num-grid');
    const isBot = match.players[match.current].isBot;

    if (isBot && !botThinking) {
        botThinking = true;
        if (grid) grid.classList.add('disabled-grid');
        setTimeout(executeBotTurn, 1500);
    } else if (!isBot) {
        botThinking = false;
        if (grid) grid.classList.remove('disabled-grid');
    }
}

async function executeBotTurn() {
    const p = match.players[match.current];
    
    for (let i = 0; i < 3; i++) {
        if (match.players[match.current] !== p) break;
        await new Promise(r => setTimeout(r, 800));

        let target = 20;
        let multi = 1;
        
        if (p.score <= 40 && p.score % 2 === 0) {
            target = p.score / 2;
            multi = 2;
        } else {
            target = 20;
        }

        const rand = Math.random();
        
        if (rand < 0.45) { 
            const mRand = Math.random();
            if (mRand > 0.92) multi = 3;
            else if (mRand > 0.85) multi = 2;
            else multi = 1;
        } 
        else if (rand < 0.85) {
            const neighbors = [1, 5];
            target = neighbors[Math.floor(Math.random() * neighbors.length)];
            multi = Math.random() > 0.95 ? 3 : 1;
        } 
        else {
            const wildFields = [7, 19, 3, 17, 12, 18];
            target = wildFields[Math.floor(Math.random() * wildFields.length)];
            multi = 1;
        }

        match.multi = multi;
        hit(target);
        
        if (pendingCheckout) {
            await new Promise(r => setTimeout(r, 600));
            confirmCheckout(i + 1);
            break;
        }
    }
    botThinking = false;
    checkBotTurn(); 
}

// --- GAME LOGIC ---
function startGame() {
    const startP = document.getElementById('starting-player').value;
    const starter = startP === 'random' ? Math.floor(Math.random() * 2) : parseInt(startP);
    const p2Type = document.getElementById('p2-type').value;
    
    match.config = {
        start: parseInt(document.getElementById('start-score').value),
        legsPerSet: parseInt(document.getElementById('legs-per-set').value),
        setsToWin: parseInt(document.getElementById('sets-to-win').value),
        outMode: document.getElementById('out-mode').value
    };

    match.players = [0, 1].map(i => ({
        name: i === 1 && p2Type === 'bot' ? "Computer" : (document.getElementById(`p${i+1}-name`).value || `Player ${i+1}`),
        isBot: i === 1 && p2Type === 'bot',
        botDifficulty: document.getElementById('bot-difficulty').value,
        score: match.config.start, 
        visitStartScore: match.config.start, 
        sets: 0, legs: 0, 
        pts: 0, darts: 0, legPts: 0, legDarts: 0,
        first9Pts: 0, first9Darts: 0,
        coAtt: 0, coWon: 0, currentVisitScore: 0,
        s180:0, s140:0, s100:0, s80:0, s60:0, s40:0,
        hits: { s: {}, d: {}, t: {} }, visitHistory: [],
        highestFinish: 0, shortestLeg: 999,
        bestVisit: 0, checkoutStats: {}, busts: 0
    }));

    for(let i=1; i<=25; i++) {
        [0, 1].forEach(pIdx => {
            match.players[pIdx].hits.s[i] = 0;
            match.players[pIdx].hits.d[i] = 0;
            match.players[pIdx].hits.t[i] = 0;
        });
    }

    match.current = starter; match.starterOfLeg = starter;
    match.currentSet = 1; match.currentLeg = 1;
    
    renderGrid();
    switchScreen('game-screen');
    updateUI();
    saveToLocalStorage();
    announce(`Match started.`);
    checkBotTurn();
}

function hit(val) {
    if (pendingCheckout || (botThinking && !match.players[match.current].isBot)) return;

    playDartSound('hit');
    const p = match.players[match.current];
    const m = match.multi;
    const pts = (val === 25 && m === 3) ? 0 : val * m;
    if(val === 25 && m === 3) return;

    match.history.push(JSON.parse(JSON.stringify({ 
        players: match.players, current: match.current, 
        starterOfLeg: match.starterOfLeg, currentSet: match.currentSet, currentLeg: match.currentLeg 
    })));

    if (p.legDarts % 3 === 0) {
        p.visitStartScore = p.score;
    }

    const isCheckoutVal = 
        (match.config.outMode === 'SO') || 
        (match.config.outMode === 'DO' && (m === 2 || (val === 25 && m === 2))) ||
        (match.config.outMode === 'MO' && (m === 2 || m === 3 || (val === 25 && m === 2)));

    const wouldBeScore = p.score - pts;

    if (wouldBeScore < 0 || (wouldBeScore === 1 && match.config.outMode !== 'SO') || (wouldBeScore === 0 && !isCheckoutVal)) {
        p.busts++;
        p.score = p.visitStartScore;
        const dartsTo3 = 3 - (p.legDarts % 3);
        p.darts += dartsTo3; 
        p.legDarts += dartsTo3;
        p.visitHistory.push(0);
        announce("No score!");
        p.currentVisitScore = 0;
        nextTurn();
    } else if(wouldBeScore === 0 && isCheckoutVal) {
        pendingCheckout = { pts: pts, val: val, m: m };
        if (!p.isBot) {
            document.getElementById('checkout-overlay').style.display = 'flex';
        } else {
            confirmCheckout(Math.min(3, (p.legDarts % 3) + 1));
        }
        return;
    } else {
        if(p.score <= 170 && isCheckoutVal) {
            p.coAtt++;
            if(!p.checkoutStats[val]) p.checkoutStats[val] = { att: 0, hit: 0 };
            p.checkoutStats[val].att++;
        }
        if (p.legDarts < 9) { p.first9Pts += pts; p.first9Darts++; }
        
        p.score = wouldBeScore; 
        p.pts += pts; p.legPts += pts;
        p.darts++; p.legDarts++; p.currentVisitScore += pts;
        
        const type = m === 1 ? 's' : (m === 2 ? 'd' : 't');
        p.hits[type][val]++;

        if(p.legDarts % 3 === 0) { 
            announce(p.currentVisitScore);
            p.visitHistory.push(p.currentVisitScore);
            if(p.currentVisitScore > p.bestVisit) p.bestVisit = p.currentVisitScore;
            endVisit(p); 
            nextTurn(); 
        }
    }
    match.multi = 1;
    updateUI();
    saveToLocalStorage();
}

function confirmCheckout(dartNum) {
    const p = match.players[match.current];
    if (!pendingCheckout) return;
    const { pts, val, m } = pendingCheckout;
    const dartsInVisitBefore = p.legDarts % 3;
    const dartsToAdd = dartNum - dartsInVisitBefore;
    
    if(p.score > p.highestFinish) p.highestFinish = p.score;
    if(!p.checkoutStats[val]) p.checkoutStats[val] = { att: 0, hit: 0 };
    p.checkoutStats[val].hit++;

    p.darts += dartsToAdd; p.legDarts += dartsToAdd;
    p.pts += pts; p.legPts += pts; p.currentVisitScore += pts;
    p.coAtt++; p.coWon++;
    p.visitHistory.push(p.currentVisitScore);
    
    if(p.legDarts < p.shortestLeg) p.shortestLeg = p.legDarts;
    if(p.currentVisitScore > p.bestVisit) p.bestVisit = p.currentVisitScore;
    
    const type = m === 1 ? 's' : (m === 2 ? 'd' : 't');
    p.hits[type][val]++;

    document.getElementById('checkout-overlay').style.display = 'none';
    pendingCheckout = null;
    handleLegWin();
}

function handleLegWin() {
    playDartSound('win');
    const p = match.players[match.current];
    p.legs++;
    
    if(p.legs >= match.config.legsPerSet) {
        p.sets++;
        if(p.sets >= match.config.setsToWin) {
            updateUI();
            announce(`Game shot and the Match!`);
            setTimeout(() => {
                saveMatchToHistory();
                showStats(match.current);
                clearMatchStorage();
            }, 1000);
            return;
        } else {
            announce(`Game shot the set!`);
            match.players[0].legs = 0; match.players[1].legs = 0;
            match.currentSet++; match.currentLeg = 1;
        }
    } else {
        announce(`Game shot the leg!`);
        match.currentLeg++;
    }

    match.players.forEach(pl => { 
        pl.score = match.config.start; 
        pl.visitStartScore = match.config.start;
        pl.legDarts = 0; pl.legPts = 0; pl.currentVisitScore = 0; 
    });
    match.starterOfLeg = (match.starterOfLeg === 0) ? 1 : 0;
    match.current = match.starterOfLeg;
    match.multi = 1;
    updateUI();
    saveToLocalStorage();
    checkBotTurn();
}

function updateUI() {
    match.players.forEach((p, i) => {
        document.getElementById(`score-${i}`).innerText = p.score;
        document.getElementById(`stats-${i}`).innerText = `Legs: ${p.legs} | Sets: ${p.sets}`;
        document.getElementById(`card-${i}`).classList.toggle('active', match.current === i);
        
        const mAvg = (p.pts / (p.darts || 1) * 3).toFixed(1);
        const lAvg = (p.legPts / (p.legDarts || 1) * 3).toFixed(1);
        
        const avgBox = document.getElementById(`avg-container-${i}`);
        if(avgBox) {
            avgBox.innerHTML = `<div class="avg-box">AVG <span>${mAvg}</span></div><div class="avg-box">LEG <span>${lAvg}</span></div>`;
        }

        const histEl = document.getElementById(`hist-${i}`);
        histEl.innerHTML = '';
        p.visitHistory.slice(-10).forEach(v => {
            const chip = document.createElement('span');
            chip.className = 'hist-chip' + (v >= 140 ? ' mega' : (v >= 100 ? ' high' : ''));
            chip.innerText = v;
            histEl.appendChild(chip);
        });
    });

    document.getElementById('leg-indicator').innerText = `SET ${match.currentSet} | LEG ${match.currentLeg}`;
    
    const activeP = match.players[match.current];
    const dartsInVisit = activeP.legDarts % 3;
    let visual = "";
    for(let i=0; i<3; i++) visual += i < dartsInVisit ? "● " : "○ ";
    
    const box = document.getElementById('checkout-box');
    if(activeP.score <= 170 && checkoutTable[activeP.score]) {
        box.innerHTML = `<div style="font-size:0.7rem; color:var(--multiplier)">FINISH</div><div>${checkoutTable[activeP.score]}</div>`;
    } else {
        box.innerHTML = `<div style="font-size:0.8rem; opacity:0.5">AUFNAHME</div><div style="letter-spacing:5px; color:var(--accent)">${visual}</div>`;
    }

    document.getElementById('m-2').classList.toggle('active', match.multi === 2);
    document.getElementById('m-3').classList.toggle('active', match.multi === 3);
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

function setMulti(m) { match.multi = (match.multi === m) ? 1 : m; updateUI(); }

function nextTurn() { 
    match.current = (match.current === 0) ? 1 : 0; 
    updateUI();
    checkBotTurn();
}

function undo() {
    if(match.history.length > 0) {
        const last = match.history.pop();
        Object.assign(match, last);
        updateUI(); saveToLocalStorage();
    }
}

function resetMatch() { if(confirm("Match abbrechen?")) { clearMatchStorage(); location.reload(); } }

function switchScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function closeStats() { switchScreen('game-screen'); }

function endVisit(p) {
    const s = p.currentVisitScore;
    if(s === 180) p.s180++;
    else if(s >= 140) p.s140++;
    else if(s >= 100) p.s100++;
    else if(s >= 80) p.s80++;
    else if(s >= 60) p.s60++;
    else if(s >= 40) p.s40++;
    p.currentVisitScore = 0;
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
    svg += `<circle cx="100" cy="100" r="95" fill="#1e272e" stroke="#3d4656" stroke-width="1"/>`;
    const getOp = (val) => 0.1 + (val / maxHits) * 0.9;
    numbers.forEach((num, i) => {
        const angle = (i * 18) - 99;
        const rad1 = Math.PI * angle / 180, rad2 = Math.PI * (angle + 18) / 180;
        const drawPart = (rIn, rOut, hitVal, color, typeLabel, actualHits) => {
            const x1 = 100 + rOut * Math.cos(rad1), y1 = 100 + rOut * Math.sin(rad1);
            const x2 = 100 + rOut * Math.cos(rad2), y2 = 100 + rOut * Math.sin(rad2);
            const x3 = 100 + rIn * Math.cos(rad2), y3 = 100 + rIn * Math.sin(rad2);
            const x4 = 100 + rIn * Math.cos(rad1), y4 = 100 + rIn * Math.sin(rad1);
            return `<path d="M${x1},${y1} A${rOut},${rOut} 0 0,1 ${x2},${y2} L${x3},${y3} A${rIn},${rIn} 0 0,0 ${x4},${y4} Z" 
                fill="rgba(${color}, ${getOp(hitVal)})" stroke="#1e272e" stroke-width="0.3"
                onclick="showSectorDetails('${typeLabel}', ${num}, ${actualHits})"
                style="transition: 0.2s;"/>`;
        };
        svg += drawPart(75, 82, player.hits.d[num], "5, 196, 107", 'Double', player.hits.d[num]); 
        svg += drawPart(43, 75, player.hits.s[num], "5, 196, 107", 'Single', player.hits.s[num]); 
        svg += drawPart(36, 43, player.hits.t[num], "241, 196, 15", 'Triple', player.hits.t[num]); 
        svg += drawPart(12, 36, player.hits.s[num], "5, 196, 107", 'Single', player.hits.s[num]); 
        const tx = 100 + 90 * Math.cos(rad1 + (Math.PI * 9 / 180)), ty = 100 + 90 * Math.sin(rad1 + (Math.PI * 9 / 180));
        svg += `<text x="${tx}" y="${ty}" font-size="7" fill="white" text-anchor="middle" alignment-baseline="middle" pointer-events="none">${num}</text>`;
    });
    svg += `<circle cx="100" cy="100" r="12" fill="rgba(5, 196, 107, ${getOp(player.hits.s[25])})" stroke="white" stroke-width="0.2" onclick="showSectorDetails('Single', 'Bull', ${player.hits.s[25]})"/>`;
    svg += `<circle cx="100" cy="100" r="5" fill="rgba(241, 196, 15, ${getOp(player.hits.d[25])})" stroke="white" stroke-width="0.2" onclick="showSectorDetails('Double', 'Bullseye', ${player.hits.d[25]})"/>`;
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