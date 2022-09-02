function memo(func, resolver) {
  // your code here
  const dataMap = {};

  return function (...args) {

    const key = resolver ? resolver(...args) : Array.from(args).join('_');

    if (!(key in dataMap)) {
      console.log('Not using cache')
      const result = func.apply(this, args)
      dataMap[key] = result;
    }

    return dataMap[key];
  }
}

function testCase1() {
  const func1 = (arg1, arg2) => {
    return arg1 + arg2
  }

  const memoed1 = memo(func1)

  console.log(memoed1(1, 2))
  // 3, func is called
  console.log(memoed1(1, 2))
  // 3 is returned right away without calling func
  console.log(memoed1(1, 3))
  // 4, new arguments, so func is called
}

function testCase2() {
  const func1 = (arg1, arg2) => {
    return arg1 + arg2
  }
  const memoed2 = memo(func1, () => 'samekey')

  console.log(memoed2(1, 2))
  // 3, func is called, 3 is cached with key 'samekey'
  console.log(memoed2(1, 2))
  // 3, since key is the same, 3 is returned without calling func
  console.log(memoed2(1, 3))
}

function testCase3() {
  let callCount = 0
  const func2 = (a, b) => {
    callCount += 1
    return a + b
  }

  const memoed = memo(func2)

  memoed(1, 2)
  console.log(`callcount ${callCount}`)
  memoed(1, 2)
  console.log(`callcount ${callCount}`)
  memoed(1, 3)
  console.log(`callcount ${callCount}`)
}

testCase3()