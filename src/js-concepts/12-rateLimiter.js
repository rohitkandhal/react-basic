
class TokenBucket {
  maxBucketSize;
  refillRate;

  currBucketSize;
  lastRefillTimestamp;

  constructor(maxBucketSize = 5, refillRate = 2) {
    this.maxBucketSize = maxBucketSize;
    this.refillRate = refillRate;

    this.currBucketSize = maxBucketSize;
    this.lastRefillTimestamp = Date.now();
  }

  allowRequest(tokensRequired = 1) {
    this.refill();

    if (this.currBucketSize > tokensRequired) {
      this.currBucketSize -= tokensRequired;

      return true;
    }

    return false;
  }

  refill() {
    const now = Date.now();
    const tokensToAdd = (now - this.lastRefillTimestamp) * this.refillRate / 60000;
    this.currBucketSize = Math.min(this.currBucketSize + tokensToAdd, this.maxBucketSize);
    this.lastRefillTimestamp = now;
  }
}