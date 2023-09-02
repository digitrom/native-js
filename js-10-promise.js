//promise

fetch('http://books.com', (err, data) => {
    if (err) {
        console.log('oops, smth gone wrong');
    } else {
        console.log(data)
        fetch('http://books.com/author', (err, data) => {
            if (err) {
                console.log('oops, smth gone wrong');
            } else {
                console.log(data)
                fetch('http://books.com/author/book', (err, data) => {
                    if (err) {
                        console.log('oops, smth gone wrong');
                    } else {
                        console.log(data)
                        fetch('http://books.com/author/book/page456', (err, data) => {
                            if (err) {
                                console.log('oops, smth gone wrong');
                            } else {
                                console.log(data)
                            }
                        })
                    }
                })
            }
        })
    }
})
// это называется адом колбэков, поэтому и придумали промисы.
//намного читабельнее + избегаем дублирование кода и
// отлавливаем ошибку только в конце в catch в отилчии от fetch:

axios.get(`https://books.com`)
    .then((data)=> {
        return axios.get(`http://books.com/${data.authors}`)
    })
    .then((data)=> {
        return axios.get(`http://books.com/${data.authors}/books`)
    })
    .then((data)=> {
        return axios.get(`http://books.com/${data.authors}/books/book`)
    })
    .then((data)=> {
        return axios.get(`http://books.com/${data.authors}/books/book/page456`)
    })
    .catch((err)=>{
        console.log('error:', err)
    })

// как устроен промис.
// создается с помощью конструктора класса Promise
// пример псевдокода
// const Promise1 = (executor) => {
//     const resolve =(data) => {
//         return {
//             state: 'fulfilled', //  Это и есть состояние: [[PromiseState]] : "pending"
//             data: data // result - результат: [[PromiseResult]] : undefined
//         }
//     }
//     const reject = (err) => {
//         return {
//             state: 'rejected',
//             data: err
//         }
//             }
//     executor(resolve, reject)
// }

// и далее res, rej попадают параметрами в executor
const server = {
    getData() {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res('some book list')
            }, 3000)
        })
    }
}

const pr1 = server.getData()

console.log(pr1)
// как результат, чере 3 сек. прмис зарезолвится значением из функции res
// Promise {<fulfilled>: 'some book list'}
//     [[Prototype]] : Promise
//     [[PromiseState]] : "fulfilled"
//     [[PromiseResult]] : "some book list"


//Синтаксис создания Promise:
let promise = new Promise(function (resolve, reject) { // функция-исполнитель (executor)
});
//Функция, переданная в конструкцию new Promise, называется исполнитель (executor) - запускается автоматически при создании Promise
// и принимает в аргументы resolve или reject(это колбэки, которые предоставляет сам JavaScript)
//Executor выполняет задачу (что-то, что обычно требует времени), затем вызывает ТОЛЬКО ИЛИ resolve(если будет response) ИЛИ reject(при error),
// чтобы изменить состояние соответствующего Promise ТОЛЬКО 1 РАЗ.
// Идея в том, что задача, выполняемая Executor-ом, может иметь только один итог: результат или ошибку.

//пример конструктора Promise и простого Executor-a (исполнителя) с кодом, дающим результат с задержкой (через setTimeout):
let promise = new Promise(function (resolve, reject) {
    // эта функция выполнится автоматически, при вызове new Promise

    // через 1 секунду сигнализировать, что задача выполнена с результатом "done"
    setTimeout(() => resolve("done"), 1000);
});

// А теперь пример, в котором исполнитель сообщит, что задача выполнена с ошибкой:

let promise = new Promise(function (resolve, reject) {
    // спустя одну секунду будет сообщено, что задача выполнена с ошибкой
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});


//-resolve(value) — если работа завершилась успешно, с результатом value.
//-reject(error) — если произошла ошибка, error – объект ошибки.

// promise - это объект(инстанс класса Promise) (возвращаемый конструктором new Promise), и у него есть внутренние свойства:
// 1.state («состояние») — вначале "pending" («ожидание»), потом меняется на "fulfilled" («выполнено успешно»)
// при вызове resolve или на "rejected" («выполнено с ошибкой») при вызове reject.
// 2.result («результат») — вначале undefined, далее изменяется на value при вызове resolve(value) или на error при вызове reject(error).
// Промис – и успешный, и отклонённый будем называть «завершённым», в отличие от изначального промиса «в ожидании».

// Promise {<fulfilled>: 'some book list'}
//     [[Prototype]] : Promise
//     [[PromiseState]] : "fulfilled"
//     [[PromiseResult]] : "some book list"

// Свойства state и result – это внутренние свойства объекта Promise и мы не имеем к ним прямого доступа. Для обработки
// результата есть методы .then/.catch/.finally
// Объект Promise служит связующим звеном между executor («создающим» кодом - напр. ответ от сервера - userList) и
// функциями-потребителями(напр. setUsers(userList) или setError(error)), которые получат либо результат, либо ошибку.
// Функции-потребители могут быть зарегистрированы (подписаны) с помощью методов .then и .catch, как только промис зарезолвится или зареджектится


//----------------------------------------------------THEN-----------------------------------------------------------

//.then

promise.then(
    function (result) { /* обработает успешное выполнение */
    },
    function (error) { /* обработает ошибку */
    }
);

// у метода .then есть 2 аргумента:
//1.функция, которая выполняется, когда промис переходит в состояние «выполнен успешно», и получает результат.

let promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("done!"), 1000);
});

// resolve запустит первую функцию, переданную в .then
promise.then(
    result => alert(result), // выведет "done!" через одну секунду
    error => alert(error) // не будет запущена
);

//2. функция, которая выполняется, когда промис переходит в состояние «выполнен с ошибкой», и получает ошибку.

let promise = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject запустит вторую функцию, переданную в .then
promise.then(
    result => alert(result), // не будет запущена
    error => alert(error) // выведет "Error: Whoops!" спустя одну секунду
);

// Если мы заинтересованы только в результате успешного выполнения задачи, то в then можно передать только одну функцию:

let promise = new Promise(resolve => {
    setTimeout(() => resolve("done!"), 1000);
});

promise.then(alert); // выведет "done!" спустя одну секунду

//----------------------------------------------------CATCH-----------------------------------------------------------------
//.catch

// Если мы хотели бы только обработать ошибку, то можно использовать null в качестве первого аргумента: .then(null, errorHandlingFunction).
//     Или можно воспользоваться методом .catch(errorHandlingFunction), который сделает то же самое:

let promise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Ошибка!")), 1000);
});

// .catch(f) это то же самое, что promise.then(null, f)
promise.catch(alert); // выведет "Error: Ошибка!" спустя одну секунду

//------------------------------------------------------FINALLY---------------------------------------------------------
//.finally

// выполнится, когда промис завершится, независимо от того, успешно или нет. напр.:

new Promise((resolve, reject) => {
    setisLoading(true) // включаем крутилку
    profileAPI.getStatus(userId)
        .finally(() => setisLoading(false))// убираем крутилку (индикатор загрузки) - как только получим ответ от сервера
        // выполнится, когда промис завершится, независимо от того, успешно или нет
        .then(response => {
            dispatch(setStatus(response.data))
        })// сделать что-то, что займёт время, и после вызвать resolve или может reject
})
    .catch(err => {
        console.log(err)
    })


//----------------------------------------ДЛЯ СОБЕСА----------------------------------------------------------
// как создать свой промис:
let promise = new Promise(function (resolve, reject) { // функция-исполнитель (executor)
});

// как его зарезолвить или зареджектить:

const myPromise = new Promise((resolve, reject) => {// промис НЕ принимает resolve, reject! он автоматом при
    // запуске new Promise принимает функцию executor, в которую передаются встроенные в JS колбэки resolve, reject!!
    const string = "string"
    if (string.length > 5) {
        resolve('word is long')
    } else {
        reject('word is too short')
    }
})

console.log(myPromise)

//----------------------------------------------------------------------------------------------------------------------
//примеры

const server = {
    getData() {
        return new Promise((resolve, reject) => {
            let data = ['book1', 'book2', 'book3']
            data=[]
            setTimeout(() => {
                if (data.length > 1) {
                    console.log('then1')
                    resolve(data)
                } else {
                    reject('oops, smth gone wrong')
                }
            }, 1000)
        })
    }
}

// const pr= server.getData()
// pr.then((data)=> {
//     console.log(data)})
//
// pr.catch((err)=> {
//     console.log("Error:", err)
// })

server.getData().then((data) => {
    console.log('then2')//чтобы прокинуть  что-то в then3 нужно явно это ретурнить:
    console.log(data)
    return [1, 2]
}).then((data) => {
    console.log('then3')
    console.log(data) // [1,2]
    return new Promise((res, rej) => {
        res(3) // если мы ретурним новый промис, то ретурним что, что он зарезолвил - т.е. 3
    })
}).then((data) => {
    console.log('then4')
    console.log(data)
})
// цепочка then-ов

//------------------------------------------------------------------------------------------------------------

//обработка ошибок

const server = {
    getData() {
        return new Promise((resolve, reject) => {
            let data = ['book1', 'book2', 'book3']
             // data=[]
            setTimeout(() => {
                if (data.length > 1) {
                    resolve(data)
                } else {
                    reject('oops, smth gone wrong')
                }
            }, 1000)
        })
    }
}

server.getData()
    .then((data) => {
    console.log('then2')//чтобы прокинуть  что-то в then3 нужно явно это ретурнить:
    // console.log(q)
    throw new Error('Some error')
    console.log(data)
}).then((data) => {
    console.log('then3')//чтобы прокинуть  что-то в then3 нужно явно это ретурнить:
    console.log(data)
}).catch((err)=> {
    console.log('Error:', err) //если в каком-то then ошибка, то все последующие then-ы пропускаются, и срабатывает catch
    // Error: ReferenceError: q is not defined at <anonymous>:20:17
}).finally(()=> {
    console.log('Finally')
})// отработает всегда

// еще пример обработки ошибок:

server.getData()
    .then((data) => {
    console.log('then1')
    // console.log(data)
}).then((data) => {
    console.log('then2')
    throw new Error('Some error')
}).then((data) => {
    console.log('then3')
}).then((data) => {
    console.log('then4')
}).catch((err)=> {
    console.log('Error:', err)
}).then((data) => {
    console.log(data)// undefined, так как после  catch нет return
    console.log('then5')
}).finally((data)=> {
    console.log('Finally')
})
// отработает так:
// 'then1'
// 'then2'
// 'error'
// undefined
// 'then5'
// 'Finally'





//--------------------------------------------------------------------------------------------------

//пример из жизни с finally:
const [isLoading, setIsLoading] = useState(false)
const pr = axios.get(`https://social-network.samuraijs.com`)
setIsLoading(true)
pr.then(response=> {
    setUsers(response.data.items)
})
.catch((err)=>{
    alert('oops, smth gone wrong', err)
})
.finally(()=> {
    setIsLoading(false)
})

{isLoading && <Loading/>}


//-----------------------------------------------

const delay = (time) => {
    return new Promise((res, rej)=> {
        setTimeout(()=> {
            res()
        }, time)
    })
}

delay(2000).then(()=> console.log('resolve'))


