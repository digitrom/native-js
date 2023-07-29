//this

//this - это сылка на объект
// this нам нужен, когда нам нужно сделать вызов какого-то метода или функции

// 1.Global Scope
// 2. Function, arrow function () => {}
// 3. Call, apply, bind
// 4. Function constructor
// 'use strict'
//=============================================== 1 ===============================================================

// console.log(this)
// console.log(this === window)

//=============================================== 2 ===============================================================

// const foo = () => {
//     console.log(this)
// }
//
// foo()

// function bar() {
//     const foo = () => {
//         console.log(this)
//     }
//     foo()
// }
// bar()

// const user = {
//     nickname: 'Alex',
//     showName: ()=> {
//         console.log(this.nickname)
//     }
// }
//
// user.showName()


// const car = {
//     brand: 'bmw',
//     showBrand() {
//         const foo = () => {
//             console.log(this.brand)
//         }
//         foo()
//     }
// }
// car.showBrand()

//
// const car = {
//     brand: 'bmw'
// }
//
// const car1 = {
//     brand: 'opel'
// }
//
// function showBrand() {
//     console.log(this.brand)
// }
//
// car.show = showBrand // передали ссылку на функции в каждый объект
// car1.show = showBrand //  передали ссылку на функции в каждый объект
//
// car.show()
// car1.show()
//
// showBrand()

// bmw, opel

//====================================================  3  =========================================================

// const car1 = {
//     brand: 'bmw',
//     showBrand() {
//         console.log(this.brand)
//     }
// }
// const car2 = {
//     brand: 'opel',
// }
// car1.showBrand.call(car2)
// car1.showBrand.apply(car2)
// // car1.showBrand.bind(car2)()
// const a = car1.showBrand.bind(car2)
// a()

//метод  call() явно указывает

// const car1 = {
//     brand: 'bmw',
//     showBrand(a, b) {
//         console.log(this.brand + a + b)
//     }
// }
//
// const car2 = {
//     brand: 'opel',
// }
// // car1.showBrand.call(car2, 1, 2)
// car1.showBrand.apply(car2, [1, 3]) // - отличие apply от call что в аргументы передается массив а не просто переменные
// const a = car1.showBrand.bind(car2, 1, 4)();
// //opel14

// если метод или функция созданы с помощью синтаксиса стрелочной функции  - методы  call apply bind не работаеют
// const car1 = {
//     brand: 'bmw',
//     showBrand:() => {
//         console.log(this.brand)
//     }
// }
//
// const car2 = {
//     brand: 'opel',
// }
//
// car1.showBrand.call(car2) // undefined, потому что  это 'стрелка', будет ссылаться на глбальный объект Window
//     //(так как 'стрелка ищет контекст снаружи, на уровень выше, от того, где она проинициализирована' - т.е. Window),
//     // а в объекте Window нету такого св-ва brand, и значит контекст теряется и  call не привязывает другой контекст

// const car1 = {
//     brand: 'bmw',
//     showBrand(){
//         console.log(this.brand)
//     }
// }
//
// const car2 = {
//     brand: 'opel'
// }
//
// const scooter = {
//     brand: 'suzuki'
// }
//
// car1.showBrand.bind(scooter).call(car2)
//     //будет suzuki, так как мы можем только 1 раз привязать контекст, все остальные привязки будут проигнорированы



// const car1 = {
//     brand: 'bmw',
//     showBrand() {
//         console.log(this.brand);
//     }
// }
//
// car1.showBrand()
// // будет 'bmw'
//
// const car2 = {
//     brand: 'opel',
// }
//
// car2.show = car1.showBrand
//
// car2.show()
// // будет 'opel'


// const car1 = {
//     brand: 'opel'
// }
//
// const car2 = {
//     brand: 'opel'
// }
//
// function showBrand() {
//     console.log(this.brand)
// }
//
// car1.showBrand = showBrand
// car2.showBrand = showBrand
//
// car1.showBrand()
// car2.showBrand()



//===================================================== 4  =========================================================

// function Car(carBrand) {
//     //this
//     this.brand = carBrand
//     //return this
// }
//
// const car1 = new Car('bmw')
// const car2 = new Car('opel')
// console.log(car1.brand)
// console.log(car2.brand)

// const car = {
//     brand: 'bmw',
//     showBrand() {
//         console.log(this.brand)
//     }
// }
//
// setTimeout(()=> car.showBrand(), 1000) //'bmw'
// setTimeout(car.showBrand, 1000) // undefined
// setTimeout(car.showBrand.bind(car), 1000) // 'bmw'

// const car = {
//     brand: 'ferrari',
//     color: 'red',
//     showColor() {
//         return `Car color is ${this.color}`
//     },
//     showBrand: () => {
//         return `Car brand is ${this.brand}`
//     }
// }
//
// console.log(car.showColor())
// // 'Car color is red' так как showColor() это  function declaration и мы смотрим на момент вызова, где
// // слева от точки стоит car, соответсвенно ищет this в этом окружении
// console.log(car.showBrand())
// //Car brand is undefined так как стреочная функция и this  будет опредалятся в момент создания и будет браться из
// //вышестоящего лексического окружения - т.е. это будет Window, у которого нету такого свойства как brand

// const car = {
//     color: 'red',
//     firstShowColor() {
//         console.log('1', this.color)
//     },
//     secondShowColor:() =>{
//         console.log('2', this.color)
//     },
//     thirdShowColor() {
//         (() => {
//             console.log('3', this.color)
//         })()
//     }
// }
//
// console.log(car.firstShowColor())
// console.log(car.secondShowColor())
// console.log(car.thirdShowColor() )


const car = {
    brand:'bmw',
    showBrand() {
        console.log(this.brand)
    }
}
setTimeout(() => car.showBrand(), 1000)
setTimeout(car.showBrand.bind(car), 1000)




