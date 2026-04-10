/**
 * update_OOM.js - Exaktes 2-Jahres-System mit History & Initialisierung
 */

// --- 1. INITIALISIERUNG (Einmal ausführen) ---
function initializePlayerHistory() {
    let players = JSON.parse(localStorage.getItem('pdc_world_players'));
    if (!players) {
        console.error("Keine Spielerdaten gefunden!");
        return;
    }

    players.forEach(p => {
        // Nur initialisieren, wenn noch keine History existiert
        if (!p.history || p.history.length === 0) {
            p.history = [{
                event: "Initial Ranking Balance (Pre-2026)",
                prize: p.m || 0,
                date: "2025-01-01",
                type: "Major",
                result: "seed"
            }];
            // Initialisiere auch die Sub-Rankings falls nicht vorhanden
            if (p.m_pc === undefined) p.m_pc = 0;
            if (p.m_et === undefined) p.m_et = 0;
        }
    });

    localStorage.setItem('pdc_world_players', JSON.stringify(players));
    console.log("✅ History erfolgreich initialisiert!");
}

// --- 2. HAUPTFUNKTION NACH TURNIERABSCHLUSS ---
function finalizeTournamentAndDistributePrize() {
    const bracket = JSON.parse(localStorage.getItem('current_bracket'));
    const event = JSON.parse(localStorage.getItem('current_tournament'));
    let worldPlayers = JSON.parse(localStorage.getItem('pdc_world_players'));
    const user = JSON.parse(localStorage.getItem('career_player'));

    if (!bracket || !event || !worldPlayers) {
        alert("Fehler: Turnierdaten konnten nicht geladen werden.");
        return;
    }

    const today = new Date(event.date);
    const twoYearsAgo = new Date(event.date);
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    const oneYearAgo = new Date(event.date);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const results = getTournamentResults(bracket, event);
    const breakdown = typeof event.breakdown === 'string' 
        ? PDC_TOUR_DATA.breakdowns[event.breakdown] 
        : event.breakdown;

    let userEarnings = 0;

    // Alle Spieler updaten
    worldPlayers = worldPlayers.map(p => {
        if (!p.history) p.history = [];

        // A) Altes Geld entfernen (älter als 2 Jahre bezogen auf das Event-Datum)
        p.history = p.history.filter(entry => new Date(entry.date) > twoYearsAgo);

        // B) Neues Ergebnis hinzufügen
        const resKey = results[p.n];
        if (resKey && breakdown[resKey]) {
            const prize = breakdown[resKey];
            if (prize > 0) {
                p.history.push({
                    date: event.date,
                    name: event.name,
                    prize: prize,
                    type: event.type,
                    result: resKey
                });
                
                if (p.n === user.name) userEarnings = prize;
            }
        }

        // C) Alle Summen neu berechnen (Rolling Rankings)
        // Main OOM (2 Jahre)
        p.m = p.history.reduce((sum, e) => sum + e.prize, 0);
        
        // ProTour (PC) OOM (1 Jahr)
        p.m_pc = p.history
            .filter(e => e.type === "ProTour" && new Date(e.date) > oneYearAgo)
            .reduce((sum, e) => sum + e.prize, 0);

        // EuroTour (ET) OOM (1 Jahr)
        p.m_et = p.history
            .filter(e => e.type === "EuroTour" && new Date(e.date) > oneYearAgo)
            .reduce((sum, e) => sum + e.prize, 0);

        return p;
    });

    // Speichern
    localStorage.setItem('pdc_world_players', JSON.stringify(worldPlayers));
    
    // User-Geld im career_player Profil ebenfalls updaten
    if (userEarnings > 0) {
        user.money = (user.money || 0) + userEarnings;
        localStorage.setItem('career_player', JSON.stringify(user));
    }

    // Animation triggern
    if (typeof showPrizeAnimation === "function") {
        showPrizeAnimation(userEarnings);
    } else {
        alert(`Turnier beendet! Gewinn: £${userEarnings.toLocaleString()}`);
        window.location.href = 'career_hub.html';
    }
}

// --- 3. HILFSFUNKTION FÜR RESULTATE ---
function getTournamentResults(bracket, event) {
    const results = {};
    bracket.structure.forEach((roundMatches, rIdx) => {
        const isLastRound = rIdx === bracket.structure.length - 1;
        roundMatches.forEach(m => {
            if (isLastRound) {
                // Finale
                results[m.winner] = "winner";
                results[m.winner === m.p1.n ? m.p2.n : m.p1.n] = "runnerUp";
            } else {
                // Mapping: Wie weit kam der Verlierer?
                const roundKeys = ["r128", "r64", "r48", "r32", "r16", "qf", "semi"];
                const totalRounds = bracket.structure.length;
                const distance = totalRounds - 1 - rIdx;
                const status = roundKeys[roundKeys.length - distance] || "r128";
                
                // Wir speichern den Spieler nur, wenn er noch nicht drin steht 
                // (da er in späteren Runden überschrieben wird)
                if(!results[m.p1.n]) results[m.p1.n] = status;
                if(!results[m.p2.n]) results[m.p2.n] = status;
            }
        });
    });
    return results;
}
