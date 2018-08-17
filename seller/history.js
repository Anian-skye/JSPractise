/**
 * Created by sky on 2018/8/17.
 */
function createState(){
    let name = getCheckBoxName();
    var str = "?pro&reg="+name;
    history.pushState({"pro&reg":name}, "", str);
}

function getState(){
    var state = window.location.search;
    state = decodeURIComponent(state);
    return state;
}