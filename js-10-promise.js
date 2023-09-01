//promise

// fetch('http://books.com', (err, data) => {
//     if (err) {
//         console.log('oops, smth gone wrong');
//     } else {
//         console.log(data)
//         fetch('http://books.com/author', (err, data) => {
//             if (err) {
//                 console.log('oops, smth gone wrong');
//             } else {
//                 console.log(data)
//                 fetch('http://books.com/author/book', (err, data) => {
//                     if (err) {
//                         console.log('oops, smth gone wrong');
//                     } else {
//                         console.log(data)
//                         fetch('http://books.com/author/book/page456', (err, data) => {
//                             if (err) {
//                                 console.log('oops, smth gone wrong');
//                             } else {
//                                 console.log(data)
//                             }
//                         })
//                     }
//                 })
//             }
//         })
//     }
// })
// это называется адом колбэков, поэтому и придумали промисы

// pending || fulfilled(resolved) || rejected

// const server = {
//     getData() {
//         return new Promise(()=> {})
//     }
// }
//
// const pr = server.getData()
//
// console.log(pr)


const pr = new Promise(()=>{})
console.log(pr)

