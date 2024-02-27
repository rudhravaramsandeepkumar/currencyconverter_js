// const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const txtfrom = document.querySelector("#fromtxt")
const txtto = document.querySelector("#totxt")
const amounttocal = document.querySelector("#amounttocal")
const btn = document.querySelector("#btnsum")
const msg_ = document.querySelector(".mssg")
const date_forcurreny = document.querySelector(".date_forcurreny")

const dropdownselector = document.querySelectorAll(".dropdown-container select")

for (let select_ of dropdownselector){
    for(countrycode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText=countrycode
        newOption.value=countrycode
        if(select_.name=="fromtxt" && countrycode=="USD"){
            newOption.selected="selected";
        } else if(select_.name=="totxt" && countrycode=="INR"){
            newOption.selected="selected";
        }
        select_.append(newOption)
    }
    select_.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    })
}

const updateFlag= (element)=>{
    let currencyCode = element.value;
    let countryCode =countryList[currencyCode];
    let updatedUrl =`https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=updatedUrl;
}

const updateExchangeValue = async ()=>{
    let amounttocal = document.querySelector("#amounttocal");
    let amounttoCal_ = amounttocal.value;
    if (amounttoCal_==="" || amounttoCal_<1){
        amounttoCal_=1;
        amounttocal.value=1;
    }
    let from_currency =txtfrom.value.toLowerCase();
    let to_currency =txtto.value.toLowerCase();
    const URL =`${BASE_URL}/${from_currency}/${to_currency}.json`
    let response = await fetch(URL);
    let jsondata = await response.json();
    let rate_= jsondata[to_currency]
    let final_amount_ = amounttoCal_ * rate_
    msg_.innerText = `${amounttoCal_} ${txtfrom.value} = ${final_amount_} ${txtto.value}`
    date_forcurreny.innerText= `According to the record date : ${jsondata["date"]}`
}

btn.addEventListener("click",(eve)=>{
    eve.preventDefault();
    updateExchangeValue()
})

window.addEventListener("load",()=>{
    updateExchangeValue()
})