let DrinkType = document.getElementById("DrinkType")
let NumOfCups = document.getElementById("NumOfCups")
let withSugar = document.getElementById("withSugar")
let payBtn = document.getElementById("payBtn")
let spinner = document.getElementById("spinner")

var s=0;
// calculate total money to Pay
function calculate() {
    if (!(DrinkType.value === 'Select Drink Type')) {
        if (withSugar.checked) {
            var cost = (Number(DrinkType.value) + 5) * Number(NumOfCups.value);
            payBtn.innerHTML = "Pay Rs. " + (cost);
            s=5;
        }
        else {
            payBtn.innerHTML = "Pay Rs. " + (Number(DrinkType.value) * Number(NumOfCups.value));
        }
    }
    else {
        payBtn.innerHTML = "Pay Rs. 0"
    }
}

let water = document.getElementById("water-stock")
let milk = document.getElementById("milk-stock")
let tea = document.getElementById("tea-stock")
let coffee = document.getElementById("coffee-stock")
let sugar = document.getElementById("sugar-stock")
let refillBtn = document.getElementById("refillBtn")

// change the value of avilable stocks
currAvilableStock = (d) => {
    water.innerHTML = d.water;
    milk.innerHTML = d.milk;
    tea.innerHTML = d.tea;
    coffee.innerHTML = d.coffee;
    sugar.innerHTML = d.sugar;
}

// refill the stocks when get out off stock
refillBtn.addEventListener("click", () => {
    var data = { water: 1000, milk: 1000, tea: 200, coffee: 200, sugar: 500 };
    localStorage.setItem('stock', JSON.stringify(data))
    currAvilableStock(data);
})

// Given quantity of ingrediants
var sc = [4, 10, 0, 8, 5]
var lc = [4, 15, 0, 4, 5]
var st = [8, 10, 8, 0, 5]
var lt = [8, 15, 4, 4, 5]

// change the avulable stocks when order done
changeAvilableStock = (val, n, s) => {
    n = Number(n);
    s = Number(s);
    var arr=[];
    if (val == 100) {arr=sc}
    else if (val == 75) {arr=lc}
    else if (val == 60) {arr=st}
    else if (val == 50) {arr=lt}

// changes reflection in localStorage
    var stock = JSON.parse(localStorage.getItem('stock'));
    stock['water'] = stock['water'] > 0 ? stock['water'] - (n * arr[0]) : 'out of stock';
    stock['milk'] = stock['milk'] > 0 ? stock['milk'] - n * arr[1] : 'out of stock';
    stock['tea'] = stock['tea'] > 0 ? stock['tea'] - n * arr[2] : 'out of stock';
    stock['coffee'] = stock['coffee'] > 0 ? stock['coffee'] - n * arr[3] : 'out of stock';
    stock['sugar'] = stock['sugar'] > 0 ? stock['sugar'] - s * n : 'out of stock';
    localStorage["stock"] = JSON.stringify(stock)
    currAvilableStock(JSON.parse(localStorage.getItem('stock')))
}

// Getting data from localstorage
var dataFromStorage = JSON.parse(localStorage.getItem('stock'));

if (dataFromStorage == null) {
    var data = { water: 1000, milk: 1000, tea: 200, coffee: 200, sugar: 500 };
    localStorage.setItem('stock', JSON.stringify(data))
    currAvilableStock(data);
}
else {
    currAvilableStock(dataFromStorage)
}

console.log(NumOfCups.value);

// main pay button event when click on it
payBtn.addEventListener("click", () => {
    if (!(DrinkType.value === 'Select Drink Type')){
    changeAvilableStock(DrinkType.value, NumOfCups.value, s );
    
    //spinner loading script 
    spinner.innerHTML=`<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status";">
    <span class="sr-only"></span>
   </div>`;
  setTimeout(function(){ spinner.innerHTML+=`</div> <div class="text-center">Creating Order Status</div>` }, 1000);
  setTimeout(function(){ spinner.innerHTML+=`</div> <div class="text-center">Order Successful</div>` }, 3000);
  setTimeout(function(){ spinner.innerHTML+=`</div> <div class="text-center">Yours Cups are getting Reddy </div>` }, 5000);
  setTimeout(function(){ spinner.innerHTML+=`<div class="text-center">Almost Done...!</div>` }, 7000);
  setTimeout(function(){ spinner.innerHTML=`<div class="text-center">Take Your Cups, Have a Nice Day...</div>` }, 10000);
  setTimeout(function(){ spinner.innerHTML=`` }, 13000);
  document.getElementById("myform").reset()
  payBtn.innerHTML = "Pay Rs. 0"
}})