
fetch('https://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('.msg1')
const message2=document.querySelector('.msg2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error) {
            console.log(data.error)
            message1.textContent=data.error
        }else{
            console.log(data[0].location)
            console.log(data[0].weather)
            message1.textContent=data[0].location
            message2.textContent=data[0].weather
        }
    })
    })
})
