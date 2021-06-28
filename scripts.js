console.log( 'JS' );
  function pigIt(str){
  // returns a string of pig latin
    return str.replace(/(\w)(\w*)(\s|$|[!.?])/g, "\$2\$1ay\$3")
  }

  function longest(s1, s2) {
    // returns a sorted string of unique non repeated characters from two strings
    // combine the strings, sort them, and turn them into an array
    let combined = (s1 + s2).sort().split( '' );
    let longest  = [];
  
    for( i = 0; i < combined.length; i++){
      // push in the value of s1[i] if it is not already present
      if( longest.indexOf(combined[i]) === -1) {
        abArray.push(combined[i]);
      }
    }
    // return a sorted string
    return longest.join( '' );
  }

// function that sorts an array without mutating the original 
function sortCopy(arr) { 
  return arr.slice(0).sort((a,b) => a - b);
}

function queueTime(customers, n) {
  let arr = [];
  let i = 0;
  let k = 0;
  let highest = 0;
  let space = 0;
  let justCheckedOut = 0;
  let addedCustomer = 0;
  let sortedArray = [];
  let timePerTill = [];
  
  sortedArray = [];

  // initially assign customers to their respective tills
  for ( i = 0; i < n; i++ ) {
    arr[i] = customers[i];
    timePerTill[i] = customers[i];
  } 

  // while loop runs until all customers have been assigned to tills
  while(i < customers.length) {
    // preserve original arr
    sortedArray = sortCopy(arr);
    
    // save the value of the person is going to leave next
    justCheckedOut = sortedArray[0];

    // find space of justCheckedOut in arr
    space = arr.indexOf(justCheckedOut);

    // remove lowest value from arr and replace it with the next customer
    // use while loop to remove multiple of the same value 
    while( arr.indexOf(justCheckedOut) != -1 && i < customers.length ) { 
      // record the total time of each customer at any given till
      timePerTill[space] += customers[i];

      // splive in the next customer and increment their time by the amount of the person at the till before them
      arr.splice(space, 1, (customers[i] + justCheckedOut));

      // resort arr after splicing
      sortedArray = sortCopy(arr);

      // update the value of the last customer to leave and where they were located
      justCheckedOut = sortedArray[0];
      space = arr.indexOf(sortedArray[0]);
      i++;
    }

    // reduce the amount of time remaining for people at the till by the amount of time it took for customer who just left
    while( k < n ) {
      arr[k] = arr[k] - justCheckedOut;
      k++;
    }
    // reset value of k
    k = 0;
  } 
  // calculate the longest time spent in line at a till 
  for( x of timePerTill) {
    if( x > k) {
      highest = x;
      k = x;
    }
  }
  return highest;
}

  // how to I keep a running total of the value at each 

  customers = [5, 5, 5];
  let n = 1;



/*

*/

let data = "02|15|59, 2|47|16, 02|17|20, 2|32|34, 2|17|17, 2|22|00, 2|31|41";
let data1 = "0|15|59, 0|16|16, 0|17|20, 0|22|34, 0|19|34, 0|15|0";
let data2 = "02|15|59, 2|47|16, 02|17|20, 2|32|34, 2|32|34, 2|17|17";

function stat(strg) {
  // checks to make sure we were passed a non empty string
  if( strg.length <= 0) {
    return '';
  }
  // variable declaration
  let regexToSec = /(\d+)\|(\d+)\|(\d+)\,?/g
  let regexToHMS = /(\d+)\:(\d+)\:(\d+)/
  let toSec = [];
  let seconds = 0;
  let median = 0;
  let mean = 0;
  let range = 0;
  strg = strg.split( ' ' );

  for( i = 0; i < strg.length; i++) {
  seconds = parseInt(strg[i].replace(regexToSec, "\$1")) * 3600 + parseInt(strg[i].replace(regexToSec, "\$2")) * 60 + parseInt(strg[i].replace(regexToSec, "\$3"));
  toSec[i] = seconds;
  mean += seconds;
  } // end for loop

  toSec.sort((a,b) => a - b);

  range = (toSec[toSec.length - 1] - toSec[0]);
  range = new Date(range * 1000).toISOString().substr(11,8).replace(regexToHMS, "\$1|\$2|\$3");

  if( toSec.length % 2 === 1 ) {
    median = toSec[Math.floor(toSec.length / 2 )];
    median = new Date(median * 1000).toISOString().substr(11,8).replace(regexToHMS, "\$1|\$2|\$3");
  }
  else {
    median = Math.floor((((toSec[ ((toSec.length / 2) - 1) ]) + (toSec[toSec.length / 2 ]))) / 2)
    median = new Date(median * 1000).toISOString().substr(11,8).replace(regexToHMS, "\$1|\$2|\$3");
  }
 
  mean = new Date(Math.floor((mean / toSec.length)) * 1000).toISOString().substr(11,8).replace(regexToHMS, "\$1|\$2|\$3");

  return `Range: ${range} Average: ${mean} Median: ${median}`
}

/*
function stat(strg) {
  // your code convert string to an array. create a new array in seconds
  // sort array from low to high. determine range average and median
  // report results in correct format hh|mm|ss.
  if(strg === ""){
    return "";
  }
  let times = strg.split(" ");
  let regexToHMS = /(\d+)\:(\d+)\:(\d+)/
  let timesseconds = [];
  let runtime = "";
  let totalsec = 0;
  let avgsec = 0;
  let rangesec = 0;
  let mediansec = 0;
  for(i=0; i<times.length;i++){
      runtime = "";
      avgsec = 0;
      runtime = times[i];
      hours = runtime.slice(0, runtime.indexOf("|"));
      minutes = runtime.slice(runtime.indexOf("|") + 1, runtime.indexOf("|") + 3);
      seconds = runtime.slice(runtime.indexOf("|") + 4, runtime.length);
      hours = hours * 3600;
      minutes = minutes * 60;
      timesseconds.push(parseInt(hours) + parseInt(minutes) + parseInt(seconds));
      totalsec += (parseInt(hours) + parseInt(minutes) + parseInt(seconds))
      } // end for loop
      avgsec = Math.floor(totalsec / (times.length));
      avgsec = new Date(avgsec * 1000).toISOString().substr(11,8).replace(regexToHMS, "\$1|\$2|\$3");
      timesseconds.sort(function(a, b){return a-b});
      rangesec = timesseconds[timesseconds.length-1] - timesseconds[0];
      rangesec = new Date(rangesec * 1000).toISOString().substr(11,8).replace(regexToHMS, "\$1|\$2|\$3");
      if(timesseconds.length % 2 !== 1){
        mediansec = (Math.floor((timesseconds[Math.round(timesseconds.length/2)-1]+timesseconds[Math.round(timesseconds.length/2)])/2));
        mediansec = new Date(mediansec * 1000).toISOString().substr(11,8).replace(regexToHMS, "\$1|\$2|\$3");
      }else{
        mediansec = (timesseconds[Math.round(timesseconds.length/2)-1]);
        mediansec = new Date(mediansec * 1000).toISOString().substr(11,8).replace(regexToHMS, "\$1|\$2|\$3");
      }
        return "Range: " + rangesec + " Average: " + avgsec + " Median: " + mediansec;
}

*/

console.log(stat(data2));
/*
const decrypt = (cipher) => {
  let cipherLength = cipher.length;
  let arr = [];
  let decryptArr = [];

  for( i = 0; i < cipherLength; i++){
    cipher.replace(/('\d+'|\s|\d+)/, function(match) {
      arr.push(match);
      cipher = cipher.slice(match.length, cipher.length);
    });  
  }

  for( i = arr.length - 1; i >= 0; i--) {
    if( arr[i][0] === '\'' ) {
      decryptArr.push(String.fromCharCode(arr[i].replace(/\'(\d+)\'/, "\$1")));
    }
    if( arr[i] === ' ') {
      decryptArr.push(' ');
    }
    if( arr[i][0] !== '\'') {
      decryptArr.push(arr[i].split('').reverse().join('').trim()); 
    }
  }

  return decryptArr.join( '' ).replace( /(\u0000)/g, '');
}
*/
const decrypt = (str) => {
  return str
    .replace(/'(.+?)/g, (_,match) => String.fromCharCode(match))
    .split``
    .reverse``
    .join``
}
//console.log(decrypt("'101' 9 '99' '105' '108''65'"));

let arrArray = [];
function replace(str) {
  return str
    .replace(/'(.+?)'/g, (_,x) => 'camel')
    

}

console.log(replace("'101' 9 '99' '105' '108''65'"));
/*
console.log(String.fromCharCode(101));
console.log(String.fromCharCode('101'));
console.log(parseInt('101'));
*/