//1. Реализуйте функцию, которая принимает параметром подсторку, число повторов и разделитель, а возвращает строку,
// состоящую из указанного количества повторов подстроки с использованием разделителя.
// repeatString("yo", 3, " ") => "yo yo yo"
// repeatString("yo", 3, ",") => "yo,yo,yo"

// const repeatString = (substr, repeatNum, separator) => {
//     let arr = []
//     for (let i= 0; i < repeatNum; i++) {
//          arr.push(substr)
//     }
//     return arr.join(separator)
// }
// console.log(repeatString("Yo", 3, " "))
// console.log(repeatString("Yo", 3, ","))

//  const repeatString = (substr, repeatNum, separator) => {
//     let str = ''
//      for (let i = 0; i < repeatNum; i++) {
//          if (i < repeatNum -1) {
//                str += substr + separator
//          } else {
//              str += substr
//          }
//      }
//      return str
//  }
// console.log(repeatString("Yo", 3, " "))
// console.log(repeatString("Yo", 3, ","))

// const repeatString = (substr, repeatNum, separator) => Array(repeatNum).fill(substr).join(separator)
// console.log(repeatString("Yo", 3, " "))
// console.log(repeatString("Yo", 3, ","))
// // Создаем через объект Array. В скобках число, которое задает длину массива. Метод fill
// // заполняет все элементы массива от начального до конечного индексов одним значением
// // возращает массив, который  join в строку

// const repeatString = (substr, repeatNum, separator) => {
//    let result = (substr + separator).repeat(repeatNum -1) + substr
//     return result
// }
// console.log(repeatString("Yo", 3, " "))
// console.log(repeatString("Yo", 3, ","))

//______________________________________________________________________________________________________________________

//2. Реализуйте функцию, которая принимает параметром строку и подстроку, а возвращает true, если строка начинается
// с указанной подстроки, в противном случае - false. Регистр не учитывается.
// checkStart("Incubator", "inc") => true
// checkStart("Incubator", "yo") => false

// const checkStart = (str, substr) => {
// return str.toLowerCase().includes(substr.toLowerCase())
// }
// console.log(checkStart("Incubator", "inc")) //=> true
// console.log(checkStart("Incubator", "yo")) //=> false
// Метод includes() проверяет, содержит ли строка заданную подстроку, и возвращает, соответственно true или false.

// const checkStart = (str, substr) => {
//     const strLow = str.toLowerCase()
//     const subStrLow = substr.toLowerCase()
//     return strLow.startsWith(subStrLow)
// }
// console.log(checkStart("Incubator", "inc")) //=> true
// console.log(checkStart("Incubator", "yo")) //=> false
// Метод startsWith() помогает определить, начинается ли строка с символов указанных в скобках. Возвращает true или false.

// const checkStart =(str, substr) => str.toLowerCase().startsWith(substr.toLowerCase())
// console.log(checkStart("Incubator", "inc")) //=> true
// console.log(checkStart("Incubator", "yo")) //=> false

//______________________________________________________________________________________________________________________


//3. Реализуйте функцию, которая принимает параметром строку и число (количество символов), а возвращает ту же строку, но
// обрезанную до указанного количества символов и завершает её многоточием.
//truncateString("Всем студентам инкубатора желаю удачи!", 10) => "Всем студе..."

// const truncateString = (str, num) => {
//     let arr = str.split('')
//     let newArr = []
//     for (let i=0; i<num; i++) {
//         newArr.push(arr[i])
//     }
//     return `${newArr.join('')}...`
// }
// console.log(truncateString("Всем студентам инкубатора желаю удачи!", 10))

// const truncateString = (str, num) => `${str.slice(0, num)}...`
// console.log(truncateString("Всем студентам инкубатора желаю удачи!", 10))

//______________________________________________________________________________________________________________________

//4. Реализуйте функцию, которая принимает параметром строку (предложение) и возвращает самое короткое слово в предложении,
// если в параметрах пустая строка или не строка, то возвращает null.
// getMinLengthWord("Всем студентам инкубатора желаю удачи.") => "Всем"
// getMinLengthWord("") => null
// getMinLengthWord(123) => null

// const getMinLengthWord = (str) => {
//     if  (typeof str !== "string" || !str){
//         return null
//     }
//     const arr = str.split(" ").sort ((a, b) => {
//         a.length - b.length
//     })
//     return arr[0]
// }
//
// console.log(getMinLengthWord("Всем студентам инкубатора желаю удачи."))

// const getMinLengthWord = (str) => {
//     if (typeof str !== "string" || str === '') {
//         return null
//     }
//     if (typeof str === "string") {
//         let arr = str.split(' ')
//         let result = arr[0]
//         for (let i = 0; i < str.length; i++) {
//             if (arr[i] < result) {
//                 result += arr[i]
//             }
//         }
//         return result
//     }
// }
//
// console.log(getMinLengthWord("Всем студентам инкубатора желаю удачи."))

//______________________________________________________________________________________________________________________
//5. Реализуйте функцию, которая принимает параметром строку (предложение) и возвращает то же предложение, где все слова
// написаны строчными, но начинаются с заглавных букв.
// setUpperCase("всем стУдентам инкуБатора Желаю удачИ") => "Всем Студентам Инкубатора Желаю Удачи!"

const setUpperCase = (str) => {
    return str.split(" ").map((el) => el[0].toUpperCase() + el.toLowerCase().slice(1)).join(" ")
}
console.log( setUpperCase("всем стУдентам инкуБатора Желаю удачИ"))

// !!!!!!!!!!!!!!!!!!После решения 5 задач - поднимаем руку!!!!!!!!
//______________________________________________________________________________________________________________________
//6. Реализуйте функцию, котрая принимает параметрами строку и подстроку. Если все
// символы подстроки содержаться в стороке - возвращает true, если нет -
// возвращает false. Проверка проводится без учёта регистра и без учёта
// повторяющихся символов.
// * с учётом повторяющихся символов в подстроке

const isIncludes = (str, sub) => {
    let strArr = str.toLowerCase().split('')
    let subArr = sub.toLowerCase().split('')
    return strArr.filter(el => subArr.includes(el)).join('') === sub.toLowerCase()
}



console.log(isIncludes("Incubator", "Cut")) //=> true)
console.log(isIncludes("Incubator", "table"))//=> false
console.log(isIncludes("Incubator", "inbba")) //=> true //*false
console.log(isIncludes("Incubator", "inba")) //=> true  //*true
console.log(isIncludes("Incubator", "Incubatorrr")) //=> true //*false)





  




