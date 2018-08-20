let customers = [1,2,3,4,5];
let ifeRestaurant = new restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});

let waiter = Waiter.getInstance("Tom",1000);
// let waiter2 = Waiter.getInstance("Jack",1000);
// console.log(waiter2);
let cook = Cook.getInstance("Jack",1000);
ifeRestaurant.hire(waiter);
ifeRestaurant.hire(cook);


for(let i=0,len = customers.length;i<len;i++){
    let customer = new Customer;
    let dish = customer.order();         //顾客点餐
    dishInf = waiter.doOrderwork(dish);  //服务员得到点餐信息并返回
    console.log("这是第"+i+"个客户,点菜是"+dishInf.name);
    dishDone = cook.dowork(dishInf);     //点餐信息传给厨师
    waiter.doServerWork(dishDone);       //服务员上菜
    customer.eat(dishDone);              //顾客用餐
}