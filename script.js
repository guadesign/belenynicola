document.addEventListener('DOMContentLoaded', function() {
    try {
        // --- 1. INICIALIZAR REPRODUCTOR DE AUDIO ---
        // Se pone primero para asegurar que se intente inicializar sin importar otros errores.
        var mediaElement = document.getElementById('audio-player');
        if (mediaElement) {
            new MediaElementPlayer(mediaElement, {
                features: ['playpause', 'current', 'progress', 'duration', 'volume'],
                alwaysShowControls: true,
                success: function (media, node, instance) {
                    console.log("Reproductor de audio inicializado correctamente.");
                    // Forzar el centrado y ancho por si el CSS no carga a tiempo
                    const container = node.closest('.mejs__container');
                    if(container) {
                        container.style.maxWidth = '250px';
                        container.style.margin = '0 auto';
                    }
                },
                error: function (e) {
                    console.error("Error al inicializar el reproductor de audio:", e);
                }
            });
        }

        // --- 2. POP-UP DE MÚSICA (Mostrar y ocultar) ---
        const musicPrompt = document.querySelector('.music-prompt');
        if (musicPrompt) {
            setTimeout(() => {
                musicPrompt.classList.remove('animate__fadeIn');
                musicPrompt.classList.add('animate__fadeOut');
                musicPrompt.addEventListener('animationend', () => {
                    if(musicPrompt) musicPrompt.style.display = 'none';
                }, { once: true });
            }, 4000); // El pop-up se mostrará durante 4 segundos
        }

        // --- 3. CONTADOR REGRESIVO ---
        const eventDate = new Date('2025-09-27T16:00:00');

        function createCountdownHTML(days, hours, minutes, seconds, lang) {
            const labels = {
                es: { days: 'días', hours: 'horas', minutes: 'minutos', seconds: 'segundos' },
                it: { days: 'giorni', hours: 'ore', minutes: 'minuti', seconds: 'secondi' }
            };
            const currentLabels = labels[lang] || labels['es'];

            return `
                <div class="countdown-container">
                    <div class="time-unit"><div class="number">${days}</div><div class="label">${currentLabels.days}</div></div>
                    <div class="separator"></div>
                    <div class="time-unit"><div class="number">${hours}</div><div class="label">${currentLabels.hours}</div></div>
                    <div class="separator"></div>
                    <div class="time-unit"><div class="number">${minutes}</div><div class="label">${currentLabels.minutes}</div></div>
                    <div class="separator"></div>
                    <div class="time-unit"><div class="number">${seconds}</div><div class="label">${currentLabels.seconds}</div></div>
                </div>
            `;
        }

        function updateCountdown() {
            const now = new Date();
            const diff = eventDate.getTime() - now.getTime();

            if (diff <= 0) {
                const finishedHTML_ES = '<div class="countdown-container">¡Ya nos casamos!</div>';
                const finishedHTML_IT = '<div class="countdown-container">Ci siamo già sposati!</div>';
                const countdownEsEl = document.getElementById('countdown-es');
                const countdownItEl = document.getElementById('countdown-it');
                if(countdownEsEl) countdownEsEl.innerHTML = finishedHTML_ES;
                if(countdownItEl) countdownItEl.innerHTML = finishedHTML_IT;
                clearInterval(countdownInterval); // Detener el intervalo cuando termina
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const countdownEsEl = document.getElementById('countdown-es');
            const countdownItEl = document.getElementById('countdown-it');

            if(countdownEsEl) {
                 countdownEsEl.innerHTML = createCountdownHTML(days, hours, minutes, seconds, 'es');
            }
            if(countdownItEl) {
                countdownItEl.innerHTML = createCountdownHTML(days, hours, minutes, seconds, 'it');
            }
        }
        
        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();


        // --- 4. SELECCIÓN DE IDIOMA ---
        const btnEs = document.getElementById('btn-es');
        const btnIt = document.getElementById('btn-it');
        const spanishContent = document.getElementById('spanish-content');
        const italianContent = document.getElementById('italian-content');
        const musicPromptText = document.getElementById('music-prompt-text');

        function showSpanish() {
            if (spanishContent) spanishContent.style.display = 'block';
            if (italianContent) italianContent.style.display = 'none';
            if (btnEs) btnEs.classList.add('active');
            if (btnIt) btnIt.classList.remove('active');
            if (musicPromptText) {
                musicPromptText.textContent = '¡Dale play a la música para una experiencia completa!';
            }
        }

        function showItalian() {
            if (spanishContent) spanishContent.style.display = 'none';
            if (italianContent) italianContent.style.display = 'block';
            if (btnIt) btnIt.classList.add('active');
            if (btnEs) btnEs.classList.remove('active');
            if (musicPromptText) {
                musicPromptText.textContent = "Metti in play la musica per un'esperienza completa!";
            }
        }
        
        if(btnEs && btnIt) {
            btnEs.addEventListener('click', showSpanish);
            btnIt.addEventListener('click', showItalian);
        }
        
        showSpanish(); // Iniciar en español por defecto


        // --- 5. ANIMACIONES AL SCROLL ---
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


    } catch (error) {
        console.error("Ocurrió un error general en el script de la invitación:", error);
    }
});
