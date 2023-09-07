// 1. promises part2
// 2. конструкция asynch await
// 3. статические методы класса Promise

// на сегодняшний день3 варианта работы с асинхронным кодом:
//- колбэки - неприемлимо
//- then-catch - приемлимо
//- asynch-await - предпочтительно
//============================================= 1 =====================================================================
// const server1 = {
//     getData() {
//         return new Promise((res, rej) => {
//             setTimeout(() => {
//                 res('Promise resolved') // если отрабатывает функция res, то промис резолвится переданными в него данными
//             }, 4000)
//         })
//     }
// }
//
// const pr1 = server1.getData()
// console.log(pr1)
//
// const server2 = {
//     getData() {
//         return new Promise((res, rej) => {
//             setTimeout(() => {
//                 rej('Error') // если отрабатывает функция rej, то промис реджектится переданной ошибкой
//             }, 2000)
//         })
//     }
// }
//
// const pr2 = server2.getData()

// pr2.then((data) => { // подписваемся на данные, которые получили и выводим их в консоль
//     console.log('eeee', data )
// }).catch(err => { // лучше всего для отлова ошибок использовать catch
//     console.log('something went wrong', err)
// })
// .then(null, (err) => { // но можно отловить ошибку с then, используя 2-ой передаваемый колбэк, 1-ый при этом ставим null
//     console.log('something went wrong', err)
// })

// pr1.then((data)=> {
//     console.log('data',data) // "data Promise resolved"
//     return 'some string' // "some string" - НЕ показывается в консоле, а передается по цепочке в then ниже
// })
//     .then((str) => { // в then попадает не объект промис, а то что он возвращает вышележащий then!
//         console.log(str) //"some string"
//         return str// передаем str ниже
//     })
//     .then((str) => {
//         console.log(str)//"some string"
//     })
//     .then((str) => {
//         console.log(str)//"some string"
//         // если нету return у предыдущего then - возвращает undefined
//     })
//     .then((str)=> {
//         console.log('data',sr) // если есть ошибка, то ниже ее then-ы пропусукаются и попадаем в catch
//         // return fetch('https://google.com/?query=js')
//         return str
//     })
//     .then((str) => {
//         console.log(str)//"some string"
//     })
//     .catch((err)=> {
//         console.log('ERROR:', err) // выводим ошибку "ERROR: sr is not defined"
//     })
//     .finally(()=> {
//         console.log('Finally')
//     })

// в консоле мы увидим:

// сначала объект Promise, который в сосстоянии "pending" - ожидании. Он не успел со старта зарезолвиться так как,
// в JS код выполняется синхронно т.е. без остановок, строчка за строчкой. А запрос за данными, сэмитированный
// setTimeOut - асинхронный, т.е. выполняется не сразу, а с задержкой

// [[Prototype]]:Promise
// [[PromiseState]]:"pending"
// [[PromiseResult]]:undefined

// data Promise resolved
// some string
// some string
// undefined
// ERROR: sr is not defined
// Finally

//---------------------------------------------------------------------------------------------------------------------
// case 3
fetch('https://google.com/?query=js')
    .then(() => {
        console.log('Response from google')
    })
fetch('https://yahoo.com/?query=js')
    .then(() => {
        console.log('Response from yahoo')
    })
fetch('https://duckduckgo.com/?query=js')
    .then(() => {
        console.log('Response from duckduckgo')
    })
//все 3 метода запускаются по очереди не дожидаясь друг друга, но 1-ым отработает тот, кто быстрее получит ответ от сервера(зарезолвится)
//в консоли будет:
//'Response from duckduckgo'
//'Response from google'
//'Response from yahoo'

//----------------------------------------------------------------------------------------------------------------------
// case 4
fetch('https://google.com/?query=js')
    .then(() => {
        console.log('Response from google')
        //undefined, так как нет  return
    })
    .then(() => { // передаем в колбэк undefined, поэтому задержки практически нету
        fetch('https://yahoo.com/?query=js')
    })
    .then(() => {
        console.log('Response from yahoo')
        //undefined, так как нет  return
    })
    .then(() => {
        fetch('https://duckduckgo.com/?query=js')
    })
    .then(() => {
        console.log('Response from duckduckgo')
        //undefined, так как нет  return
    })
//в консоли будет:

//'Response from google'// этот запрос будет с задержкой, т.к. мы ждем пока зарезолвится промис,  далее остальные then-ы
// сработают пракстичечки одновременно (но колбэки, которые они содежрат срабатыват по очереди, в том попрядке в котором они написаны в коде). это происходит потому, что мы
// не return-ем ответ, а если в функции нет return, то она возвращает  undefined, т.е мы не дожидаемся response,
// return нам нужен, чтобы передать данные в следующий then, а если мы не ждем промис (т.е. return-им undefined), то задержки практически нету
//'Response from yahoo'// одновременно
//'Response from duckduckgo'//одновременно
//---------------------------------------------------------------------------------------------------------------------

// case 5
//чтобы then-ы дожидались по цепочке, нужно делать return

fetch('https://google.com/?query=js')
    .then(() => {
        return console.log('Response from google') // теперь нижележащий then будет зависеть от отработки этого промиса
    })
    .then(() => {
        fetch('https://yahoo.com/?query=js')
    })
    .then(() => {
        return console.log('Response from yahoo')
    })
    .then(() => {
        fetch('https://duckduckgo.com/?query=js')
    })
    .then(() => {
        console.log('Response from duckduckgo')
    })
//в консоли будет тоже что и кейсом выше но, каждый последующий then будет дожидаться response от предыдущего, т.е
// теперь then-ы выполняются последовательно
// если в response будет error, то мы попадаем в catch:
//'Response from google'//
//'Response from yahoo'// ждем, пока зарезолвится 1-ый then, (так как есть return у then выше)
//'Response from duckduckgo'// ждем, пока зарезолвится 2-ой then, (так как есть return у then выше)

//================================================== 2 =================================================================
//Статические методы промиса: all || race || allsettled || any

//------------------------------------------------- all ----------------------------------------------------------------

//all - дожидается резолва всех промисов переданных в массив зависимости, и после делаем манипуляции с пришедшими данными
// работает в той последовательности, в которой передали промисы в массив
//all - используется на практике постоянно
const promise1 = fetch('https://google.com/?query=js')
const promise2 = fetch('https://yahoo.com/?query=js')
const promise3 = fetch('https://duckduckgo.com/?query=js')

const bigPromise = Promise.all([promise1, promise2, promise3]) //дожидается всех промисов переданных в массив зависимости

//case1
bigPromise.then((data) => { // then отрабатывает когда отработали все 3 промиса, переданные в массив
    console.log(data[0].url)
    console.log(data[1].url)
    console.log(data[2].url)
})

//в консоли будет:
//'https://google.com/?query=js'
//'https://yahoo.com/?query=js'
//'https://duckduckgo.com/?query=js'


//case2
//если хоть в 1 из промисов будет ошибка, то bigPromise зареджектится:

bigPromise.then((data) => { // then отрабатывает когда отработали все 3 промиса, переданные в массив
    console.log(data[0].url)
    console.log(data[1].url)
    console.log(data[2].url)
})
    .catch(error => {
        console.log('Error:', error)
    })
//в консоли будет: Error: ....
//----------------------------------------------------------- race -----------------------------------------------------

//race - обработаем тот промис, который 1-ым отработает(вне зависимоcти resolve  или reject) - т.е.  promise3

const promise1 = fetch('https://google.com/?query=js')
const promise2 = fetch('https://yahoo.com/?query=js')
const promise3 = fetch('https://duckduckgo.com/?query=js')


//case1
Promise.race([promise1, promise2, promise3]).then((data) => {// в then попадает то, чем зарезолвился
    // самый 1-ый промис из 3-х
    console.log('date', data.url)
})
//в консоли будет:
//'https://duckduckgo.com/?query=js'

//case2 c ошибкой
// попадаем либо в catch либо в then, в завсимости кто 1-ый зарезолвился или зареджектился!
const promise1 = fetch('htps://google.com/?query=js') // попадаем в catch из-за ошибки в url, но если бы какой-то
// промис быстрее бы зарезолвился, то попали бы в then
const promise2 = fetch('https://yahoo.com/?query=js')
const promise3 = fetch('https://duckduckgo.com/?query=js')
Promise.race([promise1, promise2, promise3]).then((data) => {// в then попадает то, чем зарезолвился
    // самый 1-ый промис из 3-х
    console.log('date', data.url)
})
    .catch((err) => {
        console.log('Error:', err)
    })
//в консоли будет: Error: TypeError: node-fetch cannot load 'htps://google.com/?query=js'
// т.к. этот промис заредлектился 1-ее всех

//------------------------------------------------ allSettled ----------------------------------------------------------
// allSettled всегда резолвится массивом объектов . в каждом объекте есть 2 св-ва:
// -если промис заразолвился то св-ва будут status и value
// -если промис rejected то св-ва будут status и reason
// const promise1 = fetch('https://google.com/?query=js')
// const promise2 = fetch('https://yah12345oo.com/?query=js')
// const promise3 = fetch('https://duckduckgo.com/?query=js')
//
// Promise.allSettled([promise1, promise2, promise3]).then((data) => {
//     console.log(data)
// })
// //в консоли будет типа того:
//     [{
//     status: fulfilled,
//     value: Response
// },
//     {
//         status: fulfilled,
//         reason: TypeEror
//     },
//     {
//         status: fulfilled,
//         value: Response
//     }
//     ]
// catch в allSettled не отрабатывает - в нем нет смысла

//----------------------------------------------------- any ------------------------------------------------------------

// any ждет ответа от всех промисов и
// если резолвятся все промисы, то в then попадает response от того кто 1-ый resolved,
// если есть rejected промисы, то их пропускает и смотрит кто 1-ый из оставшихся,
// если все rejected, то возвращает объект со св-во error в котором массив ошибок причин реджекта

//============================================ asynch await=============================================================
const server = {
    getData() {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res('promise resolved')
                rej('something went wrong')
            }, 2000)
        })
    }
}
const pr = server.getData()

pr.then((data) => {
    console.log('data', data)
    return fetch('https://google.com/?query=js')
})
    .then((dataFromGoogle) => {
        console.log('data', dataFromGoogle.url) // если не написать. url, то вернет весь большой объект respons-a
        return fetch('https://yahoo.com/?query=js')
    })
    .then((dataFromYahoo) => {
        console.log('data', dataFromYahoo.url)
        return fetch('https://duckduckgo.com/?query=js')
    })
    .then((dataFromDuckDuckGo) => {
        console.log('data', dataFromDuckDuckGo.url)
    })
    .catch((err) => {
        console.log('error', err)
    })
//-------------------------------------------------------------------------------------------------------------------
// код выше можно написать с помощью конструкции asynch  await
// если у нас ошибка, то мы попадаем в catch и выполнение остальных запросов прерывается(аналогично как и с  then-ами - если
// в каком-нибудь then ошибка,  то, мы попадаем  в catch, и предыдущие then-ы до catch - игнорятся)
// преимущества над then, catch:
// - не нужны колбэки, которые мы передаем в then, следовательно код короче и еще читабельнее
// недостатки по сравнению then, catch:
// - ошибку в catch можно отлавить только для всех отработанных запросов(т.е. зарезолвленных промисов)
const foo = async () => {
    try {
        const dataFromGoogle = await fetch('https://google.com/?query=js')// чтобы дождаться ответа Google мы
        // должны написать ключ.сл.'await',иначе в переменную dataFromGoogle движок запишем промис, возвращаемый fetch-ем
        console.log(dataFromGoogle.url)
        const dataFromYahoo = await fetch('https://yahoo.com/?query=js')
        console.log(dataFromYahoo.url)
        const dataFromDuckDuckGo = await fetch('https://duckduckgo.com/?query=js')
        console.log(dataFromDuckDuckGo.url)
        //запросы отработают по очереди, так как есть ключ.сл. await
    } catch (err) {
        console.log('error', err)
    }
    // return fetch('https://google.com/?query=js')
}
foo()
//запросы отработают по очереди, так как есть ключ.сл. await
// следовательно в консоле будет:
// 'https://google.com/?query=js'
// 'https://yahoo.com/?query=js'
// 'https://duckduckgo.com/?query=js'

//------------------------------------------пример работы на практике с React-----------------------------------------------------

//case1
const [data, setName] = useState([])

const foo = async () => {
    setIsLoading(true)
    try {
        const dataFromGoogle = await fetch('https://google.com/?query=js')
        setName(dataFromGoogle.name)
        const dataFromYahoo = await fetch('https://yahoo.com/?query=js')
        const dataFromDuckDuckGo = await fetch('https://duckduckgo.com/?query=js')
    } catch (err) {
        console.log('error', err)
    } finally {
        setIsLoading(false)
    }
    //если нет  return  функция  foo все равно return-ит ПРОМИС,НО в состоянии pending! т.е. мы вернули промис, но
    //мы не зарезолвили и не зареджектили его
}
const something = foo() // функция  foo return-ит ПРОМИС, а не undefined!

//--------------------------------------------------------------------------------------------------------------------
//case2

const foo = async () => {
    // setIsLoading(true)
    try {
        const dataFromGoogle = await fetch('https://google.com/?query=js')
        const dataFromYahoo = await fetch('https://yahoo.com/?query=js')
        const dataFromDuckDuckGo = await fetch('https://duckduckgo.com/?query=js')
    } catch (err) {
        console.log('error', err)
    } finally {
        // setIsLoading(false)
    }
    return fetch('https://google.com/?query=js') // мы можем вернуть промис и в something попадет, то чем промис зарезолвился
}
const something = foo() // функция  foo return-ит ПРОМИС, а не undefined!
something.then((data) => {
    console.log('something', data.url)// здесь будет response  от google
})
// в console будет:
// something https://google.com/?query=js

//---------------------------------------------------------------------------------------------------------------------
//case3
fetch('https://google.com/?query=js')
    .then((dataFromGoogle) => {
        console.log('data', dataFromGoogle.url) // если не написать. url, то вернет весь большой объект respons-a
        return fetch('https://yahoo.com/?query=js')
    })
    .then((dataFromYahoo) => {
        console.log('data', dataFromYahoo.url)
        return fetch('https://duckduckgo.com/?query=js')
    })
    .then((dataFromDuckDuckGo) => {
        console.log('data', dataFromDuckDuckGo.url)
    })
    .catch((err) => {
        console.log('erro', err)
        console.log(f)// так как здесь ошибка - промис не реджектится, т.е. промис не отработает, => следующий then не сработает,
        // а сработает последний catch
    })
    .then(()=> {
        console.log('then after catch')
    })
    .catch(()=> {
        console.log('ERROR on catch')
    })

//в консоле будет:
//https://yahoo.com/?query=js
//https://duckduckgo.com/?query=js
// erro:TypeError...
//'ERROR on catch'
