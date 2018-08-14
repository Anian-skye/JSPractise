/**
 * Created by sky on 2018/8/13.
 */


var rect = {


    set:function(array){
        this._data = array;
     },
    get:function(){
        return this._data;
    },

    draw:function(svg,start,color="blue",max){

        var array = this.get();

        console.log(max);


        var svgNS = "http://www.w3.org/2000/svg";
        var xaxis = document.createElementNS(svgNS,"line");
        var yaxis = document.createElementNS(svgNS,"line");

        xaxis.setAttribute("x1",0);
        xaxis.setAttribute("x2",800);
        xaxis.setAttribute("y1",300);
        xaxis.setAttribute("y2",300);
        xaxis.setAttribute("stroke","rgb(99,99,99)");
        xaxis.setAttribute("stroke-width","5");
        svg.appendChild(xaxis);

        yaxis.setAttribute("x1",0);
        yaxis.setAttribute("x2",0);
        yaxis.setAttribute("y1",0);
        yaxis.setAttribute("y2",300);
        yaxis.setAttribute("stroke","rgb(99,99,99)");
        yaxis.setAttribute("stroke-width","5");
        svg.appendChild(yaxis);

        var lastx;

        var rectWidth = 500/max[0];

        for(var i=0,len = array.length;i<len;i++){
            var h = (array[i]/max[1])*250;
            h = parseInt(h);
            var x = start+i*(rectWidth+2);
            var rect = document.createElementNS(svgNS,"rect");
            rect.setAttribute("x",x);
            rect.setAttribute("y",300-h);
            rect.setAttribute("width",rectWidth);
            rect.setAttribute("height",h);
            rect.setAttribute("fill",color);
            svg.appendChild(rect);
            lastx = x;
        }
        return lastx;

    },
    clear:function(svg){

        var elements = svg.childNodes;
        console.log(elements);

        for(var i=0,len = elements.length;i<len;i++){
            svg.removeChild(svg.childNodes[0]);
        }
    }

};




























