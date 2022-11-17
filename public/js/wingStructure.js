let wing_to_delete; // id of wing to delete
let edit_wing_name; // id of wing to edit
let wingId; // id of wing
let tableId;// id of table viewing or editing
let seatId;// id of seat
let deleteTable;
let tableName;//name of table viewing
let wingName;//name of Wing Viewing;

// in seating Module -> types are listed below
let seatType = ["Empty", "Windows", "Mac"]

//validating user input for creating wing;
//checks of no empty values, not starts with number,not limited to 4characters


function generatingWing() {
    let tableGeneration = document.getElementById("tableGeneration");
    let wingGeneration = document.getElementById("wingGeneration");

    if (+tableGeneration.value > 0 && wingGeneration.value.length > 3 && wingGeneration.value.trim().length > 3) {
        let message = "wc"
        openModal(message);
    }
    else {
        openModal("Enter Correct Value");
    }
}

function creatingWing() {
    let tableGeneration = document.getElementById("tableGeneration");
    let wingGeneration = document.getElementById("wingGeneration");

    let generatingWings = {
        wing_name: `${wingGeneration.value}`,
        wing_total_table: `${tableGeneration.value}`
    }
    console.log(generatingWings);
    axios.post("http://localhost:5000/wings", generatingWings)
        .then(response => {
            console.log(response.data);
            let message = document.getElementById("message1");
            tableGeneration.value = "";
            wingGeneration.value = "";
            message1.innerHTML = response.data.message;
            closeModal();
            let goOn = document.getElementById("go-on");
            goOn.removeAttribute("onclick");
            getWings();
        })
}

//common close modal: (X)->button function in open modal function
function closeModal() {
    let modalContainer = document.querySelector(".modal-container");
    let message = title;
    modalContainer.style.display = "none";
}
function seatEditing(event) {
    console.log(event.target.attributes.value.value);
    tableId = event.target.attributes.value.value
    // openModal("seatEdit");
    goBackward("seatList")
    viewseatList();
    getSeatList();
}
function getSeatList() {
    axios.get(`http://localhost:5000/wings/${wingId}`).then((response) => {
        console.log(response.data.tables);        
        for (i = 0; i < response.data.tables.length; i++) {
            if (response.data.tables[i].id == tableId) {
                let title_edit_header = document.getElementById("title-edit-header");
                title_edit_header.textContent=wingName +" > "+response.data.tables[i].name;
                tableName=response.data.tables[i].name;
                createSeatingList(response.data.tables[i].seats)
            }
        }
    })
}
function createSeatingList(seatData) {
    console.log(seatData.length);
    let seat_lists_body = document.getElementById("seat-lists-body");
    seat_lists_body.innerHTML = "";
    for (i = 0; i < seatData.length; i++) {
        createSeatList();
        let seat_list_sno = document.getElementsByClassName("seat-list-sno");
        let seat_name = document.getElementsByClassName("seat-name");
        let seat_contain = document.getElementsByClassName("seat-contain");
        let s_edit = document.getElementsByClassName("s-edit");
        let s_del = document.getElementsByClassName("s-del");

        seat_list_sno[i].textContent = i + 1;
        seat_name[i].textContent = `${seatData[i].name}`;
        seat_contain[i].textContent = `${seatType[seatData[i].type]}`;
        s_edit[i].setAttribute("value", `${seatData[i].id}`);
        s_del[i].setAttribute("value", `${seatData[i].id}`);
    }
}
function openModal(message) {
    let modalContainer = document.querySelector(".modal-container");
    let titleHeader = document.getElementById("title");
    let warmMessage = document.getElementById("warn-message");
    let modalIconButton = document.querySelector(".modal-btn");
    let getMessage = message;
    modalContainer.style.display = "block";
    modalIconButton.style.display = "grid";


    if (getMessage == "wc") {
        // creatingWing(contents);
        titleHeader.textContent = "Action Requied";
        warmMessage.innerHTML = "Are you Sure ?";
        let goOn = document.getElementById("go-on");
        goOn.setAttribute("onclick", "creatingWing()");

    }
    else if (getMessage == "wd") {
        titleHeader.textContent = "Action Requied";
        warmMessage.innerHTML = "Are you Sure ?";
        let goOn = document.getElementById("go-on");
        goOn.setAttribute("onclick", "deletingWing()");
    }
    else if (getMessage == "ut") {
        titleHeader.textContent = "Action Requied";
        warmMessage.innerHTML = "Are you Sure ?";
        let goOn = document.getElementById("go-on");
        goOn.setAttribute("onclick", "toUpdateTable()");
    }
    else if (getMessage == "we") {
        let goOn = document.getElementById("go-on");
        titleHeader.textContent = "Wing Name";
        warmMessage.innerHTML = `<input type="text" placeholder="Rename Wing" class="input-form">`;
        goOn.setAttribute("onclick", "toUpdateWing()");
    }
    else if (getMessage == "editTable") {
        let goOn = document.getElementById("go-on");
        titleHeader.textContent = "Table Name";
        warmMessage.innerHTML = `<input type="text" placeholder="Rename Table" class="table-input-form">`;
        goOn.setAttribute("onclick", "toUpdateTableName()");
    }
    else if (getMessage == "seatEdit") {
        let goOn = document.getElementById("go-on");
        titleHeader.textContent = "Add Seats";
        warmMessage.innerHTML = `<input type="number" placeholder="No. of Seats" class="table-input-form">`;
        goOn.setAttribute("onclick", "updatingSeats()");
    }
    else if (getMessage == "addTable") {
        let goOn = document.getElementById("go-on");
        titleHeader.textContent = "Add Table";
        warmMessage.innerHTML = `<input type="number" placeholder="No of Table" class="table-input-form">`;
        goOn.setAttribute("onclick", "addingTable()");
    }
    else if (getMessage == "deleteTable") {
        titleHeader.textContent = "Action Requied";
        warmMessage.innerHTML = "Are you Sure ?";
        let goOn = document.getElementById("go-on");
        goOn.setAttribute("onclick", "tableDeleting()");
    }
    else if (getMessage == "Enter Correct Value") {
        titleHeader.textContent = "Action Requied";
        warmMessage.innerHTML = getMessage;
        modalIconButton.style.display = "none";
    }
    else if (getMessage == "Enter atleast 4 Character") {
        titleHeader.textContent = "Action Requied";
        warmMessage.innerHTML = getMessage;
        modalIconButton.style.display = "none";
    }
    else if (getMessage == "Enter Value") {
        titleHeader.textContent = "Action Requied";
        warmMessage.innerHTML = getMessage;
        modalIconButton.style.display = "none";
    }
    else if (getMessage == "Starts with Alphabet") {
        titleHeader.textContent = "Action Requied";
        warmMessage.innerHTML = getMessage;
        modalIconButton.style.display = "none";
    }
    else if (getMessage == "Table name should not contain spaces") {
        titleHeader.textContent = "Action Requied";
        warmMessage.innerHTML = getMessage;
        modalIconButton.style.display = "none";
    }
    else if (getMessage == "addSeat") {
        let goOn = document.getElementById("go-on");
        titleHeader.textContent = "Add Seat";
        warmMessage.innerHTML = `<input type="number" placeholder="No of Seats" class="table-input-form">`;
        goOn.setAttribute("onclick", "addingSeat()");
    }
    else if (getMessage == "editSeat") {
        let goOn = document.getElementById("go-on");
        titleHeader.textContent = "Edit Seat";
        warmMessage.innerHTML = `<select class="table-input-form">
        <option value="0">Empty</option>
        <option value="1">Window</option>
        <option value="2">Mac</option>
      </select>`;
        goOn.setAttribute("onclick", "addingSeatType()");
    }
    //Enter atleast 4 Character

}
function addingSeatType(){
    let newType = document.querySelector(".table-input-form");

    let seat = {
        "table_id": `${tableId}`,
        "seat_id":`${seatId}`,
        "type": `${newType.value}`
      }
    console.log(seat);
    closeModal();
    axios.put("http://localhost:5000/wings/updateSeat", seat).then((response) => {
        console.log(response.data);
    })
    getSeatList();
}

function addingSeat() {
    let newSeat = document.querySelector(".table-input-form");

    let seat = {
        "table_id": `${tableId}`,
        "total_no_seats": `${newSeat.value}`,
        "created_by": 1
    }
    console.log(seat);
    closeModal();
    axios.post("http://localhost:5000/wings/addseat", seat).then((response) => {
        console.log(response.data);
    })
    getSeatList();
}

function addingNewSeats() {
    openModal("addSeat")
}
function addingTable() {
    let newTable = document.querySelector(".table-input-form");
    let table = {
        "wing_id": `${wingId}`,
        "wing_total_table": `${newTable.value}`,
        "created_by": 1
    }
    console.log(table);
    closeModal();
    axios.post("http://localhost:5000/wings/addtable", table).then((response) => {
        console.log(response.data);
    })
    rearrangeTableList();
}
function updatingSeats() {
    let totalSeats = document.querySelector(".table-input-form");
    let updating = {
        "table_id": `${tableId}`,
        "total_no_seats": `${totalSeats.value}`,
        "created_by": 1
    }
    console.log(updating);
    axios.put("http://localhost:5000/wings/addseat", updating).then((response) => {
        console.log(response.data);
    })
    closeModal();
    rearrangeTableList();
}


//to Rename Table - getting User Input
function toUpdateTableName() {

    let renameTableName = document.querySelector(".table-input-form");
    if (renameTableName.value.trim().split(" ").length == 1) {
        if (renameTableName.value.trim().length > 2) {
            if (+renameTableName.value.split("")[0] == `${renameTableName.value.split("")[0]}`) {
                openModal("Starts with Alphabet");
            }
            else {
                let renameTable = {
                    "wing_id": `${wingId}`,
                    "table_id": `${tableId}`,
                    "table_name": `${renameTableName.value.trim()}`
                }
                console.log(renameTable);
                axios.put(`http://localhost:5000/wings/updateTable`, renameTable).then((response) => {
                    console.log(renameTable);
                    console.log(response.data);
                    openModal();
                    let titleHeader = document.getElementById("title");
                    let warmMessage = document.getElementById("warn-message");
                    titleHeader.textContent = "Table Updated";
                    warmMessage.innerHTML = response.data.message;
                    let modalIconButton = document.querySelector(".modal-btn");
                    modalIconButton.style.display = "none";
                })
                closeModal();
                rearrangeTableList();
            }
        }
        else {
            openModal("Enter atleast 4 Character");
        }

    }


    else {
        openModal("Table name should not contain spaces");
    }



}
//to update wing
function toUpdateWing() {
    let renameWingName = document.querySelector(".input-form");
    if (renameWingName.value.trim() != "") {
        if (renameWingName.value.length > 2) {
            let checking = renameWingName.value.trim().split("")[0];
            console.log(typeof (+checking));
            console.log(+checking);
            console.log(checking);
            let renameWing = {
                "wing_id": `${edit_wing_name}`,
                "wing_name": `${renameWingName.value.trim()}`
            }
            axios.put(`http://localhost:5000/wings/updateWing`, renameWing).then((response) => {
                console.log(renameWing);
                console.log(response.data);
                openModal();
                let titleHeader = document.getElementById("title");
                let warmMessage = document.getElementById("warn-message");
                titleHeader.textContent = "Wing Updated";
                warmMessage.innerHTML = response.data.message;
                let modalIconButton = document.querySelector(".modal-btn");
                modalIconButton.style.display = "none";

            })
            closeModal();
            getWings();

        }
        else {
            openModal("Enter atleast 4 Character")
        }
    }
    else {
        openModal("Enter Value");
    }

}
// to rename wing
function wingEditing(event) {
    let message = "we";
    edit_wing_name = event.target.value;
    openModal(message);
}


//geting event to get seats in particular table selected;

function viewTables(event){
    viewTableEdit();
    let tableEvent = event.target.attributes.value.value;
    wingId = event.target.attributes.value.value;
    console.log(wingId);
    axios.get(`http://localhost:5000/wings/${tableEvent}`).then((response) => {
        let title_edit_header = document.getElementById("title-edit-header");
        title_edit_header.textContent=response.data.name;
        wingName=response.data.name;
        rearrangeTableList();
    })
}
//opening table listing and blocking other viewable modules
function viewTableEdit() {
    let tableEditModule = document.getElementById("tableEditModule");
    let wingEditModule = document.getElementById("wingEditModule");
    let wingCreationModule = document.getElementById("wingCreationModule");
    let seatEditModule = document.getElementById("seatEditModule");
    let backIcon = document.getElementById("backIcon");
    let styling = window.getComputedStyle(tableEditModule, null);
    let displaying = styling.getPropertyValue("display");
    if (displaying === "none") {
        tableEditModule.style.display = "block";
        wingEditModule.style.display = "none";
        wingCreationModule.style.display = "none";
        seatEditModule.style.display = "none";
    }
    else {
        tableEditModule.style.display = "none";

    }
    backIcon.style.display="flex";
    goBackward("tableList");
}

//opening wing listing and blocking other viewable modules
function viewwingEditModule() {
    let tableEditModule = document.getElementById("tableEditModule");
    let wingContainerM = document.getElementById("wingContainerM")
    let wingCreationModule = document.getElementById("wingCreationModule");
    let wingEditModule = document.getElementById("wingEditModule");
    let backIcon = document.getElementById("backIcon");
    let backward = document.querySelector("#backIcon>i");
    let seatEditModule = document.getElementById("seatEditModule");
    let title_edit_header = document.getElementById("title-edit-header");

    let styling = window.getComputedStyle(wingEditModule, null);
    let displaying = styling.getPropertyValue("display");

    if (displaying === "none") {
        wingEditModule.style.display = "block";
        wingCreationModule.style.display = "none";
        tableEditModule.style.display = "none";
        seatEditModule.style.display = "none";
        wingContainerM.style.display="none";
        backIcon.style.display="flex";
        title_edit_header.textContent="Wing List";
        backward.style.display="none";
    }
    else {
        wingEditModule.style.display = "none";

    }

}
//opening Wing Creation and blocking other viewable modules
function viewWingCreation() {
    let tableEditModule = document.getElementById("tableEditModule");
    let wingCreationModule = document.getElementById("wingCreationModule");
    let wingEditModule = document.getElementById("wingEditModule");
    let seatEditModule = document.getElementById("seatEditModule");
    let styling = window.getComputedStyle(wingCreationModule, null);
    let displaying = styling.getPropertyValue("display");
    if (displaying === "none") {
        wingEditModule.style.display = "none";
        wingCreationModule.style.display = "block";
        tableEditModule.style.display = "none";
        seatEditModule.style.display = "none";
    }
    else {
        wingCreationModule.style.display = "none";
    }
}

//opening seat listing and blocking other viewable modules
function viewseatList() {
    let tableEditModule = document.getElementById("tableEditModule");
    let wingCreationModule = document.getElementById("wingCreationModule");
    let wingEditModule = document.getElementById("wingEditModule");
    let seatEditModule = document.getElementById("seatEditModule");
    let styling = window.getComputedStyle(wingCreationModule, null);
    let displaying = styling.getPropertyValue("display");
    if (displaying === "none") {
        wingEditModule.style.display = "none";
        wingCreationModule.style.display = "none";
        tableEditModule.style.display = "none";
        seatEditModule.style.display = "block";
    }
    else {
        seatEditModule.style.display = "none";
    }
}

//sending data to backend for updating table
function toUpdateTable() {
    let updateWSTable = {
        tValue: `${tableId.value}`,
        sValue: `${seatCount.value}`,
        avalue: `${adminCode.value}`,
    }
    console.log(updateWSTable);
    axios.put('http://localhost:5000/wings', updateWSTable)
        .then(response => {
            console.log(response.data)
            tableId.value = "";
            seatCount.value = "";
            adminCode.value = "";
        })
        .catch((err) => {
            console.log(err);
        });
    axios.get('http://localhost:5000/updated').then(
        response => {
            message2.textContent = response.data;
            console.log(response.data);
        }
    )
    closeModal();
    let goOn = document.getElementById("go-on");
    goOn.removeAttribute("onclick");
    rearrangeTableList();
}

// getting wing List (pre load)
getWings();
function getWings() {
    goBackward("wingList");
    axios.get("http://localhost:5000/wings").then((response) => {
        let wing_delete_list_body = document.getElementById("wing-delete-list-body");
        wing_delete_list_body.innerHTML = "";
        let wingList = response.data.wing_name;
        for (i = 0; i < wingList.length; i++) {
            createWingList();
            let sno = document.getElementsByClassName("sno");
            let wingName = document.getElementsByClassName("wing-name");
            let editBtn = document.getElementsByClassName("w-edit");
            let deleteBtn = document.getElementsByClassName("w-del");
            let tableEdit = document.getElementsByClassName("table-edit")
            sno[i].textContent = i + 1;
            wingName[i].textContent = wingList[i].name;
            editBtn[i].setAttribute("value", `${wingList[i].id}`);
            deleteBtn[i].setAttribute("value", `${wingList[i].id}`)
            tableEdit[i].setAttribute("value", `${wingList[i].id}`);
        }
    })

}

//wing list template
function createWingList() {

    let wing_delete_list_body = document.getElementById("wing-delete-list-body");

    let a = document.createElement("div");
    wing_delete_list_body.appendChild(a);
    a.setAttribute("class", "wing-delete-list-names");
    let b = document.createElement("div");
    a.appendChild(b);
    b.setAttribute("class", "sno");
    let c = document.createElement("div");
    a.appendChild(c);
    c.setAttribute("class", "wing-name");
    let d = document.createElement("div");
    a.appendChild(d);
    d.setAttribute("class", "wing-edit");
    let e = document.createElement("div");
    d.appendChild(e);
    e.setAttribute("class", "edit-icon");
    let f = document.createElement("button");
    e.appendChild(f);
    f.setAttribute("class", "w-edit");
    f.setAttribute("onclick", "wingEditing(event)");
    let g = document.createTextNode("EDIT")
    f.appendChild(g);
    let h = document.createElement("div");
    d.appendChild(h);
    h.setAttribute("class", "edit-icon");
    let i = document.createElement("button")
    h.appendChild(i);
    i.setAttribute("class", "w-del")
    i.setAttribute("onclick", "wingDeleting(event)");
    let j = document.createTextNode("DEL");
    i.appendChild(j);
    let k = document.createElement("div");
    k.setAttribute("class", "table-edit");
    k.setAttribute("onclick", "viewTables(event)")
    a.appendChild(k);
    let l = document.createTextNode("<>");
    k.appendChild(l);

}
//Table list Template
function createTableList() {

    let table_list_body = document.getElementById("table-lists-body");
    let a = document.createElement("div");
    table_list_body.appendChild(a);
    a.setAttribute("class", "table-list-names");
    let b = document.createElement("div");
    a.appendChild(b);
    b.setAttribute("class", "table-list-sno");
    let c = document.createElement("div");
    a.appendChild(c);
    c.setAttribute("class", "table-name");
    let d = document.createElement("div");
    a.appendChild(d);
    d.setAttribute("class", "table-seats");
    let e = document.createElement("div");
    a.appendChild(e);
    e.setAttribute("class", "table-list-edits");
    let f = document.createElement("div");
    e.appendChild(f);
    f.setAttribute("class", "edit-icon")
    let g = document.createElement("button");
    f.appendChild(g);
    g.setAttribute("class", "t-edit");
    g.setAttribute("onclick", "editingTable(event)");
    let h = document.createElement("div");
    e.appendChild(h);
    h.setAttribute("class", "edit-icon");
    let i = document.createElement("button");
    h.appendChild(i);
    i.setAttribute("class", "t-del");
    i.setAttribute("onclick", "deletingTable(event)");
    let j = document.createTextNode("DEL");
    i.appendChild(j);
    let k = document.createTextNode("EDIT");
    g.appendChild(k);
    let l = document.createElement("div");
    a.appendChild(l);
    l.setAttribute("class", "seat-edit");
    l.setAttribute("onclick", "seatEditing(event)")
    let m = document.createTextNode("<>");
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


//seat list Template

function createSeatList() {
    let seat_list_body = document.getElementById("seat-lists-body");
    let a = document.createElement("div");
    seat_list_body.appendChild(a);
    a.setAttribute("class", "seat-list-names");
    let b = document.createElement("div");
    a.appendChild(b);
    b.setAttribute("class", "seat-list-sno");
    let c = document.createElement("div");
    a.appendChild(c);
    c.setAttribute("class", "seat-name");
    let d = document.createElement("div");
    a.appendChild(d);
    d.setAttribute("class", "seat-contain");
    let e = document.createElement("div");
    a.appendChild(e);
    e.setAttribute("class", "seat-list-edits");
    let f = document.createElement("div");
    e.appendChild(f);
    f.setAttribute("class", "edit-icon")
    let g = document.createElement("button");
    f.appendChild(g);
    g.setAttribute("class", "s-edit");
    g.setAttribute("onclick", "editingSeat(event)");
    let h = document.createElement("div");
    e.appendChild(h);
    h.setAttribute("class", "edit-icon");
    let i = document.createElement("button");
    h.appendChild(i);
    i.setAttribute("class", "s-del");
    i.setAttribute("onclick", "deletingSeat(event)");
    let j = document.createTextNode("DEL");
    i.appendChild(j);
    let k = document.createTextNode("EDIT");
    g.appendChild(k);
}
//call to edit seat for editing type of seat
function editingSeat(event) {
    seatId = event.target.value;
    openModal("editSeat");
}

//delete seating-> proceeding to delete
function deletingSeat(event) {
    seatId = event.target.value;
    axios.delete(`http://localhost:5000/wings/deleteSeat/${seatId}`).then(
        (response) => {
            console.log(response.data.message);
            getSeatList();
        }
    )
}
//request for delete table
function deletingTable(event) {
    console.log(event.target.value);
    deleteTable = event.target.value;
    let message = "deleteTable";
    openModal(message)

}
//Table delete -> after confirm proceeding to delete
function tableDeleting() {
    axios.delete(`http://localhost:5000/wings/deletetable/${wingId}/${deleteTable}`).then((response) => {
        console.log(response.data);
        let titleHeader = document.getElementById("title");
        let warmMessage = document.getElementById("warn-message");
        titleHeader.textContent = "Table Deleted";
        warmMessage.innerHTML = response.data.message;
        let modalIconButton = document.querySelector(".modal-btn");
        modalIconButton.style.display = "none";
    })
    rearrangeTableList();
}
//proceeding to edit table
function editingTable(event) {
    console.log(event.target.value);
    tableId = event.target.value;
    let message = "editTable"
    openModal(message);
}
//requesting to proceed delete wing
function wingDeleting(event) {
    let message = "wd";
    wing_to_delete = event.target.value;
    openModal(message);
}
//delete wing -> proceeding to delete
function deletingWing() {
    console.log(wing_to_delete);
    axios.delete(`http://localhost:5000/wings/${wing_to_delete}`).then((response) => {
        console.log(response.data);
        let wing_delete_list_body = document.getElementById("wing-delete-list-body");
        wing_delete_list_body.innerHTML = "";
        getWings();

        let titleHeader = document.getElementById("title");
        let warmMessage = document.getElementById("warn-message");
        titleHeader.textContent = "Wing Deleted";
        warmMessage.innerHTML = response.data.message;
        let modalIconButton = document.querySelector(".modal-btn");
        modalIconButton.style.display = "none";

    })
}
//add table icon function => opening modal to get input
function addNewTable() {
    openModal("addTable");
}
// get table list
function rearrangeTableList() {
    axios.get(`http://localhost:5000/wings/${wingId}`).then((response) => {
        let tableList = response.data.tables;
        console.log(tableList);
        let table_lists_body = document.getElementById("table-lists-body");
        table_lists_body.innerHTML = "";
        if (tableList) {
            for (let i = 0; i < tableList.length; i++) {
                createTableList();
                let table_list_sno = document.getElementsByClassName("table-list-sno");
                let table_name = document.getElementsByClassName("table-name");
                let table_seats = document.getElementsByClassName("table-seats");
                let t_edit = document.getElementsByClassName("t-edit");
                let t_del = document.getElementsByClassName("t-del");
                let seatEdit = document.getElementsByClassName("seat-edit");
                table_list_sno[i].textContent = i + 1;
                table_name[i].textContent = `${tableList[i].name}`;
                table_seats[i].textContent = `${tableList[i].seats.length}`;
                t_edit[i].setAttribute("value", `${tableList[i].id}`);
                t_del[i].setAttribute("value", `${tableList[i].id}`);
                seatEdit[i].setAttribute("value", `${tableList[i].id}`);

            }
        }



    })
}
//back icon button
function goBackward(value){
    let backIcon = document.getElementById("backIcon");
    let backward = document.querySelector("#backIcon>i");
    let title_edit_header = document.getElementById("title-edit-header");
    if(value == "seatList"){
        backward.setAttribute("onclick","viewTableEdit()");
        backward.style.display="block";
        // title_edit_header.textContent=wingName + ">" +tableName;
    }
    if(value == "tableList"){
        backward.setAttribute("onclick","viewwingEditModule()");
        backward.style.display="block";
        title_edit_header.textContent=wingName;
    }
    if(value == "wingList"){
        title_edit_header.textContent="Wing List";
        backward.style.display="none";
    }

}

