function loadFooter() {
    const footerHTML = `
    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>StooM</h3>
                <p>Your app to play easily to DooM.</p>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="downloads.html">Downloads</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Current Version</h3>
                <p>v0-beta.7</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 <a href="https://github.com/StooM-DP/">StooM</a>.</p>
        </div>
    </footer>
    `;
    
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = footerHTML;
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
} else {
    loadFooter();
}
