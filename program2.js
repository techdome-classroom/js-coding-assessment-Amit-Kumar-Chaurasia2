const decodeTheRing = function (s, p) {

    // write your code here
    const m = s.length;
  const n = p.length;

  // DP table to store if s[0..i-1] matches p[0..j-1]
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(false));

  // Base case: empty string and empty pattern match
  dp[0][0] = true;

  // If the pattern starts with *, it can match an empty string
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === '*') {
      dp[0][j] = dp[0][j - 1];
    }
  }

  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === s[i - 1] || p[j - 1] === '?') {
        // Match single character or '?'
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === '*') {
        // '*' can match empty sequence (dp[i][j-1]) or at least one character (dp[i-1][j])
        dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
      }
    }
  }

  // Return the final result
  return dp[m][n];
};

// Test cases
console.log(decodeTheRing("aa", "a"));     // Output: false
console.log(decodeTheRing("aa", "*"));     // Output: true
console.log(decodeTheRing("cb", "?a"));    // Output: false
console.log(decodeTheRing("abc", "a*c"));  // Output: true
console.log(decodeTheRing("abcdef", "a*def"));  // Output: true
console.log(decodeTheRing("abc", "?*c"));  // Output: true
  
module.exports = decodeTheRing;