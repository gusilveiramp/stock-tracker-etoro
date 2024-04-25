<h1>eToro Stock Tracker</h1>
<p>Simple script for monitoring assets on the <b>etoro.com</b> platform.</p>

<p>You will receive an <b>auditory alert</b> when the asset's value goes below the minimum or above the maximum set values.</p>

<p>Just leave the browser tsab open on the asset's page after executing the script, and it will notify you to take a buying or selling action.</p>

<h3>How to use?</h3>

[1] - Access the asset's page you want to monitor: Example: https://www.etoro.com/markets/se

[2] - Copy and paste the code below into the <b>Inspect -> Console</b> of your Google Chrome:
```js
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
```

[3] - Start monitoring by pasting the code below into the <b>Inspect -> Console</b> of your Google Chrome:
```js
// Inicia o monitoramento com os valores mínimo e máximo
monitEtoroStock(90.00, 99.50); 
```

[4] - Stop monitoring by pasting the code below into the <b>Inspect -> Console</b> of your Google Chrome:
```js
// Para o monitoramento 
stopMonitoringStock();  
```

Now the Stock Tracker is monitoring the asset in your browser tab. As long as this tab remains open, it will continue monitoring. You can open other tabs and work normally. As soon as the minimum or maximum values are reached, you will receive an <b>auditory alert</b> to take some action regarding the asset.
