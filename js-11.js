//promises 2

const server1 = {
    getData() {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res('Promise resolved') // если отрабатывает функция res, то промис резолвится переданными в него данными
            }, 4000)
        })
    }
}

const pr1 = server1.getData()
console.log(pr1)

const server2 = {
    getData() {
        return new Promise((res, rej) => {
            setTimeout(() => {
                rej('Error') // если отрабатывает функция rej, то промис реджектится переданной ошибкой
            }, 2000)
        })
    }
}

const pr2 = server2.getData()

// pr2.then((data) => { // подписваемся на данные, которые получили и выводим их в консоль
//     console.log('eeee', data )
// }).catch(err => { // лучше всего для отлова ошибок использовать catch
//     console.log('something went wrong', err)
// })
// .then(null, (err) => { // но можно отловить ошибку с then, используя 2-ой передаваемый колбэк, 1-ый при этом ставим null
//     console.log('something went wrong', err)
// })

pr1.then((data)=> {
    console.log('data',data) // "data Promise resolved"
    return 'some string' // "some string" - НЕ показывается в консоле, а передается по цепочке в then ниже
})
    .then((str) => { // в then попадает не объект промис, а то что он возвращает вышележащий then!
        console.log(str) //"some string"
        return str// передем str ниже

    })
    .then((str) => {
        console.log(str)//"some string"
    })
    .then((str) => {
        console.log(str)//"some string"
        // если нету return у предыдущего then - возвращает undefined
    })
    .then((str)=> {
        console.log('data',sr) // если есть ошибка, то ниже ее then-ы пропусукаются и попадаем в catch
        // return fetch('https://google.com/?query=js')
        return str
    })
    .then((str) => {
        console.log(str)//"some string"
    })
    .catch((err)=> {
        console.log('ERROR:', err) // выводим ошибку "ERROR: sr is not defined"
    })
    .finally(()=> {
        console.log('Finally')
    })

// в консоле мы увидим:

// сначала объект Promise, который в сосстоянии "pending" - ожидании. Он не успел со старта зарезолвиться так как,
// в JS код выполняется синхронно т.е. без останеовок, строчка за строчкой. А запрос за данными, сэмитированный
// setTimeOut - асинхронный, т.е. выполняется не сразу а с задержкой

// [[Prototype]]:Promise
// [[PromiseState]]:"pending"
// [[PromiseResult]]:undefined

// data Promise resolved
// some string
// some string
// undefined
// ERROR: sr is not defined
// Finally



