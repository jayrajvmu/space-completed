
function openingWingDelete() {
    let wingDeleting = document.getElementById("wingDeleting");
    let styling = window.getComputedStyle(wingDeleting, null);
    let displaying = styling.getPropertyValue("display");
    if(displaying === "none"){
        wingDeleting.style.display="block";
    }
    else{
        wingDeleting.style.display="none";
    }
}