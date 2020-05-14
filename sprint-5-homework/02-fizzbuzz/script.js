/*
 * Задача 2: «FizzBuzz»
 *
 * Напишите функцию fizzBuzz(n), принимающую как аргумент натуральное число.
 * Функция должна выводить в консоль числа от 1 до n, заменяя числа:
 *
 * • кратные трём — на fizz;
 * • кратные пяти — на buzz;
 * • кратные и трём, и пяти одновременно — на fizzbuzz.
 * 
*/
/*
function fizzBuzz(num) {
    for (let i = 1; i < num + 1; i++){
        if(!(i % 15)){
            console.log('fizzbuzz');
        }
        else if(!(i % 5)){
            console.log('buzz');
        }
        else if(!(i % 3)){
            console.log('fizz');
        }
        else{
            console.log(i);
        }
    }
}
 */


function fizzBuzz(num){
    for(let i = 1; i < num + 1; i ++){
        console.log(i % 15 === 0 ? 'fizzbuzz' : i % 5 === 0 ? 'buzz' : i % 3 === 0 ? 'fizz' : i);
    }
}
// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(fizzBuzz(30));