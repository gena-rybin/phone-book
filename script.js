window.onload  = function () {


    var body = document.body;
    var h1 = document.createElement('h1');
    var h2 = document.createElement('h2');
    var	h4 = document.createElement('h4');
    var div = document.createElement('div');
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    var p = document.createElement('p');

    var btnLoad = document.getElementById('load');
    var btnClear = document.getElementById('clear');

    var clients = {};
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

// page loading
    body.appendChild(h1);
    body.appendChild(h2);
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
            showClients(clients);
        }
    }
    function showClients(obj) {
        obj.forEach(function(obj) {
            div = divShortData.appendChild(div.cloneNode(false));
            div.innerHTML = '<span>' + obj.general.firstName + ',  ' + obj.job.title + '</span>' +'  '+ '<img src="' + obj.general.avatar + '" alt="' + obj.general.firstName + '" style="height:64px">';
            div.addEventListener("click", selectUser);
        });
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
        for (key in clients[pos]) {
            for (ind in clients[pos][key]) {
                var p = divFullData.appendChild(document.createElement('p'));
                p.innerText = ind + ': ' + clients[pos][key][ind];
            }
        }
    }

}