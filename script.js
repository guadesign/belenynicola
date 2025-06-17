document.addEventListener('DOMContentLoaded', function() {

    const spanishContent = document.getElementById('spanish-content');
    const italianContent = document.getElementById('italian-content');
    const btnEs = document.getElementById('btn-es');
    const btnIt = document.getElementById('btn-it');

    function switchLanguage(lang) {
        if (lang === 'es') {
            spanishContent.style.display = 'block';
            italianContent.style.display = 'none';
            btnEs.classList.add('active');
            btnIt.classList.remove('active');
        } else {
            spanishContent.style.display = 'none';
            italianContent.style.display = 'block';
            btnIt.classList.add('active');
            btnEs.classList.remove('active');
        }
    }

    btnEs.addEventListener('click', () => switchLanguage('es'));
    btnIt.addEventListener('click', () => switchLanguage('it'));

    switchLanguage('es');

    const weddingDate = new Date('2025-09-27T16:00:00');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const countdownHTML_ES = `
            <div><div class="number">${days}</div><div class="label">Días</div></div>
            <div><div class="number">${hours}</div><div class="label">Horas</div></div>
            <div><div class="number">${minutes}</div><div class="label">Minutos</div></div>
            <div><div class="number">${seconds}</div><div class="label">Segundos</div></div>
        `;

        const countdownHTML_IT = `
            <div><div class="number">${days}</div><div class="label">Giorni</div></div>
            <div><div class="number">${hours}</div><div class="label">Ore</div></div>
            <div><div class="number">${minutes}</div><div class="label">Minuti</div></div>
            <div><div class="number">${seconds}</div><div class="label">Secondi</div></div>
        `;

        const countdownEsDiv = document.getElementById('countdown-es');
        const countdownItDiv = document.getElementById('countdown-it');

        if (distance < 0) {
            clearInterval(countdownInterval);
            const finishedHTML = '<h2>¡Llegó el gran día!</h2>';
            if (countdownEsDiv) countdownEsDiv.innerHTML = finishedHTML;
            if (countdownItDiv) countdownItDiv.innerHTML = '<h2>È arrivato il grande giorno!</h2>';
            return;
        }

        if (countdownEsDiv) countdownEsDiv.innerHTML = countdownHTML_ES;
        if (countdownItDiv) countdownItDiv.innerHTML = countdownHTML_IT;
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    new MediaElementPlayer('audio-player', {
        stretching: 'responsive',
        audioHeight: 40,
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

});