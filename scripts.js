let requestCount = 0;
let pingInterval;

document.getElementById('startPing').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    if (!url) {
        alert('Please enter a URL');
        return;
    }
    startPing(url);
});

document.getElementById('stopPing').addEventListener('click', () => {
    clearInterval(pingInterval);
    document.getElementById('startPing').disabled = false;
    document.getElementById('stopPing').disabled = true;
});

function startPing(url) {
    requestCount = 0;
    document.getElementById('requestCount').innerText = '0';
    document.getElementById('startPing').disabled = true;
    document.getElementById('stopPing').disabled = false;
    updateProgress(0);

    pingInterval = setInterval(async () => {
        try {
            await fetch(url, { mode: 'no-cors' });
        } catch (error) {
            // Ignore errors
        }
        updateRequestCount();
    }, 25); // Интервал в 1 миллисекунду
}

function updateRequestCount() {
    requestCount++;
    document.getElementById('requestCount').innerText = requestCount.toString();
    updateProgress((requestCount % 100) / 100 * 100);
}

function updateProgress(percent) {
    const progressBar = document.querySelector('.progress');
    progressBar.style.width = `${percent}%`;
}
