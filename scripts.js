const whiteList = ['pinterest.com', '65.108.3.108']; // Список запрещенных сайтов

let requestCount = 0;
let pingInterval;

document.getElementById('startPing').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value.trim();
    if (!url) {
        alert('Please enter a URL');
        return;
    }
    if (isWhiteListed(url)) {
        alert('This website is not allowed for pinging.');
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
    updateProgress(0);

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
    }, 25); // Интервал в 100 миллисекунд
}

function updatePing(pingTime, success = true) {
    requestCount++;
    document.getElementById('requestCount').innerText = requestCount.toString();
    document.getElementById('pingTime').innerText = success ? `${pingTime} ms` : 'Request failed';
    updateProgress((requestCount % 100) / 100 * 100);
}

function updateProgress(percent) {
    const progressBar = document.querySelector('.progress');
    progressBar.style.width = `${percent}%`;
}

function isWhiteListed(url) {
    try {
        const hostname = new URL(url).hostname;
        return whiteList.some(domain => hostname === domain || hostname.endsWith(`.${domain}`));
    } catch (error) {
        return false; // Если URL не валидный, то он не в белом списке
    }
}
