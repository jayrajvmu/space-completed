

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
axios.get("http://localhost:5500/wings").then((response)=>{
         let wingDelete = response.data
         let wingDeleting = wingDelete.wing_name;
         for(i=0;i<wingDelete.wing_name.length;i++){
            // console.log(wingDelete.wing_name[i].name);
            wing_name_delete.innerHTML+=`<option value="${i+1}">${wingDelete.wing_name[i].name}</option>`
         }
        })
function wingDelete(){
    let wing_name_delete = document.getElementById("wing_name_delete");
    console.log(wing_name_delete.value);   
    
    axios.delete(`http://localhost:5500/wings/${wing_name_delete.value}`).then((response)=>{
        console.log(response.data);
    })
}