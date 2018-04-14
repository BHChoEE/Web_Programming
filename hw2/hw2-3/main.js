
var totalList = 0;
var todoList = [];

// click a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for(i = 0; i < close.length; ++i){
    close[i].onclick = function(){
        console.log("close");
        var div = this.parentElement;
        div.style.display = "none";
    }
}



function newList(){

    var itemList = [];

    var inputName = document.getElementById("myInput").value;
    var div = document.createElement("div");
    var name = document.createTextNode(inputName);
    name.id = "ListName" + totalList;
    div.appendChild(name);

    var list = document.createElement("ul");
    list.id = "list" + totalList;
    div.appendChild(list);

    var addText = document.createElement("input");
    addText.id = "text" + totalList;
    addText.placeholder = "type instance name..";
    div.appendChild(addText);

    var addBtn = document.createElement('span');
    div.appendChild(addBtn);
    addBtn.className = "addBtn";
    addBtn.onclick = function(){
        //var div = this.parentElement;
        //console.log(div.addText);
        var li = document.createElement("li");
        var inputValue = document.getElementById(addText.id).value;
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        if(inputValue == ""){
            alert("You must write something!!");
        }else{
            document.getElementById(list.id).appendChild(li);
        }
        document.getElementById(addText.id).value = "";

        var span = document.createElement("span");
        var spanTxt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(spanTxt);
        li.appendChild(span);
        
        itemList.push(li);
        
        for(i = 0; i < close.length; ++i){
            close[i].onclick = function(){
                //console.log("close");
                var div = this.parentElement;
                div.style.display = "none";
                var upDiv = div.parentElement;
                upDiv.removeChild(div);
            }
        }
        
        //console.log(itemList.length);
    }
    addBtn.textContent = "addItem";
    
    // button to close a list
    var closeListBtn = document.createElement('span');
    var closeListText = document.createTextNode('\u00D7');
    closeListBtn.appendChild(closeListText);
    div.appendChild(closeListBtn);
    closeListBtn.className = "closeList";
    closeListBtn.onclick = function(){
        var div = this.parentElement;
        div.style.display = "none";
    }
    // input to change list name    
    var modName = document.createElement("input");
    modName.type = "text";
    modName.id = "modName" + totalList;
    modName.placeholder = "which name do you want to modify to the list above..";
    div.appendChild(modName);
    var modBtn = document.createElement('span');
    var modBtnText = document.createTextNode("Change List Name");
    modBtn.appendChild(modBtnText);
    modBtn.className = 'modBtn';
    modBtn.onclick = function(){
        var modValue = document.getElementById(modName.id).value;
        if(modValue == ""){
            alert("You must write something!!");
        }else{
            //document.getElementById(name.id).nodeValue = modValue;
            name.nodeValue = modValue;
        }
        document.getElementById(modName.id).value = "";
    }
    div.appendChild(modBtn)

    document.body.appendChild(div);
    document.getElementById("myInput").value = "";
    
    totalList += 1;
    todoList.push(div);
    //console.log(todoList.length);

    // add a checked symbol when clicking on a list item
    var checkLists = document.querySelectorAll('ul');
    for(let i = 0 ; i < checkLists.length ; ++i){
        var checkList = checkLists[i];
        checkList.addEventListener('click', function(ev){
            //console.log(i);
            if(ev.target.tagName === 'LI'){
                ev.target.classList.toggle('checked');
            }
        }, false);
    }


    // count botton
    var doneNum = document.createElement('p');
    var doneText = document.createTextNode('done item: 0');
    doneNum.appendChild(doneText);
    div.appendChild(doneNum);
    var undoneNum = document.createElement('p');
    var undoneText = document.createTextNode('undone item: 0');
    undoneNum.appendChild(undoneText);
    div.appendChild(undoneNum);

    var renBtn = document.createElement('span');
    var renBtnText = document.createTextNode('count');
    renBtn.appendChild(renBtnText);
    div.appendChild(renBtn);
    renBtn.classList = "renBtn";
    renBtn.onclick = function(){
        var itemLists = div.querySelectorAll('li');
        var done = 0;
        
        for(let i = 0 ; i < itemLists.length ; ++i){
            var item = itemLists[i];
            //console.log(item.classList.value);
            if(item.classList.value=="checked"){
                done += 1;
            }
        }
        var undone = itemLists.length - done; 
        doneNum.innerHTML = "done item: "+done;
        undoneNum.innerHTML = "undone item: "+undone;
    }

    var line = document.createTextNode("--------------------------------------------");
    div.appendChild(line);
}


function render(){
    var itemLists = document.querySelectorAll('li');
    var done = 0;
    
    for(let i = 0 ; i < itemLists.length ; ++i){
        var item = itemLists[i];
        //console.log(item.classList.value);
        if(item.classList.value=="checked"){
            done += 1;
        }
    }
    var undone = itemLists.length - done;
    document.getElementById("totalDone").innerHTML = "total Done: " + done;
    document.getElementById("totalUndone").innerHTML = "total Undone: " + undone;
     
}