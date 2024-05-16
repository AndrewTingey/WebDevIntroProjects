class Month {
    constructor(month, year) {
        this.month = month;
        this.year = year;
        this.firstDay = new Date(year, month, 1).getDay();
        this.days = [];
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
        this.days = [];
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
        this.days = [];
        this.createDays();
        this.setMonthInnerHTML();
    }

    createDays() {
        let date = new Date(this.year, this.month, 1);
        let i = 1;
        while (date.getMonth() === this.month) {
            this.days.push(i++);
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

        this.days.forEach(day => {
            monthContainer.innerHTML += `<div class="day"><span class="date">${day}</span></div>`;
        });

        // end month on saturday
        if (monthContainer.children.length % 7 !== 0) {
            for (let i = 0; 0 != monthContainer.children.length % 7; i++) {
                monthContainer.innerHTML += '<div class="day no-month"></div>';
            }
        }
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
