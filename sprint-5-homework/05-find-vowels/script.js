function findVowels(str){
    const count = str.match(/[аяоёуюыиэе]/gi);
    return count ? count.length : 0;
}
// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(findVowels('здравствуй')); // 2
console.log(findVowels('привет')); // 2
console.log(findVowels('хеллоу')); // 3