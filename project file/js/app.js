let input = document.getElementById("input");
let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");


let createOption = (x,y,z) => {
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.setAttribute("value",toNum(z));
    o.appendChild(t);
    x.appendChild(o);
}

let toNum = x =>{
    return Number(x.replace(",",""));
} 

for (let x in data.rates) {
    createOption(from,x,data.rates[x]);
    createOption(to,x,data.rates[x])
}

let createTr = (x) => {
    let rowSpacer = document.getElementById("rowSpacer");
    if (rowSpacer) {
        rowSpacer.remove();
    }
    let tr = document.createElement("tr");
    x.map(function (el) {
        let td = document.createElement("td");
        let textNode = document.createTextNode(el);
        
        td.appendChild(textNode);
        tr.appendChild(td);
    })

    historyList.appendChild(tr);
}

function store() {
    localStorage.setItem("record",historyList.innerHTML)
}

document.getElementById("calc").addEventListener("submit",function (e) {
    e.preventDefault();

    //get state
    let x = input.value;
    let y = from.value;
    let z = to.value;
    let fromText = x+""+from.options[from.selectedIndex].innerHTML;
    let toText = to.options[to.selectedIndex].innerHTML;
    
    
    //process
    let first = x*y;  
    let second = first/z;
    let display = second.toFixed(2);
    let date = new Date().toLocaleString();
    let arr = [date,fromText,toText,display];
    createTr(arr);
    store();

    //set state
    result.innerHTML = display;
    input.value = "";
    input.focus();
    from.value = "";
    to.value = "1";
});

function deleteItem() {
    if (localStorage.getItem("record")) {
        localStorage.removeItem("record") ;
        result.innerHTML = 0 ;
    }else{
        historyList.innerHTML = `<tr id="rowSpacer"><td colspan=4;>There are nothing.</td></tr>`
    }
  }

(function () {
    if (localStorage.getItem("record")) {
        historyList.innerHTML = localStorage.getItem("record");
    }else{
        historyList.innerHTML = `<tr id="rowSpacer"><td colspan=4;>There are nothing.</td></tr>`
    }
})();

let test = () => {
    console.log(from.options[from.selectedIndex].innerHTML);
}
function changeMode() {
    document.body.classList.toggle("night-mode");
    document.getElementById("modeIcon").classList.toggle("fa-sun");
}


