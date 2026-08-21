const counterEl = document.getElementById('counter');
const peakEl = document.getElementById('peak');
const totalEl = document.getElementById('total');
const uptimeEl = document.getElementById('uptime');
const canvas = document.getElementById('chart');
const ctx = canvas.getContext('2d');

let peak = 0;
let total = 0;
let history = [];
let start = Date.now();

// Демо-генератор (имитация нагрузки)
function simulate() {
    // случайное число соединений
    const active = Math.floor(Math.random() * 80) + Math.floor(Math.sin(Date.now() / 800) * 30) + 40;
    const clamped = Math.max(0, active);

    total += Math.floor(Math.random() * 8) + 1;

    counterEl.textContent = clamped;
    if (clamped > peak) {
        peak = clamped;
        peakEl.textContent = peak;
    }
    totalEl.textContent = total;
    uptimeEl.textContent = Math.floor((Date.now() - start) / 1000) + 's';

    counterEl.classList.add('pulse');
    setTimeout(() => counterEl.classList.remove('pulse'), 140);

    history.push(clamped);
    if (history.length > 60) history.shift();
    drawChart(history);
}

function drawChart(data) {
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    if (data.length < 2) return;

    const maxVal = Math.max(...data, 1);
    const stepX = w / (data.length - 1);

    // сетка
    ctx.strokeStyle = '#21262d';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
        const y = (h / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }

    // линия
    ctx.beginPath();
    ctx.strokeStyle = '#58a6ff';
    ctx.lineWidth = 2.5;
    data.forEach((v, i) => {
        const x = i * stepX;
        const y = h - (v / maxVal) * (h - 20) - 10;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // заливка
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = 'rgba(88, 166, 255, 0.12)';
    ctx.fill();
}

// обновление каждые 500 мс
setInterval(simulate, 500);
simulate();
