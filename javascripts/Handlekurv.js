let count = JSON.parse(localStorage.getItem('count')) || 0;
// Hent listen med produkt-ID-er fra localStorage
const productList = JSON.parse(localStorage.getItem('productIds')) || [];

// Referanse til tabellens tbody
const tableBody = document.getElementById('productTableBody');

// Funksjon for å oppdatere tabellen
function oppdaterTabell() {
    // Tøm tabellen
    tableBody.innerHTML = '';

    if (productList.length > 0) {
        // Legg hver produkt-ID som en rad i tabellen
        productList.forEach((id, index) => {
            const row = document.createElement('tr');

            // Celle for produkt-ID
            const idCell = document.createElement('td');
            idCell.innerText = id;

            // Celle for slett-knapp
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'X'; // "X"-knappens tekst
            deleteButton.className = 'delete-button';
            deleteButton.style.color = 'red';
            deleteButton.style.cursor = 'pointer';
            deleteButton.addEventListener('click', () => {
                slettProdukt(index); // Kall funksjonen for å slette produktet
            });
            deleteCell.appendChild(deleteButton);

            // Legg cellene til raden
            row.appendChild(idCell);
            row.appendChild(deleteCell);

            // Legg raden til tabellen
            tableBody.appendChild(row);
        });
    } else {
        // Ingen produkt-ID-er lagret
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 2; // Fyll begge kolonner
        cell.innerText = "Ingen produkt-ID-er funnet.";
        row.appendChild(cell);
        tableBody.appendChild(row);
    }
}

// Funksjon for å slette et produkt
function slettProdukt(index) {
    productList.splice(index, 1); // Fjern produktet fra listen
    localStorage.setItem('productIds', JSON.stringify(productList)); // Oppdater localStorage
    oppdaterTabell(); // Oppdater tabellen
    if (count > 0) {
        count--;
        localStorage.setItem('count', JSON.stringify(count)); // Lagre oppdatert count i localStorage
        console.log(`Count etter sletting: ${count}`);
    }
}

// Oppdater tabellen ved lasting av siden
oppdaterTabell();
