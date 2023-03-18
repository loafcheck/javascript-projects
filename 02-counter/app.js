let count = 0;

const value = document.querySelector('#value')
const btns = document.querySelectorAll('.btn');

btns.forEach(function(element) {
    element.addEventListener('click', function(eventObj) {
        // console.log(eventObj.currentTarget.classList)
        const styles = eventObj.currentTarget.classList
        if (styles.contains('decrease')) {
            count --;
        } else if (styles.contains('reset')){
            count = 0;
        } else if (styles.contains('increase')){
            count ++;
        }
        if (count >0) {
            value.style.color = 'green';
        } else if (count < 0) {
            value.style.color = 'red';
        } else {
            value.style.color = 'lemon';
        }
        value.textContent = count;
    })
})