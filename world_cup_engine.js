/**
 * WORLD CUP OF DARTS ENGINE - Integration Version
 */
const WorldCupEngine = {
    /**
     * ZIEHT DIE TEAMS DIREKT AUS DER BRACKET ENGINE
     * Dies verhindert, dass nur PDC-Profis geladen werden.
     */
    generateTeams: function(allPlayers, user) {
        // Falls noch kein Bracket existiert, erstellen wir eines temporär
        // um die 40 validen Teams zu erhalten
        const tempBracket = createWorldCupBracket({id: "wc_init"}, user);
        
        // Wir geben alle Teams zurück: Seeds + Gruppen-Teams
        return [
            ...tempBracket.seeds,
            ...tempBracket.groups.flatMap(g => g.teams)
        ];
    },

    /**
     * Preisgeld-Verteilung (Bleibt bestehen)
     */
    awardPrize: function(team, rank, breakdowns, event, year) {
        const totalPrize = breakdowns["World_Cup"]?.[rank] || 0;
        const individualPrize = totalPrize / 2;

        [team.p1, team.p2].forEach(p => {
            if (!p.m) p.m = 0;
            p.m += individualPrize;
            if (!p.history) p.history = [];
            p.history.push({ 
                n: `World Cup of Darts (${team.c})`, 
                r: rank, p: individualPrize, y: year 
            });
        });
    },

    /**
     * Simulation der Team-Matches
     */
    simulateMatch: function(t1, t2, targetScore) {
        const avg1 = t1.a || 85;
        const avg2 = t2.a || 85;
        const winProb1 = Math.pow(avg1, 4) / (Math.pow(avg1, 4) + Math.pow(avg2, 4));
        
        const winner = Math.random() < winProb1 ? t1 : t2;
        const loser = winner === t1 ? t2 : t1;
        const sWinner = targetScore;
        const sLoser = Math.floor(Math.random() * targetScore);

        return {
            winner: winner,
            loser: loser,
            score: winner === t1 ? `${sWinner}:${sLoser}` : `${sLoser}:${sWinner}`,
            wScore: sWinner,
            lScore: sLoser
        };
    }
};
