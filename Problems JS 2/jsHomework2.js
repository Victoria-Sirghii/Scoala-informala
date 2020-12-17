/** 1.	O functie "getDigits" care primeste un sir de caractere si returneaza cifrele din sirul respectiv.*/

function getDigits(str){
    let numbers = ""
    for (let i = 0; i <= str.length; i++){
        if (str[i] >= 0){
            numbers += str[i];
        }
    }
    return numbers;     
}

/**2.O functie "getLetters" care primeste un sir de caractere si returneaza doar literele din sirul 
respectiv */
function getLetters(str){
    let letters = "";
    for (let i = 0; i < str.length; i++){
        if(str[i].toLowerCase() >= "a" && str[i].toLowerCase() <= "z"){
            letters += str[i];
        }
    }
    return letters;     
}

/**3.	O functie "getFirst5Letters" care primeste un sir de caractere si returneaza primele 5 
    litere(daca exista) */

function getFirst5Letters(str){
    let lettersFound = getLetters(str);
    let result = "";
    for (let i = 0; i <= lettersFound.length; i++){
        result += lettersFound[i];
        if (i === 4){
            return result;
        }
    }
}

/**4.O functie "concatenate" care primeste o lista de siruri de caractere si returneaza sirurile
 *  concatenate */

 function concatenate(array){
    let result = "";
    for (let i = 0; i < array.length; i++){
        result += array[i]
    }
    return result;
 }

/**5.O functie "getAllDigits" care primeste o lista de siruri de caractere si returneaza cifrele din
 *  toate sirurile */

 function getAllDigits(array){
    let result = "";
    for(let i = 0; i < array.length; i++){
        let str = array[i]
        for (let j = 0; j < str.length; j++){
            if (str[j] >= 0){
                result += str[j];
            }
        }
    }
    return result;
}

 /** 6.	O functie "invertAllStrings" care primeste o lista de siruri de caractere si returneaza lista de siruri de caractere inversate*/

 function invertAllStrings(array){
    let result = [];
    for (let i = 0; i < array.length; i++){
        let index = array[i]
        let str = "";

        for (let j = index.length - 1; j >= 0; j--) {
            str += index[j];
        }
        result.push(str);
    }
    return result;
}

 /**7.	Calculeaza factorialul unui numar ("factorial") */
 function factorial(n){
    let result = 1;
    if (n === 0 || n === 1){
        return result;
    } else{
        for(let i = 2; i <= n; i ++){
            result *= i;
        }
    }
     return result;
 }

 /** 8.	Calculeaza cel mai mare divizor comun al 2 numere ("cmmdc")*/
 function cmmdc(a,b){
    let result = 0;
    let valoareaMaxima = 0;
    if (a > b){
        valoareaMaxima = a;
    } else {
        valoareaMaxima = b;
    }
    for (let i = 0; i < valoareaMaxima; i++){
        if (a % i === 0 && b % i === 0){
            result = i;
        }
    }
    return result;
 }

/**9.	Calculeaza cel mai mic multiplu comun al 2 numere ("cmmmc") */

function cmmmc(a,b){
    for (let i = 1; i > 0; i++){
        if (i % a === 0 && i % b === 0){
            return i;
        }
    }
}

/**10.	Returneaza un array care sa contina toti divizorii unui numar (ex pentru 64: trebuie sa returneze 
 * [2,4,8,16,32]) ("divizori") */

 function divizori(n){
     let array = []
     for (let i = 2; i < n; i++){
        if (n % i === 0){
             array.push(i);
        }
    } 
    return array;
 }

 /**11.	O functie care verifica daca un numar este palindrom (ex: 121, 1234321) ("palindrom") */

 function palindrom(n){
     let number = n;
     let lastIndex = 0;
     let result = 0;

     while(n){
        lastIndex = n % 10;  
        result = result * 10 + lastIndex;  
        n = Math.floor(n / 10);
    } 
    if (result === number){
        return true;
    } else {
        return false;
    }
}

 /**12.	O functie care sorteaza numerele pare dintr-un sir de numere primit ca parametru. ("sort") */

 function sort(array){
    let evenNumbers = [];
    for (let i = 0; i < array.length; i++){
        if (array[i] % 2 === 0) {
            evenNumbers.push(array[i]);
        }
    }
    let hasBubble = true;
    while (hasBubble){
        hasBubble = false;
        for (let i = 0; i < evenNumbers.length - 1; i++){
            if (evenNumbers[i] > evenNumbers[i + 1]){
                let temp = evenNumbers[i];
                evenNumbers[i] = evenNumbers[i + 1];
                evenNumbers[i + 1] = temp;
                hasBubble = true;     
            }
        }
    }  
    return evenNumbers;
}
 
/**13.	O functie care primeste ca parametru un array de numere. Aceasta sorteaza ascendent numerele pare si descendent numerele 
 * impare, in cadrul aceluiasi array primit ca parameru. ("sortAscDesc") */
function sortAscDesc(array){
    let sortedNumbers = sort(array);
    let oddNumbers = [];

    for (let i = 0; i < array.length; i++){
        if (array[i] % 2 === 1 || array[i] % 2 === -1) {
            oddNumbers.push(array[i]);
        }
    }
    let hasBubble = true;
    while (hasBubble){
        hasBubble = false;
        for (let i = 0; i < oddNumbers.length - 1; i++){
            if (oddNumbers[i] < oddNumbers[i + 1]){
                let temp = oddNumbers[i];
                oddNumbers[i] = oddNumbers[i + 1];
                oddNumbers[i + 1] = temp;
                hasBubble = true;     
            }
        }
    }
    
    for (let i = 0; i < oddNumbers.length; i++){
        sortedNumbers.push(oddNumbers[i])
    }

    return sortedNumbers;
   
}

 /**14.	O functie care primeste 2 parametri(un array si un numar). Folosind binary search verificati daca numarul primit ca parametru 
  * se gaseste in array. ("binarySearch") */

function binarySearch(array, numar){
    let startIndex = 0;
    let endIndex = array.length - 1;

    while (startIndex <= endIndex){
        let middleIndex = Math.floor((startIndex + endIndex) / 2);

        if (numar === array[middleIndex]){
            return true;
        } else if (array[middleIndex] < numar){
            startIndex = middleIndex + 1;
        } else{
            endIndex = middleIndex - 1;
        }
    }
    return false;
}


/**15.	O functie care implementeaza binary search pentru a verifica daca un numar se regaseste intr-un array. 
 * Dupa ce se termina executia functiei trebuie sa returnati de cate ori s-a apelat functia recursiv ("countBinarySearch") */

function countBinarySearch(array, numar){
    let startIndex = 0;
    let endIndex = array.length - 1;
    let count = 0;

    while (startIndex <= endIndex){
        let middleIndex = Math.floor((startIndex + endIndex) / 2);
        count += 1;

        if (numar === array[middleIndex]){
            return count;
        } else if (array[middleIndex] < numar){
            startIndex = middleIndex + 1;
        } else{
            endIndex = middleIndex - 1;
        }
    }
    return count;
}

