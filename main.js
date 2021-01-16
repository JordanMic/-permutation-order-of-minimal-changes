// 5.Permutacje –porządek minimalnych zmian
// Jordan Michalak
// s449340

const btn1 = document.querySelector('button:nth-of-type(1)');
const btn2 = document.querySelector('button:nth-of-type(2)');
const dataIn = document.querySelector('#number');
const result = document.querySelector('.result');
const footer = document.querySelector('footer');
  
const toRight = 1; 
const toLeft = 0; 
let resultBuffor = [];

const factorialize = (num) => {
    if (num < 0) 
          return -1;
    else if (num == 0) 
        return 1;
    else {
        return (num * factorialize(num - 1));
    }
  }

const showPermutation = (n) => { 
    let a = [n]; 
    let dir = [n]; 
    
    for (let i = 0; i < n; i++) { 
        a[i] = i + 1; 
        resultBuffor[i] = a[i];   
    }

    resultBuffor.push(' ');

    for (let i = 0; i < n; i++) 
        dir[i] =  toLeft; 
      
    for (let i = 1; i < factorialize(n); i++) 
        showSinglePermutation(a, dir, n);    

    result.innerHTML = `${resultBuffor}`;
} 


const showSinglePermutation = (a, dir, n) => {

    let max = getMaxNumber(a, dir, n);  // -> 4 
    let maxPos = findMaxPos(a, n, max); // -> 4
  
    if (dir[a[maxPos - 1] - 1] ==  toLeft){
        let b; 
        b = a[maxPos-2]; 
        a[maxPos-2] = a[maxPos-1]; 
        a[maxPos-1] = b; 
    }
   
    else if (dir[a[maxPos - 1] - 1] == toRight){
        let b; 
        a[maxPos], a[maxPos-1]; 
        b = a[maxPos-1];  
        a[maxPos-1] = a[maxPos]; 
        a[maxPos] = b;  
    }
  
    for (let i = 0; i < n; i++) { 
        if (a[i] > max) {
            if (dir[a[i] - 1] == toRight) 
                dir[a[i] - 1] = toLeft; 
            else if (dir[a[i] - 1] == toLeft) 
                dir[a[i] - 1] = toRight; 
        } 
    } 

    for (let i = 0; i < n; i++){
        resultBuffor.push(a[i]);
    }
    resultBuffor.push(` `);

} 


const getMaxNumber = (a, dir, n) => {
    let max = 0; 
    for (let i = 0; i < n; i++) {
        if (dir[a[i]-1] == toLeft && i!=0) { 
            if (a[i] > a[i-1] && a[i] > max) { 
                max = a[i]; 
            } 
        } 
        
        if (dir[a[i]-1] == toRight && i!=n-1) { 
            if (a[i] > a[i+1] && a[i] > max) { 
                max = a[i]; 
            } 
        } 
    }
     
    if (max == 0) 
        return 0; 
    else
        return max; 
} 

const findMaxPos = (a,  n, max) => { 
    for (let i = 0; i < n; i++) 
        if (a[i] == max) 
           return i + 1; 
} 
  
  
btn1.addEventListener('click', function(){
    if(dataIn.value != ''){
        if(result.innerHTML != '' && result.innerHTML != `Musisz podać liczbę`){
            result.innerHTML = 'Aby pokazywany wynik był prawidłowy najpierw wsciśnij "WYCZYŚĆ" i spróbuj ponownie'
        }
        else{
        showPermutation(dataIn.value);
        }
    }
    else{
        result.innerHTML = `Musisz podać liczbę`
    }   
})

btn2.addEventListener('click', function(){
    location.reload();
})
    
