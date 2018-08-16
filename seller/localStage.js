/**
 * Created by sky on 2018/8/16.
 */
let readData = {

    localData:[],

    initData:function(){

        myStorage.clear();

        for(let i=0,len=originData.length;i<len;i++){
            let key = originData[i].product+","+originData[i].region;
            myStorage.setItem(key,originData[i].sale);
        }

    },

    stringToArray:function(s){
        let array = [];
        ss = s.split(",")
        for(let i=0,len=ss.length;i<len;i++){
            array.push(parseInt(ss[i]));
        }
        return array;

    },

    getLocalData:function(){
        this.localData = [];
        for(let i=0,len = myStorage.length;i<len;i++){
            let key = myStorage.key(i);
            let value = myStorage.getItem(key);
            let item = {};
            key = key.split(",");

            item.product = key[0];
            item.region = key[1];
            item.sale = this.stringToArray(value);
            this.localData.push(item);
        }
    }

};
