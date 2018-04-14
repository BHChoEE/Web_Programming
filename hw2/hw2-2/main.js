var closeBtnList = document.getElementsByClassName("close");
for(let i = 0 ; i < closeBtnList; ++i){
    closeBtnList[i].onclick = function(){
        var div = this.parentElement;
        div.style.display = "none";
        var upperDiv = div.parentElement;
        upperDiv.removeChild(div);
    }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

function newItem(){
    var li = document.createElement("li");
    var itemName = document.getElementById("itemInput").value;
    var year = document.getElementById("itemYear").value;
    var month = document.getElementById("itemMonth").value;
    var day = document.getElementById("itemDay").value;
    var liTxt = document.createTextNode(itemName+"                   "+year+"/"+month+"/"+day);
    li.appendChild(liTxt);

    if((itemName=== '' || year==='') || (day==='' || month==='')){
        alert("You must enter something!");
    }
    else{
        document.getElementById('list').appendChild(li);
    }
    document.getElementById("itemInput").value = "";
    document.getElementById("itemYear").value = "";
    document.getElementById("itemMonth").value = "";
    document.getElementById("itemDay").value = "";

    var span = document.createElement("span");
    var spanTxt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(spanTxt);
    li.appendChild(span);
    
    for(let i = 0; i < closeBtnList.length; ++i){
        closeBtnList[i].onclick = function(){
            var div = this.parentElement;
            div.style.display = "none";
            var upperDiv = div.parentElement;
            upperDiv.removeChild(div);
        }
    }
}

function clearInput(){
    document.getElementById("itemInput").value = "";
    document.getElementById("itemYear").value = "";
    document.getElementById("itemMonth").value = "";
    document.getElementById("itemDay").value = "";
}