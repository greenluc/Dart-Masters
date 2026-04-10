/**
 * PDC CAREER DATA 2026 - COMPLETE CONSOLIDATED SEASON
 * Alle 34 PC | 14 ET | Alle Majors
 */

const PDC_TOUR_DATA = {
    // Dynamische Match-Distanzen (Best of Legs/Sets)
    formats: {
        "ProTour": (r) => (r <= 6 ? 11 : 15), 
        "EuroTour": (r) => (r <= 4 ? 11 : (r === 5 ? 13 : 15)),
        "Masters": (r) => (r <= 1 ? 11 : (r <= 3 ? 19 : 21)),
        "UK_Open": (r) => (r <= 3 ? 11 : (r <= 5 ? 19 : 21)),
        "World_Matchplay": (r) => {
            const m = { 1: 19, 2: 21, 3: 31, 4: 33, 5: 35 }; 
            return m[r] || 19;
        },
        "World_Grand_Prix": (r) => {
            const m = { 1: 3, 2: 5, 3: 5, 4: 9, 5: 11 }; // SETS
            return m[r] || 3;
        },
        
        "European_Championship": (r) => (r <= 1 ? 11 : (r <= 3 ? 19 : 21)),
        "Grand_Slam": (r) => (r === 1 ? 9 : (r === 2 ? 19 : 31)), 
        "PC_Finals": (r) => (r <= 2 ? 11 : (r <= 4 ? 19 : 21)),
        "World_Championship": (r) => {
            const m = { 1: 3, 2: 5, 3: 7, 4: 7, 5: 9, 6: 11, 7: 13 }; // SETS
            return m[r] || 3;
        }
    },

    // Explizite Preisgeld-Verteilung pro Runde (PDC Standard 2026)
    breakdowns: {
        "ProTour": { winner: 15000, runnerUp: 10000, semi: 5000, qf: 3000, r16: 2000, r32: 1250, r64: 750, r128: 0 },
        "EuroTour": { winner: 35000, runnerUp: 15000, semi: 10000, qf: 8000, r16: 5000, r32: 3500, r48: 2000 },
        "UK_Open": { winner: 120000, runnerUp: 60000, semi: 35000, qf: 20000, r16: 12500, r32: 7500, r64: 3000, r96: 2000, r128: 1250 },
        "World_Cup": {winner: 80000,runnerUp: 40000, semi: 24000, qf: 16000, r16: 9000, r40: 5000 // Preisgeld f�r Teams, die in der Gruppenphase ausscheiden
},
        "World_Matchplay": { winner: 225000, runnerUp: 125000, semi: 65000, qf: 35000, r16: 22500, r32: 12500 },
        "Grand_Slam": { winner: 200000, runnerUp: 100000, semi: 60000, qf: 35000, r16: 20000, group2nd: 12500, group3rd: 5000 },
        "World_Grand_Prix": { winner: 150000, runnerUp: 80000, semi: 50000, qf: 35000, r16: 20000, r32: 7500 },
        "Euro_Champ": { winner: 150000, runnerUp: 80000, semi: 50000, qf: 35000, r16: 20000, r32: 7500 },
        "PC_Finals": { winner: 130000, runnerUp: 70000, semi: 40000, qf: 27500, r16: 15000, r32: 7000, r64: 4000 },
        "World_Championship": { 
            winner: 1000000, runnerUp: 400000, semi: 200000, qf: 100000, 
            r16: 60000, r32: 35000, r64: 25000, r96: 15000, r128: 15000 
        }
    },

    calendar: [
        // --- JANUAR ---
        { id: 1, date: "2026-01-29", name: "The Masters", type: "Major", country: "🇬🇧", location: "Milton Keynes", format: "Masters", req: 32, breakdown: "UK_Open" },
        
        // --- FEBRUAR ---
        { id: 2, date: "2026-02-09", name: "Players Championship 1", type: "ProTour", country: "🇩🇪", location: "Hildesheim", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 3, date: "2026-02-10", name: "Players Championship 2", type: "ProTour", country: "🇩🇪", location: "Hildesheim", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 4, date: "2026-02-16", name: "Players Championship 3", type: "ProTour", country: "🇬🇧", location: "Wigan", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 5, date: "2026-02-17", name: "Players Championship 4", type: "ProTour", country: "🇬🇧", location: "Wigan", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 6, date: "2026-02-20", name: "ET1: Poland Darts Open", type: "EuroTour", country: "🇵🇱", location: "Kielce", format: "EuroTour", req: 48, breakdown: "EuroTour" },
        { id: 7, date: "2026-02-24", name: "Players Championship 5", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 8, date: "2026-02-25", name: "Players Championship 6", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },

        // --- MÄRZ ---
        { id: 9, date: "2026-03-06", name: "UK Open", type: "Major", country: "🇬🇧", location: "Minehead", format: "UK_Open", req: 160, breakdown: "UK_Open" },
        { id: 10, date: "2026-03-13", name: "ET2: European Darts Trophy", type: "EuroTour", country: "🇩🇪", location: "Göttingen", format: "EuroTour", req: 48, breakdown: "EuroTour" },
        { id: 11, date: "2026-03-20", name: "ET3: Belgian Darts Open", type: "EuroTour", country: "🇧🇪", location: "Wieze", format: "EuroTour", req: 48, breakdown: "EuroTour" },
        { id: 12, date: "2026-03-30", name: "Players Championship 7", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 13, date: "2026-03-31", name: "Players Championship 8", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },

        // --- APRIL ---
        { id: 14, date: "2026-04-04", name: "ET4: German Darts Grand Prix", type: "EuroTour", country: "🇩🇪", location: "München", format: "EuroTour", req: 48, breakdown: "EuroTour" },
        { id: 15, date: "2026-04-13", name: "Players Championship 9", type: "ProTour", country: "🇬🇧", location: "Wigan", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 16, date: "2026-04-14", name: "Players Championship 10", type: "ProTour", country: "🇬🇧", location: "Wigan", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 17, date: "2026-04-17", name: "ET5: European Darts Grand Prix", type: "EuroTour", country: "🇩🇪", location: "Sindelfingen", format: "EuroTour", req: 48, breakdown: "EuroTour" },
        { id: 18, date: "2026-04-27", name: "Players Championship 11", type: "ProTour", country: "🇬🇧", location: "Milton Keynes", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 19, date: "2026-04-28", name: "Players Championship 12", type: "ProTour", country: "🇬🇧", location: "Milton Keynes", format: "ProTour", req: 128, breakdown: "ProTour" },

        // --- MAI ---
        { id: 20, date: "2026-05-04", name: "Players Championship 13", type: "ProTour", country: "🇩🇪", location: "Hildesheim", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 21, date: "2026-05-05", name: "Players Championship 14", type: "ProTour", country: "🇩🇪", location: "Hildesheim", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 22, date: "2026-05-08", name: "ET6: Austrian Darts Open", type: "EuroTour", country: "🇦🇹", location: "Graz", format: "EuroTour", req: 48, breakdown: "EuroTour" },
        { id: 23, date: "2026-05-12", name: "Players Championship 15", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 24, date: "2026-05-13", name: "Players Championship 16", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 25, date: "2026-05-18", name: "Players Championship 17", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 26, date: "2026-05-19", name: "Players Championship 18", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 27, date: "2026-05-22", name: "ET7: International Darts Open", type: "EuroTour", country: "🇩🇪", location: "Riesa", format: "EuroTour", req: 48, breakdown: "EuroTour" },
        { id: 28, date: "2026-05-29", name: "ET8: Baltic Sea Darts Open", type: "EuroTour", country: "🇩🇪", location: "Kiel", format: "EuroTour", req: 48, breakdown: "EuroTour" },

        // --- JUNI ---
        { id: 29, date: "2026-06-02", name: "Players Championship 19", type: "ProTour", country: "🇬🇧", location: "Milton Keynes", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 30, date: "2026-06-03", name: "Players Championship 20", type: "ProTour", country: "🇬🇧", location: "Milton Keynes", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 31, date: "2026-06-11", name: "World Cup of Darts", type: "WorldCup", country:  "🇩🇪",  location: "Frankfurt", format: "ProTour", req: 40, breakdown: "World_Cup" },
        
        { id: 32, date: "2026-06-16", name: "Players Championship 21", type: "ProTour", country: "🇬🇧", location: "Wigan", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 33, date: "2026-06-17", name: "Players Championship 22", type: "ProTour", country: "🇬🇧", location: "Wigan", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 34, date: "2026-06-19", name: "ET9: Slovak Darts Open", type: "EuroTour", country: "🇸🇰", location: "Bratislava", format: "EuroTour", req: 48, breakdown: "EuroTour" },

        // --- JULI ---
        { id: 35, date: "2026-07-06", name: "Players Championship 23", type: "ProTour", country: "🇬🇧", location: "Wigan", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 36, date: "2026-07-07", name: "Players Championship 24", type: "ProTour", country: "🇬🇧", location: "Wigan", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 37, date: "2026-07-10", name: "ET10: European Darts Open", type: "EuroTour", country: "🇩🇪", location: "Leverkusen", format: "EuroTour", req: 48, breakdown: "EuroTour" },
        { id: 38, date: "2026-07-18", name: "World Matchplay", type: "Major", country: "🇬🇧", location: "Blackpool", format: "World_Matchplay", req: 32, breakdown: "World_Matchplay" },
        { id: 39, date: "2026-07-28", name: "Players Championship 25", type: "ProTour", country: "🇩🇪", location: "Hildesheim", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 40, date: "2026-07-29", name: "Players Championship 26", type: "ProTour", country: "🇩🇪", location: "Hildesheim", format: "ProTour", req: 128, breakdown: "ProTour" },

        // --- AUGUST ---
        { id: 41, date: "2026-08-20", name: "Players Championship 27", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 42, date: "2026-08-21", name: "Players Championship 28", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 43, date: "2026-08-24", name: "Players Championship 29", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 44, date: "2026-08-25", name: "Players Championship 30", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 45, date: "2026-08-28", name: "ET11: Hungarian Darts Trophy", type: "EuroTour", country: "🇭🇺", location: "Budapest", format: "EuroTour", req: 48, breakdown: "EuroTour" },

        // --- SEPTEMBER ---
        { id: 46, date: "2026-09-04", name: "ET12: Czech Darts Open", type: "EuroTour", country: "🇨🇿", location: "Prag", format: "EuroTour", req: 48, breakdown: "EuroTour" },
        { id: 47, date: "2026-09-11", name: "ET13: Flanders Darts Trophy", type: "EuroTour", country: "🇧🇪", location: "Antwerpen", format: "EuroTour", req: 48, breakdown: "EuroTour" },
        { id: 48, date: "2026-09-22", name: "Players Championship 31", type: "ProTour", country: "🇬🇧", location: "Wigan", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 49, date: "2026-09-23", name: "Players Championship 32", type: "ProTour", country: "🇬🇧", location: "Wigan", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 50, date: "2026-09-28", name: "World Grand Prix", type: "Major", country: "🇮🇪", location: "Leicester", format: "World_Grand_Prix", req: 32, breakdown: "World_Grand_Prix" },

        // --- OKTOBER ---
        { id: 51, date: "2026-10-09", name: "ET14: Swiss Darts Trophy", type: "EuroTour", country: "🇨🇭", location: "Basel", format: "EuroTour", req: 48, breakdown: "EuroTour" },
        { id: 52, date: "2026-10-16", name: "ET15: Dutch Darts Championship", type: "EuroTour", country: "🇳🇱", location: "Maastricht", format: "EuroTour", req: 48, breakdown: "EuroTour" },
        { id: 53, date: "2026-10-22", name: "European Championship", type: "Major", country: "🇩🇪", location: "Dortmund", format: "European_Championship", req: 32, breakdown: "Euro_Champ" },
        { id: 54, date: "2026-10-28", name: "Players Championship 33", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },
        { id: 55, date: "2026-10-29", name: "Players Championship 34", type: "ProTour", country: "🇬🇧", location: "Leicester", format: "ProTour", req: 128, breakdown: "ProTour" },

        // --- NOVEMBER / DEZEMBER ---
        { id: 56, date: "2026-11-14", name: "Grand Slam of Darts", type: "Major", country: "🇬🇧", location: "Wolverhampton", format: "Grand_Slam", req: 32, breakdown: "Grand_Slam" },
        { id: 57, date: "2026-11-27", name: "Players Championship Finals", type: "Major", country: "🇬🇧", location: "Minehead", format: "PC_Finals", req: 64, breakdown: "PC_Finals" },
        { id: 58, date: "2026-12-15", name: "World Darts Championship", type: "Major", country: "🇬🇧", location: "London", format: "World_Championship", req: 96, breakdown: "World_Championship" }
    ]
};

/**
 * Hilfsfunktion: Bestimmt das Match-Format dynamisch
 */
function getMatchFormat(event, round) {
    const formatFn = PDC_TOUR_DATA.formats[event.format];
    return formatFn ? formatFn(round) : 11;
}

/**
 * Initialisierung der Spielerdaten im LocalStorage
 */
function initializePDCWorld() {
    let data = localStorage.getItem('pdc_world_players');
    if (!data && typeof ALL_PLAYERS !== 'undefined') {
        const initialPlayers = ALL_PLAYERS.map(p => ({
            ...p,
            m_pc: 0, 
            m_et: 0,
            total_prize: 0
        }));
        localStorage.setItem('pdc_world_players', JSON.stringify(initialPlayers));
        localStorage.setItem('pdc_career_index', "0");
    }
}
initializePDCWorld();

