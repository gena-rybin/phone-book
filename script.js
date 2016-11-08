window.onload  = function () {


    var body = document.body;
    var h1 = document.createElement('h1');
    var h2 = document.createElement('h2');
    var	h4 = document.createElement('h4');
    var div = document.createElement('div');
    var ul = document.createElement('ul');

    var wrapper = document.getElementsByClassName('wrapper');
    var btn = document.getElementById('btn');
    var btnClear = document.getElementById('clear');



    // element constructor
    h1.innerHTML = '#07 task';
    h2.innerHTML = 'Phone Book  via xmlHttpRequest';
   // h4.innerText = 'www';

    var divWrapper = div.cloneNode(false);
    divWrapper.className = 'wrapper';


// page loading
    body.appendChild(h1);
    body.appendChild(h2);
    body.appendChild(divWrapper);
    divWrapper.appendChild(h4);
    divWrapper.appendChild(ul);


    btn.addEventListener('click' , loadClients);

    function loadClients() {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', '/json/clients.json', false);
        xhr.send();

        if (xhr.status != 200) {
            // обработать ошибку
            h4.innerHTML = xhr.status ;
        } else {
            // вывести результат
            //h4.innerHTML = xhr.responseText;
            var clients = JSON.parse(xhr.responseText);
            console.table( typeof clients);
            showClients(clients);
        }
    }

    btnClear.addEventListener('click' , clearData);
    function clearData() {
        while (ul.hasChildNodes()) {		// clear view
            ul.removeChild(ul.lastChild);
        }
    }

    function showClients(obj) {

        obj.forEach(function(obj) {
            var li = ul.appendChild(document.createElement('li'));
            li.innerHTML = obj.general.firstName + '  ' + obj.general.lastName;
        });
        console.log(123);

    }



}