/*
 * Задача 7: «Анаграмма»
 *
 * Два слова называют анаграммами, если они состоят из одних и тех же букв.
 * Напишите функцию, проверяющую, являются ли две строки анаграммами друг друга
 * (регистр букв не имеет значения). Для простоты примите, что в этих строках
 * нет пробелов и знаков препинания.
 * 
*/

function anagram(str1, str2) {
    if(str1.length !== str2.length){
        return false;
    }
    const str1Clean = str1.match(/[a-zA-Zа-яА-Я]/ig).join('').toLowerCase();
    const str2Clean = str2.match(/[a-zA-Zа-яА-Я]/ig).join('').toLowerCase();
    let letters = {};
    for(let i = 0; i < str1.length; i++){
        letters[str1Clean[i]] === undefined ? letters[str1Clean[i]] = 1 : letters[str1Clean[i]]++;
    };
    for(let i = 0; i < str2Clean.length; i++){
        letters[str2Clean[i]] === undefined ? false : letters[str2Clean[i]]--;
        if(letters[str2Clean[i]] < 0){
            return false;
        }
    }
    return true;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(anagram('finder', 'Friend')); // true
console.log(anagram('hello', 'bye')); // false
console.log(anagram('up', 'UP')); // true