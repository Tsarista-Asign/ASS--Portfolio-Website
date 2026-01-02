let randomNumber = null;
let difficultyLevel = null;

const overlay = document.getElementById('overlay');
const arlert = document.getElementById('arlert');

// Hàm bắt đầu game khi người dùng nhấn START
function startGame() {
    const difficulty = parseInt(document.getElementById('difficulty').value);

    if (isNaN(difficulty)) {
        document.getElementById('gameSection').style.display = 'none';
        document.getElementById('message').textContent = 'You chưa chọn level!!';
        return;
    } else if (difficulty < 1) {
        document.getElementById('gameSection').style.display = 'none';
        document.getElementById('message').textContent = 'Bạn sợ à ?';
        return;
    } else if (difficulty > 9) {
        document.getElementById('gameSection').style.display = 'none';
        document.getElementById('message').textContent = 'Căng z bruh, tem tém thôi !!';
        return;
    }

    difficultyLevel = difficulty;
    randomNumber = Math.floor(Math.random() * (difficulty + 1));

    document.getElementById('gameSection').style.display = 'block';
    document.getElementById('maxNumber').textContent = difficulty;
    document.getElementById('message').textContent = 'Welcome to Hell';

    generateNumberOptions(difficulty);
    document.addEventListener('keydown', handleKeyPress);
}

// Hàm để giảm giá trị của input level khi người dùng nhấn nút "down"
function decreaseValue() {
    const input = document.getElementById('difficulty');
    let currentValue = parseInt(input.value) || 0;

    if (currentValue > 0) { // Không cho giảm dưới 0
        input.value = currentValue - 1;
    }
}

// Hàm để tăng giá trị của input level khi người dùng nhấn nút "up"
function increaseValue() {
    const input = document.getElementById('difficulty');
    let currentValue = parseInt(input.value) || 0;

    if (currentValue < 9) { // Không cho vượt quá 9
        input.value = currentValue + 1;
    }
}

// Tạo các nút lựa chọn số để người dùng có thể click chọn
function generateNumberOptions(maxNumber) {
    const numberOptions = document.getElementById('numberOptions');
    numberOptions.innerHTML = '';

    for (let i = 0; i <= maxNumber; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = function () {
            checkGuess(i);
        };
        numberOptions.appendChild(button);
    }
}

// Hàm lắng nghe khi người dùng nhấn phím số trên bàn phím
function handleKeyPress(event) {
    const userGuess = parseInt(event.key);

    if (!isNaN(userGuess) && userGuess >= 0 && userGuess <= difficultyLevel) {
        checkGuess(userGuess);
    } else {
        document.getElementById('message').textContent = `Chọn đáp án từ 0 đến ${difficultyLevel}`;
    }
}

// Kiểm tra đáp án người dùng đã chọn
function checkGuess(userGuess) {
    if (userGuess === randomNumber) {
        document.getElementById('message').innerHTML = "";
        document.removeEventListener('keydown', handleKeyPress);
        document.getElementById('noticnt').innerHTML = `<p>The Answer is </p> <p class="numberr">${randomNumber}</p>`;
        overlay.classList.remove('hide');
        arlert.classList.remove('hide');
        overlay.classList.add('show');
        arlert.classList.add('show');
        randomNumber = Math.floor(Math.random() * (difficultyLevel + 1));
    } else {
        randomNumber = Math.floor(Math.random() * (difficultyLevel + 1));
        document.getElementById('message').textContent = `Again 0 - ${difficultyLevel}`;
    }
}

// Ngăn việc click vào nội dung đằng sau
overlay.addEventListener('click', () => {
    overlay.classList.remove('show');
    arlert.classList.remove('show');
    overlay.classList.add('hide');
    arlert.classList.add('hide');
});