console.log('hello world')


const locationn = document.getElementById('location');
const button = document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const a = locationn.value
    var urll = '/weather?city='+a;
    console.log(a)

    document.getElementById('p').textContent = 'Loading....!'

    fetch(urll).then((response) => {
        response.json().then((data) => {
            console.log(data.Temperature)
            console.log(data.City)
            if(data.error){
                return document.getElementById('p').innerText = data.error;
            }
            document.getElementById('p').textContent = 'Temperature is: ' +  data.Temperature + ' in ' + data.City;
        })
        
    })


    
})