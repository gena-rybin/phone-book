window.onload  = function () {


    var body = document.body;
    var h1 = document.createElement('h1');
    var h2 = document.createElement('h2');
    var	h4 = document.createElement('h4');
    var div = document.createElement('div');
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    var p = document.createElement('p');
    var input = document.createElement('input');
    var label = document.createElement('label');

    var btnLoad = document.getElementById('load');
    var btnClear = document.getElementById('clear');

    var clients = {};
    var selectedClients = [];
    var pos = 0;
    var user;

    // element constructor
    h1.innerHTML = '#07 task';
    h2.innerHTML = 'Phone Book  via xmlHttpRequest';

    var divWrapper = div.cloneNode(false);
    divWrapper.className = 'wrapper';

    // var cover = div.cloneNode(false);

    var divShortData = div.cloneNode(false);
    divShortData.className = 'left';

    var divFullData = div.cloneNode(false);
    divFullData.className = 'right';

    input.setAttribute('type', 'text');
    input.setAttribute('id', 'inpFilter');

    label.setAttribute('for', 'inpFilter');
    label.innerHTML = 'Filter for users below ';


// page loading
    body.appendChild(h1);
    body.appendChild(h2);
    body.appendChild(label);
    body.appendChild(input);
    body.appendChild(document.createElement('br'));
    body.appendChild(document.createElement('br'));
    body.appendChild(divWrapper);
    divWrapper.appendChild(divShortData);
    divWrapper.appendChild(divFullData);
    divFullData.appendChild(p);
    loadClients();

    //divContainerR.firstChild.classList.add('cover');

    // load data from JSON to the page
    btnLoad.addEventListener('click', loadClients);
    function loadClients() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/json/clients.json', false);
        xhr.send();
        if (xhr.status != 200) {
            // обработать ошибку
            h4.innerHTML = xhr.status ;
        } else {
            // вывести результат
            clients = JSON.parse(xhr.responseText);
            clearData();
            selectData();
        }
    }
    function showClients(obj) {
        obj.forEach(function(obj) {
            div = divShortData.appendChild(div.cloneNode(false));
            div.innerHTML = '<span>' + obj.general.firstName + ',  ' + obj.job.title + '</span>' +'  '+ '<img src="' + obj.general.avatar + '" alt="' + obj.general.firstName + '" style="height:64px">';
            div.addEventListener("click", selectUser);
        });
    }


    // Filter for clients-data
    input.addEventListener('keyup' , selectData);
    function selectData() {
        selectedClients = [];
        var filt = '';
        if(input.value.length){
            filt = input.value.toLowerCase();
        }
        selectedClients = clients.filter(function(item) {
            return item.general.firstName.toLowerCase().match(filt);
        })
        clearData();
        showClients(selectedClients);
    }


        // clear the page from data
    btnClear.addEventListener('click' , clearData);
    function clearData() {
        while (divShortData.hasChildNodes()) {
            divShortData.removeChild(divShortData.lastChild);
        }
        while (divFullData.hasChildNodes()) {
            divFullData.removeChild(divFullData.lastChild);
        }
    }


    function selectUser(event) {
        user = this;

        getIndex();

        for (var i = 0; i<user.parentNode.childNodes.length; i++) {
            if (user.parentNode.childNodes[i].classList.contains('active')) {
                user.parentNode.childNodes[i].classList.remove('active');
            }
        }
        user.classList.add('active');

        showFullInfo();

    }

    function getIndex() {
        user.parentNode.childNodes.forEach(function(item, index) {
            if (item === user) {
                pos = index;
            }
        });
    }

    function deleteChilds(parent) {
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.lastChild);
        }
    }

    function showFullInfo() {
        deleteChilds(divFullData);
        for (key in selectedClients[pos]) {
            for (ind in selectedClients[pos][key]) {
                if (ind==='avatar') continue;
                var p = divFullData.appendChild(document.createElement('p'));
                p.innerText = ind + ': ' + selectedClients[pos][key][ind];
            }
        }
    }

}