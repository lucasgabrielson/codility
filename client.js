// const shift = (A, K) => {
//     // write your code in JavaScript (Node.js 4.0.0)
    
//     let result = [];
    
//     if(A.length === 1 || K === 0) {
//         return A;
//     }
    
//     for(let i = 0; i < A.length; i++) {
//         let newPos = ( i + K ) % A.length;
        
//         result[newPos] = A[i];
//     }
    
//     return result;
// }

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


let S = 'id,name,age,score\n1,Jack,NULL,12\n17,Betty,28,11'

const defective = (S) => {
    console.log(S.split(','));
    // turn the string into an array
    S = S.split(',');
    // find all line breaks
    const x = S.filter( x => x.includes('\n'));
    console.log(x);
    let array = []
    // find index of all the line breaks
    for( let i = 0; i < x.length; i++) {
        array.push(S.indexOf(x[i]));
    }
    console.log('array', array)


    let i = 0;
    while( i < array[1] + 1 ) {
        if( S[i].includes('\n') ) {
            // create an array of each row
            let tempArr = S.slice(array[0], array[1] + 1);
            const regex = /^NULL$/g;
            
            if( tempArr.find( x => x.match(regex))) {
                let tempFirstVal = tempArr[0];
                let tempSecondVal = tempArr[tempArr.length - 1]
                let tempFirstValArr = tempFirstVal.split('');
                let firstIndex = tempFirstValArr.indexOf('\n');
                tempFirstVal = tempFirstValArr.slice(0, firstIndex).join('');
                let tempSecondValArr = tempSecondVal.split('');
                let secondIndex = tempSecondValArr.indexOf('\n');
                tempSecondVal = tempSecondValArr.slice(secondIndex).join('');
                let tempVal = tempFirstVal + tempSecondVal;
                S.splice(array[0], 1, tempVal )
                S.splice(array[0] + 1, array[1]-array[0]);
            }
            i = i - 1;
            array.shift();
        }
        i++;
    }
    return S.join(',');
}

defective(S);

/**
 *  let i = 0;
    while( i < S.length ) {
        if( S[i].includes('\n') ) {
            let pos = S.indexOf(S.slice(i).find( x => x.includes('\n') ))
            let tempS = S.slice(i, pos);
            let tempFirstVal = '';
            let tempSecondVal = '';
            if(tempS.find( x => x.includes('NULL')) !== undefined ) {
                tempFirstVal = tempArr[0];
                tempSecondVal = tempArr[tempArr.length - 1]
                let tempFirstValArr = tempFirstVal.split();
                let firstIndex = tempFirstValArr.indexOf('\'')
                tempFirstVal = tempFirstValArr.slice(0, firstIndex).join();
                let tempSecondValArr = tempSecondVal.split();
                let secondIndex = tempSecondValArr.indexOf('\'')
                tempSecondVal = tempSecondValArr.slice(secondIndex).join();
                let tempVal = tempFirstVal + tempSecondVal;
                S = S.splice()
            }
        }
    }

 *     for( let i = 0; i < array.length; i++) {
        let tempArr = S.slice(array[i], array[i+1] + 1)
        let tempFirstVal = '';
        let tempSecondVal = '';
        if( tempArr.find( x => x.includes('NULL')) !== undefined ) {
            tempFirstVal = tempArr[0];
            tempSecondVal = tempArr[tempArr.length - 1]
            let tempFirstValArr = tempFirstVal.split();
            let firstIndex = tempFirstValArr.indexOf('\'')
            tempFirstVal = tempFirstValArr.slice(0, firstIndex).join();
            let tempSecondValArr = tempSecondVal.split();
            let secondIndex = tempSecondValArr.indexOf('\'')
            tempSecondVal = tempSecondValArr.slice(secondIndex).join();
            let tempVal = tempFirstVal + tempSecondVal;
        }
    }
 */

SELECT
  tasks.id,
  tasks.name,
  CASE
    WHEN avg(score ) <= 20 THEN 'Hard'
    WHEN avg(score) <= 60 THEN 'Medium'
    ELSE 'Easy'
  END AS difficulty
FROM tasks JOIN reports ON tasks.id = reports.task_id 
GROUP BY tasks.id, tasks.name
ORDER BY tasks.id; 

