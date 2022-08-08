import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('.value[data-days]'),
    hours: document.querySelector('.value[data-hours]'),
    minutes: document.querySelector('.value[data-minutes]'),
    seconds: document.querySelector('.value[data-seconds]'),
}

let finishTime = null;
refs.startBtn.addEventListener('click', () => {timer.start()})
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        finishTime = selectedDates[0];
        if (finishTime < Date.now()) {
            // window.alert("Please choose a date in the future")
            Notify.failure('Please choose a date in the future');
        } else {
            refs.startBtn.disabled = false;
            console.log(selectedDates[0]);
        }
        
        return finishTime;
  },
};

flatpickr('#datetime-picker', options);

class Timer {
    constructor({onTick}) {
        this.intId = null;
        this.onTick = onTick;
    }
    start() {
        refs.input.disabled = true;
        refs.startBtn.disabled = true;
        this.intId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = finishTime - currentTime;
            const { days, hours, minutes, seconds } = this.convertMs(deltaTime);
            const time = { days, hours, minutes, seconds };
  
            this.onTick(time);
            if (days==='00' && hours==='00'&& minutes==='00'&& seconds==='00') {
                clearInterval(this.intId)
                refs.input.disabled = false;
                return console.log('Кінець!!!');
            }
        }, 1000)
    }
    addLeadingZero(value) {
    return String(value).padStart(2, '0');
    }
    convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = this.addLeadingZero(Math.floor(ms / day));
        // Remaining hours
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        // Remaining minutes
        const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
        // Remaining seconds
        const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

        return { days, hours, minutes, seconds };
    }
    

}
const timer = new Timer({
    onTick: updateTimerInterface,});

function updateTimerInterface({days, hours, minutes, seconds}) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
}
