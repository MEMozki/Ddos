const whiteList = ['65.108.3.108', '194.28.225.112']; // Список запрещенных сайтов

let requestCount = 0;
let pingInterval;

document.getElementById('startPing').addEventListener('click', () => {
    const urlInput = document.getElementById('urlInput').value.trim();
    const url = addProtocol(urlInput); // Добавляем протокол, если его нет
    if (!url) {
        alert('Please enter a valid URL');
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
    document.getElementById('startPing').disabled = true;
    document.getElementById('stopPing').disabled = false;
    updateProgress(0);

    pingInterval = setInterval(async () => {
        try {
            await fetch(url, { mode: 'no-cors' });
            updateRequestCount();
        } catch (error) {
            updateRequestCount();
        }
    }, 25); // Интервал в 25 миллисекунду
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

function isWhiteListed(url) {
    try {
        const hostname = new URL(url).hostname;
        return whiteList.some(domain => hostname === domain || hostname.endsWith(`.${domain}`));
    } catch (error) {
        return false; // Если URL не валидный, то он не в белом списке
    }
}

function addProtocol(url) {
    if (!/^https?:\/\//i.test(url)) {
        return `http://${url}`;
    }
    return url;
}
