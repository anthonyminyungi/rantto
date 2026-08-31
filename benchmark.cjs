const { performance } = require('perf_hooks');

const allNumbers = Array.from({ length: 45 }, (_, i) => i + 1);
const currentNumbers = [3, 12, 19, 21, 35, 42];

// Warmup
for (let i = 0; i < 10000; i++) {
  allNumbers.map(num => !currentNumbers.includes(num));
  const currentNumbersSet = new Set(currentNumbers);
  allNumbers.map(num => !currentNumbersSet.has(num));
}

const iterations = 1000000;

const t0 = performance.now();
for (let i = 0; i < iterations; i++) {
  allNumbers.map(num => !currentNumbers.includes(num));
}
const t1 = performance.now();
console.log(`Array includes (Baseline): ${t1 - t0} ms`);

const t2 = performance.now();
for (let i = 0; i < iterations; i++) {
  const currentNumbersSet = new Set(currentNumbers);
  allNumbers.map(num => !currentNumbersSet.has(num));
}
const t3 = performance.now();
console.log(`Set has (Optimized): ${t3 - t2} ms`);
