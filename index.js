document.addEventListener('DOMContentLoaded', ()=> {
    const form = document.querySelector('.form');

    const inputGroups = form.querySelectorAll('.form__input-group');
    const inputErrorMsgs = form.querySelectorAll('.form__error-message');

    const submitBtn = form.querySelector('.form__submit-btn');
    const resetBtn = form.querySelector('.form__reset-btn');

    const year = document.querySelector('#year');
    const month = document.querySelector('#month');
    const day = document.querySelector('#day');

    const yearGroup = document.querySelector('#year-group');
    const monthGroup = document.querySelector('#month-group');
    const dayGroup = document.querySelector('#day-group');

    const yearGroupMsg = document.querySelector('#year-group .form__error-message');
    const monthGroupMsg = document.querySelector('#month-group .form__error-message');
    const dayGroupMsg = document.querySelector('#day-group .form__error-message');

    const yearDigitsElem = document.querySelector('#passed-year .user-age__numbers');
    const monthDigitsElem = document.querySelector('#passed-month .user-age__numbers');
    const dayDigitsElem = document.querySelector('#passed-day .user-age__numbers');

    const validDayError = 'Must be a valid day';
    const validMonthError = 'Must be a valid month';
    const validYearError = 'Must be in the past';

    function removeFormErrors(){
        inputGroups.forEach((item, i) => {
            item.classList.remove('form__input-group_error');
            inputErrorMsgs[i].innerText = '';
        })
    }

    function clearDigits(){
        yearDigitsElem.innerText = '--';
        monthDigitsElem.innerText = '--';
        dayDigitsElem.innerText = '--';
    }

    function setDigitsInnerStyleWidth(value){
        yearDigitsElem.style.width = value;
        monthDigitsElem.style.width = value;
        dayDigitsElem.style.width = value;
    }

    function resetFormView(){
        clearDigits();
        setDigitsInnerStyleWidth('');
        removeFormErrors();
        noTimersRun = true;
    }

    window.addEventListener('resize', () => {
        setDigitsInnerStyleWidth('');
    })

    form.addEventListener('reset', ()=> {
        resetFormView();
        resetBtn.blur();
        noTimersRun = true;

    });

    form.addEventListener('submit', async (e)=> {
        e.preventDefault();
        submitBtn.blur();

        resetFormView();

        const now = new Date(Date.now());

        const monthDaysNow = now.getFullYear() % 100 !== 0 && now.getFullYear() % 4 === 0 ? 
                        [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] :
                        [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        const monthDaysPast = +year.value % 100 !== 0 && +year.value % 4 === 0 ? 
        [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] :
        [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        const nowYear = now.getFullYear();
        const nowMonth = now.getMonth();
        const nowDate = now.getDate();

        let dateIsValid = true;
        let fieldsFilled = true;

        if(year.value.trim() === ''){
            yearGroup.classList.add('form__input-group_error');
            yearGroupMsg.innerText = 'This field is required';
            fieldsFilled = false;
        } else if (
            isNaN(+year.value) ||
            (+year.value > nowYear) ||
            (+year.value === nowYear && +month.value - 1 > nowMonth) ||
            (+year.value === nowYear && +month.value - 1 ===  nowMonth && +day.value > nowDate)
        ) {
            yearGroup.classList.add('form__input-group_error');
            yearGroupMsg.innerText = validYearError;
            dateIsValid = false;
        }

        if(day.value.trim() === ''){
            dayGroup.classList.add('form__input-group_error');
            dayGroupMsg.innerText = 'This field is required';
            fieldsFilled = false;
        } else if (
            isNaN(+day.value)||
            monthDaysPast[+month.value - 1] && +day.value > monthDaysPast[+month.value - 1] ||
            +day.value > 31 || 
            +day.value < 1
        ) {
            
            dayGroup.classList.add('form__input-group_error');
            dayGroupMsg.innerText = validDayError;

            dateIsValid = false;
        }

        if(month.value.trim() === ''){
            monthGroup.classList.add('form__input-group_error');
            monthGroupMsg.innerText = 'This field is required';
            fieldsFilled = false;
        } else if ( 
            isNaN(+month.value) ||
            +month.value < 1 || +month.value > 12) {

            monthGroup.classList.add('form__input-group_error');
            monthGroupMsg.innerText = validMonthError;
            dateIsValid = false;
        }

        if(!dateIsValid || !fieldsFilled) {
            return;
        }

        const birthday = new Date(`${year.value}-${month.value}-${day.value}`);


        const birthdayYear = birthday.getFullYear();
        const birthdayMonth = birthday.getMonth();
        const birthdayDate = birthday.getDate();

        const daysPassed = nowDate < birthdayDate ? monthDaysNow[nowMonth - 1] + nowDate - birthdayDate : nowDate - birthdayDate;
        const monthsPassed = nowDate < birthdayDate && nowMonth > birthdayMonth ? nowMonth - 1 - birthdayMonth :
                            nowDate < birthdayDate && nowMonth <= birthdayMonth ? 12 + nowMonth - 1 - birthdayMonth :
                            nowDate >=  birthdayDate && nowMonth < birthdayMonth ? 12 + nowMonth - birthdayMonth :
                            nowMonth - birthdayMonth;

        const yearsPassed = nowMonth > monthsPassed ? nowYear - birthdayYear : nowYear - birthdayYear - 1;
        
        function countTimeDigits({allowStopCounter = false, setAllDigitsWidth = false, finishTime, elem}){

            if (setAllDigitsWidth) {
                const digitsLength = Math.max(`${finishTime}`.length, 2);
                const letterWidth = +window.getComputedStyle(elem).getPropertyValue('font-size').replace('px', '');
                const digitElemWidth = letterWidth * digitsLength / 1.2;
                setDigitsInnerStyleWidth(digitElemWidth + 'px');
            }

            return new Promise((res, rej) => {
                let start=0;
                let timer = setInterval(()=>{
                    if(start === 0 && allowStopCounter){
                        noTimersRun = false;
                    }
                    if(start > finishTime || start === finishTime || noTimersRun){
                        elem.innerText = `${start}`.padStart(Math.max(`${finishTime}`.length, 2), '0');
                        clearInterval(timer);
                        res();
                    } else {
                        elem.innerText = `${start}`.padStart(Math.max(`${finishTime}`.length, 2), '0');
                        start ++;
                        
                    }
                }, 40);
            })
        }

        await countTimeDigits({allowStopCounter: true, setAllDigitsWidth: true, finishTime: yearsPassed, elem: yearDigitsElem});
        await countTimeDigits({finishTime: monthsPassed, elem: monthDigitsElem});
        await countTimeDigits({finishTime: daysPassed, elem: dayDigitsElem});

    });
});