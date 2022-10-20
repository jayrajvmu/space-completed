function generatingWing() {
    let tableGeneration = document.getElementById("tableGeneration");
    let wingGeneration = document.getElementById("wingGeneration");
    
    let generatingWings={
        wing_name:`${tableGeneration.value}`,
        wing_total_table:`${wingGeneration.value}`
    }
    generatingWings5=JSON.stringify(generatingWings);
    console.log(generatingWings5);
    axios.post("http://localhost:5500/wingGeneration",generatingWings)
    .then(response =>{
        console.log(response.data);
        let message = document.getElementById("message");
        let text = response.data;
        tableGeneration.value="";
        wingGeneration.value="";
        message.innerHTML = "Success or Failure" ;

    })
}