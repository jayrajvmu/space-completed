let seat = document.getElementsByClassName("seat");
        let row1 = document.getElementById("row1");
        let row2 = document.getElementById("row2");
        let createTable;
        // ={
        //     totalTable:4,
        //     tableIds:[
        //         {
        //             tableName:"table1",
        //             seat:17
        //         },
        //         {
        //             tableName:"table2",
        //             seat:4
        //         },
        //         {
        //             tableName:"table3",
        //             seat:4
        //         },
        //         {
        //             tableName:"table4",
        //             seat:7
        //         }
        //     ]
            
        // }
        
        function creativeRoom() {
            let container= document.querySelector(".container");
            container.innerHTML="";
            axios.get("http://localhost:5500/creative").then((response)=>{
            createTable = response.data;
            console.log(response.data);
            wait();
        } )
        }
        function bunkerRoom() {
            let container= document.querySelector(".container");
            container.innerHTML="";
            axios.get("http://localhost:5500/bunker").then((response)=>{
            createTable = response.data;
            console.log(response.data);
            wait();
        } )
        }
        
        
        function wait() {
            for(i=0;i<createTable.totalTable;i++){
            edo()
            let a = document.querySelectorAll(".container>div");
            a[i].setAttribute("id",`${createTable.tableIds[i].tableName}`);
            a[i].setAttribute("class","arrange")
            console.log(a[i]);
            console.log(a.length);
            vijay(i)
            }
        }
            // for(i=0;i<createTable.totalTable;i++){
            // edo()
            // let a = document.querySelectorAll(".container>div");
            // a[i].setAttribute("id",`${createTable.tableIds[i].tableName}`);
            // a[i].setAttribute("class","arrange")
            // console.log(a[i]);
            // console.log(a.length);
            // vijay(i)
            // }
        

        
        function vijay(i) {
            let container = document.querySelectorAll(".container>div");
            console.log(createTable.tableIds[i].seat);
            let a = document.createElement("div");
            a.setAttribute("class","seat");
            let row1= document.querySelector(`#${createTable.tableIds[i].tableName}> .row1`);
            let row2= document.querySelector(`#${createTable.tableIds[i].tableName}>.row2`);
            for(j=0;j<createTable.tableIds[i].seat;j++){
                if(j%2===0){
                row1.innerHTML+=`<div class="seat"></div>`;
                }
                else{
                    row2.innerHTML+=`<div class="seat"></div>`; 
                }
            }
            row1.style.gridTemplateColumns=`repeat(${row1.childNodes.length},auto)`;
            row2.style.gridTemplateColumns=`repeat(${row2.childNodes.length},auto)`
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
        }