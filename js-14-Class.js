//===================================================== 1 ==========================================================
1. Фабричная функция:
function createCar(brand, maxSpeed) {
    const car = {
        brand: brand,
        maxSpeed: maxSpeed,
        startEngine() {
            console.log(`${this.brand} is started`)
        }
    }
    return car
}

const bmw = createCar('bmw', 220);
const audi = createCar('audi', 240)

console.log(bmw.startEngine())
console.log(audi.startEngine())

console.log(bmw)

//======================================================= 2 ========================================================
//2. Функция конструктор:
function Car(brand, maxSpeed) {
    // {} внутри функции конструктор при вызове через New создается новый объект и мы через this обращаемся к этому объекту
    this.brand = brand // и создаем св-во бренд
    this.maxSpeed = maxSpeed
    this.startEngine = function() {
        console.log(`${this.brand} is started`)
    }
}

const car1 = new Car('bmw', 220) //создаем 1-ый инстанс(экзэмпляр) нашего объекта
const car2 = new Car('audi', 240) //создаем 2-ой инстанс нашего объекта

car1.startEngine()
car2.startEngine()
// здесь есть проблема: для каждого инстанса в памяти создается новая функция  - это плохо
// нужно чтобы создавалась 1 функция для всех инстансов, поэтому нужно записывать функцию в prototype:

Car.prototype.startEngine = function() {
    console.log(`${this.brand} is started`)
}
// теперь каждый объект имеет ссылку на Car.prototype и там можно достучаться до этой функции - в памяти она создается 1 раз
car1.startEngine()
car2.startEngine()

console.log(car1)
console.log(car2)

//Car.prototype оторван от остального кода, поэтому придумали Class - синтаксический сахар над функцией конструктором


//=============================================== 3 =================================================================
// 3. Class

class Car {
    //{} опять - внутри Class-а при вызове через New всегда создается новый объект и мы через this обращаемся к этому объекту и создаем инстанс
    constructor(brand, maxSpeed) {
        this.brand = brand
        this.maxSpeed = maxSpeed
    }
    startEngine () {
        console.log(`${this.brand} is started`)
        // создавать эти методы внутри мы должны с помощью function declaration - запишется в объект prototype,
        // и соответсвенно по ссылке он будет доступен для каждого экзэмпляра класса
        // если стрелка - то startEngine() будет создаваться для каждого объекта свой в памяти , потому что стрелочная функция
        // берет this  из внешнего scope , а это будет {} - всегда новый объект - каждый раз будет записываться в новый объект
    }
}

const car1 = new Car('bmw', 220) //создаем 1-ый инстанс(экзэмпляр) нашего объекта
const car2 = new Car('audi', 240) //создаем 2-ой инстанс нашего объекта

// car1.startEngine()
// car2.startEngine()

console.log(car1)
console.log(car2)