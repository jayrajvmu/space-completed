function updateTable() {
    let tableId=document.getElementById("tableId");
    let seatCount = document.getElementById("seatCount");
    let adminCode = document.getElementById("adminCode");

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
    e =>{
        console.log(e.data);
    }
   )
}
