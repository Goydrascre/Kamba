let count = parseInt(localStorage.getItem('count')) || 0;
// Hent listen med produkt-ID-er fra localStorage
const productList = JSON.parse(localStorage.getItem('productIds')) || [];

// Referanse til tabellens tbody
const tableBody = document.getElementById('productTableBody');

// Lag en mapping mellom produkt-ID-er og bildelenker
const produktBilder = {
    "kjole1": { bilde: "../Bilder/Svart_og_hvit_kjoleF liten.jpg", tekst: ["Svart og hvit kjole", "Størrelse: M", "Materiale: Bomull", "Pris: 4483"] },

    "kjole2": { bilde: "../Bilder/svart_og_solv_kjoleF liten.jpg", tekst: ["Svart og sølv kjole", "Størrelse: L", "Materiale: Silke", "Pris: 1933"] },

    "kjole3": { bilde: "../Bilder/Svart_og_solv_lang_kjoleF liten.jpg", tekst: ["Svart og sølv lang kjole", "Størrelse: S", "Materiale: Ull", "Pris: 9383"] },

    "kjole4": { bilde: "../Bilder/Lang_blomst_kjole_rodF liten.jpg", tekst: ["Rød blomstret kjole", "Størrelse: S", "Materiale: Polyester", "Pris: 2999"] },

    "kjole5": { bilde: "../Bilder/Lang_blomst_kjole_gronnF liten.jpg", tekst: ["Grønn blomstret kjole", "Størrelse: M", "Materiale: Viskose", "Pris: 3123"] },

    "kjole6": { bilde: "../Bilder/Blo_og_solv_kjoleF liten.jpg", tekst: ["Blå og sølv kjole", "Størrelse: M", "Materiale: Sateng", "Pris: 4290"] },

    "kjole7": { bilde: "../Bilder/Rod_frakk liten.jpg", tekst: ["Rød frakk", "Størrelse: L", "Materiale: Ull", "Pris: 4999"] },

    "kjole8": { bilde: "../Bilder/Leopard_kjoleF liten.jpg", tekst: ["Leopardmønstret kjole", "Størrelse: S", "Materiale: Polyester", "Pris: 2599"] },

    "kjole9": { bilde: "../Bilder/Leopard_kjole_langF liten.jpg", tekst: ["Lang leopardmønstret kjole", "Størrelse: M", "Materiale: Bomull", "Pris: 2875"] },

    "kjole10": { bilde: "../Bilder/Gull_kjoleF liten.jpg", tekst: ["Gullkjole", "Størrelse: M", "Materiale: Silke", "Pris: 5290"] },

    "kjole11": { bilde: "../Bilder/Blo_kjole_kortF liten.jpg", tekst: ["Kort blå kjole", "Størrelse: S", "Materiale: Bomull", "Pris: 2100"] },

    "kjole12": { bilde: "../Bilder/Fiske_kjoleF liten.jpg", tekst: ["Fiskemønstret kjole", "Størrelse: L", "Materiale: Polyester", "Pris: 1899"] },

    "kjole13": { bilde: "../Bilder/Fugl_kjortF liten.jpg", tekst: ["Fuglemønstret kjole", "Størrelse: M", "Materiale: Bomull", "Pris: 2250"] },

    "kjole14": { bilde: "../Bilder/Gronn_blomst_kjoleF liten.jpg", tekst: ["Grønn blomstret kjole", "Størrelse: S", "Materiale: Lin", "Pris: 3199"] },

    "kjole15": { bilde: "../Bilder/Gul_kjort liten.jpg", tekst: ["Gul kjortel", "Størrelse: L", "Materiale: Fløyel", "Pris: 2800"] },

    "kjole16": { bilde: "../Bilder/hvit_blomster_kjole_kortF liten.jpg", tekst: ["Hvit kort blomsterkjole", "Størrelse: M", "Materiale: Bomull", "Pris: 2499"] },

    "kjole17": { bilde: "../Bilder/hvit_kjole liten.jpg", tekst: ["Hvit kjole", "Størrelse: S", "Materiale: Silke", "Pris: 3999"] },

    "kjole18": { bilde: "../Bilder/Hvit_monster_kjoleF liten.jpg", tekst: ["Hvit mønstret kjole", "Størrelse: L", "Materiale: Polyester", "Pris: 2300"] },

    "kjole19": { bilde: "../Bilder/hvit_og_oransje_kjoleF liten.jpg", tekst: ["Hvit og oransje kjole", "Størrelse: M", "Materiale: Bomull", "Pris: 2700"] },

    "kjole20": { bilde: "../Bilder/Hvit_og_svart_spiral_kjoleF liten.jpg", tekst: ["Hvit og svart spiral kjole", "Størrelse: S", "Materiale: Lin", "Pris: 3100"] },

    "kjole21": { bilde: "../Bilder/Hvit_og_svart_trekant_kjoleF liten.jpg", tekst: ["Hvit og svart trekant kjole", "Størrelse: M", "Materiale: Bomull", "Pris: 2850"] },

    "kjole22": { bilde: "../Bilder/hvit_blomst_kjoleF liten.jpg", tekst: ["Hvit blomstret kjole", "Størrelse: L", "Materiale: Silke", "Pris: 3250"] },

    "kjole23": { bilde: "../Bilder/Lang_Kjole_BloF liten.jpg", tekst: ["Lang blå kjole", "Størrelse: M", "Materiale: Ull", "Pris: 4100"] },

    "kjole24": { bilde: "../Bilder/Lang_Kjole_RodF liten.jpg", tekst: ["Lang rød kjole", "Størrelse: S", "Materiale: Polyester", "Pris: 2899"] },

    "kjole25": { bilde: "../Bilder/Lang_Kjole_RosaF liten.jpg", tekst: ["Lang rosa kjole", "Størrelse: M", "Materiale: Silke", "Pris: 3500"] },

    "kjole26": { bilde: "../Bilder/rod_blomster_kjoleF liten.jpg", tekst: ["Rød blomsterkjole", "Størrelse: L", "Materiale: Bomull", "Pris: 2699"] },
   
    "kjole27": { bilde: "../Bilder/Rod_kjort liten.jpg", tekst: ["Rød kjortel", "Størrelse: S", "Materiale: Lin", "Pris: 2400"] },
   
    "kjole28": { bilde: "../Bilder/Rosa_kjoleF liten.jpg", tekst: ["Rosa kjole", "Størrelse: M", "Materiale: Fløyel", "Pris: 2999"] },
   
    "kjole29": { bilde: "../Bilder/Solv_kjole_langF liten.jpg", tekst: ["Lang sølvkjole", "Størrelse: L", "Materiale: Sateng", "Pris: 4700"] },
    
    "kjole30": { bilde: "../Bilder/Svart_kjoleF liten.jpg", tekst: ["Svart kjole", "Størrelse: S", "Materiale: Polyester", "Pris: 2599"] },
    
    "kjole31": { bilde: "../Bilder/Svart kjole_kjort liten.jpg", tekst: ["Svart kjortel", "Størrelse: M", "Materiale: Lin", "Pris: 2800"] },
    
    "kjole32": { bilde: "../Bilder/Svart_blomster_kjoleF liten.jpg", tekst: ["Svart blomsterkjole", "Størrelse: L", "Materiale: Bomull", "Pris: 3150"] }
};

function beregnTotalPris() {
    let totalPris = 0;
    productList.forEach(id => {
        const produktInfo = produktBilder[id];
        if (produktInfo) {
            const prisTekst = produktInfo.tekst.find(t => t.toLowerCase().includes("pris"));
            if (prisTekst) {
                const pris = parseInt(prisTekst.replace(/\D/g, ''), 10);
                if (!isNaN(pris)) totalPris += pris;
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
            const deleteButton = document.createElement('sbutton');
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
        cell.innerText = "Ingen kjoler i handlekurven.";
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
    }
}

// Oppdater tabellen ved lasting av siden

window.onscroll = function() {toggleMenuPosition()};

var menu = document.getElementById("floatingMenu");
var stickyPoint = 435; // Juster dette tallet for å endre når menyen blir sticky

function toggleMenuPosition() {
  if (window.pageYOffset > stickyPoint) {
    // Når menyen blir sticky, gjør den fast
    menu.style.position = 'fixed';
    menu.style.top = '150px';  // Fest menyen på toppen
    menu.style.bottom = '';   // Fjern bottom for å unngå konflikt
  } else {
    // Hvis ikke sticky, sett tilbake til absolutt
    menu.style.position = 'absolute';
    menu.style.top = '';      // Fjern top
    menu.style.bottom = '100px'; // Sett tilbake til bunnposisjon
  }
}
const betalKnapp = document.getElementById("betalKnapp");
const modal = document.getElementById("betalModal");

betalKnapp.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

modal.addEventListener("click", (e) => {
    if (!e.target.closest(".modal-content")) {
        modal.classList.add("hidden");
    }
});
function oppdaterModalPris() {
    const totalPris = beregnTotalPris();
    const prisElementModal = document.getElementById('totalPrisModal');
    if (prisElementModal) {
        prisElementModal.innerText = `${totalPris} kr`; // Oppdaterer prisen i modal
    }
}
document.getElementById("betalKnapp").addEventListener("click", function () {
    const totalPris = document.getElementById("totalPris").textContent;
  
    emailjs.send("service_oexncyh", "template_xksn0ds", {
      message: `Bruker trykket "Betal nå" med ${totalPris}`
    }).then(function () {
      console.log("E-post sendt!");
    }, function (error) {
      console.error("Feil ved sending:", error);
    });
  });

// Du må også kalle denne funksjonen når modalen åpnes
betalKnapp.addEventListener('click', function() {
    document.getElementById('betalModal').classList.remove('hidden');  // Vis modal
    oppdaterModalPris();  // Oppdater pris i modal
});
oppdaterTabell();
oppdaterPrisVisning();
