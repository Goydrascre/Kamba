// Hent lagret count fra localStorage, eller sett den til 0 hvis den ikke finnes
let count = parseInt(localStorage.getItem('count')) || 0;

// Oppdater count-displayet når siden lastes
document.getElementById("countDisplay").innerText = count;

// Eventlistener for knappen
document.getElementById("counterButton").addEventListener("click", function () {
    // Øk count og oppdater localStorage
    count++;
    localStorage.setItem('count', count);

    // Oppdater visningen
    document.getElementById("countDisplay").innerText = count;

    if (produktId) {
        // Hent eksisterende liste fra localStorage, eller opprett en tom liste
        const existingList = JSON.parse(localStorage.getItem('productIds')) || [];

        // Legg til produkt-ID i listen
        existingList.push(produktId);

        // Lagre den oppdaterte listen i localStorage
        localStorage.setItem('productIds', JSON.stringify(existingList));
    }
});
// Velg elementene
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

// Hent URL-parameteren
const urlParams = new URLSearchParams(window.location.search);
const produktId = urlParams.get('id');

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