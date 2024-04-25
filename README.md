<h1>Stock Tracker eToro</h1>
<p>Script simples para monitoramento de ativos na plataforma <b>etoro.com</b>.<p>

<p>Você receberá um <b>alerta sonoro</b> quando o ativo for inferior ao valor mínino ou superior ao valor máximo definidos.</p>

<p>Basta deixar a aba do navegador aberta na tela do ativo após executar o script, que ele se encarregará de avisá-lo para que você tome uma ação de compra ou venda.</p>

<h3>Como utilizar?</h3>

[1] - Acesse a página do ativo que quer monitorar: Exemplo: https://www.etoro.com/markets/se

[2] - Copie e cole o código abaixo no <b>Inspecionar -> Console</b> do seu Google Chrome:
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
```

[3] - Inicie o monitoramento colando o código abaixo no <b>Inspecionar -> Console</b> do seu Google Chrome:
```js
// Inicia o monitoramento com os valores mínimo e máximo
monitEtoroStock(90.00, 99.50); 

// Para o monitoramento 
stopMonitoringStock();  
```

Agora o Stock Tracker está monitorando o ativo na aba do seu navageador. Enquanto essa aba estiver aberta, ele continuará o monitoramento. Você pode abrir outras abas e trabalhar normalmente. Assim que o valor mínimo ou máximo forem atingidos, você receberá um <b>alerta sonoro</b> para que tome alguma ação quanto ao ativo.
