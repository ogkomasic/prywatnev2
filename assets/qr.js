function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function generateQRCode(text) {
    const qr = new QRCode(document.getElementById("qr-code"), {
        text: text,
        width: 180,
        height: 180,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

function showError() {
    document.querySelector(".error").style.display = "flex";
}

// DOM ready
document.addEventListener("DOMContentLoaded", () => {
    const code = generateRandomCode();
    const qrText = generateRandomString(15);
    
    const codeElement = document.createElement("p");
    codeElement.className = "code_number";
    codeElement.textContent = code;

    const qrContainer = document.createElement("div");
    qrContainer.id = "qr-code";
    qrContainer.style.margin = "auto";
    qrContainer.style.width = "180px";
    qrContainer.style.height = "180px";

    const countdown = document.createElement("p");
    countdown.className = "countdown";
    let timeLeft = 180; // 3 minutes

    function updateCountdown() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdown.textContent = `Kod wygaśnie za: ${minutes} min ${seconds} sek.`;
        if (timeLeft === 0) {
            showError();
        } else {
            timeLeft--;
            setTimeout(updateCountdown, 1000);
        }
    }

    const container = document.querySelector(".container");
    container.innerHTML = ""; // czyszczę stare opcje

    container.appendChild(qrContainer);
    generateQRCode(qrText);

    container.appendChild(codeElement);
    container.appendChild(countdown);
    updateCountdown();
});
