// 5.Permutacje –porządek minimalnych zmian
// Jordan Michalak
// s449340

const btn1 = document.querySelector('button:nth-of-type(1)');
const btn2 = document.querySelector('button:nth-of-type(2)');
const dataIn = document.querySelector('#number');
const result = document.querySelector('.result');
const footer = document.querySelector('footer');
  
let toRight = true; 
let toLeft = false; 
let resultBuffor = [];


function printPermutation(n) { 
    let a = [n]; 
    let dir = [n]; 
  
    for (let i = 0; i < n; i++) { 
        a[i] = i + 1; 
        console.log(a[i]);
        resultBuffor[i] = a[i]; 
    }

    resultBuffor.push(' ');
     
    for (let i = 0; i < n; i++) 
        dir[i] =  toLeft; 
  
    for (let i = 1; i < fact(n); i++) 
        printOnePerm(a, dir, n);
     
    result.innerHTML = `${resultBuffor}`;
} 

function printOnePerm(a, dir, n) {

    let max = getMaxNumber(a, dir, n); 
    let pos = searchArr(a, n, max); 
  
    if (dir[a[pos - 1] - 1] ==  toLeft){
        let b; 
        b = a[pos-2];
        a[pos-2] = a[pos-1];
        a[pos-1] = b;
    }
  
    else if (dir[a[pos - 1] - 1] == toRight){
        let b; 
        a[pos], a[pos-1]; 
        b = a[pos-1];
        a[pos-1] = a[pos];
        a[pos] = b;
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
        console.log(a[i]);
        resultBuffor.push(a[i]);
    }
    resultBuffor.push(` `);
    console.log(" ");
} 

function getMaxNumber(a, dir, n) {

    let maxPrev = 0, max = 0; 
    for (let i = 0; i < n; i++) { 
        if (dir[a[i]-1] == toLeft && i!=0) { 
            if (a[i] > a[i-1] && a[i] > maxPrev) { 
                max = a[i]; 
                maxPrev = max; 
            } 
        } 
  
        if (dir[a[i]-1] == toRight && i!=n-1) { 
            if (a[i] > a[i+1] && a[i] > maxPrev) { 
                max = a[i]; 
                maxPrev = max; 
            } 
        } 
    } 
  
    if (max == 0 && maxPrev == 0) 
        return 0; 
    else
        return max; 
} 

function searchArr(a,  n, max) { 
    for (let i = 0; i < n; i++) 
        if (a[i] == max) 
           return i + 1; 
} 

function fact(n) { 
    let res = 1; 
    for (let i = 1; i <= n; i++) 
        res = res * i; 
    return res; 
} 
  
  
btn1.addEventListener('click', function(){
    if(dataIn.value != ''){
        if(result.innerHTML != '' && result.innerHTML != `Musisz podać liczbę`){
            result.innerHTML = 'Aby pokazywany wynik był prawidłowy najpierw wsciśnij "WYCZYŚĆ" i spróbuj ponownie'
        }
        else{
        printPermutation(dataIn.value);
        }
    }
    else{
        result.innerHTML = `Musisz podać liczbę`
    }   
})

btn2.addEventListener('click', function(){
    location.reload();
})
    
