let tableOptions = {

    table:document.getElementById("sellTable"),

    addSaleTrd:function(proInf,tr){
        for(let j=0,jlen=proInf.sale.length;j<jlen;j++){
            let td = document.createElement("td");
            tr.appendChild(td);
            this.addInput(td,proInf.sale[j]);
        }
        this.table.appendChild(tr);
    },
    deleteAllTrd:function(){
        var tr = this.table.getElementsByTagName("tr");
        for(var i=0,len = tr.length;i<len;i++){
            this.table.deleteRow(0);
        }
    },

    addItem:function(proInf,first,second){

        //先添加第一行
        let lastInfo = proInf[0][first];
        let row = 1;
        let lastTr = document.createElement("tr");
        let rtd = document.createElement("td");
        rtd.innerHTML = proInf[0][second];
        lastTr.appendChild(rtd);
        this.addSaleTrd(proInf[0],lastTr);

        //循环添加中间的内容
        for(let i=1,len=proInf.length;i<len;i++){
            let tr = document.createElement("tr");
            if(lastInfo==proInf[i][first]){
                row++;
            }
            else{
                let firstTd = document.createElement("td");
                firstTd.rowSpan = row;
                firstTd.innerHTML = lastInfo;
                tds = lastTr.getElementsByTagName("td");
                lastTr.insertBefore(firstTd,tds[0]);
                lastInfo = proInf[i][first];
                row = 1;
                lastTr = tr;
            }
            let secondTd = document.createElement("td");
            secondTd.innerHTML = proInf[i][second];
            tr.appendChild(secondTd);
            this.addSaleTrd(proInf[i],tr);
        }
        //合并最后一种商品
        let proTd = document.createElement("td");
        proTd.rowSpan = row;
        proTd.innerHTML = lastInfo;
        tds = lastTr.getElementsByTagName("td");
        lastTr.insertBefore(proTd,tds[0]);



    },


    addInput:function(td,content){
        let input = document.createElement("input");
        let changeButton = document.createElement("button");
        changeButton.setAttribute("class","change");
        let save = document.createElement("button");
        save.setAttribute("class","save");
        save.innerHTML = "save";
        save.style.display = "none";
        input.setAttribute("value",content);
        input.disabled = true;
        td.appendChild(input);
        td.appendChild(changeButton);
        td.appendChild(save);
        let name1,name2;

        function getName(){          //需要判断该行第一列是否是合并的单元格
            let tr = td.parentNode;
            let tds = tr.getElementsByTagName("td");
            name1 = tds[0].innerHTML;
            name2 = tds[1].innerHTML;
            let theName = name2;
            name2 = name1;
            console.log(name1,name2);
            while(theName.length>10){
                tr = tr.previousSibling;
                let thisTds = tr.getElementsByTagName("td");
                theName = thisTds[1].innerHTML;
                name1 = thisTds[0].innerHTML;
            }
            console.log(name1,name2);
        }

        changeButton.addEventListener("click",function(){
            input.disabled = false;
            input.focus();
            changeButton.style.display = "none";
            save.style.display = "inline-block";
            save.style.padding = "0 0";
            save.style.fontSize = "8px";
        });

        save.addEventListener("click",function(){
            save.style.display = "none";
            changeButton.style.display = "inline-block";
            tr = save.parentNode.parentNode;
            getName();
            console.log(name1,name2);
            inputValue = input.value;
            inputValue = parseInt(inputValue);
            if(isNaN(inputValue)){
                alert("输入错误");
            }
            else{
                value = dataOptions.getData(tr);
                if(myStorage[name1+","+name2]!=undefined){
                    myStorage.setItem(name1+","+name2,value);
                }
                else if(myStorage[name2+","+name1]!=undefined){
                    myStorage.setItem(name2+","+name1,value);
                }
            }
        })
    },


    addHeadTr:function(first,second){
        function addmonth(tr){
            for(let i=1;i<=12;i++){
                let td = document.createElement("td");
                td.innerHTML = i+"月";
                tr.appendChild(td);
            }
        }

        let firsttd = document.createElement("td");
        firsttd.innerHTML = first;
        let secondtd = document.createElement("td");
        secondtd.innerHTML = second;

        let headTr = document.createElement("tr");
        headTr.setAttribute("class","head");
        headTr.appendChild(firsttd);
        headTr.appendChild(secondtd);
        addmonth(headTr);
        this.table.appendChild(headTr);
    },


    addTrdDepends:function(proInf){
        let regionChecked = checkboxs.getCheckBox(region);
        let productChecked = checkboxs.getCheckBox(product);
        rlen = regionChecked.length;             //获取每个模块选择的个数
        plen = productChecked.length;


        if(plen>rlen&&plen!=1){
            this.addHeadTr("地区","商品");
            proInf = dataOptions.sortData(proInf,"region");
            this.addItem(proInf,"region","product");
        }
        else if(plen<=rlen&&rlen!=1){
            this.addHeadTr("商品","地区");
            proInf = dataOptions.sortData(proInf,"product");                //排序，让相同的商品条目靠近
            this.addItem(proInf,"product","region");
        }
        else if(plen==0&&rlen==1){
            this.addHeadTr("地区","商品");
            proInf = dataOptions.sortData(proInf,"region");
            this.addItem(proInf,"region","product");
        }
        else if(plen==1&&rlen==0){
            this.addHeadTr("商品","地区");
            proInf = dataOptions.sortData(proInf,"product");                //排序，让相同的商品条目靠近
            this.addItem(proInf,"product","region");
        }
        else if(plen==1&&rlen==1){
            this.addHeadTr("商品","地区");
            proInf = dataOptions.sortData(proInf,"product");                //排序，让相同的商品条目靠近
            this.addItem(proInf,"product","region");
        }
    }

};


