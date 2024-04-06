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
            clearError()
        })
        .catch(error => {
            showError("Endereço não encontrado");
        });
}

function showError(msg) {
    document.getElementById("error").innerHTML = `<div class='alert alert-danger col-2 mt-3' role='alert'>${msg}</div>`;
}

function clearError() {
    document.getElementById("error").innerHTML = "";
}


function showAddress(address) {
    document.getElementById("street").value = address.street;
    document.getElementById("neighborhood").value = address.neighborhood;
    document.getElementById("city").value = address.city;
    document.getElementById("state").value = address.state;
}


