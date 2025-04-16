document.addEventListener('DOMContentLoaded', function() {
    // Obsługa przycisku "Pokaż kod QR"
    const showQRButton = document.getElementById('showQR');
    if (showQRButton) {
        showQRButton.addEventListener('click', function() {
            // Przechowujemy dane użytkownika które będą zakodowane w QR
            const userData = {
                name: "Jan Kowalski",
                id: "ABC123456",
                timestamp: new Date().toISOString()
            };
            
            // Konwertujemy dane do formatu JSON i kodujemy w URL
            const dataString = encodeURIComponent(JSON.stringify(userData));
            
            // Przekierowujemy do strony z kodem QR z danymi w URL
            window.location.href = `qr_code.html?data=${dataString}`;
        });
    }

    // Obsługa przycisku "Zeskanuj kod QR" (opcjonalna)
    const scanQRButton = document.getElementById('scanQR');
    if (scanQRButton) {
        scanQRButton.addEventListener('click', function() {
            // Tutaj można dodać funkcjonalność skanowania QR
            alert('Funkcjonalność skanowania QR będzie dostępna wkrótce!');
        });
    }

    // Obsługa zamknięcia komunikatu błędu
    const errorCloseButtons = document.querySelectorAll('.error_button.close, .opacity.close');
    errorCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelector('.error').style.display = 'none';
        });
    });
});
