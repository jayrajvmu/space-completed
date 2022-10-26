
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
function wingDelete(){
    let wing_name_delete = document.getElementById("wing_name_delete");
    let wingDeleting ={
        'wing_name':`${wing_name_delete.value}`
    }
    // console.log(wingDeleting);
    axios.delete("http://localhost:5500/wings/1",wingDeleting).then((response)=>{
        console.log(response.data);
    })
}