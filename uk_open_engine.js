/**
 * UK OPEN DATA PROVIDER - V2 (8-Runden-Logik)
 */
function getUKOpenFullField() {
    let players = [...ALL_PLAYERS].sort((a, b) => (a.r || 999) - (b.r || 999));

    // Länderspezifische Namens-Pools für Amateure
    const regions = [
        { 
            c: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", 
            first: ["Jack", "Billy", "Dave", "Mick", "Terry", "Gaz", "Robbo", "Steve", "Harry", "Alf"],
            last: ["Miller", "Cook", "Baker", "Harrison", "Riley", "Oldman", "Rivers", "Smith", "Webb"]
        },
        { 
            c: "🇳🇱", 
            first: ["Niels", "Jordy", "Bram", "Sven", "Lars", "Thijs", "Maarten"],
            last: ["van Dijk", "de Vries", "Bakker", "Janssen", "Vink", "Meijer", "Smit"]
        },
        { 
            c: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", 
            first: ["Hamish", "Callum", "Fraser", "Angus", "Duncan"],
            last: ["MacLeod", "Douglas", "Robertson", "Stewart", "Campbell"]
        },
        { 
            c: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", 
            first: ["Gareth", "Ieuan", "Rhys", "Llywelyn", "Owain"],
            last: ["Jones", "Williams", "Davies", "Evans", "Thomas", "Morgan"]
        },
        { 
            c: "🇮🇪", 
            first: ["Liam", "Connor", "Sean", "Patrick", "Brendan"],
            last: ["O'Connor", "Murphy", "O'Neill", "Byrne", "Gallagher"]
        },
        { 
            c: "🇩🇪", // Bonus: Ein paar deutsche Qualifikanten
            first: ["Lukas", "Max", "Finn", "Leon", "Tobias"],
            last: ["Müller", "Schmidt", "Schneider", "Fischer", "Weber"]
        }
    ];

    while (players.length < 160) {
        let i = players.length;
        // Wähle zufällige Region
        const region = regions[Math.floor(Math.random() * regions.length)];
        const fName = region.first[Math.floor(Math.random() * region.first.length)];
        const lName = region.last[Math.floor(Math.random() * region.last.length)];

        players.push({
            r: i + 1,
            n: `Q: ${fName} ${lName}`,
            c: region.c,
            // Dein Wunsch: Max 40 Avg für die Qualifikanten
            a: Math.floor(Math.random() * 11) + 22, 
            isAmateur: true
        });
    }
    return players;
}



function getUKOpenNextParticipants(round, currentWinners) {
    const fullField = getUKOpenFullField(); // Holt die 160 Spieler
    let participants = [...currentWinners];

    if (round === 1) {
        // R1: Plätze 97-160 (64 Spieler)
        participants = fullField.slice(96, 160);
    } else if (round === 2) {
        // R2: 32 Sieger R1 + Plätze 65-96 (32 Spieler) -> Gesamt 64
        participants.push(...fullField.slice(64, 96));
    } else if (round === 3) {
        // R3: 32 Sieger R2 + Plätze 33-64 (32 Spieler) -> Gesamt 64
        participants.push(...fullField.slice(32, 64));
    } else if (round === 4) {
        // R4: 32 Sieger R3 + Plätze 1-32 (Die Top-Stars) -> Gesamt 64
        participants.push(...fullField.slice(0, 32));
    }

    // Open Draw: In jeder Runde wird das gesamte Feld neu gemischt
    return participants.sort(() => Math.random() - 0.5);
}
function getRoundName(idx, total, isUK) {
    if (isUK) {
        return [
            "Runde 1 (32 Matches)", 
            "Runde 2 (32 Matches)", 
            "Runde 3 (32 Matches)", 
            "Runde 4 (32 Matches)", 
            "Letzte 32 (16 Matches)", 
            "Achtelfinale (8 Matches)", 
            "Viertelfinale (4 Matches)", 
            "Halbfinale (2 Matches)", 
            "Finale (1 Match)"
        ][idx];
    }
    // ... Rest bleibt gleich
}
