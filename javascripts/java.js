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


// --- Oppdatering av produktbilder basert på produkt-ID ---

// Referanser til bildeelementene
const hovedbilde = document.getElementById('hovedbilde');
const bilde1 = document.getElementById('bilde1');
const bilde2 = document.getElementById('bilde2');

// Oppdater bilder basert på produktId
if (produktId === 'kjole1') {
    hovedbilde.src = '../Bilder/kjole.jpg';
    bilde1.src = '../Bilder/kjole1_side.jpg';
    bilde2.src = '../Bilder/kjole1_back.jpg';
} else if (produktId === 'kjole2') {
    hovedbilde.src = '../Bilder/svart_og_sølv_kjoleF.jpg';
    bilde1.src = '../Bilder/kjole2_side.jpg';
    bilde2.src = '../Bilder/kjole2_back.jpg';
} else if (produktId === 'kjole3') {
    hovedbilde.src = '../Bilder/kjole3.jpg';
    bilde1.src = '../Bilder/kjole3_side.jpg';
    bilde2.src = '../Bilder/kjole3_back.jpg';
} else if (produktId === 'kjole4') {
    hovedbilde.src = '../Bilder/kjole3.jpg';
    bilde1.src = '../Bilder/kjole3_side.jpg';
    bilde2.src = '../Bilder/kjole3_back.jpg';
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
