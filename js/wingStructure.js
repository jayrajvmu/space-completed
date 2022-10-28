

function generatingWing() {
    let tableGeneration = document.getElementById("tableGeneration");
    let wingGeneration = document.getElementById("wingGeneration");
    
    if(+tableGeneration.value>1 && wingGeneration.value.length>3){
        let generatingWings={
            wing_name:`${wingGeneration.value}`,
            wing_total_table:`${tableGeneration.value}`
        }
        
        console.log(generatingWings);
        axios.post("http://localhost:5000/wings",generatingWings)
        .then(response =>{
            console.log(response.data);
            let message = document.getElementById("message1");
            tableGeneration.value="";
            wingGeneration.value="";
            message1.innerHTML = response.data.message ;
        })
    }
    else{
        alert(" Enter Correct Value")
    }
    
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
function getUpdatedWing(){
    axios.get("http://localhost:5000/wings").then((response)=>{
        let wingDelete = response.data
        let wingDeleting = wingDelete.wing_name;
        for(i=0;i<wingDelete.wing_name.length;i++){
           // console.log(wingDelete.wing_name[i].name);
           wing_name_delete.innerHTML+=`<option value="${wingDeleting[i].id}">${wingDelete.wing_name[i].name}</option>`
        }
       })
}
getUpdatedWing();

function wingDelete(){
    let wing_name_delete = document.getElementById("wing_name_delete");
    console.log(wing_name_delete.value);   
    if(wing_name_delete.value>0){
        axios.delete(`http://localhost:5000/wings/${wing_name_delete.value}`).then((response)=>{
        console.log(response.data);
        wing_name_delete.innerHTML=`<option value="0">Select Wing</option>`;
        getUpdatedWing();
    })
    }
    else{
        alert("Select The Wing")
    }
    
}

/** */
function updateTable() {
    let tableId=document.getElementById("tableId");
    let seatCount = document.getElementById("seatCount");
    let adminCode = document.getElementById("adminCode");
    let message= document.getElementById("message2");


    if(tableId.value){
        if(seatCount.value){
            if(adminCode.value){
                let updateWSTable = {
                    tValue: `${tableId.value}`,
                    sValue: `${seatCount.value}`,
                    avalue: `${adminCode.value}`,
                }
                console.log(updateWSTable);
                axios.put('http://localhost:5000/wings', updateWSTable)
                            .then(response => {
                                console.log(response.data)
                                tableId.value="";
                                seatCount.value="";
                                adminCode.value="";
                            })
                            .catch((err)=>{
                                console.log(err);
                            });
               axios.get('http://localhost:5000/updated').then(
                response =>{
                    message2.textContent = response.data;
                    console.log(response.data);
                }
               )
            }
            else{
                alert("Enter Correct Pass Code")
            }
        }
        else{
            alert("Enter Number of Seats")
        }
    }
    else{
        alert(" Enter Valid Table ID")
    }

    
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