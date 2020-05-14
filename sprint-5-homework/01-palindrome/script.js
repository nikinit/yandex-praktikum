function palindrome(str) {
    if(!str){
        return true;
    }
    str = str.match(/[a-zA-Zа-яА-Я]/ig).join('').toLowerCase();
    start = str.slice(0, Math.floor(str.length / 2));
    end = str.slice(Math.round(str.length / 2)).split('').reverse().join('');
    return start === end;
}

// Протестируйте решение, вызывая функцию с разными аргументами:

console.log(palindrome('топот')); // должно быть true
console.log(palindrome('Saippuakivikauppias')); // true
console.log(palindrome('привет')); // false
console.log(palindrome('Ан,.на')); // true
/*
 * Бонус. Задача для любознательных. Пусть функция принимает на вход любую строку,
 * но пробелы и знаки препинания не учитывает. Например:
 * 
 * palindrome('О, лета тело!'); // true
 * 
*/