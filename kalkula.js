const calculator = {            //deklarasi variabel
    displayNumber: '0',          // display number string 0
    operator: null,             // operator tidak diketahui nilainya
    firstNumber: null,          // firstNumber juga tidak diketahu nilainya
    waitingForSecondNumber: false //kondisi angka kedua 
};

function updateDisplay() {                                                         //fungsi untuk mengupdate display 
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;   // mendapatkan objek display number dengan menambahkan inner text untuk terus menampilkan. data ditammpilkan pada html id #displayNumber 
}

function clearCalculator() {                                       // untuk mereset angka kalkulator. semua dikembalikan ke settingan reset awal
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {                                       // fungsi untuk menambahkan angka 
    if (calculator.displayNumber === '0') {                           // jika nilai type data claculator. display number  adalah 0
        calculator.displayNumber = digit;                           // digit akan ditampilkan ke calculator.displayNumber
    } else {
        calculator.displayNumber += digit;                          // ketika bukan 0 maka digit yang ditampilkan akan terus bertambh

    }
}

function inverseNumber() {                                          //untuk membuat nilai negatif atau positif 
    if (calculator.displayNumber === '0') {                           // kalo kalkulator display adalah 0 yasudah
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;        // kalo nggak harus dikali min 1
}

function handleOperator(operator) {                                  // fungsi untuk menghandle operator 
    if (!calculator.waitingForSecondNumber) {                        // jika keadaan sebelumnya tidak sama 
        calculator.operator = operator;                               // opeator akan disimpan di calculator. operator
        calculator.waitingForSecondNumber = true;                    // keadaaan menjadi true
        calculator.firstNumber = calculator.displayNumber;          // claculator . display number akan menjad first number 
        calculator.displayNumber ='0';                               //setelah menekan operator maka first number akan menjdi nilai depan dari display number. oleh karena itu nilainya adalah 0;


    }

    else {
        alert('operator sudah ditetapkan');
    }
}


function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("anda belum menetapkan operator");
        return;
    }

    let result = 0;

    if (calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }

    calculator.displayNumber = result;
}

const buttons = document.querySelectorAll(".button");                  //select button from HTML
for (let button of buttons) {
    // variabel button of buttons
    button.addEventListener('click', function (event) {                  // listener menggunakan klik. mendapatkan fungsi even

        // mendapatkan objek elemen yang diklik
        const target = event.target;
        if (target.classList.contains('clear')) {                        // mendapatkan object clear 
            clearCalculator();                                          // panggil fungsi kalkulator clear 
            updateDisplay();                                            // panggil fungsi update display
            return;
        }                                                    // stop mengeksekusi fungsi 

        if (target.classList.contains('negative')) {                      // mendapatkan object negative
            inverseNumber();                                             // membuat angka negatif
            updateDisplay();                                             // update display
            return;
        }

        if (target.classList.contains('equals')) {                        //mendapatkan object sama dengan
            performCalculation();                                       // memanggil fungsi performcalculation
            updateDisplay();                                            // update display
            return;                                                     // stop mengeksekusi fungsi 
        }

        if (target.classList.contains('operator'))                       // mendapatkan object operator
        {
            handleOperator(target.innerText);                           // memanggil fungsi handle operator dengan argumen target.inner text untuk menambahkan text
            //updateDisplay();                                            // update display
            return;                                                     // stop ekseskusi fungsi 
        }
        inputDigit(target.innerText);                                    // memanggil input digit dengan argumen inner text untuk menambakan digit
        updateDisplay();                                                 // update display
    });


}

