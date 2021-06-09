const shift = (A, K) => {
    // write your code in JavaScript (Node.js 4.0.0)
    
    let result = [];
    
    if(A.length === 1 || K === 0) {
        return A;
    }
    
    for(let i = 0; i < A.length; i++) {
        let newPos = ( i + K ) % A.length;
        
        result[newPos] = A[i];
    }
    
    return result;
}

/**
 * [1,2,3,4,5]
 * K = 2
 * newPos = ( 0 + 2 ) % 5 = 2
 * newPos = ( 1 + 2 ) % 5 = 3
 * newPos = ( 2 + 2 ) % 5 = 4
 * newPos = ( 3 + 2 ) % 5 = 0
 * newPos = ( 4 + 2 ) % 5 = 1
 * newPos = ( 4 + 2 ) % 5 = 1
 * 
 * 
 */