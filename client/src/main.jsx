import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./App.css"
import { CarProvider } from './context/CarContext.jsx'
import { ServiceProvider } from './context/ServiceContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import "./index.css"

// ── Custom cursor ──────────────────────────────────────────────
const cursor = document.createElement('div');
cursor.id = 'custom-cursor';
Object.assign(cursor.style, {
    position:     'fixed',
    width:        '8px',
    height:       '8px',
    borderRadius: '50%',
    background:   '#e63946',
    pointerEvents: 'none',
    zIndex:       '99999',
    transform:    'translate(-50%, -50%)',
    transition:   'transform 0.08s ease, opacity 0.2s ease',
    willChange:   'left, top',
    mixBlendMode: 'multiply',
});
document.body.appendChild(cursor);

// Outer ring
const cursorRing = document.createElement('div');
Object.assign(cursorRing.style, {
    position:     'fixed',
    width:        '28px',
    height:       '28px',
    borderRadius: '50%',
    border:       '1.5px solid rgba(230,57,70,0.4)',
    pointerEvents: 'none',
    zIndex:       '99998',
    transform:    'translate(-50%, -50%)',
    transition:   'left 0.12s ease, top 0.12s ease, transform 0.15s ease',
    willChange:   'left, top',
});
document.body.appendChild(cursorRing);

let mx = -100, my = -100;
document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    cursorRing.style.left = mx + 'px';
    cursorRing.style.top  = my + 'px';
});

// Scale up on hover over interactive elements
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, [role="button"], input, select, textarea, label')) {
        cursor.style.transform     = 'translate(-50%, -50%) scale(1.8)';
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorRing.style.borderColor = 'rgba(230,57,70,0.7)';
    }
});
document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, [role="button"], input, select, textarea, label')) {
        cursor.style.transform     = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.borderColor = 'rgba(230,57,70,0.4)';
    }
});

// Hide default cursor
document.body.style.cursor = 'none';
const style = document.createElement('style');
style.textContent = '* { cursor: none !important; }';
document.head.appendChild(style);

// ── Scroll reveal ──────────────────────────────────────────────
const setupScrollReveal = () => {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('revealed');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

    const observe = () => {
        document.querySelectorAll('[data-reveal]:not(.revealed)').forEach(el => io.observe(el));
    };
    observe();
    new MutationObserver(observe).observe(document.body, { childList: true, subtree: true });
};
setupScrollReveal();

// ── Render ─────────────────────────────────────────────────────
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <CarProvider>
            <ServiceProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </ServiceProvider>
        </CarProvider>
    </BrowserRouter>
)
