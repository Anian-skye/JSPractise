/**
 * Created by sky on 2018/8/12.
 */



var sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];



var dataOptions = {

    findRegionArry:function(r){
        var regionArr = [];
        for(var i=0,len=r.length;i<len;i++){
            for(value in sourceData){
                if(sourceData[value].region == r[i]||sourceData[value].product == r[i])
                    regionArr.push(sourceData[value]);
            }
        }
        return regionArr;
    },
    getIntersection:function(){
        var dataset = [];

        var regionChecked = checkboxs.getCheckBox(regionDiv);
        var productChecked = checkboxs.getCheckBox(productDiv);
        console.log(regionChecked,productChecked);
        var regionData = dataOptions.findRegionArry(regionChecked);
        var productData = dataOptions.findRegionArry(productChecked);

        console.log(regionData);
        console.log(productData);
        rlen = regionData.length;
        plen = productData.length;
        if(rlen!=0&&plen!=0){
            for(var i=0;i<rlen;i++){
                for(j=0;j<plen;j++){
                    if(regionData[i].region==productData[j].region){
                        dataset.push(productData[j]);
                        productData.splice(j,1);
                        j=0;
                        plen = productData.length;
                    }
                }
            }
        }
        else if(rlen == 0){
            dataset = productData;
        }
        else if(plen ==0){
            dataset = regionData;
        }

        console.log("交集："+dataset);

        return dataset;
    },
    sortData:function(data){
        function compare(a,b){
            if(a.product>b.product)
                return 0;
            else
                return 1;
        }

        data.sort(compare);
        return data;
    },

    getLength:function(data,name){
        var count= 0;
        for(var i=0,len = data.length;i<len;i++){
            if(data[i].product == name)
                count++;
        }
        return count;
    }

};

var tableOptions = {

    table:document.getElementById("sellTable"),

    addSaleTrd:function(proInf,tr){
        for(var j=0,jlen=proInf.sale.length;j<jlen;j++){
                var td = document.createElement("td");
                td.innerHTML = proInf.sale[j];
                tr.appendChild(td);
            }
            this.table.appendChild(tr);

    },

    addTrd:function(proInf){

        for(var i=0,len=proInf.length;i<len;i++){
            var tr = document.createElement("tr");
            var proTd = document.createElement("td");
            proTd.innerHTML = proInf[i].product;
            tr.appendChild(proTd);
            var regTd = document.createElement("td");
            regTd.innerHTML = proInf[i].region;
            tr.appendChild(regTd);
            this.addSaleTrd(proInf[i],tr);
        }
    },

    deleteAllTrd:function(){
        var tr = this.table.getElementsByTagName("tr");
        for(var i=0,len = tr.length;i<len;i++){
            this.table.deleteRow(0);
        }
    },


    addDiverse:function(start,end,len,proInf){
        flag=1;
        for(var i=start;i<end;i++){
            var tr = document.createElement("tr");
            if(flag==1){
                var proTd = document.createElement("td");
                proTd.innerHTML = proInf[i].product;
                proTd.rowSpan = len;
                tr.appendChild(proTd);
                flag=0;
            }

            var regTd = document.createElement("td");
            regTd.innerHTML = proInf[i].region;
            tr.appendChild(regTd);
            this.addSaleTrd(proInf[i],tr);
        }

    },
    addOneMultiTr:function(proInf,len,first,second){
        flag=1;

        for(var i=0,l=proInf.length;i<l;i++){
            var tr = document.createElement("tr");

            if(flag == 1){
                var firstTd = document.createElement("td");
                firstTd.innerHTML = first;
                firstTd.rowSpan = len;
                tr.appendChild(firstTd);
                flag=0;
            }
            var secondTd = document.createElement("td");
            secondTd.innerHTML = second;
            tr.appendChild(secondTd);
            this.addSaleTrd(proInf[i],tr);
        }

    },

    addHeadTr:function(first,second){

        function addmonth(tr){
            for(var i=1;i<=12;i++){
                var td = document.createElement("td");
                td.innerHTML = i+"月";
                tr.appendChild(td);
            }
        }

        var firsttd = document.createElement("td");
        firsttd.innerHTML = first;
        var secondtd = document.createElement("td");
        secondtd.innerHTML = second;

        var headTr = document.createElement("tr");
        headTr.appendChild(firsttd);
        headTr.appendChild(secondtd);
        addmonth(headTr);
        this.table.appendChild(headTr);


    },


    addTrdDepends:function(proInf){
        var regionChecked = checkboxs.getCheckBox(regionDiv);
        var productChecked = checkboxs.getCheckBox(productDiv);
        rlen = regionChecked.length;
        plen = productChecked.length;



        if(rlen > 1 && plen==1){
            this.addHeadTr("商品","地区");
            this.addOneMultiTr(proInf,rlen,proInf[0].product,proInf[0].region);
        }
        else if(rlen==1 && plen>1){
            this.addHeadTr("地区","商品");
            this.addOneMultiTr(proInf,plen,proInf[0].region,proInf[0].product);

        }
        else if(rlen>1&&plen>1){
            this.addHeadTr("商品","地区");

            flag=1;

            proInf = dataOptions.sortData(proInf);
            console.log(proInf);

            phontlen = dataOptions.getLength(proInf,"手机");
            booklen = dataOptions.getLength(proInf,"笔记本");
            audiolen = dataOptions.getLength(proInf,"智能音箱");

            console.log(phontlen,booklen,audiolen);


            this.addDiverse(0,booklen,booklen,proInf);
            this.addDiverse(booklen,booklen+phontlen,phontlen,proInf);
            this.addDiverse(booklen+phontlen,booklen+phontlen+audiolen,audiolen,proInf);

        }
        else{
            this.addHeadTr("商品","地区");
            this.addTrd(proInf);
        }
    }


};



var checkboxs = {
    addBoxs:function(d,arr){

        for(var i=0,len = arr.length;i<len;i++){
            var box = document.createElement("input");
            box.setAttribute("id",arr[i].id);
            box.setAttribute("type","checkbox");
            box.setAttribute("value",arr[i].value);

            var label = document.createElement("label");
            label.setAttribute("for",arr[i].id);
            label.innerHTML = arr[i].value;
            d.appendChild(label);
            d.appendChild(box);
        }
    },
    getCheckBox:function(d){
        var checkBoxs = [];
        var input = d.getElementsByTagName("input");
        for(var i=0,len=input.length;i<len;i++){
            if(input[i].checked == true)
                checkBoxs.push(input[i].value);
        }
        return checkBoxs;
    }
};


var region = document.getElementById("region-radio-wrapper");
checkboxs.addBoxs(region,[{
    id:"east",
    value:"华东"
},{
    id:"north",
    value:"华北"
},{
    id:"sourth",
    value:"华南"
}]);

var product = document.getElementById("product-radio-wrapper");
checkboxs.addBoxs(product,[{
    id:"phone",
    value:"手机"
},{
    id:"note",
    value:"笔记本"
},{
    id:"audio",
    value:"智能音箱"
}]);



var regionDiv = document.getElementById("region-radio-wrapper");
var productDiv = document.getElementById("product-radio-wrapper");

region.addEventListener("click",function(event){
     tableOptions.deleteAllTrd();                   //移除表格中已经存在的所有行
     dataset = dataOptions.getIntersection();       //两组checkbox选中的值取交集(如果其中一组值为空，值等于不为空的集合)
     tableOptions.addTrdDepends(dataset);                  //按照上一步得到的数据集添加行
});


product.addEventListener("click",function(event){
    tableOptions.deleteAllTrd();
    dataset = dataOptions.getIntersection();
    tableOptions.addTrdDepends(dataset);
});
































