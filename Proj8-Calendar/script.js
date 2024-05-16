class Month {
    constructor(month, year) {
        this.month = month;
        this.year = year;
        this.firstDay = new Date(year, month, 1).getDay();
        this.days = 0;
        this.createDays();
        this.setMonthInnerHTML();
    }

    nextMonth() {
        this.month++;
        if (this.month > 11) {
            this.month = 0;
            this.year++;
        }
        this.firstDay = new Date(this.year, this.month, 1).getDay();
        this.days = 0;
        this.createDays();
        this.setMonthInnerHTML();
    }

    prevMonth() {
        this.month--;
        if (this.month < 0) {
            this.month = 11;
            this.year--;
        }
        this.firstDay = new Date(this.year, this.month, 1).getDay();
        this.days = 0;
        this.createDays();
        this.setMonthInnerHTML();
    }

    createDays() {
        let date = new Date(this.year, this.month, 1);
        let i = 1;
        while (date.getMonth() === this.month) {
            this.days = i++;
            date.setDate(date.getDate() + 1);
        }
    }

    setMonthInnerHTML() {
        const monthName = document.getElementById('month_name');
        const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December'];

        monthName.innerHTML = `${monthString[this.month]} ${this.year}`;

        const monthContainer = document.getElementById('month_container');
        monthContainer.innerHTML = '';
        if (this.firstDay !== 0) {
            for (let i = 0; i < this.firstDay; i++) {
                monthContainer.innerHTML += '<div class="day no-month"></div>';
            }
        }

        for (let i = 0; i < this.days; i++) {
            let newElement = document.createElement('div');
            newElement.classList.add('day');
            newElement.classList.add('in-month');
            newElement.innerHTML = `<span class="date">${i + 1}</span>`;
            monthContainer.appendChild(newElement);
        }

        
        // end month on saturday
        if (monthContainer.children.length % 7 !== 0) {
            for (let i = 0; 0 != monthContainer.children.length % 7; i++) {
                monthContainer.innerHTML += '<div class="day no-month"></div>';
            }
        }

        this.setDateClickListeners();
    }

    setDateClickListeners() {
        const days = document.getElementsByClassName('in-month');
        for (let i = 0; i < days.length; i++) {
            days[i].addEventListener('click', (event) => this.dateClick(event));
        }
    }

    dateClick(event) { //WORKING HERE TODO
        console.log('clicked: ' + event.target.children[0].innerHTML);
        let dateFormatted = `${this.year}-${this.month + 1}-${event.target.children[0].innerHTML}`;
        console.log(dateFormatted);
    }
}


const month = new Month(4, 2024);
const nextMonth = document.getElementById('next_month');
const prevMonth = document.getElementById('prev_month');

nextMonth.addEventListener('click', () => {
    month.nextMonth();
});

prevMonth.addEventListener('click', () => {
    month.prevMonth();
});

