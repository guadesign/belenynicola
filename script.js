$(document).ready(function() {
    try {
        $('#audio-player').mediaelementplayer({
            features: ['playpause', 'current', 'progress', 'duration', 'volume'],
            alwaysShowControls: true,
            success: function (media, node, instance) {
                console.log("Reproductor de audio inicializado correctamente con jQuery.");
            },
            error: function (e) {
                console.error("Error al inicializar el reproductor de audio con jQuery:", e);
            }
        });

        const $musicPrompt = $('.music-prompt');
        if ($musicPrompt.length) {
            setTimeout(function() {
                $musicPrompt.removeClass('animate__fadeIn').addClass('animate__fadeOut').on('animationend', function() {
                    $(this).hide();
                });
            }, 4000);
        }

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
                $('#countdown-es').html(finishedHTML_ES);
                $('#countdown-it').html(finishedHTML_IT);
                clearInterval(countdownInterval);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            $('#countdown-es').html(createCountdownHTML(days, hours, minutes, seconds, 'es'));
            $('#countdown-it').html(createCountdownHTML(days, hours, minutes, seconds, 'it'));
        }
        
        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();

        const $btnEs = $('#btn-es');
        const $btnIt = $('#btn-it');
        const $spanishContent = $('#spanish-content');
        const $italianContent = $('#italian-content');
        const $musicPromptText = $('#music-prompt-text');

        function showSpanish() {
            $spanishContent.show();
            $italianContent.hide();
            $btnEs.addClass('active');
            $btnIt.removeClass('active');
            if ($musicPromptText.length) {
                $musicPromptText.text('¡Dale play a la música para una experiencia completa!');
            }
        }

        function showItalian() {
            $spanishContent.hide();
            $italianContent.show();
            $btnIt.addClass('active');
            $btnEs.removeClass('active');
            if ($musicPromptText.length) {
                $musicPromptText.text("Metti in play la musica per un'esperienza completa!");
            }
        }
        
        $btnEs.on('click', showSpanish);
        $btnIt.on('click', showItalian);
        
        showSpanish();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
            observer.observe(el);
        });

    } catch (error) {
        console.error("Ocurrió un error general en el script de la invitación:", error);
    }
});