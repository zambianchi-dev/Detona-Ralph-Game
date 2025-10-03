const state = {
    // 1. Referências aos elementos HTML
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    // 2. Variáveis e dados do jogo
    values: {
        gameVelocity: 1,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    // 3. Ações e temporizadores
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.currentTime--; // Reduz 1 segundo do tempo
    state.view.timeleft.textContent = state.values.currentTime; // Atualiza o tempo na tela

    // Verifica se o tempo acabou
    if (state.values.currentTime <= 0 ) {
        // Para os temporizadores do jogo
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        
        // Exibe o alerta de fim de jogo
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    // Limpa a posição anterior do inimigo
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    // Sorteia um número de 0 a 8
    let randowNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randowNumber];
    
    // Adiciona a classe "enemy" para mostrar o Ralph no novo quadrado
    randomSquare.classList.add("enemy");
    
    // Salva a posição do quadrado correto
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            // Verifica se o quadrado clicado é o correto
            if (square.id === state.values.hitPosition) {
                state.values.result++; // Aumenta a pontuação
                state.view.score.textContent = state.values.result; // Atualiza o placar na tela
                state.values.hitPosition = null; // Impede múltiplos pontos no mesmo acerto
                playSound("grunido-detona"); // Toca um som de acerto
            }
        });
    });
}

function initialize(){
    // Prepara os quadrados para receber cliques
    addListenerHitBox();
}

// Inicia o jogo
initialize();