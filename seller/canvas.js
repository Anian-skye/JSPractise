/**
 * Created by sky on 2018/8/13.
 */


var pointLine={

    set:function(array,color){
        this._data = array;
        this._lineColor = color;
    },
    get:function(){
        return this._data;
    },
    draw:function(c){

        var array = this.get();
        c.style.border = "none";
        var ctx=c.getContext("2d");

        ctx.beginPath();
        ctx.lineWidth="5";
        ctx.strokeStyle="rgb(99,99,99)";
        ctx.moveTo(0,300);
        ctx.lineTo(300,300);
        ctx.stroke(); // 进行绘制

        ctx.beginPath();
        ctx.strokeStyle="rgb(99,99,99)";
        ctx.moveTo(0,0);
        ctx.lineTo(0,300);
        ctx.stroke(); // 进行绘制

        var maxNum = Math.max.apply(Math,array);

        var beforex,beforey

        for(var i=0,len = array.length;i<len;i++){
            var x = 30+i*20;
            var y = (array[i]/maxNum)*250;
            y = 300-y;
            ctx.beginPath();
            ctx.arc(x,y,5,0,Math.PI*2,true);
            ctx.fillStyle = this._lineColor;
            ctx.fill();

            if(i>0){
                ctx.beginPath();
                ctx.moveTo(beforex,beforey);
                ctx.lineTo(x,y);
                ctx.strokeStyle=this._lineColor;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            beforex = x;
            beforey = y;

        }

    },

    clear:function(c){

        var ctx=c.getContext("2d");
        ctx.clearRect(0,0,c.width,c.height);

    }

};









