// 5.Permutacje –porządek minimalnych zmian
// Jordan Michalak
// s449340

//Działanie algorytmu: znajdz największą liczbę i zamień ją z sąsiadem na którego patrzy kierunek < 


const btn1 = document.querySelector('button:nth-of-type(1)');
const btn2 = document.querySelector('button:nth-of-type(2)');
const dataIn = document.querySelector('#number');
const result = document.querySelector('.result');
const footer = document.querySelector('footer');
  
const toRight = 1; 
const toLeft = 0; 
let resultBuffor = [];

// Obliczanie silni
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
    
    //Wypisanie pierwszej permutacji
    for (let i = 0; i < n; i++) { 
        a[i] = i + 1; 
        resultBuffor[i] = a[i];    // 1,2,3,4
    }

    resultBuffor.push(' ');
     //Ustawienie dla każdej cyfry od 1 do n kierunku w lewą stronę  < 1 < 2 < 3 < 4
    for (let i = 0; i < n; i++) 
        dir[i] =  toLeft; 
  
    //Generowanie pojedyńczych permutacji n! razy      
    for (let i = 1; i < factorialize(n); i++) 
        showSinglePermutation(a, dir, n);    

    result.innerHTML = `${resultBuffor}`;
} 

//Pokaz pojedyncza permutacje
const showSinglePermutation = (a, dir, n) => {

    let max = getMaxNumber(a, dir, n);  // -> 4 
    let maxPos = findMaxPos(a, n, max); // -> 4
  
    //Jeżeli kierunek jest na LEWO zamiana dwóch sąsiadów a b -> b a
    if (dir[a[maxPos - 1] - 1] ==  toLeft){
        let b; 
        b = a[maxPos-2]; // -> 3
        a[maxPos-2] = a[maxPos-1]; // 3 = 4
        a[maxPos-1] = b;   // 4 = 3
    }
   
    //Jezeli kierunek jest ustawiony na PRAWO
    else if (dir[a[maxPos - 1] - 1] == toRight){
        let b; 
        a[maxPos], a[maxPos-1]; // -> 4 , 3
        b = a[maxPos-1];  // -> 3
        a[maxPos-1] = a[maxPos]; // 3 = 4
        a[maxPos] = b;   // 4 = 3 
    }
  
    for (let i = 0; i < n; i++) { 
        if (a[i] > max) { // 4
            if (dir[a[i] - 1] == toRight) // 3 
                dir[a[i] - 1] = toLeft; // zmiana z PRAWO na LEWO np 1 > 2 > 3 > 4 - 1 > 2 > 3 < 4
            else if (dir[a[i] - 1] == toLeft) 
                dir[a[i] - 1] = toRight; 
        } 
    } 

    for (let i = 0; i < n; i++){
        resultBuffor.push(a[i]);
    }
    resultBuffor.push(` `);

} 

// Szukanie największej liczby
const getMaxNumber = (a, dir, n) => {
    let max = 0; 
    for (let i = 0; i < n; i++) {
        //Jżeli poprzedni kierunek ustawiony jest na LEWO  to jeżeli aktualna licba jest większa od poprzedniej to teraz ta liczba jest największa 
        if (dir[a[i]-1] == toLeft && i!=0) { 
            if (a[i] > a[i-1] && a[i] > max) { 
                max = a[i]; 
            } 
        } 
        
        //Jeżeli poprzedni kierunek ustawiony jest na PRAWO to jeśli aktualna liczba jest większa od następnej to teraz aktualna liczba jest największą
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
    
    
