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

const factorialize = (n) => {
    if (n < 0) 
          return -1;
    else if (n == 0) 
        return 1;
    else {
        return (n * factorialize(n - 1));
    }
  }

const showPermutation = (n) => { 
    let num = [n]; 
    let dir = [n]; 
    
    for (let i = 0; i < n; i++) { 
        num[i] = i + 1; 
        resultBuffor[i] = num[i];   
    }

    resultBuffor.push(' ');

    for (let i = 0; i < n; i++) 
        dir[i] =  toLeft; 
      
    for (let i = 1; i < factorialize(n); i++) 
        showSinglePermutation(num, dir, n);    

    result.innerHTML = `${resultBuffor}`;
} 


const showSinglePermutation = (num, dir, n) => {

    let max = getMaxNumber(num, dir, n);  
    let maxPos = findMaxPos(num, n, max); 
  
    if (dir[num[maxPos - 1] - 1] ==  toLeft){
        let b; 
        b = num[maxPos-2]; 
        num[maxPos-2] = num[maxPos-1]; 
        num[maxPos-1] = b; 
    }
   
    else if (dir[num[maxPos - 1] - 1] == toRight){
        let b; 
        num[maxPos], num[maxPos-1]; 
        b = num[maxPos-1];  
        num[maxPos-1] = num[maxPos]; 
        num[maxPos] = b;  
    }
  
    for (let i = 0; i < n; i++) { 
        if (num[i] > max) {
            if (dir[num[i] - 1] == toRight) 
                dir[num[i] - 1] = toLeft; 
            else if (dir[num[i] - 1] == toLeft) 
                dir[num[i] - 1] = toRight; 
        } 
    } 

    for (let i = 0; i < n; i++){
        resultBuffor.push(num[i]);
    }
    resultBuffor.push(` `);num
} 


const getMaxNumber = (num, dir, n) => {
    let max = 0; 
    for (let i = 0; i < n; i++) {
        if (dir[num[i]-1] == toLeft && i!=0) { 
            if (num[i] > num[i-1] && num[i] > max) { 
                max = num[i]; 
            } 
        } 
        
        if (dir[num[i]-1] == toRight && i!=n-1) { 
            if (num[i] > num[i+1] && num[i] > max) { 
                max = num[i]; 
            } 
        } 
    }
     
    if (max == 0) 
        return 0; 
    else
        return max; 
} 

const findMaxPos = (num,  n, max) => { 
    for (let i = 0; i < n; i++) 
        if (num[i] == max) 
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
    
