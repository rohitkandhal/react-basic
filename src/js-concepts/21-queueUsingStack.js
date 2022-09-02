class Stack {
  constructor() {
    this.items = [];
  }

  push(element) { // add element to stack 
    this.items.push(element);
  }
  peek() { // get the top element 
    return this.items[this.items.length - 1]
  }
  pop() {
    return this.items.pop();
  }
  size() { // count of element 
    return this.items.length
  }
}

class Queue {
  stack1;   // All new items goes to stack 1
  stack2;   // Elements are pulled from stack 2

  constructor() {
    this.stack1 = new Stack();
    this.stack2 = new Stack();
  }

  refillStack2() {
    if (this.stack2.size() === 0) {
      if (this.stack1.size() === 0) {
        return null;
      } else {
        while (this.stack1.size() > 0) {
          console.log(this.stack1)
          this.stack2.push(this.stack1.pop())
        }
      }
    }
  }

  enqueue(element) {
    // add new element to the read
    this.stack1.push(element);
  }
  peek() {
    // Refill stack2
    this.refillStack2();

    return this.stack2.peek();
  }
  size() {
    // return count of element
    return this.stack1.size() + this.stack2.size();
  }
  dequeue() {
    // remove the head element
    this.refillStack2();

    return this.stack2.pop();
  }
}


const q = new Queue();
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
console.log(q.dequeue());
console.log(q.dequeue())
console.log(q.dequeue())