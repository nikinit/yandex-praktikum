/*
 * Задача 14: «Простые числа»
 *
 * Напишите функцию primes(n). Её единственный аргумент — целое число n.
 * Функция должна возвращать массив простых чисел от 2 до n.
 * 
*/
function isPrime(n) {
    if(n < 2){
        return false;
    }
    for(let i = 2; i < Math.floor(Math.sqrt(n))+1; i++){
        if(!(n % i)){
            return false;
        }
    }
    return true;
}

function primes(n) {
    let res = [];
    for(let i = 2; i < n + 1; i ++){
        if(isPrime(i)){
            res.push(i);
        }
    }
    return res;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(primes(6)); // [2, 3, 5]
console.log(primes(17)); // [2, 3, 5, 7, 11, 13, 17]