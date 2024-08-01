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
    document.getElementById('pingTime').innerText = '0 ms';
    document.getElementById('startPing').disabled = true;
    document.getElementById('stopPing').disabled = false;

    pingInterval = setInterval(async () => {
        const start = Date.now();
        try {
            await fetch(url, { mode: 'no-cors' });
            const end = Date.now();
            updatePing(end - start);
        } catch (error) {
            const end = Date.now();
            updatePing(end - start, false);
        }
    }, 1000);
}

function updatePing(pingTime, success = true) {
    requestCount++;
    document.getElementById('requestCount').innerText = requestCount.toString();
    document.getElementById('pingTime').innerText = success ? `${pingTime} ms` : 'Request failed';
}