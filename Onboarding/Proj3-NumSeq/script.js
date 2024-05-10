class NumGame {
    secretValue = 0;
    questionNumber = 0;
    numRight = 0;
    numWrong = 0;
    
    constructor() {
        this.generateNewProblem();
    }

    checkNumberInput(input) {
        if (input === this.secretValue) {
            return true;
        }
        return false;
    }

    handleSubmit() {
        const userInput = Number(document.getElementById('inputField').value);


        if (typeof userInput !== 'number' || userInput == null || isNaN(userInput)) {
            document.getElementById('result').innerHTML = 'Invalid input. Please enter a number.';
            document.getElementById('result').style.color = 'red';
            console.log('Invalid input. Please enter a number.');
            return;
        }

        if (this.checkNumberInput(userInput)) {
            console.log('Number input is correct!');
            this.setResults(true);
        } else {
            console.log('Number input is incorrect.');
            this.setResults(false);
        }
    }

    generateNewProblem() {
        this.questionNumber++;
        document.getElementById('questionNumber').innerHTML = this.questionNumber;
        document.getElementById('inputField').value = '';
        document.getElementById('result').innerHTML = '';
        
        let isMultiplication = Math.random() < 0.5;
        let secretIntereval = Math.floor(Math.random() * 10) + 1;
        let arraylength = Math.floor(Math.random() * 5) + 3;
        let hidden = Math.floor(Math.random() * arraylength);
        let startValue = Math.floor(Math.random() * 10) + 1;
        let array = [];
        array.push(startValue);
        while (array.length < arraylength) {
            if (isMultiplication) {
                array.push(array[array.length - 1] * secretIntereval);
            } else {
                array.push(array[array.length - 1] + secretIntereval);
            }
        }
        this.setSecretValue(array[hidden]);
        array[hidden] = '_';
        this.setSequence(array);
    }

    setSecretValue(value) {
        this.secretValue = value;
    }

    setSequence(array) {
        document.getElementById('sequence').innerHTML = array.join(', ');
    }

    setResults(result) {
        if (result) {
            this.numRight++;
        } else {
            this.numWrong++;
        }
        document.getElementById('numRight').innerHTML = this.numRight;
        document.getElementById('numWrong').innerHTML = this.numWrong;
        document.getElementById('percentRight').innerHTML = (this.numRight / (this.numRight + this.numWrong) * 100).toFixed(1) + '%';
        document.getElementById('result').innerHTML = result ? 'Correct!' : 'Incorrect. Correct answer is ' + this.secretValue + '.';
        document.getElementById('result').style.color = result ? 'green' : 'red';
    }
}

game = new NumGame();
const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

function handleSubmit() {
    game.handleSubmit();
}

function generateNewProblem() {
    game.generateNewProblem();
}