

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

function viewTableEdit(){
    let tableEditModule = document.getElementById("tableEditModule");
    let wingEditModule = document.getElementById("wingEditModule");
    let wingCreationModule = document.getElementById("wingCreationModule");
    let styling = window.getComputedStyle(tableEditModule, null);
    let displaying = styling.getPropertyValue("display");
    if(displaying === "none"){
        tableEditModule.style.display="block";
        wingEditModule.style.display="none";
        wingCreationModule.style.display="none";
    }
    else{
        tableEditModule.style.display="none";
        
    }
}
function viewwingEditModule(){
    let tableEditModule = document.getElementById("tableEditModule");
    let wingCreationModule = document.getElementById("wingCreationModule");
    let wingEditModule = document.getElementById("wingEditModule");
    let styling = window.getComputedStyle(wingEditModule, null);
    let displaying = styling.getPropertyValue("display");
    if(displaying === "none"){
        wingEditModule.style.display="block";
        wingCreationModule.style.display="none";
        tableEditModule.style.display="none";
    }
    else{
        wingEditModule.style.display="none";
    }
}
function viewWingCreation(){
    let tableEditModule = document.getElementById("tableEditModule");
    let wingCreationModule = document.getElementById("wingCreationModule");
    let wingEditModule = document.getElementById("wingEditModule");
    let styling = window.getComputedStyle(wingCreationModule, null);
    let displaying = styling.getPropertyValue("display");
    if(displaying === "none"){
        wingEditModule.style.display="none";
        wingCreationModule.style.display="block";
        tableEditModule.style.display="none";
    }
    else{
        wingCreationModule.style.display="none";
    }
}
// function getUpdatedWing(){
//     axios.get("http://localhost:5000/wings").then((response)=>{
//         let wingDelete = response.data
//         let wingDeleting = wingDelete.wing_name;
//         for(i=0;i<wingDelete.wing_name.length;i++){
//            // console.log(wingDelete.wing_name[i].name);
//            wing_name_delete.innerHTML+=`<option value="${wingDeleting[i].id}">${wingDelete.wing_name[i].name}</option>`
//         }
//        })
// }
// getUpdatedWing();

// function wingDelete(){
//     let wing_name_delete = document.getElementById("wing_name_delete");
//     console.log(wing_name_delete.value);   
//     if(wing_name_delete.value>0){
//         axios.delete(`http://localhost:5000/wings/${wing_name_delete.value}`).then((response)=>{
//         console.log(response.data);
//         wing_name_delete.innerHTML=`<option value="0">Select Wing</option>`;
//         getUpdatedWing();
//     })
//     }
//     else{
//         alert("Select The Wing")
//     }
    
// }

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





/** 
 * New Work
*/
getWings();
function getWings(){
    axios.get("http://localhost:5000/wings").then((response)=>{
                                
    let wingList = response.data.wing_name;
    for(i=0;i<wingList.length;i++){
    createWingList();
    let sno = document.getElementsByClassName("sno");
    let wingName = document.getElementsByClassName("wing-name");
    let editBtn = document.getElementsByClassName("w-edit");
    let deleteBtn = document.getElementsByClassName("w-del");
    sno[i].textContent=i+1;
    wingName[i].textContent=wingList[i].name;
    editBtn[i].setAttribute("value",`${wingList[i].id}`);
    deleteBtn[i].setAttribute("value",`${wingList[i].id}`)

}
})

}
function createWingList(){
    let wing_delete_list_body = document.getElementById("wing-delete-list-body");

    let a = document.createElement("div");
    wing_delete_list_body.appendChild(a);
    a.setAttribute("class","wing-delete-list-names");
    let b = document.createElement("div");
    a.appendChild(b);
    b.setAttribute("class","sno");
    let c = document.createElement("div");
    a.appendChild(c);
    c.setAttribute("class","wing-name");
    let d = document.createElement("div");
    a.appendChild(d);
    d.setAttribute("class","wing-edit");
    let e = document.createElement("div");
    d.appendChild(e);
    e.setAttribute("class","edit-icon");
    let f = document.createElement("button");
    e.appendChild(f);
    f.setAttribute("class","w-edit");
    f.setAttribute("onclick","wingEditing(event)");
    let g = document.createTextNode("EDIT")
    f.appendChild(g);
    let h = document.createElement("div");
    d.appendChild(h);
    h.setAttribute("class","edit-icon");
    let i = document.createElement("button")
    h.appendChild(i);
    i.setAttribute("class","w-del")
    i.setAttribute("onclick","wingDeleting(event)");
    let j = document.createTextNode("DEL");
    i.appendChild(j);
}

function wingEditing(event){
    console.dir(event.target.value);
    
}
function wingDeleting(event){
    let wingToDelete = event.target.value;
    axios.delete(`http://localhost:5000/wings/${wingToDelete}`).then((response)=>{
        console.log(response.data);
        let wing_delete_list_body = document.getElementById("wing-delete-list-body");
        wing_delete_list_body.innerHTML="";
        getWings();
    })
}