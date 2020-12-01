/* 1.O functie "equals" care primeste 2 parametrii si returneaza daca cei 2 parametrii sunt egali, strict*/ 
function equals(a, b){
    if (a === b)
        return true;
    else {
        return false;
    }
}


/* 2.	O functie "compare" care primeste 2 parametrii si returneaza -1 daca primul e mai mic ca al doilea, 
0 daca sunt egale si 1 daca primul e mai mare ca al doilea*/

function compare(a, b){
    if (a < b) {
        return -1;
    } else if ( a === b) {
        return 0;
    } else  {
        return 1;
    }
}

/*3.O functie "max" care primeste 2 parametrii si returneaza maximul dintre cele 2*/

function max(a, b){
    if (a > b){
        return a;
    } else if (a < b){
        return b; 
    } else{
        return a;
    }
}

/*4.O functie "min" care primeste 2 parametrii si returneaza minimul dintre cele 2*/

function min(a, b){
    if (a < b){
        return a;
    } else if (a > b){
        return b; 
    } else {
        return a;
    }
}

/*5.O functie "suma" care primeste 1 parametru, numar intreg si returneaza suma primelor N numere naturale 
pozitive (exemplu: daca N este 3, trebuie sa returneze 6)*/

function suma(n){
    let sumaN = 0;
    for (let i = 0; i <= n; i++) {
        sumaN = sumaN + i;  
        }
    return sumaN
}


/*6.O functie "prim" care primeste 1 parametru si returneaza true/false daca N este numar prim sau nu 
(restul impartirii la 1 si la N ==0)*/

function prim(n){
    if (n === 1){
      return false;
    } else if(n === 2){
      return true;
    } else {
      for(let i = 2; i < n; i++)
      {
        if(n % i === 0){
          return false;
        }
      }
      return true;  
    }
  }


/*7.O functie "sumaPrime" care primeste 1 parametru si returneaza suma primelor N numere prime 
(pentru N=5 trebuie sa returneze 2+3+5+7+11=28)*/

function sumaPrime(n){  
    let sum = 0;
    let primesFound = 0;
    let i = 2;

    while (primesFound < n){
        if(prim(i)){
            sum +=i;
            primesFound +=1;
        }
        i++;         
    }  
    return sum  
}



/*8.O functie "invers" care primeste un parametru de tip numar si intoarce inversul acestuia (ca numar) (123 => 321)*/

function invers(n){
    let numbers = 0;
    let result = 0;

    while(n){
        numbers = n % 10;  
        result = result * 10 + numbers;  
        n = Math.floor(n / 10)
    }  
    return result
}


/*9.O functie "produsImpare" care primeste 1 parametru si returneaza produsul primelor N numere impare pozitive 
(pentru N=5; returneaza 1*3*5*7*9=945)*/

function produsImpare(n){
    let sumaImpare = 1;
    let impareGasite = 0;
    for (let i = 0; impareGasite < n; i++){
        if (i % 2 === 1 && i > 0) {
            impareGasite += 1;
            sumaImpare *= i;}
    }
    return sumaImpare;
}
    

/*10.	O functie "contains" care primeste 2 parametri(arr - array de nr intregi si x - numar) si verifica daca x
 exista in array (rezultatul este true/false)*/

 function contains(array, x){
     for (let i = 0; i < array.length; i++){
         if (array[i] === x) {
            return true;} 
    }
        return false;
 }


 /*11.	O functie "maxArray" care primeste un array si returneaza valoarea maxima (ar trebui sa functioneze si pentru 
    numere si pentru stringuri)*/

function maxArray(array){
    let maxim = -Infinity;
     for(let i = 0; i < array.length; i++) {
        if (array[i] > maxim) {
        maxim = array[i]}
    }
    return maxim;
}


/*12.O functie "sumMinMax" care primeste un array de numere si returneaza suma dintre valoare maxima si valoare minima*/

function sumMinMax(array){
    let maxim = -Infinity;
    let minim = Infinity;
    for(let i = 0; i < array.length; i++) {
        if (array[i] > maxim) {
        maxim = array[i]}
    }
    for(let i = 0; i < array.length; i++) {
        if (array[i] < minim) {
            minim = array[i]}
    }
    return maxim + minim;
}


/*13.O functie "hasDuplicates" care primeste un array si returneaza daca exista duplicate intr-un array primit ca parametru (true/false)*/

function hasDuplicates(array){
    for (let i = 0; i < array.length; i++)  {
        for (let j = 0; j < array.length; j++)  {
            if (i != j) {
                if (array[i] == array[j]) {
                    return true;}
            }
        }
    }
    return false;
}


/*14.O functie "produsPozitive" care primeste un array si returneaza produsul numerelor pozitive intr-un array primit ca parametru*/

function produsPozitive(array){
    let suma = 1;
    for (let i = 0; i < array.length; i++) {
        if (array[i] > 0)
        suma *= array[i];
    }
    return suma;
}


/*15.	O functie "palindrom" care primeste un string si returneaza daca este palindrom (inversul == originalul, 
    ex: "1234321", "55", "787") (true/false)*/

function palindrom(pali){
    for(let i = 0; i <= Math.floor(pali.length / 2); i++)
    {
        if(pali.charAt(i) !== pali.charAt(pali.length - i - 1)){
            return false
        }
    }
    return true;
}
