const { capitalize, reverseString, calculator, caesarCipher, analyzeArray } = require('./functions');

test('capitalize: makes first character uppercase', () => {
  expect(capitalize('hello')).toBe('Hello');
  expect(capitalize('world')).toBe('World');
  expect(capitalize('javaScript')).toBe('JavaScript');
  expect(capitalize('')).toBe('');
});

test('reverseString: reverses the string', () => {
  expect(reverseString('hello')).toBe('olleh');
  expect(reverseString('JavaScript')).toBe('tpircSavaJ');
  expect(reverseString('a')).toBe('a');
});

test('calculator: add, subtract, multiply, divide', () => {
  expect(calculator.add(2, 3)).toBe(5);
  expect(calculator.subtract(5, 2)).toBe(3);
  expect(calculator.multiply(3, 4)).toBe(12);
  expect(calculator.divide(10, 2)).toBe(5);
  expect(() => calculator.divide(1, 0)).toThrow('Cannot divide by zero');
});

test('caesarCipher: shifts letters with wrapping, case, and punctuation', () => {
  expect(caesarCipher('xyz', 3)).toBe('abc');
  expect(caesarCipher('HeLLo', 3)).toBe('KhOOr');
  expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!');
  expect(caesarCipher('abc', 29)).toBe('def');
  expect(caesarCipher('def', -3)).toBe('abc');
});

test('analyzeArray: returns average, min, max, length', () => {
  const result = analyzeArray([1, 8, 3, 4, 2, 6]);
  expect(result).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6
  });
  expect(() => analyzeArray([])).toThrow('Array must not be empty');
});
