const SIDEBAR_HTML = `
<div class="sidebar">
    <div style="font-weight: 900; color: #2ecc71; margin-bottom: 40px; font-size: 1.3rem; text-align:center;">PDC</div>
    <a href="career_hub.html" class="nav-icon" id="nav-home">🏠</a>
    <a href="ranking.html" class="nav-icon" id="nav-ranking">📊</a>
    <a href="calendar.html" class="nav-icon" id="nav-calendar">📅</a>
    <a href="stats.html" class="nav-icon" id="nav-stats">📈</a>
    <a href="tropy.html" class="nav-icon" id="nav-trophy">🏆</a>
    <div style="flex-grow: 1;"></div>
    <a href="index.html" class="nav-icon" style="background: rgba(231, 76, 60, 0.1); color: #e74c3c;">🚪</a>
</div>
`;

function injectSidebar() {
    const container = document.getElementById('sidebar-container');
    if (container) {
        container.innerHTML = SIDEBAR_HTML;
        
        // Aktive Seite markieren (Checkt welche Datei gerade offen ist)
        const page = window.location.pathname.split("/").pop();
        const map = {
            'career_hub.html': 'nav-home',
            'ranking.html': 'nav-ranking',
            'calendar.html': 'nav-calendar',
            'stats.html': 'nav-stats',
            'tropy.html': 'nav-trophy'
        };
        
        const activeId = map[page];
        if (activeId) {
            const el = document.getElementById(activeId);
            if (el) el.classList.add('active');
        }
    }
}
