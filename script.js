// Configurações do jogo
const gameState = {
    currentChapter: 0,
    attempts: {
        1: 3,
        2: 3,
        3: 3
    },
    correctAnswers: {
        1: 'Bleach',
        2: 'Hunter x Hunter',
        3: 'Naruto'
    },
    completedChapters: [],
    userAnswers: {
        1: null,
        2: null,
        3: null
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    initializeGame();
});

// Criar estrelas animadas
function createStars() {
    const starsContainer = document.querySelector('.stars');
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// Inicializar o jogo
function initializeGame() {
    showPanel('intro');
}

// Mostrar painel específico
function showPanel(panelId) {
    // Esconder todos os painéis
    const panels = document.querySelectorAll('.story-panel');
    panels.forEach(panel => panel.classList.add('hidden'));
    
    // Mostrar o painel solicitado
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
        targetPanel.classList.remove('hidden');
        targetPanel.scrollIntoView({ behavior: 'smooth' });
    }
}

// Começar a jornada
function startJourney() {
    showPanel('chapter1');
    gameState.currentChapter = 1;
}

// Verificar resposta
function checkAnswer(chapter, selectedAnswer) {
    const correctAnswer = gameState.correctAnswers[chapter];
    const attemptsLeft = gameState.attempts[chapter];
    
    if (attemptsLeft <= 0) {
        return;
    }
    
    // Desabilitar todos os botões deste capítulo
    const buttons = document.querySelectorAll(`#chapter${chapter} .answer-btn`);
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedAnswer === correctAnswer) {
        // Resposta correta
        const correctBtn = Array.from(buttons).find(btn => btn.textContent === selectedAnswer);
        correctBtn.classList.add('correct');
        
        // Salvar resposta do usuário
        gameState.userAnswers[chapter] = selectedAnswer;
        
        // Efeito de confete
        createConfetti();
        
        setTimeout(() => {
            gameState.completedChapters.push(chapter);
            nextChapter(chapter);
        }, 1500);
        
    } else {
        // Resposta incorreta
        const incorrectBtn = Array.from(buttons).find(btn => btn.textContent === selectedAnswer);
        incorrectBtn.classList.add('incorrect');
        
        gameState.attempts[chapter]--;
        updateAttemptsDisplay(chapter);
        
        if (gameState.attempts[chapter] > 0) {
            // Reabilitar botões após um tempo
            setTimeout(() => {
                buttons.forEach(btn => {
                    btn.disabled = false;
                    btn.classList.remove('incorrect');
                });
            }, 1000);
        } else {
            // Sem mais tentativas - mostrar resposta correta
            setTimeout(() => {
                const correctBtn = Array.from(buttons).find(btn => btn.textContent === correctAnswer);
                correctBtn.classList.add('correct');
                correctBtn.style.animation = 'correctPulse 0.6s ease';
                
                // Salvar resposta incorreta do usuário
                gameState.userAnswers[chapter] = selectedAnswer;
                
                setTimeout(() => {
                    gameState.completedChapters.push(chapter);
                    nextChapter(chapter);
                }, 2000);
            }, 1000);
        }
    }
}

// Atualizar display de tentativas
function updateAttemptsDisplay(chapter) {
    const attemptsElement = document.getElementById(`attempts${chapter}`);
    if (attemptsElement) {
        attemptsElement.textContent = gameState.attempts[chapter];
    }
}

// Próximo capítulo
function nextChapter(currentChapter) {
    if (currentChapter < 3) {
        setTimeout(() => {
            showPanel(`chapter${currentChapter + 1}`);
            gameState.currentChapter = currentChapter + 1;
        }, 2000);
    } else {
        // Todos os capítulos completos - verificar se acertou todas
        setTimeout(() => {
            checkFinalResult();
        }, 2000);
    }
}

// Verificar resultado final
function checkFinalResult() {
    const allCorrect = gameState.completedChapters.length === 3 && 
                      gameState.completedChapters.every(chapter => {
                          const userAnswer = gameState.userAnswers[chapter];
                          return userAnswer === gameState.correctAnswers[chapter];
                      });
    
    if (allCorrect) {
        // Todas as respostas corretas - mostrar vírus primeiro
        showVirusEffect(true);
    } else {
        // Alguma resposta errada - mostrar vírus de susto
        showVirusEffect(false);
    }
}

// Mostrar efeito de vírus
function showVirusEffect(isSuccess) {
    // Criar overlay de vírus
    const virusOverlay = document.createElement('div');
    virusOverlay.id = 'virus-overlay';
    virusOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Courier New', monospace;
        color: #00ff00;
        font-size: 1.2rem;
        line-height: 1.5;
    `;
    
    // Add virus text
    virusOverlay.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            <div style="font-size: 3rem; color: #ff0000; margin-bottom: 20px;">⚠️ VIRUS DETECTED ⚠️</div>
            <div style="color: #ff0000; font-size: 1.5rem; margin-bottom: 20px;">YOUR COMPUTER HAS BEEN INFECTED!</div>
            <div style="color: #ffff00;">Initiating destruction sequence...</div>
            <div style="color: #ff0000;">Files being deleted...</div>
            <div style="color: #ff0000;">System compromised...</div>
            <div style="color: #ff0000;">Personal data being stolen...</div>
            <div style="color: #ff0000;">Bank account being accessed...</div>
            <div style="color: #ff0000;">Photos being sent to hackers...</div>
            <div style="color: #ff0000;">Operating system corrupted...</div>
            <div style="color: #ff0000;">Trying to connect to servers...</div>
            <div style="color: #ff0000;">Connection failed...</div>
            <div style="color: #ff0000;">Trying again...</div>
            <div style="color: #ff0000;">Connection established!</div>
            <div style="color: #ff0000;">Sending data...</div>
            <div style="color: #ff0000;">Data sent successfully!</div>
            <div style="color: #ff0000;">Your computer now belongs to the hackers!</div>
        </div>
        <div style="color: #00ff00; font-size: 0.8rem; text-align: center;">
            <div>HACKED BY: Anonymous Group</div>
            <div>PAYMENT REQUIRED: €1000</div>
            <div>DEADLINE: 24 HOURS</div>
        </div>
    `;
    
    document.body.appendChild(virusOverlay);
    
    // Após 3 segundos, mostrar a brincadeira
    setTimeout(() => {
        showJoke(isSuccess);
    }, 3000);
}

// Mostrar brincadeira
function showJoke(isSuccess) {
    const virusOverlay = document.getElementById('virus-overlay');
    if (virusOverlay) {
        virusOverlay.remove();
    }
    
    const jokeOverlay = document.createElement('div');
    jokeOverlay.id = 'joke-overlay';
    jokeOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Fredoka', cursive;
        color: #ffffff;
        text-align: center;
        padding: 40px;
    `;
    
    if (isSuccess) {
        // Success flow
        jokeOverlay.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 30px;">😱</div>
            <h1 style="color: #4caf50; font-size: 3rem; margin-bottom: 30px;">PRANK! 😄</h1>
            <p style="font-size: 1.5rem; margin-bottom: 20px; color: #e8f5e8;">
                We just wanted to scare you! 😂
            </p>
            <p style="font-size: 1.3rem; margin-bottom: 30px; color: #c8e6c9;">
                We want to wish you an incredible birthday, full of joy, 
                dreams come true and special moments! 🎂✨
            </p>
            <p style="font-size: 1.2rem; margin-bottom: 40px; color: #a5d6a7;">
                You are a wonderful person and deserve all the love in the world! 💚
            </p>
            <button onclick="showAvatars()" style="
                background: linear-gradient(45deg, #4caf50, #2e7d32);
                color: white;
                border: none;
                padding: 15px 30px;
                font-size: 1.2rem;
                font-family: 'Fredoka', cursive;
                border-radius: 25px;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
            ">Continue the Surprise! ✨</button>
        `;
    } else {
        // Error flow
        jokeOverlay.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 30px;">😱</div>
            <h1 style="color: #4caf50; font-size: 3rem; margin-bottom: 30px;">PRANK! 😄</h1>
            <p style="font-size: 1.5rem; margin-bottom: 20px; color: #e8f5e8;">
                We just wanted to scare you! 😂
            </p>
            <p style="font-size: 1.3rem; margin-bottom: 30px; color: #c8e6c9;">
                Even so, we want to wish you an incredible birthday! 🎂✨
            </p>
            <p style="font-size: 1.2rem; margin-bottom: 40px; color: #a5d6a7;">
                You are special to us! 💚
            </p>
            <button onclick="showAvatars()" style="
                background: linear-gradient(45deg, #4caf50, #2e7d32);
                color: white;
                border: none;
                padding: 15px 30px;
                font-size: 1.2rem;
                font-family: 'Fredoka', cursive;
                border-radius: 25px;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
            ">See Surprise! ✨</button>
        `;
    }
    
    document.body.appendChild(jokeOverlay);
}

// Mostrar avatares
function showAvatars() {
    const jokeOverlay = document.getElementById('joke-overlay');
    if (jokeOverlay) {
        jokeOverlay.remove();
    }
    
    const avatarsOverlay = document.createElement('div');
    avatarsOverlay.id = 'avatars-overlay';
    avatarsOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Fredoka', cursive;
        color: #ffffff;
        text-align: center;
        padding: 40px;
    `;
    
    avatarsOverlay.innerHTML = `
        <h1 style="color: #ff69b4; font-size: 2.5rem; margin-bottom: 40px;">💜🩷💚 Your Special Friends! 💚🩷💜</h1>
        <div style="display: flex; gap: 40px; margin-bottom: 40px; flex-wrap: wrap; justify-content: center;">
            <div style="text-align: center;">
                <div style="
                    width: 120px;
                    height: 120px;
                    background: linear-gradient(135deg, #2e7d32, #4caf50);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 15px;
                    box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
                    border: 3px solid #4caf50;
                    position: relative;
                    overflow: hidden;
                ">
                    <div style="
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #4caf50, #2e7d32);
                        border-radius: 50%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                    ">
                        <div style="
                            width: 60px;
                            height: 60px;
                            background: #ffd54f;
                            border-radius: 50%;
                            margin-bottom: 5px;
                            position: relative;
                        ">
                            <div style="
                                position: absolute;
                                top: 15px;
                                left: 15px;
                                width: 8px;
                                height: 8px;
                                background: #2e7d32;
                                border-radius: 50%;
                            "></div>
                            <div style="
                                position: absolute;
                                top: 15px;
                                right: 15px;
                                width: 8px;
                                height: 8px;
                                background: #2e7d32;
                                border-radius: 50%;
                            "></div>
                        </div>
                        <div style="
                            width: 40px;
                            height: 20px;
                            background: #ff8a65;
                            border-radius: 50% 50% 0 0;
                        "></div>
                    </div>
                </div>
                <p style="color: #4caf50; font-size: 1.1rem; font-weight: 500;">Mari</p>
            </div>
            <div style="text-align: center;">
                <div style="
                    width: 120px;
                    height: 120px;
                    background: linear-gradient(135deg, #e91e63, #f06292);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 15px;
                    box-shadow: 0 10px 30px rgba(233, 30, 99, 0.3);
                    border: 3px solid #e91e63;
                    position: relative;
                    overflow: hidden;
                ">
                    <div style="
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #f06292, #e91e63);
                        border-radius: 50%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                    ">
                        <div style="
                            width: 60px;
                            height: 60px;
                            background: #ffd54f;
                            border-radius: 50%;
                            margin-bottom: 5px;
                            position: relative;
                        ">
                            <div style="
                                position: absolute;
                                top: 15px;
                                left: 15px;
                                width: 8px;
                                height: 8px;
                                background: #e91e63;
                                border-radius: 50%;
                            "></div>
                            <div style="
                                position: absolute;
                                top: 15px;
                                right: 15px;
                                width: 8px;
                                height: 8px;
                                background: #e91e63;
                                border-radius: 50%;
                            "></div>
                        </div>
                        <div style="
                            width: 40px;
                            height: 20px;
                            background: #ff8a65;
                            border-radius: 50% 50% 0 0;
                        "></div>
                    </div>
                </div>
                <p style="color: #e91e63; font-size: 1.1rem; font-weight: 500;">Salomé</p>
            </div>
            <div style="text-align: center;">
                <div style="
                    width: 120px;
                    height: 120px;
                    background: linear-gradient(135deg, #7b1fa2, #9c27b0);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 15px;
                    box-shadow: 0 10px 30px rgba(156, 39, 176, 0.3);
                    border: 3px solid #7b1fa2;
                    position: relative;
                    overflow: hidden;
                ">
                    <div style="
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, #9c27b0, #7b1fa2);
                        border-radius: 50%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                    ">
                        <div style="
                            width: 60px;
                            height: 60px;
                            background: #ffd54f;
                            border-radius: 50%;
                            margin-bottom: 5px;
                            position: relative;
                        ">
                            <div style="
                                position: absolute;
                                top: 15px;
                                left: 15px;
                                width: 8px;
                                height: 8px;
                                background: #7b1fa2;
                                border-radius: 50%;
                            "></div>
                            <div style="
                                position: absolute;
                                top: 15px;
                                right: 15px;
                                width: 8px;
                                height: 8px;
                                background: #7b1fa2;
                                border-radius: 50%;
                            "></div>
                        </div>
                        <div style="
                            width: 40px;
                            height: 20px;
                            background: #ff8a65;
                            border-radius: 50% 50% 0 0;
                        "></div>
                    </div>
                </div>
                <p style="color: #9c27b0; font-size: 1.1rem; font-weight: 500;">Thay</p>
            </div>
        </div>
        <p style="font-size: 1.3rem; margin-bottom: 30px; color: #dda0dd;">
            We love you so much!
        </p>
        <button onclick="showFinalResult()" style="
            background: linear-gradient(45deg, #ff69b4, #da70d6);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2rem;
            font-family: 'Fredoka', cursive;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(255, 105, 180, 0.3);
        ">See Final Result! 🎁</button>
    `;
    
    document.body.appendChild(avatarsOverlay);
}

// Mostrar resultado final
function showFinalResult() {
    const avatarsOverlay = document.getElementById('avatars-overlay');
    if (avatarsOverlay) {
        avatarsOverlay.remove();
    }
    
    // Verificar se acertou todas as perguntas para mostrar o voucher
    const allCorrect = gameState.completedChapters.length === 3 && 
                      gameState.completedChapters.every(chapter => {
                          const userAnswer = gameState.userAnswers[chapter];
                          return userAnswer === gameState.correctAnswers[chapter];
                      });
    
    if (allCorrect) {
        // Mostrar mensagem final com PRANK antes do voucher
        showPanel('finale');
    } else {
        // Mostrar mensagem final sem voucher
        const finalOverlay = document.createElement('div');
        finalOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #1a0a2e 0%, #16213e 50%, #0f3460 100%);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Fredoka', cursive;
            color: #ffffff;
            text-align: center;
            padding: 40px;
        `;
        
        finalOverlay.innerHTML = `
            <h1 style="color: #4caf50; font-size: 3rem; margin-bottom: 30px;">🎂 Happy Birthday! 🎂</h1>
            <p style="font-size: 1.5rem; margin-bottom: 20px; color: #e8f5e8;">
                Even without getting all the questions right, you are special to us! 💚
            </p>
            <p style="font-size: 1.3rem; margin-bottom: 30px; color: #c8e6c9;">
                May this new year be full of joy and incredible moments! ✨
            </p>
            <p style="font-size: 1.2rem; color: #a5d6a7;">
                With all our love, your friends! 💚
            </p>
        `;
        
        document.body.appendChild(finalOverlay);
    }
}

// Revelar tesouro
function revealTreasure() {
    showPanel('treasure');
    generateQRCode();
}

// Generate WhatsApp QR Code
function generateQRCode() {
    const qrContainer = document.getElementById('qrCode');
    if (!qrContainer) return;

    // Try multiple possible QR filenames/extensions in order
    const candidateSources = [
        'assets/whatsapp_qr.png',
        'assets/whatsapp_qr.jpg',
        'assets/whatsapp_qr.jpeg',
        'assets/IMG_8432.jpg',
        'assets/IMG_8432.jpeg',
        'IMG_8432.jpg',
        'IMG_8432.jpeg'
    ];

    const externalImg = new Image();
    externalImg.alt = 'WhatsApp QR Code';
    externalImg.style.width = '100%';
    externalImg.style.height = '100%';
    externalImg.style.objectFit = 'contain';
    externalImg.style.borderRadius = '10px';

    externalImg.onload = function() {
        qrContainer.innerHTML = '';
        qrContainer.appendChild(externalImg);
    };

    let currentIndex = 0;
    externalImg.onerror = function() {
        currentIndex += 1;
        if (currentIndex < candidateSources.length) {
            externalImg.src = candidateSources[currentIndex];
        } else {
            qrContainer.innerHTML = `
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIvPgo8IS0tIFNRIGNvZGUgcGF0dGVybiBzaW11bGF0aW9uIC0tPgo8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjIiLz4KPHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9ImJsYWNrIi8+CjxyZWN0IHg9IjE0MCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iYmxhY2siLz4KPHJlY3QgeD0iMjAiIHk9IjE0MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSJibGFjayIvPgo8IS0tIFdoYXRzQXBwIGljb24gLS0+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iMjAiIGZpbGw9IiMyNUQzNjYiLz4KPHBhdGggZD0iTTkwIDkwSDExMFYxMTBIOVoiIGZpbGw9IndoaXRlIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTMwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEwIiBmaWxsPSIjMjVEMzY2Ij5XaGF0c0FwcDwvdGV4dD4KPC9zdmc+" 
                     alt="WhatsApp QR Code" 
                     style="width: 100%; height: 100%; object-fit: contain; border-radius: 10px;" />
            `;
        }
    };

    // Kick off with the first candidate
    externalImg.src = candidateSources[currentIndex];
}

// Criar padrão visual do QR code
function createQRPattern(code) {
    const size = 15; // 15x15 grid
    let pattern = '<div style="display: grid; grid-template-columns: repeat(15, 1fr); gap: 1px; width: 100%; height: 100%;">';
    
    for (let i = 0; i < size * size; i++) {
        const isBlack = Math.random() > 0.5; // Simular padrão aleatório
        const color = isBlack ? '#000' : '#fff';
        pattern += `<div style="background-color: ${color}; aspect-ratio: 1;"></div>`;
    }
    
    pattern += '</div>';
    return pattern;
}

// Coletar vale
function collectVoucher() {
    // Efeito especial
    createFireworks();
    
    // Mostrar mensagem de sucesso
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ff69b4, #da70d6);
        color: white;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        font-size: 1.5rem;
        font-family: 'Fredoka', cursive;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        animation: fadeIn 0.5s ease;
    `;
    successMessage.innerHTML = `
        <h3>🎉 Congratulations! 🎉</h3>
        <p>Your €50 voucher has been collected successfully!</p>
        <p>Use the QR code to contact us!</p>
        <button onclick="this.parentElement.remove()" style="
            background: white;
            color: #ff69b4;
            border: none;
            padding: 10px 20px;
            border-radius: 10px;
            margin-top: 15px;
            cursor: pointer;
            font-family: 'Fredoka', cursive;
            font-weight: 500;
        ">Close</button>
    `;
    
    document.body.appendChild(successMessage);
    
    // Salvar no localStorage (simular coleta)
    localStorage.setItem('voucherCollected', 'true');
    localStorage.setItem('voucherCode', 'GIFT2024' + Math.random().toString(36).substr(2, 9).toUpperCase());
}

// Criar efeito de confete
function createConfetti() {
    const colors = ['#ff69b4', '#da70d6', '#9370db', '#ffb3ba', '#e6d7ff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            z-index: 1000;
            animation: confettiFall 3s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Criar efeito de fogos de artifício
function createFireworks() {
    const colors = ['#ff69b4', '#da70d6', '#9370db', '#ffb3ba', '#e6d7ff', '#fff'];
    const fireworkCount = 5;
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            createSingleFirework(colors);
        }, i * 500);
    }
}

// Criar um único fogo de artifício
function createSingleFirework(colors) {
    const centerX = Math.random() * window.innerWidth;
    const centerY = Math.random() * window.innerHeight * 0.6;
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            z-index: 1000;
            animation: fireworkParticle 1s ease-out forwards;
        `;
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 100 + Math.random() * 100;
        const endX = centerX + Math.cos(angle) * velocity;
        const endY = centerY + Math.sin(angle) * velocity;
        
        particle.style.setProperty('--endX', endX + 'px');
        particle.style.setProperty('--endY', endY + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Adicionar estilos CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes fireworkParticle {
        0% {
            transform: translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: translate(calc(var(--endX) - 50vw), calc(var(--endY) - 50vh));
            opacity: 0;
        }
    }
    
    .star {
        animation: twinkle 3s infinite;
    }
    
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

// Efeitos sonoros (opcional - apenas visual)
function playSuccessSound() {
    // Em um projeto real, você adicionaria efeitos sonoros aqui
    console.log('🎵 Som de sucesso!');
}

// Verificar se o vale já foi coletado
function checkVoucherStatus() {
    const collected = localStorage.getItem('voucherCollected');
    if (collected === 'true') {
        // Mostrar mensagem de que já foi coletado
        console.log('Vale já foi coletado anteriormente');
    }
}

// Inicializar verificação de status
checkVoucherStatus();
