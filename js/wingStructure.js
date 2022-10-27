

function generatingWing() {
    let tableGeneration = document.getElementById("tableGeneration");
    let wingGeneration = document.getElementById("wingGeneration");
    
    
    let generatingWings={
        wing_name:`${wingGeneration.value}`,
        wing_total_table:`${tableGeneration.value}`
    }
    
    console.log(generatingWings);
    axios.post("http://localhost:5500/wingGeneration",generatingWings)
    .then(response =>{
        console.log(response.data);
        let message = document.getElementById("message1");
        tableGeneration.value="";
        wingGeneration.value="";
        message1.innerHTML = response.data.message ;
    })
}

/***/


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

/** */
function updateTable() {
    let tableId=document.getElementById("tableId");
    let seatCount = document.getElementById("seatCount");
    let adminCode = document.getElementById("adminCode");
    let message= document.getElementById("message2");

    let updateWSTable = {
        tValue: `${tableId.value}`,
        sValue: `${seatCount.value}`,
        avalue: `${adminCode.value}`,
    }
    console.log(updateWSTable);
    axios.put('http://localhost:5500/update', updateWSTable)
                .then(response => {
                    console.log(response.data)
                    tableId.value="";
                    seatCount.value="";
                    adminCode.value="";
                })
                .catch((err)=>{
                    console.log(err);
                });
   axios.get('http://localhost:5500/updated').then(
    response =>{
        message2.textContent = response.data;
        console.log(response.data);
    }
   )
}

function viewTableEdit(){
    let tableEditModule = document.getElementById("tableEditModule");
    let styling = window.getComputedStyle(tableEditModule, null);
    let displaying = styling.getPropertyValue("display");
    if(displaying === "none"){
        tableEditModule.style.display="block";
    }
    else{
        tableEditModule.style.display="none";
    }
}
function viewWingCreation(){
    let wingCreationModule = document.getElementById("wingCreationModule");
    let styling = window.getComputedStyle(wingCreationModule, null);
    let displaying = styling.getPropertyValue("display");
    if(displaying === "none"){
        wingCreationModule.style.display="block";
    }
    else{
        wingCreationModule.style.display="none";
    }
}
function viewwingEditModule(){
    let wingEditModule = document.getElementById("wingEditModule");
    let styling = window.getComputedStyle(wingEditModule, null);
    let displaying = styling.getPropertyValue("display");
    if(displaying === "none"){
        wingEditModule.style.display="block";
    }
    else{
        wingEditModule.style.display="none";
    }
}