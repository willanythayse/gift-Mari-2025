// Extras e melhorias para o blog de aniversário

// Adicionar mais elementos visuais
document.addEventListener('DOMContentLoaded', function() {
    addFloatingElements();
    addSoundEffects();
    addKeyboardShortcuts();
    addSpecialEffects();
});

// Elementos flutuantes adicionais
function addFloatingElements() {
    // Adicionar corações flutuantes ocasionais
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFloatingHeart();
        }
    }, 5000);
    
    // Adicionar morcegos ocasionais
    setInterval(() => {
        if (Math.random() > 0.8) {
            createFlyingBat();
        }
    }, 8000);
}

// Criar coração flutuante
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💜';
    heart.style.cssText = `
        position: fixed;
        font-size: 20px;
        left: -50px;
        top: ${Math.random() * window.innerHeight}px;
        z-index: 5;
        animation: floatHeart 8s linear forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Criar morcego voador
function createFlyingBat() {
    const bat = document.createElement('div');
    bat.innerHTML = '🦇';
    bat.style.cssText = `
        position: fixed;
        font-size: 16px;
        left: -50px;
        top: ${Math.random() * window.innerHeight}px;
        z-index: 5;
        animation: flyBat 6s linear forwards;
        pointer-events: none;
        filter: drop-shadow(0 0 5px rgba(0,0,0,0.5));
    `;
    
    document.body.appendChild(bat);
    
    setTimeout(() => {
        bat.remove();
    }, 6000);
}

// Efeitos sonoros visuais
function addSoundEffects() {
    // Adicionar efeito de "digitação" no texto
    const storyTexts = document.querySelectorAll('.story-text p');
    storyTexts.forEach(text => {
        text.style.opacity = '0';
        text.style.animation = 'fadeInText 1s ease forwards';
    });
}

// Atalhos de teclado
function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Espaço para continuar
        if (e.code === 'Space' && !e.target.matches('button, input, textarea')) {
            e.preventDefault();
            const currentPanel = document.querySelector('.story-panel:not(.hidden)');
            if (currentPanel) {
                const continueBtn = currentPanel.querySelector('.continue-btn, .treasure-btn');
                if (continueBtn && !continueBtn.disabled) {
                    continueBtn.click();
                }
            }
        }
        
        // Enter para confirmar resposta
        if (e.code === 'Enter' && e.target.matches('.answer-btn')) {
            e.target.click();
        }
    });
}

// Efeitos especiais
function addSpecialEffects() {
    // Adicionar cursor personalizado
    document.body.style.cursor = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' viewBox=\'0 0 20 20\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'8\' fill=\'%23ff69b4\' opacity=\'0.7\'/%3E%3C/svg%3E"), auto';
    
    // Efeito de partículas no hover dos botões
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createButtonParticles(this);
        });
    });
}

// Criar partículas no hover do botão
function createButtonParticles(button) {
    const rect = button.getBoundingClientRect();
    const particleCount = 5;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #ff69b4;
            border-radius: 50%;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            z-index: 1000;
            animation: buttonParticle 1s ease-out forwards;
            pointer-events: none;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Adicionar estilos CSS para as novas animações
const extraStyles = document.createElement('style');
extraStyles.textContent = `
    @keyframes floatHeart {
        0% {
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateX(calc(100vw + 100px)) translateY(-50px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes flyBat {
        0% {
            transform: translateX(0) translateY(0) rotate(0deg);
            opacity: 0.8;
        }
        50% {
            transform: translateX(50vw) translateY(-20px) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translateX(calc(100vw + 100px)) translateY(20px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes fadeInText {
        0% {
            opacity: 0;
            transform: translateY(10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes buttonParticle {
        0% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(-20px);
            opacity: 0;
        }
    }
    
    /* Efeito de brilho nos botões */
    button:hover {
        position: relative;
        overflow: hidden;
    }
    
    button:hover::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        animation: shine 0.6s ease;
    }
    
    @keyframes shine {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    /* Efeito de pulsação suave no título */
    .title {
        animation: titlePulse 3s ease-in-out infinite;
    }
    
    @keyframes titlePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
    
    /* Efeito de neblina sutil */
    body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle at 20% 80%, rgba(255, 105, 180, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(147, 112, 219, 0.1) 0%, transparent 50%);
        pointer-events: none;
        z-index: 1;
    }
`;
document.head.appendChild(extraStyles);

// Função para mostrar dicas ocasionais
function showHint() {
    const hints = [
        "💡 Dica: Pense nos animes mais populares!",
        "🌟 Dica: O protagonista do primeiro anime tem cabelo laranja!",
        "🎯 Dica: O segundo anime é famoso pelo sistema de Nen!",
        "✨ Dica: O terceiro anime envolve magia e mitologia!"
    ];
    
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    
    const hintElement = document.createElement('div');
    hintElement.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff69b4, #da70d6);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-family: 'Fredoka', cursive;
        font-size: 0.9rem;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.5s ease;
    `;
    hintElement.textContent = randomHint;
    
    document.body.appendChild(hintElement);
    
    setTimeout(() => {
        hintElement.style.animation = 'slideOutRight 0.5s ease forwards';
        setTimeout(() => hintElement.remove(), 500);
    }, 3000);
}

// Mostrar dica a cada 30 segundos se o usuário estiver em um puzzle
setInterval(() => {
    const currentPanel = document.querySelector('.story-panel:not(.hidden)');
    if (currentPanel && currentPanel.id.includes('chapter')) {
        showHint();
    }
}, 30000);

// Adicionar estilos para as dicas
const hintStyles = document.createElement('style');
hintStyles.textContent = `
    @keyframes slideInRight {
        0% {
            transform: translateX(100%);
            opacity: 0;
        }
        100% {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        0% {
            transform: translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(hintStyles);
