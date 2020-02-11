console.log('Client side javascript file');

const wForm = document.querySelector('form');

const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');

wForm.addEventListener('submit', (e) => {
    e.preventDefault();
    p1.textContent = 'Loading...';
    p2.textContent = '';
    const address = document.querySelector('input').value;
    console.log(address);
    fetch(`/weather?address=${address}`).then(res => {
        res.json().then(data => {
            console.log(data);
            if (data.error) {
                p1.textContent = data.error;
            } else {
                p1.innerHTML = `Location: <b>${data.location}</b>`;
                p2.innerHTML = `Weather: ${data.forecastData}`
            }
        })
    });
    wForm.reset();
})