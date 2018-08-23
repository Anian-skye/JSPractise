/**
 * Created by sky on 2018/8/22.
 */
btn.onclick = (function(){
    var myRest = null;
    return function(){
        btn.style.display = "none";
        // 创建餐厅
        if(myRest === null){
            myRest = restaurantSingleton.getInstance({cash: 1000000,
                seats: 1,
                staff: []});
            // 招收服务员及厨师
            var w = Waiter.getInstance('wyq', '6000');
            var k = Cooker.getInstance('zkz', '8000');
            myRest.hire(w);
            myRest.hire(k);

            var j = 0;
            // 顾客循环函数（一个顾客走了另一个进来，不用for..of 是因为里面涉及计时器会有意想不到的结果）
            function customerLoop(){
                var Xman = new Customer(customers[j]);
                j++;
                console.log("顾客看菜单中...");
                p.innerHTML += "<br>顾客看菜单中...";

                new Promise(function(resolve, reject){
                    // 3秒后向后传递所点菜品
                    setTimeout(function(){
                        resolve(w.getOrder(Xman));
                    }, 3000);
                }).then(async function(foods){
                    // 暂停0.5秒让服务员走过来
                    sleep(500);
                    food_list.innerHTML = "待烹饪菜品：";
                    for (let x of foods){
                        food_list.innerHTML += "<li>"+x.name + "</li>";
                    }
                    console.log("厨师烹饪中...");
                    p.innerHTML += "<br>厨师烹饪中...";
                    // 一道一道菜的来，烹饪、上菜、吃菜
                    for (let food of foods){
                        // 等待这道菜完成后再接着下一道菜
                        await new Promise(function(resolve, reject){
                            // 厨师炒菜
                            let aaa = k.work(food);
                            food_list.removeChild(food_list.firstElementChild);
                            if( food == foods[foods.length-1]){
                                food_list.innerHTML = " ";
                            }
                            setTimeout(() => {
                                foodImg[food.id].setAttribute('class', 'food_done');
                                cookTime.innerHTML = "已完成："+food.name;
                                resolve(aaa);
                            }, aaa.time*1000);
                        }).then(function(r){
                            // 服务员上菜，顾客吃菜
                            w.shangcai(r);
                            Xman.eat(r, foods);
                            // 如果上的不是最后一道菜，那么上菜后立马回到厨房等下道菜
                            if (r !== foods[foods.length-1]){
                                setTimeout(() => {
                                    waiterImg.setAttribute("class", "waiter_to_kitchen");
                                }, 1000);
                            }

                        });
                    }
                    return new Promise(function(resolve){
                        resolve(foods);
                    });
                }).then(function(result){
                    cookerStatus.innerHTML = "空闲";
                    cookTime.innerHTML = " ";
                    // 顾客付完钱后离开餐厅 下个顾客进入
                    if ( Xman.name !== customers[customers.length-1]){
                        /* 因为这部分代码是接在厨师抄完最后一道菜后立刻执行，
                         所以等待8秒让顾客充足吃完饭后放进下一位客人*/
                        setTimeout(() => {
                            console.log("nextOne");
                            customerLoop();
                        }, 8000)
                    }
                })
            };
            // 按下按钮1秒后第一位客人进入店铺
            setTimeout(() => {
                customerLoop()
            }, 1000);
        }
    }
})();