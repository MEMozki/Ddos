const whiteList = ['pinterest.com', 'example.com']; // Список запрещенных сайтов

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
    }, 100); // Интервал в 100 миллисекунд
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

function addProtocol(url) {
    if (!/^https?:\/\//i.test(url)) {
        return `http://${url}`;
    }
    return url;
}
