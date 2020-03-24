let input = document.getElementById('input');
let output = document.getElementById('output');
let pointCounter = 0;
let symbolCounter = 0;

function insertNumber(number) {

  if ((input.value === '') && (number == 0)){
    addAfterZerro('.');
    return
  } // в пустой инпут если ввели 0 добавит '.'

  if ((+input.value[input.value.length - 1] != input.value[input.value.length - 1]) && (number == 0) && (input.value[input.value.length - 1] != '.')) {
    input.value += 0+'.';
    pointCounter++; 
    symbolCounter = 0;
    return
  } // если последний символ и ввели 0 добавит . 

  input.value += number; // всё кроме условий
  output.value = '';
}

function insertSymbol(symbol){

  if (symbol){
    output.value = '';
  } // чистит архив 

  if ((input.value === '') && (symbol == '-')){
    input.value += symbol;
    symbolCounter++;
    return
  } // вставляет - если инпут пустой 

  if ((input.value.length == 0) && (symbol != '-')){
   return
  } // не допустит вставит != минус если инпут пуст 

  if ((input.value == '-') && (symbol != '-')){
    return
  } // не допускает ввод других символов если в онпуте один -

  if (input.value[input.value.length - 1] == symbol){
   return                                             
  } // не допускает подряд дубликат символа 

  if (+input.value[input.value.length - 1] != input.value[input.value.length - 1]) {
    reset();
    input.value += symbol;
    symbolCounter++; 
    pointCounter = 0;
    return
  } // меняет последний символ на другой

  if (input.value[input.value.length - 1] == '.') {
    reset();
    input.value += symbol;
    symbolCounter++;
    pointCounter = 0;
    return
  } // меняет . на символ

  else {
    input.value += symbol; 
    symbolCounter++;
    pointCounter = 0;
  }
}

function pow(){
  if ((input.value[input.value.length - 1] != +input.value[input.value.length - 1])) {
    input.value = input.value.slice(0,-1);
  }

  if ((input.value != '') && (input.value != '-')){
    output.value = Math.pow(input.value, 2);
    input.value = '';
    return
  }

  else {
    output.value = '';
    return
  }
}

function addAfterZerro (point){
  if (addAfterZerro){
    output.value = '';
  } // чистит архив

  if ((input.value[input.value.length - 1] != +input.value[input.value.length - 1]) && (input.value[input.value.length - 1] != '.')) {
    input.value += 0 + point;
    pointCounter++;
    symbolCounter = 0;
    return
  } // при вводе '.' автоматтически подставит в пустой или если полседний символ отрицательны 0.

  if (input.value[input.value.length - 1] == '.') {
    return
  } // недопускает дубликата ..

  if ((pointCounter == 0) && (symbolCounter == 0) && (input.value !='')) {
    input.value += point;
    pointCounter++;
    
    return
  } // вставляет первую '.'  

  if (((pointCounter > 0) && (symbolCounter != 0)) || ((symbolCounter > 0) && (pointCounter == 0))) {
    input.value += point;
    pointCounter++;
    symbolCounter = 0;
    return
  } // всавляет . в последующие выражения

  if ((symbolCounter == 0) && (pointCounter > 0)) {
    return
  } // не допустит 2 точки между знаками
}

function reset() {
  if (input.value[input.value.length - 1] === '.'){
    pointCounter == 0;
    input.value = input.value.slice(0,-1);
    return
  }
  input.value = input.value.slice(0,-1);
  output.value = '';
}

function clean(){
  pointCounter = 0;
  symbolCounter = 0;
  input.value = '';
  output.value = '';
}

function countPercent() {
  const allArr = input.value.split(/(\W)/); // делим значение инпута на набор отдельных елементов
  let correctArr = allArr.slice(-3); // если в инпуте => 3-x елементов берет последние 3 для работы
console.log(correctArr);

  if ((input.value == '')) {
    output.value = '';
    return
  }

  if (correctArr.length == 3) {

    if (correctArr[1] == '*'){
      let count = correctArr[0] * correctArr[2] / 100;
      allArr.splice(-3, 3, ''+count);  // меняем местами последние два числа 
      input.value = allArr.join('');     // сщединяет все елементы массива для вставки в инпут
      return
    }

    if (correctArr[1] == '/'){
      let count = correctArr[0] / correctArr[2] * 100;
      allArr.splice(-3, 3, ''+count);
      input.value = allArr.join('');
      return
    }
    
    if (correctArr[1] == '+' || '-') {
      let count = correctArr[0] / 100 * correctArr[2];
      let changed = Math.round(eval(correctArr[0] += correctArr[1] += count)*100)/100;
      allArr.splice(-3, 3, ''+changed);
      input.value = allArr.join('');
      return   
    }
  }
}

function count() {
  let value = document.getElementById('input').value;
  if (input.value[input.value.length - 1] != +input.value[input.value.length - 1]){
    reset();
    count();
    return
  } // убирает последний символ для правильного подсчета

  else {
    output.value = Math.round(eval(value)*1000)/1000;
    input.value = '';
    pointCounter = 0;
    symbolCounter = 0;
    return
  }
}
