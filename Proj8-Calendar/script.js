class Month {
    constructor(month, year) {
        this.month = month;
        this.year = year;
        this.firstDay = new Date(year, month, 1).getDay();
        this.days = 0;
        this.createDays();
        this.events = {};
        getUserEvents(month, year);
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
        return [this.month, this.year];
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
        return [this.month, this.year];
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
            let dayElement = document.createElement('div');

            //format date YYYY-MM-DD, (with leading 0s if needed)
            let month = (this.month + 1).toString().padStart(2, '0');
            let day = (i + 1).toString().padStart(2, '0');
            let dateFormatted = `${this.year}-${month}-${day}`;

            dayElement.id = dateFormatted;
            dayElement.classList.add('day');
            dayElement.classList.add('in-month');
            //highlight today in red
            let dateElement = document.createElement('span');
            dateElement.classList.add('date');
            if (this.year === new Date().getFullYear() && this.month === new Date().getMonth() && i + 1 === new Date().getDate()) {
                dateElement.classList.add('today');
            }
            dateElement.innerHTML = i + 1;
            dayElement.appendChild(dateElement);

            //add event
            let eventsToAppend = this.events[dateFormatted];

            for (let j = 0; eventsToAppend && j < eventsToAppend.length; j++) {
                let eventType = eventsToAppend[j]['type'];
                dayElement.classList.add(eventType);


                let eventElement = document.createElement('div');
                eventElement.classList.add('event');
                //if there is a time, add it to the event
                if (eventsToAppend[j]['time'] !== '') {
                    eventElement.innerHTML = eventsToAppend[j]['time'] + ": " + eventsToAppend[j]['event'];
                } else {
                    eventElement.innerHTML = eventsToAppend[j]['event'];
                }
                dayElement.appendChild(eventElement);
            }
            monthContainer.appendChild(dayElement);
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

        let dateFormatted = event.target.id;

        console.log(dateFormatted);
        openAddEvent(dateFormatted);
    }
}


const month = new Month(4, 2024);
const nextMonth = document.getElementById('next_month');
const prevMonth = document.getElementById('prev_month');

nextMonth.addEventListener('click', () => {
    let [monthVal, yearVal] = month.nextMonth();
    getUserEvents(monthVal, yearVal);
});

prevMonth.addEventListener('click', () => {
    let [monthVal, yearVal] = month.prevMonth();
    getUserEvents(monthVal, yearVal);
});

function closeAddEvent() {
    document.getElementById('addEventOverlay').style.display = 'none';
}

function openAddEvent(date) {
    document.getElementById('addEventOverlay').style.display = 'block';
    document.getElementById('eventDate').innerHTML = date;
}

function addEvent() {
    console.log('add event');
    let eventTitle = document.getElementById('eventTitle').value;
    let eventDate = document.getElementById('eventDate').innerHTML;
    let eventTime = document.getElementById('eventTime').value;

    console.log(eventTitle);
    console.log(eventDate);
    console.log(eventTime);
    month.events[eventDate] = [{ 'time': eventTime, 'event': eventTitle, 'type': 'userEvent' }];
    dayElement = document.getElementById(eventDate);
    dayElement.classList.add('userEvent');

    let eventElement = document.createElement('div');
    eventElement.classList.add('event');
    eventElement.innerHTML = eventTime + ": " + eventTitle;
    dayElement.appendChild(eventElement);

    $.post('events.php', { 'eventTitle': eventTitle, 'eventDate': eventDate, 'eventTime': eventTime }, function (data) {
        console.log(data);
    });

    closeAddEvent();
}

function getUserEvents(monthVal, yearVal) {
    $.get('events.php', { 'month': monthVal + 1, 'year': yearVal }, function (data) {
        console.log(data);
        let result = JSON.parse(data);
        for (let i = 0; i < result.length; i++) {
            let event = result[i];
            let date = event['eventdate'];
            let time = event['time'];
            let title = event['name'];
            let type = event['type'];
            console.log(date);
            console.log(time);
            console.log(title);
            let eventData = { 'time': time, 'event': title, 'type': type};
            if (month.events[date]) {
                if (!month.events[date].some(event => event.time === eventData.time && event.event === eventData.event && event.type === eventData.type)) {
                    month.events[date].push(eventData);
                }
            } else {
                month.events[date] = [eventData];
            }
        }
        month.setMonthInnerHTML();
    });
}