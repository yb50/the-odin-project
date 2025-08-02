const palindromes = function (str) {
  const lower = str.toLowerCase();
  const cleaned = lower.replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
};

// Do not edit below this line
module.exports = palindromes;
