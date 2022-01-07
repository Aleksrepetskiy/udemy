// 'use strict'

// console.log('call for server');

// const reg = new Promise(function (resolve, reject) {
// 	setTimeout(()=>{
// 		console.log('begin....');
// 		const product = {
// 			name: 'ddd',
// 			price: 23
// 		}
// 		resolve(product);
// 	}, 2000)
// });
// reg.then((product)=> {
// 	return new Promise ((resolve,reject)=>{
// 		console.log('have data')
// 		setTimeout(()=>{
// 			product.status = 'order';
// 			console.log(product);
// 			//reject();
// 			 resolve(product);

// 		}, 2000)
// 	})
// }).then((data)=> {
// 	data.modify = true;
// 	console.log('data update')
// 	return data
// }).then((data)=> {
// 	console.log(data);
// }).catch(()=>{
// 	console.error('mistakes');
// }).finally(()=>{
// 	console.error('finnaly');
// })

const test = time => {
	return new Promise((resolve, reject) => {
		setTimeout(()=>{
			resolve()
		}, time)

	})
};
// test(1000).then(()=>{
// 	console.log('after 1 second')
// })
// test(2000).then(()=>{
// 	console.log('after 2 second')
// })

Promise.all([test(1000), test(2000)]).then(()=>{
	console.log('all promise')
});
Promise.race([test(1000), test(2000)]).then(()=>{
	console.log('all promise')
});