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
        price: 100
    },
    {
        name: '麻辣小龙虾',
        cost: 80,
        price: 200
    },
    {
        name: '水煮活鱼',
        cost: 60,
        price: 120
    },
    {
        name: '三鲜汤',
        cost: 8,
        price: 15
    },
    {
        name: '蛋炒饭',
        cost: 6,
        price: 12
    },
    {
        name: '火锅',
        cost: 65,
        price: 150
    }
];


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

    doOrderwork(pos){
        let dish = foodList[pos];
        return dish;
    }

    doServerWork(dish){
        console.log("上菜:"+dish);
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
    dowork(dish){
        console.log("烹饪出菜品:"+dish.name);
        return dish.name;
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
        let dishPos = parseInt(Math.random()*5);
        return dishPos;
    }
    eat(dish){
        console.log("顾客用"+dish+"...用餐完毕");
        return true;
    }
}



// class dishes{
//     constructor(){
//         this.foodList = foodList;
//     }
//     orderDish(pos){
//         return this.foodList[pos];
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






