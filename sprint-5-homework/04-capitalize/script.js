/*
 * Задача 4: «С большой буквы»
 *
 * Напишите функцию capitalize(str). Функция должна возвращать новую
 * строку каждое слово в которой начинается с прописной буквы.
 *
*/

function capitalize(str) {
    const words = str.split(' ');
    let capitalised = '';
    words.forEach(function(word, index, arr){
        if(typeof word[0] === 'undefined'){
            capitalised += ' ';
        }
        else{
        capitalised += `${word[0].toUpperCase() + word.slice(1)} `;
        }
    });
    return capitalised.slice(0,-1);
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(capitalize('молодость всё простит')); // "Молодость Всё Простит"
console.log(capitalize('слово '));
console.log(capitalize('Молодость  Всё  Простит'));