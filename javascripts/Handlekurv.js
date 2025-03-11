let count = parseInt(localStorage.getItem('count')) || 0;
// Hent listen med produkt-ID-er fra localStorage
const productList = JSON.parse(localStorage.getItem('productIds')) || [];

// Referanse til tabellens tbody
const tableBody = document.getElementById('productTableBody');

// Lag en mapping mellom produkt-ID-er og bildelenker
const produktBilder = {
    "kjole1": { bilde: "../Bilder/kjole.jpg", tekst: ["kjole", "Størrelse: M", "Materiale: Bomull", "pris: 4483"] },
    "kjole2": { bilde: "../Bilder/svart_og_sølv_kjoleF.jpg", tekst: ["svart kjole", "Størrelse: L", "Materiale: Silke", "pris: 1933"] },
    "kjole3": { bilde: "path/to/image3.jpg", tekst: ["Grønn kjole", "Størrelse: S", "Materiale: Ull", "pris: 9383"] },
    // Legg til flere produkter
};
function beregnTotalPris() {
    let totalPris = 0;

    productList.forEach((id) => {
        const produktInfo = produktBilder[id];
        if (produktInfo) {
            const prisTekst = produktInfo.tekst.find((tekst) => tekst.toLowerCase().includes("pris"));
            if (prisTekst) {
                // Ekstrakter prisverdien (antar formatet "pris: XXXX")
                const pris = parseInt(prisTekst.replace(/\D/g, ''), 10); // Fjerner alt annet enn tall
                if (!isNaN(pris)) {
                    totalPris += pris;
                }
            }
        }
    });

    return totalPris;
}

// Funksjon for å oppdatere prisvisning
function oppdaterPrisVisning() {
    const totalPris = beregnTotalPris();
    const prisElement = document.getElementById('totalPris');
    if (prisElement) {
        prisElement.innerText = `Total pris: ${totalPris} kr`;
    }
}
// Funksjon for å oppdatere tabellen
function oppdaterTabell() {
    tableBody.innerHTML = ''; // Tøm tabellen

    if (productList.length > 0) {
        productList.forEach((id, index) => {
            const row = document.createElement('tr');

            // Celle for bilde og tekst
            const imageCell = document.createElement('td');
            imageCell.style.textAlign = 'center'; // Sentrer innholdet

            // Opprett en container for bilde og tekst
            const container = document.createElement('div');
            container.classList.add('product-container'); // Legg til CSS-klasse for styling

            // Opprett bilde
            const image = document.createElement('img');
            image.src = produktBilder[id]?.bilde || "path/to/default-image.jpg";
            image.alt = "Bilde for " + id;
            image.style.width = '100px';
            image.style.height = 'auto';

            // Opprett liste for tekstene
            const textList = document.createElement('ul');
            textList.style.listStyle = 'none'; // Fjern punktmerker
            textList.style.padding = '0'; // Fjern padding
            textList.style.margin = '0'; // Fjern margin
            (produktBilder[id]?.tekst || ["Ingen beskrivelse tilgjengelig"]).forEach((tekst) => {
                const listItem = document.createElement('li');
                listItem.innerText = tekst;
                textList.appendChild(listItem);
            });

            // Legg bilde og liste til containeren
            container.appendChild(image);
            container.appendChild(textList);

            // Legg containeren til cellen
            imageCell.appendChild(container);

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
    productList.splice(index, 1);
    localStorage.setItem('productIds', JSON.stringify(productList));
    oppdaterTabell();
    oppdaterPrisVisning(); // Oppdater prisvisningen
    if (count > 0) {
        count--;
        localStorage.setItem('count', JSON.stringify(count));
        alert("slettet!");
    }
}

// Oppdater tabellen ved lasting av siden

window.onscroll = function() {toggleMenuPosition()};

var menu = document.getElementById("floatingMenu");
var stickyPoint = 300; // Juster dette tallet for å endre når menyen blir sticky

function toggleMenuPosition() {
  if (window.pageYOffset > stickyPoint) {
    // Når menyen blir sticky, gjør den fast
    menu.style.position = 'fixed';
    menu.style.top = '100px';  // Fest menyen på toppen
    menu.style.bottom = '';   // Fjern bottom for å unngå konflikt
  } else {
    // Hvis ikke sticky, sett tilbake til absolutt
    menu.style.position = 'absolute';
    menu.style.top = '';      // Fjern top
    menu.style.bottom = '100px'; // Sett tilbake til bunnposisjon
  }
}
oppdaterTabell();
oppdaterPrisVisning();