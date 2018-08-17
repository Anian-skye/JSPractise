/**
 * Created by sky on 2018/8/16.
 */


function setHash(name){
    location.hash = name;
}

function getCheckBoxName(){
    let regionChecked = checkboxs.getCheckBox(region);
    let productChecked = checkboxs.getCheckBox(product);
    let result='';

    for(let i=0,len = regionChecked.length;i<len;i++){
        console.log(regionChecked[i]);
        result += regionChecked[i];
    }

    for(let i=0,len = productChecked.length;i<len;i++){
        result += productChecked[i];
    }
    return result;
}



// function changeCheck(hashname){
//     let checkbox = region.getElementsByTagName("input");
//     for(let i=0,len = checkbox.length;i<len;i++){
//         if(hashname.search(checkbox[i].value)){
//             checkbox[i].checked = true;
//         }
//         else{
//             checkbox[i].checked = false;
//         }
//     }
//     checkbox = product.getElementsByTagName("input");
//     for(let i=0,len = checkbox.length;i<len;i++){
//         if(hashname.search(checkbox[i].value)){
//             checkbox[i].checked = true;
//         }
//         else{
//             checkbox[i].checked = false;
//         }
//     }
//
//
//
//
// }

