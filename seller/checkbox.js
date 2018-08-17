/**
 * Created by sky on 2018/8/17.
 */
let checkboxs = {
    addBoxs:function(d,arr){
        for(var i=0,len = arr.length;i<len;i++){
            var box = document.createElement("input");
            box.setAttribute("id",arr[i].id);
            box.setAttribute("type","checkbox");
            box.setAttribute("value",arr[i].value);
            state = getState();
            if(state.search(arr[i].value)!=-1)
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
    },
    changeChecked:function(d){
        let checkBox = d.getElementsByTagName("input");
        state = getState();
        for(let i=0,len = checkBox.length;i<len;i++){
            console.log(state,checkBox[i].value);
            if(state.search(checkBox[i].value)!=-1)
                checkBox[i].checked = true;
            else
                checkBox[i].checked = false;
        }
    }

};

function getCheckBoxName(){
    let regionChecked = checkboxs.getCheckBox(region);
    let productChecked = checkboxs.getCheckBox(product);
    let result='';

    for(let i=0,len = regionChecked.length;i<len;i++){
        result += regionChecked[i];
    }

    for(let i=0,len = productChecked.length;i<len;i++){
        result += productChecked[i];
    }
    return result;
}