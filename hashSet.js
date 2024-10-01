class Node{
  constructor(key){
    this.key = key;
    this.nextNode = null
  }
}

class HashSet{
  constructor(initialCapacity = 16, loadFactor = .75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = new Array(this.capacity);
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

  set(key) {
    let bucketIndex = this.hash(key) % this.capacity;
    this.checkIndex(bucketIndex)

    if(!this.buckets[bucketIndex]) {
      this.buckets[bucketIndex] = new Node(key);
      this.size++;
    }else {
      let current = this.buckets[bucketIndex]
      while(current) {
        if (current.key === key) {
          return;
        }
        if(!current.nextNode){
          current.nextNode = new Node(key);
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
        this.set(current.key)
        
        current = current.nextNode
      }
    });
  }

  has(key) {
    let bucketIndex = this.hash(key) % this.capacity;
    this.checkIndex(bucketIndex)

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
    this.checkIndex(bucketIndex)

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
        this.set(current.key)
        
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

  entries() {
    const returnArray = []
    this.buckets.forEach(current => {
      while(current) {
        returnArray.push(current.key)
        
        current = current.nextNode
      }
    })

    return returnArray;
  }
}

const test = new HashSet()
test.set('apple')
test.set('banana')
test.set('carrot')
test.set('dog')
test.set('elephant')
test.set('frog')
test.set('grape')
test.set('hat')
test.set('ice cream')
test.set('jacket')
test.set('kite')
test.set('lion')

// Check the size of the HashSet after adding keys
console.log(test.length()); // Expected output: 12 (total number of unique keys)

// Check if certain keys exist in the HashSet
console.log(test.has('apple'));       // Expected output: true (key exists)
console.log(test.has('banana'));      // Expected output: true (key exists)
console.log(test.has('grape'));       // Expected output: true (key exists)
console.log(test.has('not_exists'));   // Expected output: false (key does not exist)

// Remove a key from the HashSet
test.remove('banana');      // Removing 'banana' should succeed
console.log(test.length());  // Expected output: 11 (one less than before)

// Check if the removed key still exists
console.log(test.has('banana')); // Expected output: false (key has been removed)

// Clear the HashSet
test.clear();
console.log(test.length()); // Expected output: 0 (all keys should be removed)

// Check if a key exists after clearing
console.log(test.has('apple')); // Expected output: false (HashSet is empty)