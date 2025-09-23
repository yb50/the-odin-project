function capitalize(str) {
  if (str.length === 0) return '';
  return str[0].toUpperCase() + str.slice(1);
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
  multiply(a, b) {
    return a * b;
  },
  divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
  }
};

function caesarCipher(str, shift) {
  const norm = ((shift % 26) + 26) % 26;
  return str.split('').map(char => {
    if (/[a-z]/.test(char)) {
      const code = char.charCodeAt(0) - 97;
      return String.fromCharCode(((code + norm) % 26) + 97);
    } else if (/[A-Z]/.test(char)) {
      const code = char.charCodeAt(0) - 65;
      return String.fromCharCode(((code + norm) % 26) + 65);
    }
    return char;
  }).join('');
}

function analyzeArray(arr) {
  if (arr.length === 0) throw new Error('Array must not be empty');
  const sum = arr.reduce((a, b) => a + b, 0);
  return {
    average: sum / arr.length,
    min: Math.min(...arr),
    max: Math.max(...arr),
    length: arr.length
  };
}

const object = analyzeArray([1, 8, 3, 4, 2, 6]);

console.log(object);
console.log(object.average);
console.log(object.min);
console.log(object.max);
console.log(object.length);

module.exports = { capitalize, reverseString, calculator, caesarCipher, analyzeArray };
