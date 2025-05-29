// --- Handlekurv-logikk for antall og produkt-IDer ---

// Hent lagret count fra localStorage, eller sett den til 0 hvis den ikke finnes
let count = parseInt(localStorage.getItem('count')) || 0;
document.getElementById("countDisplay").innerText = count;

// Hent listen med produkt-IDer fra localStorage, eller sett til en tom liste
const productList = JSON.parse(localStorage.getItem('productIds')) || [];

// Hent URL-parameteren for produkt-ID (f.eks. "kjole1")
const urlParams = new URLSearchParams(window.location.search);
const produktId = urlParams.get('id');

// Hent kjøpsknappen
const counterButton = document.getElementById("counterButton");

// Dersom produktet allerede er i handlekurven, deaktiver knappen ved lasting av siden
if (produktId && productList.includes(produktId)) {
    counterButton.disabled = true;
    counterButton.innerText = "Lagt til";
    counterButton.style.backgroundColor = "#ccc";
    counterButton.style.color = "white";
}

// Legg til eventlistener for knappen
counterButton.addEventListener("click", function () {
    // Sjekk om produktet allerede finnes i handlekurven (sikkerhetsjekk)
    if (produktId && productList.includes(produktId)) {
        alert("Denne kjolen er allerede lagt til i handlekurven!");
        return;
    }
    
    // Legg til produktet i listen og oppdater localStorage
    productList.push(produktId);
    localStorage.setItem('productIds', JSON.stringify(productList));

    // Øk count og oppdater visningen og localStorage
    count++;
    localStorage.setItem('count', count);
    document.getElementById("countDisplay").innerText = count;

    // Endre knappens farge og deaktiver den slik at produktet ikke kan legges til igjen
    this.style.backgroundColor = "#4CAF50"; // Grønn farge
    this.style.color = "white";
    this.disabled = true;
    this.innerText = "Lagt til";
});


// --- Modal og bildevisning ---

// Velg elementene for modal
const thumbnails = document.querySelectorAll('.thumbnail');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

// Vis modal når et bilde klikkes
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImage.src = thumbnail.src; // Sett modalens bilde til det klikkede bildet
        modalImage.classList.remove('zoomed'); // Reset zoom when opening modal
        modalImage.style.transform = 'scale(1)'; // Ensure image is not zoomed in initially
    });
});

// Lukk modal når "close"-knappen klikkes
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Lukk modal når du klikker utenfor bildet
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Zoom functionality: zoom in when clicking on the image
modalImage.addEventListener("click", function (event) {
    if (modalImage.classList.contains("zoomed")) {
        modalImage.classList.remove("zoomed");
        modalImage.style.transform = "scale(1)"; // Reset zoom
    } else {
        // Get click position relative to the image
        const rect = modalImage.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;

        // Set the zoom origin to the clicked point
        modalImage.style.transformOrigin = `${(offsetX / rect.width) * 100}% ${(offsetY / rect.height) * 100}%`;

        modalImage.classList.add("zoomed");
        modalImage.style.transform = "scale(4)"; // Zoom in
    }
});


// --- Oppdatering av produktbilder og pris basert på produkt-ID ---

// Referanser til bildeelementene
const hovedbilde = document.getElementById('hovedbilde');
const bilde1 = document.getElementById('bilde1');
const bilde2 = document.getElementById('bilde2');
const prisElement = document.getElementById('info');  // Her vises prisen

// Objekter med bilder og priser
const kjoleBilder = {
    kjole1: 'Svart_og_hvit_kjoleF.jpg',
    kjole2: 'svart_og_solv_kjoleF.jpg',
    kjole3: 'Svart_og_solv_lang_kjoleF.jpg',
    kjole4: 'Lang_blomst_kjole_rodF.jpg',
    kjole5: 'Lang_blomst_kjole_gronnF.jpg',
    kjole6: 'Blo_og_solv_kjoleF.jpg',
    kjole7: 'Rod_frakk.jpg',
    kjole8: 'Leopard_kjoleF.jpg',
    kjole9: 'Leopard_kjole_langF.jpg',
    kjole10: 'Gull_kjoleF.jpg',
    kjole11: 'Blo_kjole_kortF.jpg',
    kjole12: 'Fiske_kjoleF.jpg',
    kjole13: 'Fugl_kjortF.jpg',
    kjole14: 'Gronn_blomst_kjoleF.jpg',
    kjole15: 'Gul_kjort.jpg',
    kjole16: 'hvit_blomster_kjole_kortF.jpg',
    kjole17: 'hvit_sølv_kjoleF.jpg',
    kjole18: 'Hvit_monster_kjoleF.jpg',
    kjole19: 'hvit_og_oransje_kjoleF.jpg',
    kjole20: 'Hvit_og_svart_spiral_kjoleF.jpg',
    kjole21: 'Hvit_og_svart_trekant_kjoleF.jpg',
    kjole22: 'hvit_blomst_kjoleF.jpg',
    kjole23: 'Lang_Kjole_BloF.jpg',
    kjole24: 'Lang_Kjole_RodF.jpg',
    kjole25: 'Lang_Kjole_RosaF.jpg',
    kjole26: 'rod_blomster_kjoleF.jpg',
    kjole27: 'Rod_kjort.jpg',
    kjole28: 'Rosa_kjoleF.jpg',
    kjole29: 'Solv_kjole_langF.jpg',
    kjole30: 'Svart_kjoleF.jpg',
    kjole31: 'Svart_kjole_kjortF.jpg',
    kjole32: 'Svart_blomster_kjoleF.jpg'
};

const kjolePriser = {
    kjole1: 4483,
    kjole2: 899,
    kjole3: 799,
    kjole4: 299,
    kjole5: 299,
    kjole6: 799,
    kjole7: 4999,
    kjole8: 2599,
    kjole9: 2875,
    kjole10: 5290,
    kjole11: 2100,
    kjole12: 1899,
    kjole13: 1299,
    kjole14: 299,
    kjole15: 2800,
    kjole16: 2499,
    kjole17: 499,
    kjole18: 499,
    kjole19: 2700,
    kjole20: 499,
    kjole21: 499,
    kjole22: 599,
    kjole23: 849,
    kjole24: 1299,
    kjole25: 799,
    kjole26: 299,
    kjole27: 2400,
    kjole28: 599,
    kjole29: 4700,
    kjole30: 2599,
    kjole31: 2800,
    kjole32: 299
};


if (produktId) {
    const basePath = '../Bilder/';
    const hovedFil = kjoleBilder[produktId];
    const backPath = produktId + '_back.jpg';

    if (hovedFil) {
        hovedbilde.src = basePath + hovedFil;

        // Hvis navnet ender på 'F.jpg', kan vi automatisk lage B-versjonen
        if (hovedFil.includes('F.jpg')) {
            bilde1.src = basePath + hovedFil.replace('F.jpg', 'B.jpg');
        } else {
            bilde1.src = '';  // eller en placeholder hvis ønskelig
        }
    }

    // Oppdater pris i elementet med id="info"
    const pris = kjolePriser[produktId];
    if (pris) {
        prisElement.textContent = `Pris: ${pris} kr`;
    } else {
        prisElement.textContent = 'Pris ikke tilgjengelig';
    }
}


// --- Andre funksjoner, for eksempel reset med Shift+R og scroll-knapp ---

// Tilbakestill count med Shift + R
document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key === 'R') {  // Lytter etter Shift + R
        count = 0;
        localStorage.setItem('count', count);
        alert('Count har blitt tilbakestilt!');
    }
});

// Scroll-knapp-funksjonalitet
window.onscroll = function() { toggleButtonPosition(); };

var button = document.getElementById("scrollButton");
var stickyPoint = 400; // Juster dette tallet for å endre sticky-punktet

function toggleButtonPosition() {
    if (window.pageYOffset > stickyPoint) {
        // Når knappen når sticky-punktet, gjør den sticky og følger med videre
        button.style.position = 'fixed';
        button.style.top = '100px';  // Fest knappen på toppen når den blir "sticky"
        button.style.bottom = '';    // Fjern bottom for å unngå konflikt
    } else {
        // Når du er før sticky-punktet, sett tilbake til absolutt posisjon
        button.style.position = 'absolute';
        button.style.top = '';       
        button.style.bottom = '20px';  // Sett tilbake til bunnens posisjon
    }
}
console.log(prisElement);