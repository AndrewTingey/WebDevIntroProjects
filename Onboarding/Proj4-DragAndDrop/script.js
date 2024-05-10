class MathProblem {
    constructor() {
        this.createProblem();
        this.setProblem();
    }

    createProblem() {
        this.a = Math.floor(Math.random() * 500);
        this.b = Math.floor(Math.random() * 500);
        this.totalInBlocks = 0;
    }

    getresult() {
        return this.a + this.b;
    }

    toString() {
        return `${this.a} + ${this.b} = ?`;
    }

    blockAdded(val) {
        switch (val) {
            case '1':
                this.totalInBlocks += 1;
                break;
            case '2':
                this.totalInBlocks += 2;
                break;
            case '5':
                this.totalInBlocks += 5;
                break;
            case '10':
                this.totalInBlocks += 10;
                break;
            case '100':
                this.totalInBlocks += 100;
                break;
            default:
                console.log("ERROR: unknown block added: " + val);
                break;

        }

        console.log(this.totalInBlocks + " / " + this.getresult());
    }

    blockRemoved(val) {
        switch (val) {
            case '1':
                this.totalInBlocks -= 1;
                break;
            case '2':
                this.totalInBlocks -= 2;
                break;
            case '5':
                this.totalInBlocks -= 5;
                break;
            case '10':
                this.totalInBlocks -= 10;
                break;
            case '100':
                this.totalInBlocks -= 100;
                break;
            default:
                console.log("ERROR: unknown block removed: " + val);
                break;
        }

        console.log(this.totalInBlocks + " / " + this.getresult());
    }

    setProblem() {
        document.getElementById('math_problem').innerText = this.toString();
    }
}

const mathProblem = new MathProblem();
const chunks = document.getElementsByClassName('chunk');
const dropzone = document.getElementById('dropzone');
const toolBox = document.getElementById('right_container');
const checkButton = document.getElementById('check');
const newButton = document.getElementById('new');
let offsetX = 0;
let offsetY = 0;
let draggedElement = null;


//WORKING HERE: figure out how to get the value of the block
for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    chunk.addEventListener('dragstart', (event) => {
        console.log("DRAGSTART:");
        const value = event.target.getAttribute('value');
        event.dataTransfer.setData('text/plain', chunk.id);
        offsetX = event.clientX - chunk.getBoundingClientRect().left;
        offsetY = event.clientY - chunk.getBoundingClientRect().top;
        draggedElement = chunk.cloneNode(true);
        draggedElement.id = 'cloned-' + chunk.id + '-' + Date.now();
        draggedElement.newBlock = true; // Add this line
        draggedElement.value = value;
        event.dataTransfer.setData('text/plain', draggedElement.id);
        console.log("value: " + value);
        console.log("Data set: " + draggedElement.id);
    });
}

dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    console.log("DROP:");
    const data = event.dataTransfer.getData('text/plain');
    if (draggedElement) {
        draggedElement.style.position = 'absolute';
        const blockSize = 25;
        const borderWidth = 1;
        draggedElement.style.left = (Math.round((event.clientX - dropzone.getBoundingClientRect().left - offsetX - borderWidth) / (blockSize + 2 * borderWidth)) * (blockSize + 2 * borderWidth)) + 'px';
        draggedElement.style.top = (Math.round((event.clientY - dropzone.getBoundingClientRect().top - offsetY - borderWidth) / (blockSize + 2 * borderWidth)) * (blockSize + 2 * borderWidth)) + 'px';
        draggedElement.draggable = true;
        draggedElement.addEventListener('dragstart', (event) => {
            console.log("DRAGSTART:");
            draggedElement = event.target;
            offsetX = event.clientX - event.target.getBoundingClientRect().left;
            offsetY = event.clientY - event.target.getBoundingClientRect().top;
            event.dataTransfer.setData('text/plain', draggedElement.id);
            console.log("Data set: " + draggedElement.id);
        });
        dropzone.appendChild(draggedElement);
        if (draggedElement.newBlock) {
            const clonedElement = document.getElementById(data);
            clonedElement.newBlock = false;
            console.log("Data: " + data);
            const value = clonedElement.getAttribute('value');
            mathProblem.blockAdded(value);
            console.log("value: " + value);
        }
    }
});

dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
});

toolBox.addEventListener('dragover', (event) => {
    event.preventDefault();
});

toolBox.addEventListener('drop', (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const element = document.getElementById(data);
    const value = element.getAttribute('value');
    mathProblem.blockRemoved(value);
    element.remove();
});

checkButton.addEventListener('click', () => {
    if (mathProblem.getresult() === mathProblem.totalInBlocks) {
        document.getElementById('result').innerText = mathProblem.totalInBlocks + ' is correct';
        document.getElementById('result').style.color = 'green';
        document.getElementById('result').style.display = 'block';
    } else {
        document.getElementById('result').innerText = 'Incorrect: Expected ' + mathProblem.getresult() + ' but got ' + mathProblem.totalInBlocks;
        document.getElementById('result').style.color = 'red';
        document.getElementById('result').style.display = 'block';
    }
});

newButton.addEventListener('click', () => {
    mathProblem.createProblem();
    mathProblem.setProblem();
    mathProblem.totalInBlocks = 0;
    dropzone.innerHTML = '';
    document.getElementById('result').style.display = 'none';
});