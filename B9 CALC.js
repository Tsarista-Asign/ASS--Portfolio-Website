alert("nút CALCULATOR = Bài 6a!")
function performCalculation(operation, num1Id, num2Id, resultId) {
    const num1 = parseFloat(document.getElementById(num1Id).value);
    const num2 = parseFloat(document.getElementById(num2Id).value);
    const add = document.getElementById('resultadd');
    const sub = document.getElementById('resultsub');
    const mul = document.getElementById('resultmul');
    const div = document.getElementById('resultdiv');
    let result;
    const remove = document.querySelectorAll('.red');
    remove.forEach(function (element) {
        element.classList.remove('red');
    });

    if (isNaN(num1) || isNaN(num2)) {
        result = "Invalid";
    } else {
        switch (operation) {
            case '+':
                result = num1 + num2;
                add.innerHTML += `<p class = "red margin">${num1} + ${num2} = ${result}</p>`
                break;
            case '-':
                result = num1 - num2;
                sub.innerHTML += `<p class = "red margin">${num1} - ${num2} = ${result}</p>`
                break;
            case '*':
                result = num1 * num2;
                mul.innerHTML += `<p class = "red margin">${num1} * ${num2} = ${result}</p>`
                break;
            case '/':
                if (num2 === 0) {
                    result = "Cannot divide by zero";
                } else {
                    result = num1 / num2;
                    div.innerHTML += `<p class = "red margin">${num1} / ${num2} = ${result}</p>`
                }
                break;
            default:
                result = "Unknown operation";
        }
    }

    document.getElementById(resultId).value = result;
}
function colors() {
    const color = document.getElementById('head');
    if (color.classList.contains('blue')) {
        color.classList.remove('blue');
        color.classList.add('pink');
    }
    else {
        color.classList.add('blue');
        color.classList.remove('pink');
    }
}