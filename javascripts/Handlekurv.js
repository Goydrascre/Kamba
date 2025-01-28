let count = JSON.parse(localStorage.getItem('count')) || 0;
// Hent listen med produkt-ID-er fra localStorage
const productList = JSON.parse(localStorage.getItem('productIds')) || [];

// Referanse til tabellens tbody
const tableBody = document.getElementById('productTableBody');

// Lag en mapping mellom produkt-ID-er og bildelenker
const produktBilder = {
    "kjole1": { bilde: "../Bilder/kjole.jpg", tekst: ["kjole", "Størrelse: M", "Materiale: Bomull"] },
    "kjole2": { bilde: "../Bilder/svart_og_sølv_kjoleF.jpg", tekst: ["svart kjole", "Størrelse: L", "Materiale: Silke"] },
    "kjole3": { bilde: "path/to/image3.jpg", tekst: ["Grønn kjole", "Størrelse: S", "Materiale: Ull"] },
    // Legg til flere produkter
};


// Funksjon for å oppdatere tabellen
function oppdaterTabell() {
    tableBody.innerHTML = ''; // Tøm tabellen

    if (productList.length > 0) {
        productList.forEach((id, index) => {
            const row = document.createElement('tr');

            // Celle for bilde og tekst
            const imageCell = document.createElement('td');
            imageCell.style.textAlign = 'center'; // Sentrer innholdet

            // Opprett bilde
            const image = document.createElement('img');
            image.src = produktBilder[id]?.bilde || "path/to/default-image.jpg";
            image.alt = "Bilde for " + id;
            image.style.width = '100px';
            image.style.display = 'block';

            // Opprett liste for tekstene
            const textList = document.createElement('ul');
            (produktBilder[id]?.tekst || ["Ingen beskrivelse tilgjengelig"]).forEach((tekst) => {
                const listItem = document.createElement('li');
                listItem.innerText = tekst;
                textList.appendChild(listItem);
            });

            // Legg bilde og liste til cellen
            imageCell.appendChild(image);
            imageCell.appendChild(textList);

            // Celle for slett-knapp
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'X';
            deleteButton.style.color = 'red';
            deleteButton.style.cursor = 'pointer';
            deleteButton.addEventListener('click', () => slettProdukt(index));
            deleteCell.appendChild(deleteButton);

            // Legg cellene til raden
            row.appendChild(imageCell);
            row.appendChild(deleteCell);

            tableBody.appendChild(row);
        });
    } else {
        // Ingen produkt-ID-er lagret
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 2;
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
