document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el reproductor de audio
    var mediaElement = document.getElementById('audio-player');
    if (mediaElement) {
        new MediaElementPlayer(mediaElement, {
            features: ['playpause', 'current', 'progress', 'duration', 'volume'],
            alwaysShowControls: true
        });
    }

    // --- CONTADOR REGRESIVO ---
    const eventDate = new Date('2025-09-27T16:00:00');

    function createCountdownHTML(days, hours, minutes, seconds, lang) {
        const labels = {
            es: { days: 'días', hours: 'horas', minutes: 'minutos', seconds: 'segundos' },
            it: { days: 'giorni', hours: 'ore', minutes: 'minuti', seconds: 'secondi' }
        };
        const currentLabels = labels[lang];

        return `
            <div class="countdown-container">
                <div class="time-unit">
                    <div class="number">${days}</div>
                    <div class="label">${currentLabels.days}</div>
                </div>
                <div class="separator"></div>
                <div class="time-unit">
                    <div class="number">${hours}</div>
                    <div class="label">${currentLabels.hours}</div>
                </div>
                <div class="separator"></div>
                <div class="time-unit">
                    <div class="number">${minutes}</div>
                    <div class="label">${currentLabels.minutes}</div>
                </div>
                <div class="separator"></div>
                <div class="time-unit">
                    <div class="number">${seconds}</div>
                    <div class="label">${currentLabels.seconds}</div>
                </div>
            </div>
        `;
    }

    function updateCountdown() {
        const now = new Date();
        const diff = eventDate.getTime() - now.getTime();

        if (diff <= 0) {
            const finishedHTML = '<div class="countdown-container">¡Ya nos casamos!</div>';
            const finishedHTML_IT = '<div class="countdown-container">Ci siamo già sposati!</div>';
            if(document.getElementById('countdown-es')) document.getElementById('countdown-es').innerHTML = finishedHTML;
            if(document.getElementById('countdown-it')) document.getElementById('countdown-it').innerHTML = finishedHTML_IT;
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if(document.getElementById('countdown-es')) {
             document.getElementById('countdown-es').innerHTML = createCountdownHTML(days, hours, minutes, seconds, 'es');
        }
        if(document.getElementById('countdown-it')) {
            document.getElementById('countdown-it').innerHTML = createCountdownHTML(days, hours, minutes, seconds, 'it');
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- SELECCIÓN DE IDIOMA ---
    const btnEs = document.getElementById('btn-es');
    const btnIt = document.getElementById('btn-it');
    const spanishContent = document.getElementById('spanish-content');
    const italianContent = document.getElementById('italian-content');
    const musicPromptText = document.getElementById('music-prompt-text');

    function showSpanish() {
        spanishContent.style.display = 'block';
        italianContent.style.display = 'none';
        btnEs.classList.add('active');
        btnIt.classList.remove('active');
        if (musicPromptText) {
            musicPromptText.textContent = '¡Dale play a la música para una experiencia completa!';
        }
    }

    function showItalian() {
        spanishContent.style.display = 'none';
        italianContent.style.display = 'block';
        btnIt.classList.add('active');
        btnEs.classList.remove('active');
        if (musicPromptText) {
            musicPromptText.textContent = "Metti in play la musica per un'esperienza completa!";
        }
    }

    btnEs.addEventListener('click', showSpanish);
    btnIt.addEventListener('click', showItalian);

    showSpanish(); // Iniciar en español por defecto

    // --- ANIMACIONES AL SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- POP-UP DE MÚSICA (Mostrar y ocultar) ---
    const musicPrompt = document.querySelector('.music-prompt');
    if (musicPrompt) {
        setTimeout(() => {
            musicPrompt.classList.remove('animate__fadeIn');
            musicPrompt.classList.add('animate__fadeOut');
            musicPrompt.addEventListener('animationend', () => {
                musicPrompt.style.display = 'none';
            }, { once: true });
        }, 4000); // El pop-up se mostrará durante 4 segundos
    }
});
