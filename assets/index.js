// Nasłuchiwanie na kliknięcie przycisku zapisu
document.getElementById("saveButton").addEventListener("click", async () => {
  // Pobieranie danych z formularza
  const formData = {
    data: "data", // Klucz do przechowywania danych
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    fathersName: document.getElementById("fathersName").value,
    mothersName: document.getElementById("mothersName").value,
    familyName: document.getElementById("familyName").value,
    fathersFamilyName: document.getElementById("fathersFamilyName").value,
    mothersFamilyName: document.getElementById("mothersFamilyName").value,
    birthPlace: document.getElementById("birthPlace").value,
    countryOfBirth: document.getElementById("countryOfBirth").value,
    address1: document.getElementById("address1").value,
    address2: document.getElementById("address2").value,
    city: document.getElementById("city").value,
    nationality: document.getElementById("nationality").value,
    sex: document.getElementById("sex").value,
    day: document.getElementById("dob_day").value,
    month: document.getElementById("dob_month").value,
    year: document.getElementById("dob_year").value,
  };

  // Sprawdzanie, czy użytkownik wybrał zdjęcie
  const imageInput = document.getElementById("imageUpload");
  const db = await getDb();

  // Jeżeli użytkownik dodał zdjęcie
  if (imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageData = {
        data: "image", // Klucz dla zdjęcia
        image: event.target.result, // Obraz zakodowany w base64
      };
      // Zapisujemy dane w IndexedDB
      await saveData(db, formData);
      await saveData(db, imageData);
      // Przekierowanie do id.html
      window.location.href = "id.html";
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    // Jeżeli zdjęcie nie zostało wybrane, zapisujemy tylko dane
    await saveData(db, formData);
    window.location.href = "id.html";
  }
});

// Funkcje pomocnicze do IndexedDB

// Funkcja otwierająca IndexedDB
function getDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("fobywatel", 1); // Otwieramy bazę danych
    request.onerror = (event) => reject(event.target.error); // Obsługa błędów
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      // Tworzymy obiekt store, jeśli jeszcze nie istnieje
      if (!db.objectStoreNames.contains("data")) {
        db.createObjectStore("data", { keyPath: "data" });
      }
    };
    request.onsuccess = (event) => resolve(event.target.result); // Zwracamy bazę danych
  });
}

// Funkcja zapisująca dane do IndexedDB
function saveData(db, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction("data", "readwrite"); // Rozpoczynamy transakcję
    const store = tx.objectStore("data"); // Dostęp do store
    const request = store.put(data); // Zapisujemy dane
    request.onsuccess = () => resolve(); // Sukces
    request.onerror = (event) => reject(event.target.error); // Błąd
  });
}
