

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
        let message = document.getElementById("message");
        tableGeneration.value="";
        wingGeneration.value="";
        message.innerHTML = response.data.message ;
    })
}