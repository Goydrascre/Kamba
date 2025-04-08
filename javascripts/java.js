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


// --- Oppdatering av produktbilder basert på produkt-ID ---

// Referanser til bildeelementene
const hovedbilde = document.getElementById('hovedbilde');
const bilde1 = document.getElementById('bilde1');
const bilde2 = document.getElementById('bilde2');

// Oppdater bilder basert på produktId
if (produktId === 'kjole1') {
    hovedbilde.src = '../Bilder/Svart_og_hvit_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole1_side.jpg';
    bilde2.src = '../Bilder/kjole1_back.jpg';
} else if (produktId === 'kjole2') {
    hovedbilde.src = '../Bilder/svart_og_solv_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole2_side.jpg';
    bilde2.src = '../Bilder/kjole2_back.jpg';
} else if (produktId === 'kjole3') {
    hovedbilde.src = '../Bilder/Svart_og_solv_lang_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole3_side.jpg';
    bilde2.src = '../Bilder/kjole3_back.jpg';
} else if (produktId === 'kjole4') {
    hovedbilde.src = '../Bilder/Lang_blomst_kjole_rodF.jpg';
    bilde1.src = '../Bilder/kjole4_side.jpg';
    bilde2.src = '../Bilder/kjole4_back.jpg';
} else if (produktId === 'kjole5') {
    hovedbilde.src = '../Bilder/Lang_blomst_kjole_gronnF.jpg';
    bilde1.src = '../Bilder/kjole5_side.jpg';
    bilde2.src = '../Bilder/kjole5_back.jpg';
} else if (produktId === 'kjole6') {
    hovedbilde.src = '../Bilder/Blo_og_solv_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole6_side.jpg';
    bilde2.src = '../Bilder/kjole6_back.jpg';
} else if (produktId === 'kjole7') {
    hovedbilde.src = '../Bilder/Rod_frakk.jpg';
    bilde1.src = '../Bilder/kjole7_side.jpg';
    bilde2.src = '../Bilder/kjole7_back.jpg';
} else if (produktId === 'kjole8') {
    hovedbilde.src = '../Bilder/Leopard_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole8_side.jpg';
    bilde2.src = '../Bilder/kjole8_back.jpg';
} else if (produktId === 'kjole9') {
    hovedbilde.src = '../Bilder/Leopard_kjole_langF.jpg';
    bilde1.src = '../Bilder/kjole9_side.jpg';
    bilde2.src = '../Bilder/kjole9_back.jpg';
} else if (produktId === 'kjole10') {
    hovedbilde.src = '../Bilder/Gull_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole10_side.jpg';
    bilde2.src = '../Bilder/kjole10_back.jpg';
} else if (produktId === 'kjole11') {
    hovedbilde.src = '../Bilder/Blo_kjole_kortF.jpg';
    bilde1.src = '../Bilder/kjole11_side.jpg';
    bilde2.src = '../Bilder/kjole11_back.jpg';
} else if (produktId === 'kjole12') {
    hovedbilde.src = '../Bilder/Fiske_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole12_side.jpg';
    bilde2.src = '../Bilder/kjole12_back.jpg';
} else if (produktId === 'kjole13') {
    hovedbilde.src = '../Bilder/Fugl_kjortF.jpg';
    bilde1.src = '../Bilder/kjole13_side.jpg';
    bilde2.src = '../Bilder/kjole13_back.jpg';
} else if (produktId === 'kjole14') {
    hovedbilde.src = '../Bilder/Gronn_blomst_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole14_side.jpg';
    bilde2.src = '../Bilder/kjole14_back.jpg';
} else if (produktId === 'kjole15') {
    hovedbilde.src = '../Bilder/Gul_kjort.jpg';
    bilde1.src = '../Bilder/kjole15_side.jpg';
    bilde2.src = '../Bilder/kjole15_back.jpg';
} else if (produktId === 'kjole16') {
    hovedbilde.src = '../Bilder/hvit_blomster_kjole_kortF.jpg';
    bilde1.src = '../Bilder/kjole16_side.jpg';
    bilde2.src = '../Bilder/kjole16_back.jpg';
} else if (produktId === 'kjole17') {
    hovedbilde.src = '../Bilder/hvit_kjole.jpg';
    bilde1.src = '../Bilder/kjole17_side.jpg';
    bilde2.src = '../Bilder/kjole17_back.jpg';
} else if (produktId === 'kjole18') {
    hovedbilde.src = '../Bilder/Hvit_monster_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole18_side.jpg';
    bilde2.src = '../Bilder/kjole18_back.jpg';
} else if (produktId === 'kjole19') {
    hovedbilde.src = '../Bilder/hvit_og_oransje_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole19_side.jpg';
    bilde2.src = '../Bilder/kjole19_back.jpg';
} else if (produktId === 'kjole20') {
    hovedbilde.src = '../Bilder/Hvit_og_svart_spiral_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole20_side.jpg';
    bilde2.src = '../Bilder/kjole20_back.jpg';
} else if (produktId === 'kjole21') {
    hovedbilde.src = '../Bilder/Hvit_og_svart_trekant_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole21_side.jpg';
    bilde2.src = '../Bilder/kjole21_back.jpg';
} else if (produktId === 'kjole22') {
    hovedbilde.src = '../Bilder/hvit_blomst_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole22_side.jpg';
    bilde2.src = '../Bilder/kjole22_back.jpg';
} else if (produktId === 'kjole23') {
    hovedbilde.src = '../Bilder/Lang_Kjole_BloF.jpg';
    bilde1.src = '../Bilder/kjole23_side.jpg';
    bilde2.src = '../Bilder/kjole23_back.jpg';
} else if (produktId === 'kjole24') {
    hovedbilde.src = '../Bilder/Lang_Kjole_RodF.jpg';
    bilde1.src = '../Bilder/kjole24_side.jpg';
    bilde2.src = '../Bilder/kjole24_back.jpg';
} else if (produktId === 'kjole25') {
    hovedbilde.src = '../Bilder/Lang_Kjole_RosaF.jpg';
    bilde1.src = '../Bilder/kjole25_side.jpg';
    bilde2.src = '../Bilder/kjole25_back.jpg';
} else if (produktId === 'kjole26') {
    hovedbilde.src = '../Bilder/rod_blomster_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole26_side.jpg';
    bilde2.src = '../Bilder/kjole26_back.jpg';
} else if (produktId === 'kjole27') {
    hovedbilde.src = '../Bilder/Rod_kjort.jpg';
    bilde1.src = '../Bilder/kjole27_side.jpg';
    bilde2.src = '../Bilder/kjole27_back.jpg';
} else if (produktId === 'kjole28') {
    hovedbilde.src = '../Bilder/Rosa_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole28_side.jpg';
    bilde2.src = '../Bilder/kjole28_back.jpg';
} else if (produktId === 'kjole29') {
    hovedbilde.src = '../Bilder/Solv_kjole_langF.jpg';
    bilde1.src = '../Bilder/kjole29_side.jpg';
    bilde2.src = '../Bilder/kjole29_back.jpg';
} else if (produktId === 'kjole30') {
    hovedbilde.src = '../Bilder/Svart_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole30_side.jpg';
    bilde2.src = '../Bilder/kjole30_back.jpg';
} else if (produktId === 'kjole31') {
    hovedbilde.src = '../Bilder/Svart_kjole_kjort.jpg';
    bilde1.src = '../Bilder/kjole31_side.jpg';
    bilde2.src = '../Bilder/kjole31_back.jpg';
} else if (produktId === 'kjole32') {
    hovedbilde.src = '../Bilder/Svart_blomster_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole32_side.jpg';
    bilde2.src = '../Bilder/kjole32_back.jpg';
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

