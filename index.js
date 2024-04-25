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
      console.error('Element not found!');
      return;
    }

    // Creates a MutationObserver instance if it does not already exist
    if (!stockObserver) {
        stockObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    console.log('Change detected:', Number(targetNode.textContent));
                    let value = Number(targetNode.textContent);
                    if(value < minTargetValue || value > maxTargetValue){
                        beep(200, 440, 0.5);
                    }
                }
            });
        });
    }

    const config = { childList: true, characterData: true, subtree: true };

    // Starts observing the target element
    stockObserver.observe(targetNode, config);
}

function stopMonitoringStock() {
    if (stockObserver) {
        stockObserver.disconnect();
        stockObserver = null;
        console.log("Monitoring stopped.");
    }
}

//monitEtoroStock(50, 100);  // Inicia o monitoramento com os valores mínimo e máximo
//stopMonitoringStock();  // Para o monitoramento
