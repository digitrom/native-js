// 1. метод массива sort сортирует строки "из коробки", т.е. без доп. параметров
const name1 = ['Bob', 'Alex', 'Zoi', 'Jim']
console.log(name1.sort())

// 2. соритрует строки типа по "алфавиту" (unicode)
const name2 = ['Donald', 'aLex', 'Alex', 'aleX', 'Рома', 'андрей']
console.log(name2.sort())

console.log(name1)
// 3. работает мутабельно - сортирует массив на месте, изменяя исходный его (не делает копию)

console.log(name1.sort() === name1) //true
// 4. возращает ссылку на исходный массив

const numbers = [1000, 4, 22, 1, 680, 99, -1]
console.log(numbers.sort()) // по дефолту сортирует по unicode

// 5. Сортировка цифр. Необходимо передавать функцию сравнения (callback) в параметр sort
const compareFunc = (a, b) => { // по возрастанию
     // > 0 - надо переставить
    // <= 0 - порядок не меняем
    if (a > b) {
        return 999 // функция должна вернуть любое положительное число. Почему так? Так решили разработчики функции!
    } else {
        return -1 // функция должна вернуть любое отрицатльное число
    }
}

const compareFunc = (a, b) => a - b // то же самое что и код выше, но короче!

console.log(numbers.sort(compareFunc))

// 6. Функция сравнения должна  возращать число > или < 0
// Если функция сравнения возращает положиельное число, то метод переходит к след.
//  двум цифрам, если отрицательное - то меняет местами

// 7. Изменить порядок сортировки:
const compareFunc = (a, b) => b - a

console.log(numbers.reverse()) //или так

// 8. Сортировка объектов в массиве по стоковым значениям
const arr = [
    {
        name: 'Bob',
        age: 22,
        isMarried: true,
        scores: 95
    },
    {
        name: 'Alex',
        age: 24,
        isMarried: true,
        scores: 89
    },
    {
        name: 'Helge',
        age: 24,
        isMarried: true,
        scores: 90
    },
    {
        name: 'Nick',
        age: 20,
        isMarried: false,
        scores: 120
    },
    {
        name: 'John',
        age: 19,
        isMarried: false,
        scores: 121
    },
    {
        name: 'alex',
        age: 24,
        isMarried: true,
        scores: 89
    }
]

// регистрозависимая сортировка
const sortByName1 = (a, b) => {
    if (a.name > b.name) {
        return 123
    } else {
        return -123
    }
}

console.log(arr.sort(sortByName1))


// регистроНЕзависимая сортировка
const sortByName2 = (a, b) => {
    if (a.name.toLowerCase() > b.name.toLowerCase()) { // или toUpperCase - приводим к одному регистру без разницы к какому
        return 123
    } else {
        return -123
    }
}
console.log(arr.sort(sortByName2))

console.log(arr.sort((a, b) => a.name.localeCompare(b.name)))
// Функция строк - LocalCompare (возращает 1 или -1) делает тоде самое, что и код выше, т.е сразу
// делает регистронезависимую сортировку!


// 9. Сортировка объектов в массиве по строковым значениям
const sortByAge = (a, b) => {
    if (a.age > b.age) {
        return 123
    } else {
        return -123
    }
}

console.log(arr.sort(sortByAge))
console.log(arr.sort((a, b) => a.age - b.age)) // то же что и код выше

// buble sort (сотрировка пузырьком)

const nums = [23, 45, 32, 12, 11, 64, 56] // число операция n-1
for (let j = 0; j < nums.length - 1; j++) {
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > nums[i + 1]) {
            let temp = nums[i];
            nums[i] = nums[i + 1];
            nums[i + 1] = temp;
        }

    }
}
console.log(nums)
// 36 итераций - 6х6 - самый худший вариант - без оптимизации

const nums = [23, 45, 32, 12, 11, 64, 56] // число операция n-1
for (let j = 0; j < nums.length - 1; j++) {
    let isSorted = true
    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > nums[i + 1]) {
            isSorted = false;
            // let temp = nums[i];
            // nums[i] = nums[i + 1];
            // nums[i + 1] = temp;
          [nums[i + 1], [nums[i]] = nums[i], nums[i + 1]; // лучший способ поменять значения местами - деструктуризация!
        }

    }
    if (isSorted = true) break
}


// 5 итераций - внешний цикл, внутренний 3 (за счет постоянного уменьшения на 1 итерацию, так как не за чем
// пробегаться по числам, кторые уже на своем месте) итого 5х3 = 15 иетраций
// Есил попадается число, ктоорое уже отсортировано, то вводим примерный понижающий коэфициент, напр. 0,8 (так как мы не знаем
// сколько элементов будут на своих местах по дефолту
// Итого: 15 * 0,8 = 12



