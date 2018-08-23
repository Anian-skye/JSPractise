/**
 * Created by sky on 2018/8/20.
 */
// 餐厅类
// 属性：金钱，座位数量、职员列表
// 方法：招聘职员，解雇职员
// 职员类
// 属性：ID，姓名，工资
// 方法：完成一次工作
// 服务员类，继承自职员
// 完成一次工作：如果参数是个数组，则记录客人点菜，如果参数不是数组则是上菜行为
// 厨师类，继承自职员
// 完成一次工作：烹饪出菜品
// 顾客类
// 方法：点菜，吃
// 菜品类
// 属性：名字、烹饪成本、价格

let foodList = [
    {
        name: '清蒸螃蟹',
        cost: 50,
        price: 100,
        time:2000
    },
    {
        name: '麻辣小龙虾',
        cost: 80,
        price: 200,
        time:3000
    },
    {
        name: '水煮活鱼',
        cost: 60,
        price: 120,
        time:2000
    },
    {
        name: '三鲜汤',
        cost: 8,
        price: 15,
        time:1000,
    },
    {
        name: '蛋炒饭',
        cost: 6,
        price: 12,
        time:1000
    },
    {
        name: '火锅',
        cost: 65,
        price: 150,
        time:1500
    }
];

let cusDiv = document.getElementById("customer");
let waiDiv = document.getElementById("waiter");
let cooDiv = document.getElementById("cook");
let cookStatus = document.getElementById("cookStatus");
let eatStatus = document.getElementById("eatStatus").getElementsByTagName("table")[0];
let menuDiv = document.getElementById("menu");
let waiterMess = document.getElementById("waiterMess");





function addItem(name,status){
    let tr = document.createElement("tr");
    let nameTd = document.createElement("td");
    nameTd.innerHTML = name;
    let statusTd = document.createElement("td");
    statusTd.innerHTML = status;
    tr.appendChild(nameTd);
    tr.appendChild(statusTd);
    eatStatus.appendChild(tr);
}

function removeAll(){
    let trs = eatStatus.getElementsByTagName("tr");
    for(let i=0,len = trs.length;i<len;i++){
        eatStatus.removeChild(trs[0]);
    }
}


class restaurant{
    constructor(resObj){
        this.cash = resObj.cash;
        this.seats = resObj.seat;
        this.staff = resObj.staff;
    }
    hire(employee){
        let id = this.staff.length+1;
        employee.id = id;
        this.staff.push(employee.id);
    }
    fire(employee){
        let id = employee.id;
        let index = this.staff.indexOf(id);
        this.staff.splice(index,1);
    }
}

class Employee{
    constructor(name,salary){
        this.name = name;
        this.salary = salary;
    }

    dowork(){
        console.log(this.name+"已经完成了一次工作");
    }
}

class Waiter extends Employee{

    constructor(name,salary){
        super(name,salary);
        this.instance = null;
    }

    doOrderwork(dishes){
        removeAll();
        let menu = [];
        let menuName = [];
        for(let i=0,len = dishes.length;i<len;i++){
            menu.push(foodList[dishes[i]]);
            menuName.push(foodList[dishes[i]].name)
        }
        console.log("点餐完毕正在通知后厨,顾客点餐有："+dishes.join(","));
        waiterMess.innerHTML = "点餐完毕正在通知后厨";
        waiDiv.style.marginLeft = "700px";
        this.menu = menu;
        menuDiv.innerText = "顾客点了:"+menuName.join(",");
        for(let dish of menu){
            addItem(dish.name,"未上菜");
        }
        this.countMoney(menu);
        return menu;
    }


    countMoney(dishes){
        this.money = 0;
        for(let dish of dishes){
            this.money += dish.price;
        }
    }

    doServerWork(dish){
        if(dish){
            console.log("上菜:"+dish.name+"完成品");
            this.dish = dish;
            return dish;
        }

    }

    static getInstance(name,salary) {
        if(!this.instance) {
            this.instance = new Waiter(name,salary);
        }
        return this.instance;
    }

}

class Cook extends Employee{

    constructor(name,salary){
        super(name,salary);
        this.instance = null;
    }
    doCookwork(dish){


        console.log("烹饪出菜品"+dish.name+"耗时"+dish.time);

        for (let i = dish.time/1000; i > 0; i--){
            setTimeout(function(){
                cookStatus.innerHTML = "正在烹饪"+dish.name+"。还剩"+(dish.time-i*1000)/1000+"秒做完";
            }, i*1000);
        }

        return dish;

    }

    static getInstance(name,salary) {
        if(!this.instance) {
            this.instance = new Cook(name,salary);
        }
        return this.instance;
    }

}


class Customer{
    order(){
        let number = parseInt(Math.random()*4)+1;
        let dishes = new Set();
        for(let i=0;i<number;i++){
            let dishPos = parseInt(Math.random()*4)+1;
            while(dishes.has(dishPos)){
                dishPos = parseInt(Math.random()*4)+1;
            }
            dishes.add(dishPos);
        }
        dishes = [...dishes];
        this.dishesNum = dishes.length;
        this.currentNum = 0;
        return dishes;
    }
    eat(dish){
        setTimeout(()=>{
            setTimeout(()=>{
                waiDiv.style.marginLeft = "100px";
                waiterMess.innerHTML = "上菜"+dish.name;
                setTimeout(()=>{
                    waiDiv.style.marginLeft = "700px";
                    waiterMess.innerHTML = "等待下一个菜";
                },0.5*TIME);
                console.log("顾客用"+dish.name);
                for (let i = 3; i > 0; i--){
                    setTimeout(function(){
                        //eatStatus.innerHTML = "顾客正在食用"+dish.name+"。还剩"+(3000-i*1000)/1000+"秒用餐完毕";
                        let trs = eatStatus.getElementsByTagName("tr");
                        for(let tr of trs){
                            let tds = tr.getElementsByTagName("td");
                            if(tds[0].innerHTML==dish.name){
                                tds[1].innerHTML="正在食用";
                                if(tds[2]){
                                    tds[2].innerHTML = "还剩"+(3000-i*1000)/1000+"秒";
                                }
                                else{
                                    let timeTd = document.createElement("td");
                                    timeTd.innerHTML ="还剩"+(3000-i*1000)/1000+"秒";
                                    tr.appendChild(timeTd);
                                }
                            }
                        }


                    }, i*1000);
                }
            },3*TIME);
        },0.5*TIME);
    }
}



//命令模式
// class OrderDishCommand{                          //将菜单当做一个命令对象
//     constructor(waiter){
//         this.receiver = waiter;
//     }
//     execute(pos){
//         let dish = this.receiver.doOrderwork(pos,this.giveDishInfCommand);
//     }
// }
//
//
// class CookFinishCommand{
//     constructor(waiter,waiterServerCommand){
//         this.receiver = waiter;
//         this.forCommand = waiterServerCommand
//     }
//     execute(dishes,waiterServerCommand){
//         this.receiver.doServerWork(dishes,this.forCommand);
//     }
// }
//
// class WaiterServerCommand{
//     constructor(customer){
//         this.receiver = customer;
//     }
//     execute(dish){
//         this.receiver.eat(dish);
//     }
// }




// let ifeRestaurant = new restaurant({
//     cash: 1000000,
//     seats: 20,
//     staff: []
// });
//
// let newCook = new cook("Tony", 10000);
// ifeRestaurant.hire(newCook);
//
// console.log(ifeRestaurant.staff);
//
// ifeRestaurant.fire(newCook);
// console.log(ifeRestaurant.staff);






