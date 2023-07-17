class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }

  push(val) {
    let node = new Node(val);

    if (!this.top) {
      this.top = node;
    } else {
      let temp = this.top;
      this.top = node;
      this.top.next = temp;
    }

    this.size++;
  }

  pop() {
    if (!this.top) throw new Error("Can't pop from an empty stack.");

    let temp = this.top;

    this.top = this.top.next;
    this.size--;
    return temp.val;
  }

  peek() {
    return this.top.val;
  }

  isEmpty() {
    return this.size === 0;
  }
}

module.exports = Stack;
