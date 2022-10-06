let from = document.getElementById("from");
let to = document.getElementById("to");
let input = document.getElementById("input");
let output = document.getElementById("output");
let hostorylist = document.getElementById("historylist");

function createOption (x,y,z){
    let option = document.createElement("option");
    let text = document.createTextNode(y);
    option.setAttribute("value",toNumber(z))
    option.append(text);
    x.append(option)
}

function toNumber (x){
    return Number(x.replace(",",""))
}

for (const x in data.rates) {
    createOption(from,x,data.rates[x])
    createOption(to,x,data.rates[x])
}

function createTr (x){

    let tr = document.createElement("tr");

    let rowspacer = document.getElementById("rowspacer");
    if (rowspacer) {
        rowspacer.remove();
    }

    x.map(function (el){
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    });
    hostorylist.appendChild(tr);
}

function store (){
    localStorage.setItem("record",hostorylist.innerHTML);
}

document.getElementById("calc").addEventListener("submit",function (e){
    e.preventDefault();
    //get
    let x = input.value;
    let y = from.value;
    let z = to.value;

    
    
    //set
    let first = x * y;
    let second = first/z;
    let result = second.toFixed(2);
    let date = new Date().toLocaleString()
    let fromcurrency = x+" "+from.options[from.selectedIndex].innerText;
    let tocurrency = to.options[to.selectedIndex].innerText;
    let arr = [date,fromcurrency,tocurrency,result];
    createTr(arr);
    store();

    //reset
    input.value = "";
    input.focus();
    output.innerHTML = result;
    from.value = "";
    to.value = "1";
});

(function (){
    if (localStorage.getItem("record")) {
        hostorylist.innerHTML = localStorage.getItem("record");
    }else{
        hostorylist.innerHTML = `<tr id="rowspacer"><td colspan="4">There is no record</td></tr>`
    };
})()

let icon = document.querySelector(".mode-icon")

function changeMode (){
    document.body.classList.toggle("night-mode")
    icon.classList.toggle("fa-sun")
}

