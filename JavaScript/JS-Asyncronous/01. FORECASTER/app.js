function forecastInfo(){
    const BaseUrl = `https://judgetests.firebaseio.com/`;
    return {
        locations: () => fetch(BaseUrl + "locations.json").then(x => x.json()),
        today: (code) => fetch(BaseUrl + `forecast/today/${code}.json`).then(x => x.json()),
        upcoming: (code) => fetch(BaseUrl + `forecast/upcoming/${code}.json`).then(x => x.json())
    }
}

function attachEvents() {
    const input = document.getElementById("location");
    const btn = document.getElementById("submit");
    const forecastCo = document.getElementById("forecast");
    const currentCo = document.getElementById("current");
    const upcomingCo = document.getElementById("upcoming");

    const symbols = {
        sunny:"☀",
        partlysunny: "⛅",
        overcast: "☁",
        rain: "☂",
        degrees: "°"
    }

   btn.addEventListener("click", getForecast);
   function getForecast(){
       forecastInfo().locations()
       .then(x => {
           let code = x.find(e => e.name === input.value).code;
           return Promise.all([
            forecastInfo().today(code),
            forecastInfo().upcoming(code)
           ])
       })
       .then(([today,upcoming])=>{
        document.getElementById("exeption").style.display =  "none";
           generateForecastForToday(today);
           generateForecastForUpcoming(upcoming);
       })
       .catch(e => {
           document.getElementById("exeption").style.display =  "block";
       })
   }

   function generateForecastForToday(today){
       currentCo.innerHTML =  `<div class="label">Current conditions</div>`;

       const {name , forecast:{ condition , low, high }} = today;
       const div = createElements("div", ["forecasts"]);
       const span = createElements("span",["condition","symblo"],symbols[getSymbol(condition)]);
       const infoSpan = createElements("span",["condition"]);
       const span1 = createElements("span",["forecast-data"],name);
       const span2 = createElements("span",["forecast-data"],`${low}${symbols["degrees"]}/${high}${symbols["degrees"]}`);
       const span3 = createElements("span" ,["forecast-data"],condition);
       
       infoSpan.append(span1,span2,span3);
       div.append(span,infoSpan);
       currentCo.appendChild(div);
       
   }

   function generateForecastForUpcoming(upcoming){
    upcomingCo.innerHTML = `<div class="label">Three-day forecast</div>`;
    
    const div = createElements("div", ["forecast-info"]);
    for (let i = 0; i < 3; i++) {
        const spanWrapper = createElements("span",["upcoming"]);
        const { condition , low, high } = upcoming.forecast[i];
        const span1 = createElements("span",["symbol"],symbols[getSymbol(condition)]);
        const span2 = createElements("span",["forecast-data"],`${low}${symbols["degrees"]}/${high}${symbols["degrees"]}`);
        const span3 = createElements("span" ,["forecast-data"],condition);
        spanWrapper.append(span1,span2,span3);
        div.appendChild(spanWrapper);
    }
    upcomingCo.appendChild(div);
    forecastCo.style.display = "block";
   }


   function getSymbol(symbol){
       return symbol.split("").filter(e=> e!==" ").map(e=> e.toLowerCase()).join("");
   }

   function createElements(name, className , text){
       const e = document.createElement(name);
       if(className){
           e.classList.add(...className);
       }
       if(text){
        e.textContent = text;
       }
       return e;
   }
    
}

attachEvents();