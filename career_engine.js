/**
 * CAREER ENGINE - Das Gehirn der PDC-Karriere
 * Zuständig für: KI-Wurflogik, Match-Simulation & Preisgeld (mit Trend-Logik)
 */

const CareerEngine = {
    // Einstellungen für die "menschliche" KI
    config: {
        neighborWeight: 0.25, // Wahrscheinlichkeit für Nachbarfelder bei Fehlschuss
        pressureThreshold: 100, // Ab wann die KI "Nervosität" zeigt (Restscore)
        maxAverageVariation: 4 // Zufällige Schwankung des Tages-Average
    },

    /**
     * Berechnet den nächsten Dart der KI
     */
    calculateHumanoidDart: function(target, skill, isDouble) {
        let hitProbability = (skill / 100) * (isDouble ? 0.4 : 1.0);
        const rand = Math.random();

        if (rand < hitProbability) {
            return target; 
        } else if (rand < hitProbability + this.config.neighborWeight) {
            return this.getPhysicalNeighbor(target, isDouble);
        } else {
            return Math.floor(Math.random() * 20) + 1;
        }
    },

    /**
     * Findet Nachbarfelder auf dem echten Board
     */
    getPhysicalNeighbor: function(target, isDouble) {
        const boardOrder = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
        let baseValue = target;
        if (target > 20) baseValue = target / 3; 
        if (isDouble) baseValue = target / 2; 

        let idx = boardOrder.indexOf(baseValue);
        let shift = Math.random() < 0.5 ? -1 : 1;
        let neighborIdx = (idx + shift + 20) % 20;
        
        return boardOrder[neighborIdx];
    },

    /**
     * Simuliert ein Match zwischen zwei KI-Spielern
     */
    simulateBackgroundMatch: function(p1, p2, boLegs) {
        let avg1 = p1.a + (Math.random() * this.config.maxAverageVariation * 2 - this.config.maxAverageVariation);
        let avg2 = p2.a + (Math.random() * this.config.maxAverageVariation * 2 - this.config.maxAverageVariation);
        
        let winProbP1 = 0.5 + (avg1 - avg2) * 0.05;
        winProbP1 = Math.max(0.1, Math.min(0.9, winProbP1));

        let score1 = 0;
        let score2 = 0;
        const winThreshold = Math.ceil(boLegs / 2);

        while (score1 < winThreshold && score2 < winThreshold) {
            if (Math.random() < winProbP1) score1++;
            else score2++;
        }

        return {
            winner: score1 > score2 ? p1.n : p2.n,
            score: `${score1}:${score2}`,
            avgP1: avg1.toFixed(1),
            avgP2: avg2.toFixed(1)
        };
    },

    /**
     * Preisgeld-Logik & Ranking-Update (JETZT MIT TREND-SPEICHERUNG)
     */
    updateOrderOfMerit: function(playerName, amount, eventType) {
        let players = JSON.parse(localStorage.getItem('pdc_world_players'));
        if (!players) return;

        // --- SCHRITT 1: TREND-LOGIK ---
        // Bevor wir sortieren, speichern wir den aktuellen Index als "letzten Rang" (lr)
        players.forEach((p, index) => {
            p.lr = index + 1; 
        });

        // --- SCHRITT 2: PREISGELD ADDIEREN ---
        let pIdx = players.findIndex(p => p.n === playerName);

        if (pIdx !== -1) {
            // Haupt-Ranking
            players[pIdx].m = (players[pIdx].m || 0) + amount;

            // Spezial-Rankings (ProTour / EuroTour)
            if (eventType === "ProTour") {
                players[pIdx].m_pc = (players[pIdx].m_pc || 0) + amount;
            } else if (eventType === "EuroTour") {
                players[pIdx].m_et = (players[pIdx].m_et || 0) + amount;
            }

            // --- SCHRITT 3: NEU SORTIEREN ---
            // Wir sortieren nach dem neuen Preisgeld 'm'
            players.sort((a, b) => (b.m || 0) - (a.m || 0));

            // Im LocalStorage speichern
            localStorage.setItem('pdc_world_players', JSON.stringify(players));

            // Falls es der menschliche Spieler ist, auch sein lokales Profil updaten
            let cp = JSON.parse(localStorage.getItem('career_player'));
            if (cp && cp.name === playerName) {
                cp.money = (cp.money || 0) + amount;
                // Wir speichern hier auch den neuen Rang im Profil, falls nötig
                cp.rank = players.findIndex(p => p.n === playerName) + 1;
                localStorage.setItem('career_player', JSON.stringify(cp));
            }
        }
    }
};
