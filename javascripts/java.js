let count = 0;

document.getElementById("counterButton").addEventListener("click", function() {
    count++;
    document.getElementById("countDisplay").innerText = count;
});
function openFullscreen(imageElement) {
    const fullscreenContainer = document.getElementById("fullscreenContainer");
    const fullscreenImage = document.getElementById("fullscreenImage");
    fullscreenImage.src = imageElement.src; // Setter kildebildet til fullskjermvisningen
    fullscreenContainer.style.display = "flex";
}

function closeFullscreen() {
    const fullscreenContainer = document.getElementById("fullscreenContainer");
    fullscreenContainer.style.display = "none";
}