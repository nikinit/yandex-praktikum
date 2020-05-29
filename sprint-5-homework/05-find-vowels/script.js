/*
 * Задача 5: «Найти гласные»
 *
 * Напишите функцию findVowels(str), принимающую на вход кириллическую
 * строку str  и возвращающую количество гласных, содержащихся в этой строке.
 * Для вашего удобства вот массив кириллических гласных:
 * 
 * ['а', 'я', 'о', 'ё', 'у', 'ю', 'ы', 'и', 'э', 'е'].
 *
*/

// function findVowels(str) {
//     const vowels = ['а', 'я', 'о', 'ё', 'у', 'ю', 'ы', 'и', 'э', 'е'];
//     let count = 0;
//     str = str.split('');
//     str.filter(function(letter, index, arr){
//         if (vowels.includes(letter.toLowerCase())){
//             count++;
//         };
//     });
//     return count;
// }

function findVowels(str){
    const count = str.match(/[аяоёуюыиэе]/gi);
    return count ? count.length : 0;
}
// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(findVowels('здравствуй')); // 2
console.log(findVowels('привет')); // 2
console.log(findVowels('хеллоу')); // 3