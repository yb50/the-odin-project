function ensureInBounds(index, buckets) {
  if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bounds");
  }
}

class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.loadFactor = loadFactor;
    this.capacity = initialCapacity;
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  hash(key) {
    if (typeof key !== "string") {
      throw new Error("Keys must be strings.");
    }
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * prime + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    ensureInBounds(index, this.buckets);

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    for (let pair of this.buckets[index]) {
      if (pair.key === key) {
        pair.value = value;
        return;
      }
    }

    this.buckets[index].push({ key, value });
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize(this.capacity * 2);
    }
  }

  get(key) {
    const index = this.hash(key);
    ensureInBounds(index, this.buckets);

    const bucket = this.buckets[index];
    if (!bucket) return null;

    for (let pair of bucket) {
      if (pair.key === key) {
        return pair.value;
      }
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);
    ensureInBounds(index, this.buckets);

    const bucket = this.buckets[index];
    if (!bucket) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  keys() {
    const result = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          result.push(pair.key);
        }
      }
    }
    return result;
  }

  values() {
    const result = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          result.push(pair.value);
        }
      }
    }
    return result;
  }

  entries() {
    const result = [];
    for (let bucket of this.buckets) {
      if (bucket) {
        for (let pair of bucket) {
          result.push([pair.key, pair.value]);
        }
      }
    }
    return result;
  }

  resize(newCapacity) {
    const oldBuckets = this.buckets;
    this.capacity = newCapacity;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    for (let bucket of oldBuckets) {
      if (bucket) {
        for (let pair of bucket) {
          this.set(pair.key, pair.value);
        }
      }
    }
  }
}