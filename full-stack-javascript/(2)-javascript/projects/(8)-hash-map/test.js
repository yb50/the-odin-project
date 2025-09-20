const test = new HashMap(16, 0.75);

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log("After initial inserts:");
console.log("length:", test.length());
console.log("capacity:", test.capacity);
console.log("load:", (test.length() / test.capacity).toFixed(2));

test.set('apple', 'crimson');
test.set('banana', 'canary');
test.set('lion', 'sunshine');

console.log("\nAfter overwrites:");
console.log("length:", test.length());
console.log("capacity:", test.capacity);

test.set('moon', 'silver');

console.log("\nAfter growth trigger (insert 'moon'):");
console.log("length:", test.length());
console.log("capacity:", test.capacity);
console.log("load:", (test.length() / test.capacity).toFixed(2));

console.log("\nLookups after resize:");
console.log("apple ->", test.get('apple'));
console.log("banana ->", test.get('banana'));
console.log("moon ->", test.get('moon'));
console.log("unknown ->", test.get('unknown'));

console.log("\nHas checks:");
console.log("has('kite'):", test.has('kite'));
console.log("has('zzz'):", test.has('zzz'));

console.log("\nRemove checks:");
console.log("remove('frog'):", test.remove('frog'));
console.log("remove('frog') again:", test.remove('frog'));
console.log("length after removes:", test.length());

console.log("\nIntrospection:");
console.log("keys():", test.keys());
console.log("values():", test.values());
console.log("entries():", test.entries());

test.clear();
console.log("\nAfter clear:");
console.log("length:", test.length());
console.log("capacity:", test.capacity);
