/**
 * Created by sky on 2018/8/12.
 */



let originData = [{
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




let myStorage = localStorage;


if(myStorage.length===0){
    readData.initData();
}

// readData.initData();
readData.getLocalData();
let sourceData = readData.localData;





var checkboxs = {
    addBoxs:function(d,arr){

        for(var i=0,len = arr.length;i<len;i++){
            var box = document.createElement("input");
            box.setAttribute("id",arr[i].id);
            box.setAttribute("type","checkbox");
            box.setAttribute("value",arr[i].value);
            box.checked = true;

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




function randomColor(){
    return '#'+Math.floor(Math.random()*0xffffff).toString(16);
}


var graphOptions = {

    drawOneLine:function(data,c){
        var color = randomColor();
        pointLine.clear(c);
        pointLine.set(data,color);
        pointLine.draw(c);
    },

    drawMutiline:function(data,c){
        pointLine.clear(c);
        this.clearSpan();
        for(let i=0,len=data.length;i<len;i++){
            var color = randomColor();
            this.addSpan(data[i],color);
            var sale = data[i].sale;
            pointLine.set(sale,color);
            pointLine.draw(c);
         }

    },

    drawMutiRect:function(dataset,c){
        var data = dataOptions.getRectData(dataset);

        var max = dataOptions.getMax(data);

        var lastx = 0;
        rect.clear(svg);
        var rectWidth = 700/max[0];
        rect.set(data[0]);
        lastx = rect.draw(svg,lastx+2,color,max);
        for(var i=1,len = data.length;i<len;i++){
            var color = randomColor();
            rect.set(data[i]);
            lastx = rect.draw(svg,lastx+(rectWidth+2),color,max);
        }
    },
    clearSpan:function(){
        var spans = graphDiv.getElementsByTagName("span");
        for(var i=0,len = spans.length;i<len;i++){
            if(spans[0]!=undefined)
                graphDiv.removeChild(spans[0]);
        }
    },
    addSpan:function(data,color){
        var span = document.createElement("span");
        span.innerHTML = data.product +","+data.region;
        span.style.color = color;
        graphDiv.appendChild(span);
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
var graphDiv = document.getElementById("graphSpan");
var c=document.getElementById("myCanvas");
var svg = document.getElementById("rectSvg");




function drawAll(){
    tableOptions.deleteAllTrd();                   //移除表格中已经存在的所有行
    dataset = dataOptions.getIntersection();       //两组checkbox选中的值取交集(如果其中一组值为空，值等于不为空的集合)
    if(dataset.length>0)
    {
        graphOptions.drawMutiRect(dataset,c);
        graphOptions.drawMutiline(dataset,c);
        tableOptions.addTrdDepends(dataset);                  //按照上一步得到的数据集添加行
    }
}

drawAll();




region.addEventListener("click",drawAll);


product.addEventListener("click",drawAll);


let table = tableOptions.table;

table.addEventListener("mouseover",function(event){
     let par = event.target.parentNode;
     if(par.getAttribute("class")==null){
         let data = dataOptions.getData(par);
         while(data.length == 0){
             par = par.parentNode;
             data = dataOptions.getData(par);
         }

         maxSale=Math.max(...data);
         rect.clear(svg);
         rect.set(data);
         rect.draw(svg,5,"blue",[17,maxSale]);
         graphOptions.clearSpan();
         graphOptions.drawOneLine(data,c);
     }
});

table.addEventListener("mouseout",function(event){

    var tar = event.target;
    if(tar.getAttribute("id")=="sellTable")
    {
        tableOptions.deleteAllTrd();                   //移除表格中已经存在的所有行
        dataset = dataOptions.getIntersection();       //两组checkbox选中的值取交集(如果其中一组值为空，值等于不为空的集合)
        if(dataset.length>0)
        {
            graphOptions.drawMutiRect(dataset,c);
            graphOptions.drawMutiline(dataset,c);
            tableOptions.addTrdDepends(dataset);                  //按照上一步得到的数据集添加行
        }
    }

});






























