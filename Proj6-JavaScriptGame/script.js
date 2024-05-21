class NumberGame {
    constructor() {
        this.card1 = document.getElementById("card1");
        this.card2 = document.getElementById("card2");
        this.card3 = document.getElementById("card3");
        this.card4 = document.getElementById("card4");
        this.operator1 = document.getElementById("operator1");
        this.operator2 = document.getElementById("operator2");
        this.operator3 = document.getElementById("operator3");
        this.operator4 = document.getElementById("operator4");
        this.undoButton = document.getElementById("undo");
        this.score = 0;
        this.numbers = this.generateProblem();
        this.setNumbers();
        this.setListeners();
        this.aCard = null;
        this.bCard = null;
        this.a = null;
        this.b = null;
        this.operator = null;
        this.previousMoves = [];
        this.timeLimit = 60;
    }

    generateProblem() {
        const goal = 24;
        const numberMax = 148;
        const isIntOnly = true;
        this.previousMoves = [];

        let a, b, c, d, e, f, op1, op2, op3;
        do {
            [a, b, op1] = this.splitNumber(goal);
        } while (!this.validNumbers(a, b, numberMax, isIntOnly));

        do {
            [c, d, op2] = this.splitNumber(b);
        } while (!this.validNumbers(c, d, numberMax, isIntOnly));

        do {
            [e, f, op3] = this.splitNumber(a);
        } while (!this.validNumbers(e, f, numberMax, isIntOnly));

        console.log(`${goal} = (${d} ${op2} ${c}) ${op1} (${f} ${op3} ${e})`);

        return [c, d, e, f];
    }

    validNumbers(a, b, numberMax, isIntOnly) {
        if (isIntOnly) {
            return (a % 1 === 0 && b % 1 === 0 && a <= numberMax && b <= numberMax && a !== 0 && b !== 0);
        } else {
            return (a <= numberMax && b <= numberMax && a !== 0 && b !== 0);
        }
    }

    splitNumber(number) {
        let operator = Math.floor(Math.random() * 4);
        let a = Math.floor(Math.random() * number);
        let b = 0;
        switch (operator) {
            case 0:
                b = number - a;
                return [a, b, "+"];
            case 1:
                b = number + a;
                return [a, b, "-"];
            case 2:
                b = number / a;
                return [a, b, "*"];
            case 3:
                b = number * a;
                return [a, b, "/"];
        }
    }

    setNumbers(numbers) {
        document.getElementById("score_value").innerHTML = this.score;
        this.card1.innerHTML = this.numbers[0];
        this.card2.innerHTML = this.numbers[1];
        this.card3.innerHTML = this.numbers[2];
        this.card4.innerHTML = this.numbers[3];

        this.card1.classList.remove("popIn");
        this.card2.classList.remove("popIn");
        this.card3.classList.remove("popIn");
        this.card4.classList.remove("popIn");

        this.card1.classList.remove("active");
        this.card2.classList.remove("active");
        this.card3.classList.remove("active");
        this.card4.classList.remove("active");

        if (this.score != 0) {
            this.card1.style = "";
            $(this.card1).css({ top: 0 }).animate({ top: 50 }, 500, "easeOutBounce").promise().done(() => {
                this.card2.style = "";
                $(this.card2).css({ top: 0 }).animate({ top: 50 }, 500, "easeOutBounce").promise().done(() => {
                    this.card3.style = "";
                    $(this.card3).css({ top: 200 }).animate({ top: 250 }, 500, "easeOutBounce").promise().done(() => {
                        this.card4.style = "";
                        $(this.card4).css({ top: 200 }).animate({ top: 250 }, 500, "easeOutBounce");
                    });
                });
            });
        }
    }

    setListeners() {
        this.animateCombine = this.animateCombine.bind(this);
        this.animateCombineJQuery = this.animateCombineJQuery.bind(this);
        this.cardClicked = this.cardClicked.bind(this);
        this.operatorClicked = this.operatorClicked.bind(this);
        this.undoButtonClicked = this.undoButtonClicked.bind(this);

        this.card1.addEventListener("click", this.cardClicked);
        this.card2.addEventListener("click", this.cardClicked);
        this.card3.addEventListener("click", this.cardClicked);
        this.card4.addEventListener("click", this.cardClicked);
        this.operator1.addEventListener("click", this.operatorClicked);
        this.operator2.addEventListener("click", this.operatorClicked);
        this.operator3.addEventListener("click", this.operatorClicked);
        this.operator4.addEventListener("click", this.operatorClicked);
        this.undoButton.addEventListener("click", this.undoButtonClicked);
    }

    startTimer() {
        this.score = 0;
        this.generateProblem();
        this.setNumbers();

        
        $("#timer_value").text(this.timeLimit);
        this.interval = setInterval(() => {
            this.timeLimit--;
            $("#timer_value").text(this.timeLimit);
            if (this.timeLimit == 0) {
                clearInterval(this.interval);
                alert("Game Over\n You Scored: " + this.score + "\n Refresh to play again.");
            }
        }, 1000);
    }
    

    cardClicked(event) {
        let card = event.target;
        let isActive = card.classList.contains("active");
        let isPopIn = card.classList.contains("popIn");
        let number = card.innerHTML;

        if (isPopIn) {
            card.classList.remove("popIn");
        }

        if (isActive) {
            card.classList.remove("active");
            if (this.aCard == card) {
                this.aCard = null;
                this.a = null;
                this.toggleOperators(false);
                this.operator = null;
            } else if (this.bCard == card) { // This didnt work, but might not need to with animation
                this.bCard = null;
                this.b = null;
            }
        } else {
            if (this.operator == null) {
                if (this.aCard != null) {
                    this.aCard.classList.remove("active");
                }
                this.aCard = card;
                this.a = number;
                this.aCard.classList.add("active");
                this.toggleOperators(true);
            } else if (this.b == null && this.a != null && this.operator != null) {
                this.b = number;
                this.bCard = card;
                if (this.aCard && this.bCard) { //MOVE MADE
                    this.previousMoves.push({
                        aCard: this.aCard,
                        operator: this.operator,
                        bCard: this.bCard,
                        bValue: this.b
                    });
                    // this.animateCombine(card);
                    this.animateCombineJQuery(card);
                } else {
                    console.error('aCard or bCard is not defined');
                }
                card.classList.add("active");
            }
        }
        this.printStuff();
    }

    operatorClicked(event) {
        if (this.a == null) return;
        let operator = event.target;
        let op = operator.getAttribute("value");
        let isActive = operator.classList.contains("active");
        switch (op) {
            case "add":
                // console.log("Addition");
                this.operator = "+";
                this.toggleOperators(false);
                operator.classList.add("active");
                break;
            case "sub":
                // console.log("Subtraction");
                this.operator = "-";
                this.toggleOperators(false);
                operator.classList.add("active");
                break;
            case "mult":
                // console.log("Multiplication");
                this.operator = "*";
                this.toggleOperators(false);
                operator.classList.add("active");
                break;
            case "div":
                // console.log("Division");
                this.operator = "/";
                this.toggleOperators(false);
                operator.classList.add("active");
                break;
        }
    }

    undoButtonClicked(event) {
        if (this.aCard) {
            this.aCard.classList.remove("active");
            this.aCard = null;
            this.a = null;
            this.toggleOperators(false);
            this.operator = null;
        } else {
            let move = this.previousMoves.pop();
            if (move) {
                //animate back to spot
                move.aCard.style = "";
                move.aCard.classList.remove("active");
                move.bCard.style = "";
                move.bCard.classList.remove("active");
                //restore values
                //calculate a and b
                let a = move.aCard.innerHTML;
                move.bCard.innerHTML = move.bValue;
            }

        }
    }

    printStuff() {
        // console.log("aCard: " + this.aCard + "\n a: " + this.a + "\n bCard: " + this.bCard + "\n b: " + this.b + "\n operator: " + this.operator);
    }

    toggleOperators(isActive) {
        if (isActive) {
            this.operator1.classList.add("active");
            this.operator2.classList.add("active");
            this.operator3.classList.add("active");
            this.operator4.classList.add("active");
        } else {
            this.operator1.classList.remove("active");
            this.operator2.classList.remove("active");
            this.operator3.classList.remove("active");
            this.operator4.classList.remove("active");
        }
    }

    animateCombine = (bCard) => {
        var frame = 0;
        clearInterval(this.interval);
        let aCard = this.aCard;
        if (!aCard || !bCard) {
            console.error('aCard or bCard is not defined');
            return;
        }
        let aCardPos = aCard.getBoundingClientRect();
        let bCardPos = bCard.getBoundingClientRect();
        let dx = bCardPos.left - aCardPos.left;
        let dy = bCardPos.top - aCardPos.top;
        let computedStyle = window.getComputedStyle(aCard);
        let initialTop = parseFloat(computedStyle.top);
        let initialLeft = parseFloat(computedStyle.left);
        this.interval = setInterval(() => {
            if (frame == 100) {// animation is done
                clearInterval(this.interval);
                aCard.style.visibility = "hidden";
                bCard.innerHTML = eval(this.a + this.operator + this.b);
                bCard.classList.remove("active");
                bCard.classList.add("popIn");
                this.aCard = null;
                this.bCard = null;
                this.a = null;
                this.b = null;
                this.operator = null;
                this.toggleOperators(false);
            } else {
                var posx = frame * dx / 100;
                var posy = frame * dy / 100;
                // console.log(posy);
                // console.log(aCardPos.top);
                // console.log(initialTop);
                aCard.style.top = initialTop + posy + "px";
                aCard.style.left = initialLeft + posx + "px";
                frame++;
            }
        }, 5);
    }

    animateCombineJQuery = (bCard) => {
        let aCard = this.aCard;
        if (!aCard || !bCard) {
            console.error('aCard or bCard is not defined');
            return;
        }
        let aCardPos = aCard.getBoundingClientRect();
        let bCardPos = bCard.getBoundingClientRect();
        let dx = bCardPos.left - aCardPos.left;
        let dy = bCardPos.top - aCardPos.top;
        $(aCard).animate({
            left: "+=" + dx,
            top: "+=" + dy
        }, {
            duration: 400,
            easing: "easeInCubic",
            complete: () => { // animation is done
                aCard.style.visibility = "hidden";
                let cardValue = eval(this.a + this.operator + this.b);
                bCard.innerHTML = cardValue;
                this.checkWin(cardValue);
                bCard.classList.remove("active");
                bCard.classList.add("popIn");
                this.aCard = null;
                this.bCard = null;
                this.a = null;
                this.b = null;
                this.operator = null;
                this.toggleOperators(false);
            }
        });
    }

    checkWin(bValue) {
        if (this.previousMoves.length != 3) {
            return false;
        }
        if (bValue == 24) {
            let finalCard = this.bCard;
            $(finalCard).css("background-image", "var(--image-win)");
            $(finalCard).css("border", "var(--color-win)");
            
            let scoreBoard = document.getElementById("score_value");
            let cardPos = finalCard.getBoundingClientRect();
            let targetPos = scoreBoard.getBoundingClientRect();
            let dx = targetPos.left - cardPos.left;
            let dy = targetPos.top - cardPos.top;
            $(finalCard).animate({
                left: "+=" + dx,
                top: "+=" + dy,
                height: "50px",
                width: "100px",
                fontsize: "1000px",
                lineHeight: "50px"
            }, {
                duration: 700,
                easing: "easeInCubic",
                complete: () => {
                    $(finalCard).css("visibility", "hidden");
                    this.score++;
                    this.numbers = this.generateProblem();
                    this.setNumbers();
                    console.log("Score: " + this.score);
                }
            });

            console.log("WIN");
            return true;
        }
        return false;

    }

}

let game = new NumberGame();

const startButton = document.getElementById("game_mode_button");
startButton.addEventListener("click", () => {
    game.startTimer();
    document.getElementById("game_mode").style.display = "none";
});