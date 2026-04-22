/* nav-active.js
   Small script to set the `.active` class on the navigation link
   that matches the current page filename. Works with static HTML pages.
*/
(function() {
    try {
        const links = document.querySelectorAll('.nav-menu a[href]');
        if (!links || links.length === 0) return;

        // Get current file name (e.g., 'index.html'). If empty, assume index.html
        const raw = window.location.pathname.split('/').pop();
        const current = (raw && raw.length) ? raw.toLowerCase() : 'index.html';

        links.forEach(a => {
            // normalize href, strip query/hash and path
            const href = a.getAttribute('href');
            if (!href) return;
            // ignore purely hash links
            if (href.trim() === '#') {
                a.classList.remove('active');
                return;
            }
            const clean = href.split('#')[0].split('?')[0].split('/').pop().toLowerCase();

            a.classList.remove('active');
            if (clean === current) {
                a.classList.add('active');
            } else if (current === '' && (clean === 'index.html' || clean === 'index')) {
                a.classList.add('active');
            }
        });
    } catch (e) {
        // fail silently
        console.error('nav-active.js error', e);
    }
})();
