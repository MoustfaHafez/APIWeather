
// let Data=
// {
//     Fanme:'Moustafa',
//     age :5533,
//     salary:5000,
// }

// let  { Fanme, age,  salary} = Data;

// //let arr=[ Fanme,age,salary]

// var box='';
// box=`

// <li>${Fanme}</li>
// <li>${age}</li>
// <li>${salary}</li>


// `

// document.getElementById('1').innerHTML=box;






// var arr2=[1,2,3,4,5];

// var newArr=arr2.filter(function(ele){

// return `<li>price=${ele}</li>`


// })



// function Display()
// {
//     var box=''

//     for(let i=0;i<newArr.length;i++)
//     {


//         box+=`

//         <li>price=${newArr[i]}</li>
//         `
//     }

//     document.getElementById('2').innerHTML=box;
// }

// Display();




var Data2 = [];


function GetData() {




    var API = new XMLHttpRequest();
    API.open('GET', 'https://jsonplaceholder.typicode.com/posts');
    API.send();
    API.addEventListener('readystatechange', function (e) {
        if (API.readyState == 4) {
            Data2 = JSON.parse(API.response);
            DisplayData();

        }
    })


}

GetData();



function DisplayData() {

    var box = '';

    for (var i = 0; i < Data2.length; i++) {

        box += `
        <div class="col-md-4  " >
  
        
        <h2 class="text-center">${Data2[i].id}</h2>
        <p>${Data2[i].body}</p>
       
        

        </div>
          
        `
    }

    document.getElementById('row').innerHTML = box;
}

//////////////////////////
var FinalPizzaData = [];

async function GetPizza() {
    var allData = await fetch(`https://forkify-api.herokuapp.com/api/search?q=pizza`);
    var FinalData = await allData.json();
    FinalPizzaData = FinalData.recipes;
    DisplayPizza();
}



GetPizza();

function DisplayPizza() {
    var Pizza = ''
    for (let i = 0; i < FinalPizzaData.length; i++) {
        Pizza += `
        
        <div class="col-md-4 border  border-5 " > 
        <h5 class="text-center">${FinalPizzaData[i].title}</h5>
        <img src="${FinalPizzaData[i].image_url}" classs=w-100 >
        
        </div>  
        
        `
    }

    document.getElementById('Row2').innerHTML = Pizza;
}

var Atricles = [];
async function GetArticles() {
    var AllData = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=ec6ce7501c4044329bac02c8e503be5b`);
    var FinalData = await AllData.json();
    Atricles = FinalData.articles;
    DisplayArticles();

}

GetArticles();

function DisplayArticles() {
    var Artcl = ''
    for (let i = 0; i < Atricles.length; i++) {
        Artcl += `
        
        
         
        <div class="col-md-4 border  border-5 " > 
        <h5 class="text-center">${Atricles[i].source.name}</h5>
        <img src="${Atricles[i].urlToImage}" classs=w-100 >
        
        </div> 
        
        `
    }

    document.getElementById('Row3').innerHTML = Artcl;
}



function EndMenu() {
    return new Promise(function () {

        console.log('1');

    })

}

/// weather API Application


var country = document.getElementById('Country');
var btn = document.getElementById('btn1');
var Temp;//object





async function GetTemp(country) {
    var allData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=53ae8810766f4d6da9c115309230508&q=${country}&days=14`);
    var FinalData = await allData.json();
    Temp = FinalData;
    console.log(Temp)
    DisplayTemp()
}

var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];





function DisplayTemp() {

    var DisplayTemp = ''
    var dateString = Temp.current.last_updated;
    var Day = new Date(dateString);
    var dayIndex = Day.getDay();

    DisplayTemp = `
   
     <div class="col-md-4 border border-5 border-black  text-center bg">
    <h6> ${weekdays[dayIndex]}</h6>    
    <h5> ${Temp.location.name}</h5>
    <h5> ${Temp.location.country}</h5>
    <h1 >Temp:${Temp.current.temp_c}</h1>
    <img src=${Temp.current.condition.icon} class=w-25>
    <h6>Status:${Temp.current.condition.text}</h6>
    <h6>WindSpeed:${Temp.current.wind_kph}kph</h6>
    <h6>Humanity:${Temp.current.humidity}%</h6>
      
    </div> 
    `

    for (let i = 1; i < Temp.forecast.forecastday.length; i++) {


        var dateString = Temp.forecast.forecastday[i].date;
        var Day = new Date(dateString);
        var dayIndex = Day.getDay();
        DisplayTemp += `
        
        
        <div class="col-md-4 border border-5 border-black  text-center bg">
        <h5 > ${weekdays[dayIndex]} </h5>
        <h5 >max temp ${Temp.forecast.forecastday[i].day.maxtemp_c} c</h5>
        <h5 >max wind speed${Temp.forecast.forecastday[i].day.maxwind_kph} kph</h5>
        <h5 >average Humanity${Temp.forecast.forecastday[i].day.avghumidity} %</h5>
        <img src=${Temp.forecast.forecastday[i].day.condition.icon} class=w-25>
        <h5 >Status${Temp.forecast.forecastday[i].day.condition.text} </h5>      
        </div>
     
        `
    }

    document.getElementById('Row4').innerHTML = DisplayTemp;
}


function GetCountry() {
    var country1 = country.value;
    return country1;
}

function ClearSearch() {
    country.value = ''
}

btn.addEventListener('click', function () {
    var country1 = GetCountry();
    GetTemp(country1);
    ClearSearch();

})

country.addEventListener('keydown', function () {

    var country1 = GetCountry();
    GetTemp(country1);
    // ClearSearch();

})


