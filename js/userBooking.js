let seat = document.getElementsByClassName("seat");
        let row1 = document.getElementById("row1");
        let row2 = document.getElementById("row2");
        let createTable;
        
        axios.get("http://localhost:5500/wings").then((response)=>{
            let wingNameData =response.data;
            let wingData = wingNameData.wing_name;
            wingGenerating(wingData)
        })

        function wingCreation(){ 
           let wings = document.getElementById("wings");
           let a = document.createElement("div");
           a.classList.add("wingName")
           wings.appendChild(a);
           let b= document.createElement("div");
           b.setAttribute("onclick","createRoom(event)")
           b.classList.add("wing_name");
           a.appendChild(b);
           a.setAttribute("onclick","createRoom(event)")
        }      
        
        function wingGenerating(wingData){
            for(i=0;i<wingData.length;i++){
            wingCreation();
            let wings = document.getElementById("wings");
            let wing_name = document.getElementsByClassName("wing_name");
            let wingName = document.getElementsByClassName("wingName")   
            wing_name[i].textContent= wingData[i].name;
            wingName[i].setAttribute("value",`${wingData[i].id}`);
            wing_name[i].setAttribute("value",`${wingData[i].id}`);
                console.log(wingName.length);
                if(wingName.length>4){
                    wings.style.gridTemplateColumns = `repeat(4,auto)`;
                }
                else{
                    wings.style.gridTemplateColumns = `repeat(${wingName.length},auto)`;
                }
            
        }

        }
        function createRoom(value) {
            let nodeValue = value.target.attributes.value.nodeValue
            axios.get(`http://localhost:5500/wings/${nodeValue}`).then((response)=>{
            createTable = response.data;
            wait();
        } )
        }
       
        
        
        function wait() {
            let container= document.querySelector(".container");
            container.innerHTML="";
            for(i=0;i<createTable.no_of_tables;i++){
            edo()
            let a = document.querySelectorAll(".container>div");
            a[i].setAttribute("id",`${createTable.tables[i].name}`);
            a[i].setAttribute("class","arrange");
            vijay(i);
            nameProvider(i);
            }
        }  
        
        
        function vijay(i) {
            let container = document.querySelectorAll(".container>div");
            let a = document.createElement("div");
            a.setAttribute("class","seat");
            let row1= document.querySelector(`#${createTable.tables[i].name}> .row1`);
            let row2= document.querySelector(`#${createTable.tables[i].name}>.row2`);
            for(j=0;j<createTable.tables[i].seats.length;j++){
                if(j%2===0){
                row1.innerHTML+=`<div class="seat"><div>${j+1}</div></div>`;
                }
                else{
                    row2.innerHTML+=`<div class="seat">${j+1}</div>`; 
                }
            }
            row1.style.gridTemplateColumns=`repeat(${row1.childNodes.length},auto)`;
            row2.style.gridTemplateColumns=`repeat(${row2.childNodes.length},auto)`;
            
        }
        
        function edo(){
            let container = document.querySelector(".container");
            let a= document.createElement("div");            
            let b=document.createElement("div");
            a.appendChild(b);
            b.setAttribute("class","row1");
            let c=document.createElement("div");
            c.setAttribute("class","table");
            a.appendChild(c);
            let d=document.createElement("div");
            a.appendChild(d);
            d.setAttribute("class","row2");
            container.appendChild(a);
            let f=document.createElement("div");
            f.setAttribute("class","tableName")
            c.appendChild(f);
            
        }

       function nameProvider(i) {
        let tables = document.getElementsByClassName("tableName");
        tables[i].textContent+=createTable.tables[i].name;
       }