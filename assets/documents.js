document.addEventListener('DOMContentLoaded', function() {
    // Obsługa kliknięć w karty dokumentów
    const documentCards = document.querySelectorAll('.document-card');
    
    documentCards.forEach(card => {
        card.addEventListener('click', function() {
            const docType = this.getAttribute('data-doc');
            loadDocument(docType);
        });
    });

    // Ładowanie dokumentu
    function loadDocument(docType) {
        // Ukryj wszystkie widoki dokumentów
        document.querySelectorAll('.document-view').forEach(view => {
            view.style.display = 'none';
        });

        // Pokaż odpowiedni dokument
        const docView = document.getElementById(`${docType}-view`);
        if(docView) {
            docView.style.display = 'block';
            updateDocumentView(docType);
        }
    }

    // Aktualizacja widoku dokumentu
    function updateDocumentView(docType) {
        switch(docType) {
            case 'student-id':
                loadStudentId();
                break;
            case 'id':
                loadIdCard();
                break;
            case 'driver-license':
                loadDriverLicense();
                break;
        }
    }

    // Funkcje specyficzne dla dokumentów
    function loadStudentId() {
        // Pobierz dane z localStorage lub API
        const studentData = JSON.parse(localStorage.getItem('studentData')) || {
            name: "Jan Kowalski",
            university: "Uniwersytet Warszawski",
            albumNumber: "123456",
            validUntil: "2025-10-31",
            photo: "data:image/svg+xml,..." // Base64 lub URL zdjęcia
        };

        // Uzupełnij dane w widoku
        document.getElementById('student-name').textContent = studentData.name;
        document.getElementById('student-university').textContent = studentData.university;
        document.getElementById('student-album').textContent = studentData.albumNumber;
        document.getElementById('student-valid').textContent = studentData.validUntil;
        document.getElementById('student-photo').src = studentData.photo;

        // Generuj kod QR
        if(document.getElementById('student-qr')) {
            new QRCode(document.getElementById("student-qr"), {
                text: `STUDENT:${studentData.albumNumber}:${Math.random().toString(36).substr(2, 8)}`,
                width: 120,
                height: 120,
                colorDark: "#0068b5",
                colorLight: "#ffffff"
            });
        }
    }

    // Inne funkcje ładowania dokumentów...
    function loadIdCard() { /* ... */ }
    function loadDriverLicense() { /* ... */ }

    // Inicjalizacja - załaduj domyślny dokument
    if(window.location.hash) {
        const docType = window.location.hash.substr(1);
        loadDocument(docType);
    }
});
