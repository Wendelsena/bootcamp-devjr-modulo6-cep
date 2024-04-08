var registers = [];

function search() {
    var cep = document.getElementById("cep").value;
    var url = `https://brasilapi.com.br/api/cep/v1/${cep}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Not Found');
            }

            clearError();
            return response.json();
        })
        .then(address => {
            showAddress(address);
            clearError();
        })
        .catch(error => {
            showError("Endereço não encontrado");
        });
}

function showError(msg) {
    document.getElementById("error").innerHTML = `<div class='alert alert-danger col-md-8 mt-3' role='alert'>${msg}</div>`;
}

function clearError() {
    document.getElementById("error").innerHTML = "";
}


function showAddress(address) {
    document.getElementById("street").value = address.street;
    document.getElementById("neighborhood").value = address.neighborhood;
    document.getElementById("city").value = address.city;
    document.getElementById("state").value = address.state;
    document.getElementById("service").value = address.service;
}

//OnLoad
loadRegisters();

//Load all studants
function loadRegisters() {
    for (let register of registers) {
        addNewRow(register);
    }
}

// Save students
function save() {
    var register = {
        id: registers.length + 1,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        number: document.getElementById("number").value,
        street: document.getElementById("street").value,
        neighborhood: document.getElementById("neighborhood").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value
    };

     // Verifica se o endereço já está presente nos registros
     var existingRegister = registers.find(existing => existing.street === register.street && existing.number === register.number);
     if (existingRegister) {
         showError("This address already exists!");
         return; // Aborta a função para evitar a inserção do mesmo CEP novamente
     }

    registers.push(register); // Adiciona o registro ao array

    addNewRow(register); // Adiciona o registro à tabela

    // Reseta o formulário após salvar os dados
    document.getElementById("formRegister").reset();
}


//Add new row
function addNewRow(register) {
    var table = document.getElementById("registerTable");
    var newRow = table.insertRow(-1); // Insere a nova linha no final da tabela

    // insere o Id na tabela
    var idNode = document.createTextNode(register.id);
    newRow.insertCell().appendChild(idNode);

    // insere o Name na tabela
    var nameNode = document.createTextNode(register.firstName + " " + register.lastName);
    newRow.insertCell().appendChild(nameNode);

    // insere o numero na tabela
    var numberNode = document.createTextNode(register.number);
    newRow.insertCell().appendChild(numberNode);

    // insere o rua na tabela
    var streetNode = document.createTextNode(register.street);
    newRow.insertCell().appendChild(streetNode);

    // insere o bairro na tabela
    var neighborhoodNode = document.createTextNode(register.neighborhood);
    newRow.insertCell().appendChild(neighborhoodNode);

    // insere o cidade na tabela
    var cityNode = document.createTextNode(register.city);
    newRow.insertCell().appendChild(cityNode);

    // insere o estado na tabela
    var stateNode = document.createTextNode(register.state);
    newRow.insertCell().appendChild(stateNode);
}

function searchClient() {
    var searchQuery = document.getElementById("searchInput").value.toLowerCase();
    var foundClient = registers.find(client => {
        return client.id.toString() === searchQuery || (client.firstName.toLowerCase() + " " + client.lastName.toLowerCase()).includes(searchQuery);
    });

    if (foundClient) {
        console.log(`Client found:\nID: ${foundClient.id}\nName: ${foundClient.firstName} ${foundClient.lastName}\nNumber: ${foundClient.number}\nStreet: ${foundClient.street}\nNeighborhood: ${foundClient.neighborhood}\nCity: ${foundClient.city}\nState: ${foundClient.state}`);
    } else {
        showError("Client not found");
    }
}





