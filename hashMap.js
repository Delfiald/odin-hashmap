class Node{
  constructor(key, value){
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

class HashMap{
  constructor(initialCapacity = 16, loadFactor = .75) {
    this.capacity = initialCapacity
    this.loadFactor = loadFactor
    this.size = 0
    this.buckets = new Array(this.capacity)
  }

  checkIndex(index){
    if(index < 0 || index >= this.buckets.length){
      throw new Error("Trying to access index out of bound")
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for(let i = 0; i < key.length; i++){
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    let bucketIndex = this.hash(key) % this.capacity;
    this.checkIndex()

    if(!this.buckets[bucketIndex]) {
      this.buckets[bucketIndex] = new Node(key, value);
      this.size++;
    }else {
      let current = this.buckets[bucketIndex]
      while(current) {
        if(current.key === key) {
          current.value = value
          return;
        }

        if(!current.nextNode){
          current.nextNode = new Node(key, value);
          this.size++;
          break;
        }
        current = current.nextNode;
      }
    }

    if (this.size > this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  resize() {
    const tempBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    tempBuckets.forEach(current => {
      while(current) {
        this.set(current.key, current.value)
        
        current = current.nextNode
      }
    });
  }

  get(key) {
    let bucketIndex = this.hash(key) % this.capacity;
    this.checkIndex()

    if(this.buckets[bucketIndex]){
      let currentNode = this.buckets[bucketIndex];
      while(currentNode){
        if(currentNode.key === key){
          return currentNode.value
        }

        currentNode = currentNode.nextNode
      }
    }

    return null
  }

  has(key) {
    let bucketIndex = this.hash(key) % this.capacity;
    this.checkIndex()

    if(this.buckets[bucketIndex]){
      let currentNode = this.buckets[bucketIndex];
      while(currentNode){
        if(currentNode.key === key){
          return true
        }

        currentNode = currentNode.nextNode
      }
    }

    return false
  }

  remove(key) {
    let bucketIndex = this.hash(key) % this.capacity;
    this.checkIndex()

    if(this.buckets[bucketIndex]){
      if(this.buckets[bucketIndex].key === key){
        this.buckets[bucketIndex] = this.buckets[bucketIndex].nextNode
        this.size--;
      }else{
        let currentNode = this.buckets[bucketIndex];
        let previousNode = null;

        while(currentNode){
          if(currentNode.key === key){
            if(previousNode){
              previousNode.nextNode = currentNode.nextNode;
            }
            this.size--;
            break;
          }
          previousNode = currentNode;
          currentNode = currentNode.nextNode
        }
      }

      if(this.size <= Math.floor(this.capacity / 2) * this.loadFactor && this.capacity > 16){
        this.resizeDown()
      }

      return true;
    }

    return false
  }

  resizeDown() {
    const tempBuckets = this.buckets;
    this.capacity = Math.floor(this.capacity / 2);
    this.buckets = new Array(this.capacity);
    this.size = 0;

    tempBuckets.forEach(current => {
      while(current) {
        this.set(current.key, current.value)
        
        current = current.nextNode
      }
    });
  }

  length() {
    return this.size;
  }

  clear() {
    this.capacity = 16
    this.buckets = new Array(this.capacity);
    this.size = 0
  }

  keys() {
    const returnArray = []
    this.buckets.forEach(current => {
      while(current) {
        returnArray.push(current.key)
        
        current = current.nextNode
      }
    })

    return returnArray;
  }

  values() {
    const returnArray = []
    this.buckets.forEach(current => {
      while(current) {
        returnArray.push(current.value)
        
        current = current.nextNode
      }
    })

    return returnArray;
  }

  entries() {
    const returnArray = []
    this.buckets.forEach(current => {
      while(current) {
        returnArray.push([current.key, current.value])
        
        current = current.nextNode
      }
    })

    return returnArray;
  }
}

class HashSet{
  constructor() {

  }
}

const test = new HashMap()
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.get('hat')); // Output: black

test.set('apple', 'green'); // Rewrite value from 'red' to 'green'
test.set('banana', 'ripe yellow'); // Rewrite value from 'yellow' to 'ripe yellow'
test.set('dog', 'dark brown'); // Rewrite value from 'brown' to 'dark brown'

console.log(test.get('apple')); // Output: green
console.log(test.get('banana')); // Output: ripe yellow
console.log(test.get('dog')); // Output: dark brown

test.set('moon', 'silver'); // it will trigger resizing

console.log(`New Capacity: ${test.capacity}`); // Output: capacity * 2

console.log(test.get('moon')); // Output: silver
console.log(test.get('grape')); // Output: purple

console.log(test.has('apple')); // Output: true
console.log(test.has('banana')); // Output: true
console.log(test.has('nonexistent')); // Output: false

test.remove('hat'); // remove 'hat'
console.log(test.get('hat')); // Output: null

console.log(test.length()); // Output: total key right now

test.remove('grape'); // remove 'grape'
console.log(test.length()); // Output: total key right now

test.clear(); // remove all elements from map
console.log(test.length()); // Output: 0

console.log(test.keys()); // Output: []
console.log(test.values()); // Output: []
console.log(test.entries()); // Output: []
