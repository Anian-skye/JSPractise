/**
 * Created by sky on 2018/8/16.
 */
let dataOptions = {

    findRegionArry:function(r){
        let regionArr = [];
        readData.getLocalData();
        sourceData = readData.localData;
        for(let i=0,len=r.length;i<len;i++){
            for(value in sourceData){
                if(sourceData[value].region == r[i]||sourceData[value].product == r[i])
                    regionArr.push(sourceData[value]);
            }
        }
        return regionArr;
    },
    getIntersection:function(){
        let dataset = [];
        let regionChecked = checkboxs.getCheckBox(region);
        let productChecked = checkboxs.getCheckBox(product);
        let regionData = dataOptions.findRegionArry(regionChecked);
        let productData = dataOptions.findRegionArry(productChecked);


        rlen = regionData.length;
        plen = productData.length;
        if(rlen!=0&&plen!=0){
            for(let i=0;i<rlen;i++){
                for(let j=0;j<plen;j++){
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


        return dataset;
    },
    sortData:function(data,name){
        function compare(a,b){
            if(a[name]>b[name])
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
    },
    getData:function(tr){
        tds = tr.childNodes;
        var data = [];
        for(let i=0,len = tds.length;i<len;i++){
            let input = tds[i].getElementsByTagName("input")[0];
            if(input){
                data.push(input.value);
            }

        }
        return data;
    },

    getRectData:function(dataset){
        var rectData = [];
        for(var i=0,len = dataset.length;i<len;i++){
            var sale = dataset[i].sale;
            for(var j=0;j<12;j++){
                if(!rectData[j])
                    rectData[j]=[];
                rectData[j].push(sale[j]);
            }
        }

        return rectData;
    },

    getMax:function(dataset){
        var maxy = -1;
        var maxx = 0;
        for(var i=0,ilen = dataset.length;i<ilen;i++){
            for(var j=0,jlen = dataset[i].length;j<jlen;j++){
                maxx++;
                if(dataset[i][j]>maxy)
                    maxy = dataset[i][j];
            }
        }
        var max = [maxx,maxy];
        return max;
    }

};
