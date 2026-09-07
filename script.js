// Função para animar números
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Inicializar animações ao carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 Free Fire Rewards Sistema Carregado!');
    
    // Animar estatísticas quando visíveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statCards = entry.target.querySelectorAll('.stat-card');
                statCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    });

    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        observer.observe(statsGrid);
    }

    // Adicionar efeitos de clique aos cards
    const itemCards = document.querySelectorAll('.item-card');
    itemCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Criar efeito de partícula
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 212, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Adicionar animação aos benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Interatividade do botão de recompensa
    const rewardButton = document.querySelector('.reward-button');
    if (rewardButton) {
        rewardButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        rewardButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        rewardButton.addEventListener('click', function(e) {
            // Efeito de confete (opcional)
            createConfetti();
        });
    }

    // Adicionar estilos de animação
    addAnimationStyles();
});

// Função para criar efeito de confete
function createConfetti() {
    const colors = ['#00d4ff', '#0099ff', '#ff006e', '#ffc800'];
    const confettiPieces = 30;

    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 4;
        const duration = Math.random() * 2 + 2;
        const delay = Math.random() * 0.5;

        confetti.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${Math.random() * 100}vw;
            top: -10px;
            animation: fall ${duration}s linear ${delay}s forwards;
            box-shadow: 0 0 10px ${color};
        `;

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), (duration + delay) * 1000);
    }
}

// Adicionar estilos de animação dinamicamente
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }

        @keyframes slideInFromLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideInFromRight {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .benefit-card {
            animation: fadeInUp 0.6s ease-out backwards;
        }

        .stat-card {
            animation: fadeInUp 0.6s ease-out backwards;
        }
    `;
    document.head.appendChild(style);
}

// Função para scroll suave
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Adicionar listeners para navegação
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        smoothScroll(e.target.getAttribute('href'));
    }
});

// Detectar quando elementos entram na viewport
const elementsToAnimate = document.querySelectorAll('.account-card, .surprise-section, .benefits-section');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    animationObserver.observe(element);
});

// Adicionar contador de visitas (localStorage)
function updateVisitorCount() {
    let visits = localStorage.getItem('visits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('visits', visits);
    console.log(`👁️ Você visitou ${visits} vez(es) este site!`);
}

updateVisitorCount();

// Efeito de hover nos items
document.querySelectorAll('.item-card, .stat-card, .benefit-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        'info': '#00d4ff',
        'success': '#00ff00',
        'warning': '#ffaa00',
        'error': '#ff0000'
    };

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, ${colors[type]}, ${colors[type]}dd);
        color: #000;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 9999;
        animation: slideInFromRight 0.3s ease-out;
        box-shadow: 0 0 20px ${colors[type]};
        max-width: 300px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInFromRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Exemplo de uso: showNotification('Bem-vindo!', 'success');

// Log de carregamento
console.log('%c🎮 Free Fire Rewards Sistema', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cTudo carregado e pronto! 🚀', 'color: #00ff00; font-size: 14px;');
console.log('%cDesenvolvido com ❤️', 'color: #ff0000; font-size: 12px;');
