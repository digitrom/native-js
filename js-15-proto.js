// __proto__ | prototype

class Car {
    constructor(brand, maxSpeed) {
        this.brand = brand
        this.maxSpeed = maxSpeed
    }

    engineStart() {
        console.log(`Start ${this.brand}`)
    }

    engineStop = () => {
        console.log(`Start ${this.brand}`)
    }
}

const car1 = new Car('bmw', 220)
const car2 = new Car('opel', 240)
const car3 = new Car('bmw', 220)

console.log('car1', car1)
console.log('car2', car2)

// т.к. метод engineStart() создан с помощью function declaration, то он записывается в [[Prototype]] т.е
// он будет доступен для всех экземпляров класса Car
//а т.к. engineStop() - создан с помощью стрелочной функции, будет для каждого экземпляра новый, что не рекомендуется
// т.к. создается в оперативной памяти новый метод
//  пример наследования в гейм деве: Там использует ООП - т.е. все состоит из объектов. есть лес а в нем много деревьев и листьев.
//  И каждый лист движется. Функцию, отвечающую за движение листа создают с помощью function declaration (а не стрелочной)
//  т.е. записывается в класс. иначе для каждого листа создадуться отдельные функции и игра будет весить весить во много рпз больше
// во frontend это не особо актуально, так как мы не будем рендерить список на 1000 элементов, поэтому можно создавать с помощью => функции

console.log('1', car1 === car2) // false - т.к .разные ссылки на объект
console.log('2', car1 === car3) // false - т.к .разные ссылки на объект
console.log('3', {} === {}) // false - т.к .разные ссылки на объект
console.log('4', car1.brand === car2.brand) // false -  car1.brand - св-во, в котором значение примитив, а примитивы сравниваются по значениям, а не по ссылке
console.log('5', car1.brand === car3.brand) // true -//-
console.log('6', car1.engineStop === car3.engineStop) // false - car1 и car3 это разные объекты, а метод engineStop создан
// с помощью стрелочной функции ->  будет для каждого экземпляра новый
console.log('7', car1.engineStart === car3.engineStart) // true - а метод engineStart создан
// с помощью function declaration ->  будет для каждого экземпляра 1 и тот же

//=====================================================================================

                                      // __proto__ | prototype

// __proto__ - ЭТО ССЫЛКА НА PROTOTYPE(объект внутри class-а) ТОГО CLASS-a С ПОМОЩЬЮ КОТОРОГО ДАННЫЙ ОБЪЕКТ( INSTANCE) БЫЛ СОЗДАН
// __proto__ - есть у каждого объекта, а prototype  - у функции контсруктора и  class

//  prototype - это объект, который является св-м  класса или функции конструктора



console.log(car1.__proto__ === Car.prototype) // скрытое св-во __proto__  ссылается на prototype того класса, с помощью которого был создал этот Instance
//стелочные функции не имеют своего prototype, потому что с помощью нее мы не можем создавать новые инстансы,
// а только с помощью функции конструктора и class
const a = new String('a')
console.log(a.__proto__ === String.prototype) // a  хоть и строка, но это объект(т.к. в  js все объекты),
// который  был создан с помощью класса  String
const b = 24
console.log(b.__proto__ === Number.prototype)

console.log(a.__proto__ === String.prototype )
console.log(a.__proto__.__proto__ === Object.prototype) // это тоже самое что код ниже..
console.log(String.prototype.__proto__ === Object.prototype)

console.log(Object.prototype.__proto__) // будет null, так как объект не имеет родителя Js и все создается из обхектов в JS

const arr1 = [] // под капотом литерала массива происходит создания массива через class new Array()
const arr2 = new Array() // то же что и код выше

console.log(Object.__proto__ === Function.prototype) //true т.к Object - это class, а Class это функция
console.log(Function.prototype.__proto__ === Object.prototype)
console.dir(Function.prototype.__proto__) // class Object

console.log(Array.__proto__ === Function.prototype) // true т.к. Array это  class, а class это функция
console.log(Array.__proto__.__proto__ === Function.prototype.__proto__) //true

console.dir(Array.__proto__.__proto__) // будет Object, потому что Array это  class, а class это функция, а функция
// создается с помощью class Function, который в свою очередь создается через class Object - высшая точка в иерархии создания в JS
// -> следовательно...
console.dir(Array.__proto__.__proto__.__proto__) // ...будет Object, потому что Array это  class, а class это функция, а функция

const s = new Number(3);
console.dir(s)
//Number
// [[Prototype]]:Number
//constructor : ƒ Number()
// toExponential : ƒ toExponential()
// toFixed :ƒ toFixed()
// toLocaleString : ƒ toLocaleString()
// toPrecision : ƒ toPrecision()
// toString : ƒ toString()
// valueOf :ƒ valueOf()
// [[Prototype]]:Object
// constructor :ƒ Object()
// hasOwnProperty: ƒ hasOwnProperty()
// isPrototypeOf:ƒ isPrototypeOf()
// propertyIsEnumerable:ƒ propertyIsEnumerable()
// toLocaleString:ƒ toLocaleString()
// toString:ƒ toString()
// valueOf :ƒ valueOf()
// __defineGetter__:ƒ __defineGetter__()
// __defineSetter__:ƒ __defineSetter__()
// __lookupGetter__:ƒ __lookupGetter__()
// __lookupSetter__ : ƒ __lookupSetter__()
// __proto__ :(...)
// get __proto__:ƒ __proto__()
// set __proto__ : ƒ __proto__()
// [[PrimitiveValue]] :0
// [[PrimitiveValue]]: 3

// т.е. это объект у которого есть св-во [[PrimitiveValue]]: 3
// и когда мы создаем через литерал const s = 3, то под капотом мы создаем через new Number, и это объект, который ведет
    //себя как примитив
//=============================================================

//задачки

const q = []
const w = new Array()

console.log(q.prototype === w.prototype)// true, потому что у массивов НЕТ prototype, значит q.prototype - undefined,
    //соответственно w.prototype тоже, и undefined === undefine - true

console.log(q.__proto__ === w.__proto__) // true, потому что proto ссылается на prototype класса, с помощью которог был
// создан  массив, а это Array в обоих случаях

console.log(q.__proto__ === Object.prototype) // false так как q массив, созданный с помощью класса Array


const e = new Object()
console.log({}.__proto__ === e.__proto__) // true, когда мы запишем просто {} не присваивая к переменной мы тоже
// тоже сроздаем новый объект, но так как мы не сахранили сслыку он после создания удалится сборщиком мусора потому что
// на него ниего не ссылается. Но в момент когда мы пишем {}.__proto__ мы обращаемся к св-ву __proto__ объекта {} - который на
// на данный момент сушествует
// а объекты создаются с помощью   class-а new Object()


class CarClass {
    constructor(brand, maxSpeed) {
        this.brand = brand
        this.maxSpeed = maxSpeed
    }

    engineStart() {
        console.log(`Start ${this.brand}`)
    }

    engineStop = () => {
        console.log(`Start ${this.brand}`)
    }
}

class SuperCar extends CarClass {

}

const car5 = new CarClass('bmw', '240')
const car6 = new SuperCar()

console.log(car5.__proto__ === car6.__proto__) // false true так как у car6 __proto__ ссылается на prototype класса SuperCar
console.log(car5.__proto__ === car6.__proto__.__proto__) //true так как у car6 1-ое __proto__ ссылается на prototype класса SuperCar,
// а уже второе класс от которого экстендится - CarClass

console.log(car6.__proto__.__proto__.__proto__ === Object.prototype) // true  так как
// car6.__proto__ - ссылка на prototype SuperCar
// car6.__proto__.__proto__ - ссылка на prototype Car
// car6.__proto__.__proto__.__proto__ - ссылка на Object.prototype так как  у Car есть свой  prototype, это обычный объект который создан с помощью класса New Object()


//РЕЗЮМИРУЕМ
//ВСЕ В JS  - ОБЪЕКТЫ
//ССЫЛКА __proto__ ЕСТЬ У КАЖДОГО ОБЪЕКТА => ИЗ КАКОГО-ТО КЛАССА ИЛИ ФУНКЦИИ КОНМСТРУКТОРА ОНИ СОЗДАНЫ И ЭТА ССЫЛКА
//  __proto__ БУДЕТ ССЫЛАТЬСЯ НА ИХ PROTOTYPE, КОТОРЫЙ ЯВЛЯЕТСЯ ОБЪЕКТОМ ,СОЗДАННЫМ КЛАССОМ OBJECT
// А КОГДА МЫ ЭКСТЕНДИМСЯ МЫ ССЫЛКУ __proto__ ПЕРЕЗАТИРАЕМ ТЕМ ПРОТОТИПОМ ОТ КЛАССА КТОРОГО МЫ ЭКСТЕНДИМСЯ
