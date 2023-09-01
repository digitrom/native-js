//
// // 1.лескическое окружение,
// // 2. замыкание
// // 3.рекурсия
//
// //======================================================================================================================
// //1. ЛЕКСИЧЕСКОЕ ОКРУЖЕНИЕ
// // В JavaScript у каждой выполняемой функции, блока кода {...} и скрипта есть связанный с ними внутренний (скрытый) объект,
// // называемый лексическим окружением LexicalEnvironment.
// //globalLe { } --> null
// // это объект глобального лексического окружения, у него есть св-во со ссылкой на внешнее лексическое окржуение,
// // значение которого равно null, т.е. оно никуда не сслылается. он создается при запуске скипта
//
// //---------------------------------------------------------------------------------------
// //case 1. Function Declaration
// //Функция вызвана до объявления - код будет работать
//
// //globalLE { startEngine: Function } 1.
// const car = 'bmw'; //globalLE { startEngine: Function, car: 'bmw' }
//
// startEngine() //globalLE { startEngine: Function, car: 'bmw' }
// function startEngine() {
//     // [[Environment]] --> GlobalLE 2.
//     // startEngineLE {} 3.
//     console.log(`Start ${car}`) //4.
// }
//
//
// //1. функция startEngine() на момент начала выполнения скрипта будет в глобальном объекте( происходит hoisting -
// // поднятие - это механизм в JavaScript, в котором переменные и объявления функций,
// // передвигаются вверх своей области видимости перед тем, как код будет выполнен:) и тут же
// //2. (line 25) внутри startEngine() создастся ссылка  [[Environment]] и будет ссылаться на --> GlobalLE
// //3. при вызове startEngine() внутри нее будет создаваться свой локальный LE(line 26): startEngineLE {}, после отработки будет удален, но
// // ссылка [[Environment]] --> GlobalLE будет сохранятся, т.к. наша ссылка на нашу функцию будет сидеть в GlobalLE
// // ВАЖНО. startEngineLE {} создается новый на каждый вызов функции
//
// // 4. на 27 line выполняется код, где нужна переменная  car, кот-ая сначала ищется в локальном LE(в  scope  функции):
// // startEngineLE {} -  не находится, далее смотрит на код строчкой выше и видит ссылку --> GlobalLE,
// // и выйдет по этой ссылке на GlobalLE, а в данном объекте переменная car есть, поэтому он подставит оттуда и получим в консоли: "Start bmw"
// //
//
// //--------------------------------------------------------------------------------------
// // case 2. Function Expression - НЕ подлежит hoisting-у. т.е не попадает в globalLE { } - будет пустой
//
//
// //globalLE { } --> null // на момент старта -  данный объект пустой
// const car = 'bmw'; //globalLE { car: 'bmw' }
//
// startEngine() // globalLE { car: 'bmw' }
// const startEngine = function() {
// //[[Environment]] --> GlobalLE
// //startEngineLE {}
//     console.log(`Start ${car}`) // car is not defined
// }
// //-----------------------------------------------------------------------------------------
// // case 3. Arrow Function - НЕ подлежит hoisting-у, т.е не попадает в globalLE { } - будет пустой
//
// //globalLE { } --> null // на момент старта -  данный объект пустой
// const car = 'bmw'; //globalLE { car: 'bmw' }
//
// startEngine() //globalLE { car: 'bmw' } движок смотрит на этот объект и не видит такую функцию, => "startEngine is not defined "
// const startEngine=() => {
// //[[Environment]] --> GlobalLE
// //startEngineLE {}
//     console.log(`Start ${car}`)
// }
// //---------------------------------------------------------------------------------------
// //case 4. Function Expression - startEngine() вызван после оъявления
//
// //globalLE { } --> null
// const car = 'bmw'; //globalLE { car: 'bmw' }
//
//
// const startEngine = function() { //  globalLE { startEngine: Function, car: 'bmw' }
// //[[Environment]] --> GlobalLE - создаться не сразу, а когда объявится функция (103 line)
// //startEngineLE {} // создаться на момент вызова (108 line)
//     console.log(`Start ${car}`)
// }
// startEngine()
//
// //-----------------------------------------------------------------------------------------
// // case 5.
//
// //globalLE { } --> null
// const car = bmw; //globalLE { car: 'bmw' }
//
// var startEngine = function () {
//     //[[Environment]] --> GlobalLE
//     // startEngineLE {car: 'audi'}
//     const car = 'audi';
//     console.log(`Start ${car}`)
// }
// startEngine();
//
// //======================================================================================================================
// // ЗАМЫКАНИЕ - функция сама по себе уже является замыканием
// // 2. Замыкание - Это способность функции запоминать в каком лексическом окружении она была создана. (физически - это наличие ссылки на внешнее окружение //[[Environment]] --> GlobalLE)
// // Взять переменную из замыкания значит функция смотрит на ссылку //[[Environment]] --> GlobalLE идет туда во внешний LE и берет там переменую
//
//
// // 1. globalLE { } --> null
// const counter = () => { // 2. globalLE { counter: Function } --> null
//     // 3. [[Environment]] --> GlobalLE - создается переменная Environment, которая ссылается на globalLE
//     // 4. counterLE {} - на момент вызова создается объект локальный ЛЕ
//     let i = 0 // 5. counterLE {i: 0} - в это объект записвается значение 0
//     return ()=> {
//         // 6. [[Environment]] --> counterLE // при создание переменной count(в которую мы записали результат отработки функции) создаться
//         // переменная Environment, которая ссылается на counterLE, но объект локального LE не создается, потому что он создается ТОЛЬКО в
//         // момент вызова функции, а тут мы просто проинициализировали  переменную count
//         // 7.  countLE {} - создвается объект локальный ЛЕ после вызова count()
//         console.log(++i) // 8. здесь мы обращаемся к меременной i, ее нету в countLE {}, далее смотрит на ссылку
//         // [[Environment]] --> counterLE и находит counterLE {i: 0}, затем берет 0 и прибавляет 1 => countLE {i: 1 }
//     }
// }
// // 9. функция отработала и внешней ссылки на объект countLE {} нигде нету(так как код прирвался,после отработки console.log()) => объект локальный ЛЕ countLE {} - удалится, но
// // [[Environment]] продолжает ссылатться на  --> counterLE, поэтому counterLE {i: 0} не удаляется после отработки
// // 10. при 2ом вызове count() происходит все тоже самое начиная с 7-го пункта
//
// const count = counter()
//
// count() // 1 counterLE {i: 1}
// count() // 2 counterLE {i: 2}
// count() // 3 counterLE {i: 3}
//
//
// //ТЕПЕРЬ КАК СДЕЛАТЬ ЧТОБЫ В ЛОГЕ БЫЛО 1 1 1
//
// // 1. globalLE { } --> null
// const counter = () => { // 2. globalLE { counter: Function } --> null
//     // 3. [[Environment]] --> GlobalLE - создается переменная Environment, которая ссылается на globalLE
//     // 4. counterLE {} - создвается объект локальный ЛЕ на момент вызова
//
//     return ()=> {
//         // 5. [[Environment]] --> counterLE // при создание переменной count(в которую мы записали результат отработки функции) создаться
//         // переменная Environment, которая ссылается на counterLE, но объект локального LE не создается, потому что он создается ТОЛЬКО в
//         // момент вызова функции, а тут мы просто проинициализировали  переменную count
//         // 6.  countLE {} - создается объект локальный ЛЕ после вызова count()
//         let i = 0 // 7. countLE {i: 0} - в это объект записвается значение 0
//         console.log(++i) // 8. здесь мы обращаемся к переменной i, в countLE {i: 0}, затем берет 0 и прибавляет 1 => countLE {i: 1 }
//     }
// }
// // 9. функция отработала и внешней ссылки на объект countLE {} нигде нету(так как код прирвался,после отработки console.log()) => объект локальный ЛЕ countLE {} - удалится,
// // и значение i = 1 потеряется
// // 10. при 2ом вызове count() происходит все тоже самое начиная с 7-го пункта
//
// const count = counter()
//
// count() // 1 counterLE {i: 1}
// count() // 2 counterLE {i: 2}
// count() // 3 counterLE {i: 3}
//
// // 1. globalLE { } --> null
// const counter = () => { // 2. globalLE { counter: Function } --> null
//     // 3. [[Environment]] --> GlobalLE
//     // 4.1 counter1LE {i:0} - на момент вызова count1() создается объект локальный ЛЕ
//     // 4.2  counter2LE {i:0} - на момент вызова count2() создается объект локальный ЛЕ
//     let i = 0 // 5. counterLE {i: 0} - в это объект записвается значение 0
//     return ()=> {
//         // 6.1 [[Environment]] --> counter1LE // при создание переменной count1(в которую мы записали результат отработки функции) создаться
//         // переменная Environment, которая ссылается на counter1LE
//         // 6.2 [[Environment]] --> counter2LE // при создание переменной count2(в которую мы записали результат отработки функции) создаться
//         // переменная Environment, которая ссылается на counter2LE
//         // 7.1  countLE1 {} - создается объект локальный ЛЕ после вызова count1()
//         // 7.2  countLE2 {} - создается объект локальный ЛЕ после вызова count2()
//         console.log(++i) // 8. здесь мы обращаемся к меременной i, ее нету в countLE1 {} и countLE2 {}, далее смотрит на ссылку
//         // [[Environment]] --> counter1LE и countLE2 {} находит counterLE1&2 {i: 0}, затем берет 0 и прибавляет 1 => countLE1&2 {i: 1 }
//     }
// }
// // 9. функция отработала и внешней ссылки на объект countLE1&2 {} нигде нету(так как код прирвался,после отработки console.log()) => объект локальный ЛЕ countLE1&2 {} - удалится, но
// // [[Environment]] продолжает ссылатться на  --> counterLE, поэтому counterLE {i: 0} не удаляется после отработки
// // 10. при 2ом вызове count1&2() происходит все тоже самое начиная с 7-го пункта
//
// const count1 = counter()
// const count2 = counter()
//
// count1() // 1
// count1() // 2
// count1() // 3
//
// count2() // 1
// count2() // 2
// count2() // 3
//
//
// //чтобы было  1, 2, 3, 4, 5, 6 :
//
// // 1. globalLE { } --> null
//
// let i = 0 // 2. globalLE { counter: Function, i:0 } --> null // это общая ссылка для  count1 и count2
//
// const counter = () => { // 2. globalLE { counter: Function } --> null
//     // 3. [[Environment]] --> GlobalLE
//     // 4.1 counter1LE {} - на момент вызова count1() создается пустой объект локальный ЛЕ
//     // 4.2  counter2LE {} - на момент вызова count2() создается пустой объект локальный ЛЕ
//
//     return ()=> {
//         // 6.1 [[Environment]] --> counter1LE // при создание переменной count1(в которую мы записали результат отработки функции) создаться
//         // переменная Environment, которая ссылается на counter1LE
//         // 6.2 [[Environment]] --> counter2LE // при создание переменной count2(в которую мы записали результат отработки функции) создаться
//         // переменная Environment, которая ссылается на counter2LE
//         // 7.1  countLE1 {} - создается объект локальный ЛЕ после вызова count1()
//         // 7.2  countLE2 {} - создается объект локальный ЛЕ после вызова count2()
//         console.log(++i) // 8. здесь мы обращаемся к меременной i, ее нету в countLE1 {} и countLE2 {}, далее смотрит на ссылку
//         // [[Environment]] --> counter1LE и countLE2 {} находит counterLE1&2 {i: 0}, затем берет 0 и прибавляет 1 => countLE1&2 {i: 1 }
//     }
// }
// // 9. функция отработала и внешней ссылки на объект countLE1&2 {} нигде нету(так как код прирвался,после отработки console.log()) => объект локальный ЛЕ countLE1&2 {} - удалится, но
// // [[Environment]] продолжает ссылатться на  --> counterLE, поэтому counterLE {i: 0} не удаляется после отработки
// // 10. при 2ом вызове count1&2() происходит все тоже самое начиная с 7-го пункта
//
// const count1 = counter() //globalLE { counter: Function, count1: Function } --> null
// const count2 = counter() //globalLE { counter: Function, count1: Function, count2: Function } --> null
//
// count1() // 1
// count1() // 2
// count1() // 3
//
// count2() // 4
// count2() // 5
// count2() // 6
//
// // case 2. Неклассический пример замыкания на примере  thunkCreator:
//
// const thunkCreator = (userId) => {
//     const thunk = (dispatch, getState) => {
//         console.log(userId)
//     }
//     return thunk
// }
//
// const thunk1 = thunkCreator(1)
// const thunk2 = thunkCreator(2)
// // вызываем 1 и ту же функцию 2 раза, и записываем 2 разных сущности со своими значениями thunk1 и thunk2
//
// // =====================================================================================================================
// // РЕКУРСИЯ
//
//
// //В процессе выполнения задачи в теле функции могут быт вызваны другие функции("подвызовы") для выполнения подзадач:
//
// const a = () => {
//     const b = () =>{
//         const c =() => {}
//         c() //3. запускается b() ложится на стэк на b(), образуя( stack frame3), отрабаывает и удаляется,
//     } // затем отрабабатывает b() и a() попорядку  - LIFO
//     b() //2. запускается b() ложится на стэк на a(), образуя( stack frame2), и не удаляется, т.к не отработала, т.к ей надо выполнить c()
// }
// a() // 1. запускается a() ложится на стэк, образуя( stack frame1), и не удаляется, т.к не отработала, т.к ей надо выполнить b()
//
// // Стэк работает по принципу LIFO (Last In First Out): последняя пришла - 1-ая ушла
//
//
// // РЕКУРСИЯ – это приём программирования, когда функция вызывает сама себя - это частный случай "подвызова"
// //2. Классичечкий пример возведение в стерень. Есть 2 способа -итеративный и рекурсивный:
//
// //итеративный, цикл for:
//
// function pow(x, n) {
//     let result = 1;
//
//     // умножаем result на x n раз в цикле
//     for (let i = 0; i < n; i++) {
//         result *= x;
//     }
//
//     return result;
// }
// alert( pow(2, 3) ); // 8
//
// // рекурсивный:
//
// function pow(x, n) {
//     if (n === 1) {
//         return x;
//     } else {
//         return x * pow(x, n-1);
//     }
// }
// alert( pow(2, 3) ); // 8
// //функция pow рекурсивно вызывает саму себя до n === 1
//
// //исполнение делится на две ветви:
// //а) Если n == 1. Эта ветвь называется базой рекурсии,
// // потому что сразу же приводит к очевидному результату: pow(x, 1) равно x
// // б) Мы можем представить pow(x, n) в виде: x * pow(x, n - 1) - в математике записывается как: xn = x * x в степени n-1
// // Эта ветвь – шаг рекурсии: мы сводим задачу к более простому действию
//
// // для корректной работы рекурсии есть 2 условия:
// //-условие выхода (т.е. наличие ветви а)
// // -шаг рекурсии, в данном случае n-1 (если шага не будет то, функция будет постоянно вызываться, стэк переполнится и
// // будет ошибка: Uncaught RangeError: Maximum call stack size exceeded
//
// //Рекурсивное решение задачи обычно короче, чем итеративное.
// //Общее количество вложенных вызовов (включая первый) называют глубиной рекурсии. она будет равна n.
// //Максимальная глубина рекурсии ограничена движком JavaScript(10000 вложенных вызовов),
// //но рекурсивный способ решения даёт более простой код, который легче поддерживать.
//
//
// // как работает рекурсия:
//
// //1. globalLE { pow: Function } --> null
//
// function pow(x, n) {
//     // 2. powLE {x: 2, n: 3} - в момент 1-го вызова создается свой powLE и записываются переменные, которые приходят параметрами
//     // и функция ложится в stack (образуя 1-ый stack frame) на выполнение
//     if (n === 1) {
//         return x;
//     } else { // т.к . n = 3, а не 1, выполняется 2-ая ветвь - шаг рекурсии
//         return x * pow(x, n-1);  // подставляем x, затем, pow ищется в powLE - не находит,выпрыгивает в globalLE - находит,
//         // сюда подставляются переменные x: 2, n: 3,
//         //  (из стека не удляется т.к. не выполнена внутренняя функция pow)
//         // и функция запускается 2-ой раз опять проверяется n=1, если нет  - деается еще 1 шаг рекурсии,
//         // функция ложится в stack, поверх 1-го stack frame и не удаялется
//        // сюда подставляются переменные x: 2, n: 2,
//         // pow ищется у себя в LE - не находит, выпрыгивает в globalLE - находит,
//         //  и запускается в 3-ий раз. - образуется 3-ий stack frame
//         // когда n=1, срабатывает 1-ая ветвь, возвращается x равный 2. значит функция отработала и 3-ий stack frame удаляется.
//         //  эта 2-ка попадает как результат вызова pow() 2-ого stack frame умножается на 2 (т.к x=2) получает
//         //  4 ,=> функция отработала и 2-ой stack frame удаляется
//         //  эта 4-ка  попадает как результат вызова pow() 1-ого stack frame умножается на 2 (т.к x=2) получает итог 8,
//         //  => функция отработала и 1-ый stack frame удаляется
//     }
// }
// alert( pow(2, 3) ); // 8.
