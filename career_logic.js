/**
 * CAREER LOGIC - Order of Merit & Player History
 */

function syncTournamentResults(resultsArray) {
    console.log(" Starte OOM-Update...");

    // 1. Daten laden
    let allPlayers = JSON.parse(localStorage.getItem('pdc_world_players')) || [];
    let careerIndex = parseInt(localStorage.getItem('pdc_career_index') || "0");
    
    if (typeof PDC_TOUR_DATA === 'undefined') {
        console.error("Abbruch: Kalender-Daten fehlen!");
        return;
    }

    const currentEvent = PDC_TOUR_DATA.calendar[careerIndex];
    if (!currentEvent) return;

    // 2. Trend-System: Aktuelle Ränge speichern
    const oldRanks = {};
    allPlayers.forEach((p, idx) => {
        oldRanks[p.n] = p.r || (idx + 1);
    });

    // 3. Preisgeld & History-Typ bestimmen
    let historyType = currentEvent.type || "Major";
    let lookupKey = currentEvent.breakdown || (historyType === "ProTour" ? "ProTour" : "Major_Standard");
    const breakdownTable = PDC_TOUR_DATA.breakdowns[lookupKey];

    // 4. JEDEN Eintrag aus dem Turnierbaum verarbeiten
    resultsArray.forEach(resEntry => {
        const player = allPlayers.find(p => p.n === resEntry.name);
        if (player) {
            if (!player.history) player.history = [];

            // Rollierung: Altes Ergebnis dieses Events löschen
            player.history = player.history.filter(h => h.tId !== currentEvent.id);

            // Preisgeld aus der Tabelle ziehen
            let prize = breakdownTable ? (breakdownTable[resEntry.reach] || 0) : 0;

            // In History speichern
            player.history.push({
                tId: currentEvent.id,
                name: currentEvent.name,
                res: resEntry.reach,
                prize: prize,
                type: historyType,
                date: new Date().toISOString()
            });
        }
    });

    // 5. Konten aktualisieren (Summe der Historie)
    allPlayers.forEach(p => {
        if (p.history && p.history.length > 0) {
            p.m = p.history.reduce((sum, h) => sum + (h.prize || 0), 0);
            p.m_pc = p.history.filter(h => h.type === "ProTour").reduce((sum, h) => sum + (h.prize || 0), 0);
            p.m_et = p.history.filter(h => h.type === "EuroTour").reduce((sum, h) => sum + (h.prize || 0), 0);
        }
    });

    // 6. Sortieren nach Haupt-OoM (m)
    allPlayers.sort((a, b) => (b.m || 0) - (a.m || 0));

    // 7. Neue Ränge und Trends vergeben
    allPlayers.forEach((p, i) => {
        const newRank = i + 1;
        const oldRank = oldRanks[p.n];

        if (newRank < oldRank) p.trendEmoji = "";
        else if (newRank > oldRank) p.trendEmoji = "";
        else p.trendEmoji = "";
        
        p.r = newRank;
    });

    // 8. Speichern und Kalender-Index für nächstes Turnier erhöhen
    localStorage.setItem('pdc_world_players', JSON.stringify(allPlayers));
    localStorage.setItem('pdc_career_index', (careerIndex + 1).toString());
    
    console.log(" OoM Update abgeschlossen.");
}

/**
 * WICHTIG: Diese Funktion aufrufen, wenn dein Turnier vorbei ist!
 * Beispiel: finishTournament(15000, "Winner");
 */
function finishTournament(prizeWon, reach) {
    const careerPlayer = JSON.parse(localStorage.getItem('career_player'));
    if (!careerPlayer) {
        console.error("Kein Career Player gefunden!");
        return;
    }
    
    // Hier schicken wir das Ergebnis des Users in den Sync
    const results = [{ name: careerPlayer.name, reach: reach }];
    
    // Optional: Hier könnten noch Zufallsergebnisse für die KI-Spieler generiert werden
    // damit sich die Weltrangliste auch bei denen bewegt.
    
    syncTournamentResults(results);
}
