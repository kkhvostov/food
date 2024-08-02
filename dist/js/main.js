window.addEventListener("DOMContentLoaded" , ()=>{

    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent (){
        tabsContent.forEach(i => {
            i.classList.add('hide');
            i.classList.remove('show','fade');
        });
        tabs.forEach(tab =>{
            tab.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent (i = 0){
        tabsContent[i].classList.add('show','fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click',(e) =>{
        const target =  e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i)=>{
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });
    //timer
    const deadLine = '2024-08-07-';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor((t / (1000 * 60 * 60 * 24)));
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num <= 10) {
            return '0' + num;
        }else {
            return num;
        }
    }
    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0){
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine)

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    const modalClose = document.querySelector('[data-close]');

    function toggleModal () {
        modal.classList.toggle('show');
        document.body.style.overflowY = 'auto';
    }

    modalTrigger.forEach(e => {
        e.addEventListener('click', () => {
            toggleModal();
            document.body.style.overflowY = 'hidden';
        });
    })

    modalClose.addEventListener('click', () => {
        toggleModal();
    });
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            toggleModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            toggleModal();
        }
    });
});