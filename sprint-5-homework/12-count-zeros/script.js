/*
 * Задача 12: «Посчитать количество нулей»
 *
 * Напишите функцию countZeros(n), принимающую на вход целое неотрицательное
 * число n. Возвращать функция должна количество нулей, содержащихся в аргументе.
 * 
*/

function countZeros(n) {
    let result = 0;
    let iterations = 0;
    for(let i = 10; i < n + 1; i++){
        iterations++;
        if(i.toString().includes('0')){
            let current = i;
            while(current >= 10){
                iterations++;
                if(!(current % 10)){
                    result++;
                }
                current = Math.floor(current / 10);
            }
        }
    }
    console.log(`Iterations: ${iterations}`);
    return result;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(countZeros(20)); // 2 – два нуля, по одному в числах 10 и 20
console.log(countZeros(100)); // 11 – 11 нулей в числах: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100
console.log(countZeros(10000)); // 64
