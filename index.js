var stockObserver;
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

function beep(duration, frequency, volume) {
    var oscillator = audioContext.createOscillator();
    var gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.value = volume;
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
}

function monitEtoroStock(minTargetValue, maxTargetValue) {
    const targetNode = document.querySelector('[automation-id="market-page-head-stats-value"]');

    if (!targetNode) {
        console.error('Elemento não encontrado!');
        return;
    }

    // Cria uma instância de MutationObserver se ainda não existir
    if (!stockObserver) {
        stockObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    console.log('Mudança detectada:', Number(targetNode.textContent));
                    let value = Number(targetNode.textContent);
                    if(value < minTargetValue || value > maxTargetValue){
                        beep(200, 440, 0.5);
                    }
                }
            });
        });
    }

    const config = { childList: true, characterData: true, subtree: true };

    // Começa a observar o elemento alvo
    stockObserver.observe(targetNode, config);
}

function stopMonitoringStock() {
    if (stockObserver) {
        stockObserver.disconnect();
        stockObserver = null;
        console.log("Monitoramento parado.");
    }
}

//monitEtoroStock(50, 100);  // Inicia o monitoramento com os valores mínimo e máximo
//stopMonitoringStock();  // Para o monitoramento
