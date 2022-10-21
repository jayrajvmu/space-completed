let seat = document.getElementsByClassName("seat");
        let row1 = document.getElementById("row1");
        let row2 = document.getElementById("row2");
        let createTable;
        
        
        function cafeRoom() {
            let container= document.querySelector(".container");
            container.innerHTML="";
            axios.get("http://localhost:5500/cafe").then((response)=>{
            createTable = response.data;
            wait();
        } )
        }
        function creativeRoom() {
            let container= document.querySelector(".container");
            container.innerHTML="";
            axios.get("http://localhost:5500/creative").then((response)=>{
            createTable = response.data;
            wait();
        } )
        }
        function bunkerRoom(1) {
            let container= document.querySelector(".container");
            container.innerHTML="";
            axios.get("http://localhost:5500/bunker").then((response)=>{
            createTable = response.data;
            wait();
        } )
        }
       
        
        
        function wait() {
            for(i=0;i<createTable.no_of_tables;i++){
            edo()
            let a = document.querySelectorAll(".container>div");
            a[i].setAttribute("id",`${createTable.tables[i].name}`);
            a[i].setAttribute("class","arrange");
            console.log(a[i]);
            console.log(a.length);
            vijay(i);
            nameProvider(i);
            }
        }        

        
        function vijay(i) {
            let container = document.querySelectorAll(".container>div");
            console.log(createTable.tables[i].seats.length);
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