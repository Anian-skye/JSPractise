let customers = [1,2,3,4,5];
let ifeRestaurant = new restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});

let waiter = Waiter.getInstance("Tom",1000);
let cook = Cook.getInstance("Jack",1000);
ifeRestaurant.hire(waiter);
ifeRestaurant.hire(cook);
let customerList = document.getElementById("customerList");
let money = document.getElementById("money");
money.innerHTML = "目前饭店资金:"+ifeRestaurant.cash;



let i = 0,
    cuslength = customers.length;
TIME = 1000;

function customerIn(){
        waiDiv.style.marginLeft = "100px";
        waiterMess.innerHTML = "顾客正在点餐";
        removeAll();
        menu.innerHTML = "";
        let j=i+1;
        let left = cuslength-j;
        customerList.innerHTML = "还有"+left+"个客户在等待";
        let customer = new Customer();
        let p = new Promise(resolve=>{
            console.log("开始服务第"+j+"个客户");
            customer.done = false;
            customer.id = i;
            resolve(customer);
        });

        p.then(()=>{
            //客户点餐
            return new Promise(resolve=>{
                setTimeout(()=>{
                    resolve(customer.order())
                },3*TIME)
            })
        }).then((menu)=>{
            return new Promise(resolve=>{
                setTimeout(resolve(waiter.doOrderwork(menu)),0.5*TIME)
            });
        }).then(async (dishes)=>{
            console.log("做菜");
            for(dish of dishes){
                await new Promise(resolve=>{
                    setTimeout(()=>{
                        resolve(cook.doCookwork(dish));
                    },dish.time);
                }).then((dish)=>{
                    waiter.doServerWork(dish);
                    customer.eat(dish);
                })
            }
            // return new Promise(resolve=>{
            //     resolve(dishes);
            // });
        }).then(()=>{
            return new Promise(resolve=>{
                setTimeout(()=>{
                    console.log("结账");
                    waiDiv.style.marginLeft = "100px";
                    waiterMess.innerHTML = "顾客正在结账,共消费"+waiter.money;
                    ifeRestaurant.cash+=waiter.money;
                    money.innerHTML = "目前饭店资金:"+ifeRestaurant.cash;
                    resolve();
                },7*TIME);
            });
        }).then(()=>{
            i++;
            if(i<cuslength){
                setTimeout(() => {
                    customerIn();
                }, 8000)
            }
        })
}

customerIn();











// function orderDish(value){
//     return new Promise(resolve =>{
//         setTimeout(()=>{
//             value.order(orderDishCommand);
//             resolve(value);
//         },3000);
//     })
// }
//
// function cookDish(value){
//     return new Promise(resolve =>{
//         setTimeout(()=>{
//             cook.doCookwork(waiter.menu,cookFinishCommand);
//             resolve(value);
//         },500);
//     })
// }
//
// function eatDish(value){
//     return new Promise(resolve=>{
//         value.eat(waiter.dish);
//         if(value.done){
//             resolve(value);
//         }
//     });
// }
//
// function nextCustomer(value){
//     return new Promise(resolve=>{
//         setTimeout(function(){
//             console.log("顾客"+value.id+"结账完毕");
//         },500);
//     })
// }


// finishOrder = p.then(orderDish);
//
// let dishesNum = waiter.menu.length;
//
// promiseList = [];
// for(let i=0;i<dishesNum;i++){
//     let p = new Promise(resolve=>{
//         setTimeout(()=>{
//             cook.doCookwork(waiter.menu[i],cookFinishCommand);
//             resolve(value);
//         },waiter.menu[i].time);
//     });
//     promiseList.push(p);
// }
//
// let finishCook = Promise.all(promiseList);
//
// finishOrder.then(()=>{
//     return finishCook;
// }).then(eatDish)
//     .then(nextCustomer);

// p.then(orderDish)
//     .then(cookDish)
//     .then(eatDish)
//     .then(nextCustomer);



















