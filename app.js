const toHome=document.getElementById('toHome'); 
const _toHome=document.getElementById('_toHome')
const home=document.querySelector('.landing');
const payment=document.querySelector('.payment');
const abortBtn=document.getElementById('abortBtn');
toHome.addEventListener('click',()=>{
    window.location.reload();
 });
 _toHome.addEventListener('click',()=>{
    window.location.reload();
 })
 abortBtn.addEventListener('click',()=>{
    window.location.reload();
 })
 //get all item 
 const getItems=async()=>{
    try {
        const url='http://localhost:5000/api/';
        const response= await fetch(url,{
            method:'GET'
        })
        const parseRes= await response.json();
        let value= parseRes;
        let _landItem='';
    value.forEach(item=>{
    _landItem+=`<div class="land card" style="width: 18rem;">
    <img src="${item.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${item.title}</h5>
    <p class="card-text">${item.text}</p>
    <a class="btn btn-outline-dark position-relative" onclick='${$toView(item._id)}'>🦁View item 
    ${item.free}
    </a>
    </div>
    </div>`
    });
    home.innerHTML=_landItem;
     } catch (error) {
        console.log(error)
     }
 }
 getItems();

 const viewItem=document.querySelector('.viewItem');
 function $toView(i){
    addEventListener('click',async()=>{
        try {
            home.classList.add('close');
            viewItem.classList.add('open')
            const url=`http://localhost:5000/api/${i}`
            const response=await fetch(url,{
                method:'post',
                body:JSON.stringify({
                    id:i
                }),
                headers:{
                    'content-type':'application/json'
                }
            })
            const parseRes=await response.json();
            console.log(parseRes)
            //viewitem
    let view='';
        view+= `</br>
        <div class="card">
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
        <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="${parseRes.image}" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
            <img src="${parseRes.image1}" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
            <img src="${parseRes.image2}" class="d-block w-100" alt="...">
        </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
        </button>
        </div>

        <div class='card-body'>
        <p class="card-text">${parseRes.details}</br>${parseRes.amount}</p>
        <a class="btn btn-outline-dark" style='margin-top:10px;' onclick='$toPay()'>👜Purchase this item</a>
        <button type='button' class="btn btn-info"style='float:right; margin-top:10px;' onclick='back()'>Back</button>
        </div>
        </div></br>
        `
    viewItem.innerHTML=view;
        
            } catch (error) {
            console.log(error) 
            }
})}

function $toPay(){
    addEventListener('click',()=>{
   viewItem.classList.remove('open');
   payment.classList.add('open')
})}


function back(){
    window.location.reload();
}


//payment
const form=document.querySelector('.form');
const submitBtn=document.getElementById('submitBtn');
let counter=0;
submitBtn.addEventListener('click',()=>{
    counter++;
    if(counter>6){
        const submitError=document.querySelector('.submitError');
        let html='';
        const disable=`<button type="button" class="btn btn-dark"> 😪Try another method</button>`;
        html+=disable;
        submitError.innerHTML=html;
    }
})
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const errorNumber=document.getElementById('errorNumber');
    const errorAmount=document.querySelector('#errorAmount');
    let phoneNumber=form.number.value;
    let amount=form.amount.value;
    const validNumber=(userNumber)=>{
        return /^[0]\d{2}\d{3}\d{4}/.test(userNumber);
    }
    _phoneNumber=validNumber(phoneNumber);
    if(_phoneNumber &&amount>0){
        try {
            let html='';
            const error=`<p style="color:green;"><i>Wait for an STK Push...</i></p>`;
            html+=error;
            errorNumber.innerHTML=html;
            errorAmount.innerHTML='';

            const url="https://tinypesa.com/api/v1/express/initialize";
            const response=await fetch(url,{
                method:'POST',
                body:JSON.stringify({
                    amount:amount,
                    msisdn:phoneNumber
                }),
                headers: {
                    Apikey: "9qG6Ltgzgbn",//apikey get it from your admin account
                    "Content-Type": "application/json",
                    },
            })
            const parseRes=await response.json();
            console.log(parseRes);
            errorNumber.innerHTML='';
            form.reset();
        } catch (error) {
            let html='';
            const error1=`<p style="color:orange;">😢STK Push failed, try again!</p>`;
            html+=error1;
            errorNumber.innerHTML=html;
            console.log(error);
        }
    }else if(!_phoneNumber){
        let html='';
        const error=`<p style="color:orange;">☠ Please, enter phone number in this format: 07xxxxxxxx</p>`;
        html+=error;
        errorNumber.innerHTML=html;
    }else if(amount<=0){
        let html='';
        const error=`<p style="color:orange;">Sorry, you can't submit an empty amount..try again!</p>`;
        html+=error;
        errorNumber.innerHTML='';
        errorAmount.innerHTML=html;
    }
    
})
