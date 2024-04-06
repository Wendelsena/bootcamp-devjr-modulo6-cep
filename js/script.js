function search() {
    var cep = document.getElementById("cep").value;
    var url = `https://brasilapi.com.br/api/cep/v1/${cep}`;

    $.getJSON(url, function(address){
        showAddress(address);

        clearError();

    }).fail(() => {
        showError("Address not found!");
    })
};

function showError(msg) {
    document.getElementById("error").innerHTML = `<div class='alert alert-danger mt-1' role='alert'>${msg}</div>`;
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
