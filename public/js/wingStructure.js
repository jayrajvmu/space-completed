
let wing_to_delete;
let edit_wing_name;
let wingId;
let tableId;

function generatingWing() {
    let tableGeneration = document.getElementById("tableGeneration");
    let wingGeneration = document.getElementById("wingGeneration");
    
    if(+tableGeneration.value>0 && wingGeneration.value.length>3){
        let message ="wc"
        openModal(message); 
    }
    else{
        alert(" Enter Correct Value")
    }
}

function creatingWing(){
    let tableGeneration = document.getElementById("tableGeneration");
    let wingGeneration = document.getElementById("wingGeneration");
    
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
            closeModal();
            let goOn = document.getElementById("go-on");
            goOn.removeAttribute("onclick");
        })
}


function closeModal(){
    let modalContainer = document.querySelector(".modal-container");
    let message=title;
    modalContainer.style.display="none";
}
function seatEditing(event){
    console.log(event.target.attributes.value.value);
    tableId = event.target.attributes.value.value
    openModal("seatEdit")
}
function openModal(message) {
    let modalContainer = document.querySelector(".modal-container");
    let titleHeader = document.getElementById("title");
    let warmMessage = document.getElementById("warn-message");
    let getMessage=message;

    modalContainer.style.display="block";
    if(getMessage=="wc"){
        // creatingWing(contents);
        titleHeader.textContent="Action Requied";
        warmMessage.innerHTML="Are you Sure";
        let goOn = document.getElementById("go-on");
        goOn.setAttribute("onclick","creatingWing()");
        
    }
    else if(getMessage=="wd"){
        titleHeader.textContent="Action Requied";
        warmMessage.innerHTML="Are you Sure";
        let goOn = document.getElementById("go-on");
        goOn.setAttribute("onclick","deletingWing()");
    }
    else if(getMessage=="ut"){
        titleHeader.textContent="Action Requied";
        warmMessage.innerHTML="Are you Sure";
        let goOn = document.getElementById("go-on");
        goOn.setAttribute("onclick","toUpdateTable()");
    }
    else if(getMessage=="we"){
        let goOn = document.getElementById("go-on");
        titleHeader.textContent="Wing Name";
        warmMessage.innerHTML=`<input type="text" placeholder="Rename Wing Name" class="input-form">`;
        goOn.setAttribute("onclick","toUpdateWing()");
    }
    else if(getMessage=="editTable"){
        let goOn = document.getElementById("go-on");
        titleHeader.textContent="Table Name";
        warmMessage.innerHTML=`<input type="text" placeholder="Rename Table Name" class="table-input-form">`;
        goOn.setAttribute("onclick","toUpdateTableName()");
    }
    else if(getMessage=="seatEdit"){
        let goOn = document.getElementById("go-on");
        titleHeader.textContent="Total Seats";
        warmMessage.innerHTML=`<input type="text" placeholder="No. of Seats" class="table-input-form">`;
        goOn.setAttribute("onclick","updatingSeats()");
    }

}
function updatingSeats(){
    let totalSeats = document.querySelector(".table-input-form");
    let updating={
        "wing_id":`${wingId}`,
        "table_id":`${tableId}`,
        "total_no_seats":`${totalSeats.value}`
    }
    console.log(updating);
    closeModal();
}
function toUpdateTableName(){
    console.log("vijay");
    let renameTableName = document.querySelector(".table-input-form");
    let renameTable={
        "wing_id":`${wingId}`,
        "table_id":`${tableId}`,
        "table_name":`${renameTableName.value}`
    }
    console.log(renameTable);
    axios.put(`http://localhost:5000/wings/${wingId}/${tableId}`,renameTable).then((response)=>{
        console.log(edit_wing_name);
        console.log(response.data);
    })
    closeModal();

}
function toUpdateWing(){
    let renameWingName = document.querySelector(".input-form");
    let renameWing={
        "wing_id":`${edit_wing_name}`,
        "wing_name": `${renameWingName.value}`
      }
    axios.put(`http://localhost:5000/wings/${edit_wing_name}`,renameWing).then((response)=>{
        console.log(edit_wing_name);
        console.log(response.data);
    })
    closeModal();
}
// openModal();
function wingEditing(event){
    let message ="we";
    edit_wing_name=event.target.value;
    openModal(message);
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

function viewTableEdit(event){
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
    // console.dir(event.target.attributes.value.value);
    let tableEvent = event.target.attributes.value.value;
    wingId=event.target.attributes.value.value;
    console.log(wingId);
    axios.get(`http://localhost:5000/wings/${tableEvent}`).then((response)=>{
        let tableList= response.data.tables;
        console.log(tableList);
        let table_lists_body= document.getElementById("table-lists-body");
        table_lists_body.innerHTML="";
        for(let i=0;i<tableList.length;i++){
            createTableList();
            let table_list_sno = document.getElementsByClassName("table-list-sno");
            let table_name = document.getElementsByClassName("table-name");
            let table_seats= document.getElementsByClassName("table-seats");
            let t_edit= document.getElementsByClassName("t-edit");
            let t_del= document.getElementsByClassName("t-del");
            let seatEdit= document.getElementsByClassName("seat-edit");
            table_list_sno[i].textContent=i+1;
            table_name[i].textContent=`${tableList[i].name}`;
            table_seats[i].textContent=`${tableList[i].seats.length}`;
            t_edit[i].setAttribute("value",`${tableList[i].id}`);
            t_del[i].setAttribute("value",`${tableList[i].id}`);
            seatEdit[i].setAttribute("value",`${tableList[i].id}`);

        }


    })


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
        if(seatCount.value>0){
            if(adminCode.value){
                let message ="ut"
               openModal(message);
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

function toUpdateTable(){
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
    closeModal();
    let goOn = document.getElementById("go-on");
    goOn.removeAttribute("onclick");
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
    let tableEdit = document.getElementsByClassName("table-edit")
    sno[i].textContent=i+1;
    wingName[i].textContent=wingList[i].name;
    editBtn[i].setAttribute("value",`${wingList[i].id}`);
    deleteBtn[i].setAttribute("value",`${wingList[i].id}`)
    tableEdit[i].setAttribute("value",`${wingList[i].id}`);
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
    let k = document.createElement("div");
    k.setAttribute("class","table-edit");
    k.setAttribute("onclick","viewTableEdit(event)")
    a.appendChild(k);
    let l = document.createTextNode("+");
    k.appendChild(l);

}
function createTableList(){
                                
    let table_list_body= document.getElementById("table-lists-body");
   let a = document.createElement("div");
   table_list_body.appendChild(a);
   a.setAttribute("class","table-list-names");
   let b = document.createElement("div");
   a.appendChild(b);
   b.setAttribute("class","table-list-sno");
   let c = document.createElement("div");
   a.appendChild(c);
   c.setAttribute("class","table-name");
   let d = document.createElement("div");
   a.appendChild(d);
   d.setAttribute("class","table-seats");
   let e = document.createElement("div");
   a.appendChild(e);
   e.setAttribute("class","table-list-edits");
    let f = document.createElement("div");
    e.appendChild(f);
    f.setAttribute("class","edit-icon")
    let g = document.createElement("button");
    f.appendChild(g);
    g.setAttribute("class","t-edit");
    g.setAttribute("onclick","editingTable(event)");
    let h = document.createElement("div");
    e.appendChild(h);
    h.setAttribute("class","edit-icon");
    let i = document.createElement("button");
    h.appendChild(i);
    i.setAttribute("class","t-del");
    i.setAttribute("onclick","deletingTable(event)");
    let j = document.createTextNode("DEL");
    i.appendChild(j);
    let k = document.createTextNode("EDIT");
    g.appendChild(k);
    let l = document.createElement("div");
    a.appendChild(l);
    l.setAttribute("class","seat-edit");
    l.setAttribute("onclick","seatEditing(event)")
    let m =document.createTextNode("+");
    l.appendChild(m)
//     <div class="table-list-names">
//     <div class="table-list-sno">1</div>
//     <div class="table-name">table1</div>
//     <div class="table-seats">5</div>
//     <div class="table-list-edits">
//         <div class="edit-icon"><button class="t-edit">EDIT</button></div>
//         <div class="edit-icon"><button class="t-del">DEL</button></div>
//     </div>

// </div>
}
function deletingTable(event){
    console.log(event.target.value);
    let deleteID = event.target.value;
    axios.delete(`http://localhost:5000/wings/${wingId}/${deleteID})`).then((response)=>{
        console.log(response.data);
    })
}
function editingTable(event){
    console.log(event.target.value);
    tableId= event.target.value;
    let message = "editTable"
    openModal(message);
}

function wingDeleting(event){
    let message= "wd";
    wing_to_delete = event.target.value;
    openModal(message);
}
 
function deletingWing(){
    console.log(wing_to_delete);
    axios.delete(`http://localhost:5000/wings/${wing_to_delete}`).then((response)=>{
        console.log(response.data);
        let wing_delete_list_body = document.getElementById("wing-delete-list-body");
        wing_delete_list_body.innerHTML="";
        getWings();
        closeModal();
        let goOn = document.getElementById("go-on");
        goOn.removeAttribute("onclick");
    })
}
