class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(val) {
    const node = new Node(val);

    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Can't dequeue from an empty queue.");
    }

    const dequeuedValue = this.head.val;

    if (this.head === this.tail) {
      this.tail = null;
    }

    this.head = this.head.next;
    this.size--;

    return dequeuedValue;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.head.val;
  }

  isEmpty() {
    return this.size === 0;
  }
}

module.exports = Queue;
