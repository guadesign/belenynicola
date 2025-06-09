document.addEventListener('DOMContentLoaded', function() {

    // --- SELECCIÓN DE ELEMENTOS ---
    const btnEs = document.getElementById('btn-es');
    const btnIt = document.getElementById('btn-it');
    const headerEs = document.getElementById('header-es');
    const headerIt = document.getElementById('header-it');
    const contentEs = document.getElementById('content-es');
    const contentIt = document.getElementById('content-it');
    const musica = document.getElementById('musica-fondo');
    const btnMusica = document.getElementById('btn-musica');
    const countdownLabels = {
        dias: document.querySelector('#countdown div:nth-child(1) small'),
        horas: document.querySelector('#countdown div:nth-child(2) small'),
        minutos: document.querySelector('#countdown div:nth-child(3) small'),
        segundos: document.querySelector('#countdown div:nth-child(4) small')
    };
    
    // --- LÓGICA DE IDIOMAS ---
    if (btnEs && btnIt && headerEs && headerIt && contentEs && contentIt) {
        btnEs.addEventListener('click', () => {
            headerEs.style.display = 'block';
            headerIt.style.display = 'none';
            contentEs.style.display = 'block';
            contentIt.style.display = 'none';

            countdownLabels.dias.textContent = 'Días';
            countdownLabels.horas.textContent = 'Horas';
            countdownLabels.minutos.textContent = 'Minutos';
            countdownLabels.segundos.textContent = 'Segundos';
            if (btnMusica) btnMusica.textContent = musica.paused ? '▶️ Tocar Música' : '⏸️ Pausar Música';
        });

        btnIt.addEventListener('click', () => {
            headerEs.style.display = 'none';
            headerIt.style.display = 'block';
            contentEs.style.display = 'none';
            contentIt.style.display = 'block';
            
            countdownLabels.dias.textContent = 'Giorni';
            countdownLabels.horas.textContent = 'Ore';
            countdownLabels.minutos.textContent = 'Minuti';
            countdownLabels.segundos.textContent = 'Secondi';
            if (btnMusica) btnMusica.textContent = musica.paused ? '▶️ Riproduci Musica' : '⏸️ Pausa la Musica';
        });
    }

    // --- LÓGICA DE MÚSICA ---
    if (musica && btnMusica) {
        let isPlaying = false;
        musica.pause();

        btnMusica.addEventListener('click', () => {
            const isItalian = headerIt.style.display === 'block';
            if (isPlaying) {
                musica.pause();
                btnMusica.textContent = isItalian ? '▶️ Riproduci Musica' : '▶️ Tocar Música';
            } else {
                musica.play();
                btnMusica.textContent = isItalian ? '⏸️ Pausa la Musica' : '⏸️ Pausar Música';
            }
            isPlaying = !isPlaying;
        });
    }

    // --- LÓGICA DEL COUNTDOWN ---
    const fechaBoda = new Date('2025-09-26T18:00:00');
    const diasEl = document.getElementById('dias');
    const horasEl = document.getElementById('horas');
    const minutosEl = document.getElementById('minutos');
    const segundosEl = document.getElementById('segundos');

    function actualizarCountdown() {
        const ahora = new Date();
        const diferencia = fechaBoda - ahora;

        if (diferencia < 0) {
            clearInterval(intervalo);
            document.getElementById('countdown').innerHTML = "<h2>¡Llegó el gran día!</h2>";
            return;
        }
        const d = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const h = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diferencia % (1000 * 60)) / 1000);

        if(diasEl) diasEl.innerHTML = d < 10 ? '0' + d : d;
        if(horasEl) horasEl.innerHTML = h < 10 ? '0' + h : h;
        if(minutosEl) minutosEl.innerHTML = m < 10 ? '0' + m : m;
        if(segundosEl) segundosEl.innerHTML = s < 10 ? '0' + s : s;
    }

    if (diasEl) {
        actualizarCountdown();
        var intervalo = setInterval(actualizarCountdown, 1000);
    }

    // --- LÓGICA DE ANIMACIONES ---
    const titulosAnimados = document.querySelectorAll('.titulo-animado');
    setTimeout(() => {
        titulosAnimados.forEach(titulo => titulo.classList.add('visible'));
    }, 100);

    const elementosAnimables = document.querySelectorAll('.animar-al-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementosAnimables.forEach(elemento => observer.observe(elemento));
});