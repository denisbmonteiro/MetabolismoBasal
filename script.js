function Calcular() {
    ClearError();

    var masculino = document.getElementById('masculino').checked;
    var idadeStr = document.getElementById('idade').value.trim();
    var pesoStr = document.getElementById('peso').value.trim();
    var alturaStr = document.getElementById('altura').value.trim();
    var resultado;

    if (idadeStr === '') {
        ShowError("Insira a sua idade!");
        return;
    }

    var idade = Number(idadeStr);
    var peso = Number(pesoStr);
    var altura = Number(alturaStr);

    if (!Number.isFinite(peso) || peso <= 0) {
        ShowError("Insira o seu peso!");
        return;
    }

    if (!Number.isFinite(altura) || altura <= 0) {
        ShowError("Insira a sua altura!");
        return;
    }

    if (masculino)
        resultado = 66.47 + (13.75 * peso) + (5.003 * altura) - (6.775 * idade);
    else
        resultado = 655.09 + (9.563 * peso) + (1.85 * altura) - (4.676 * idade);

    document.getElementById('lblResultado').innerHTML = resultado.toFixed(2);
    document.querySelector('.resultado').classList.add("active");
}

function Limpar() {
    document.getElementById('masculino').checked = true;
    document.getElementById('feminino').checked = false;
    document.getElementById('idade').value = '';
    document.getElementById('peso').value = '';
    document.getElementById('altura').value = '';
    document.getElementById('lblResultado').innerText = 0;
    document.querySelector('.resultado').classList.remove("active");

    ClearError();
}

function ShowError(message) {
    document.getElementById('lblError').innerHTML = message;
    document.querySelector('.error').classList.add("active");
}

function ClearError() {
    document.getElementById('lblError').innerText = "";
    document.querySelector('.error').classList.remove("active");
}

document.addEventListener('DOMContentLoaded', function () {
    var idadeEl = document.getElementById('idade');
    if (!idadeEl) return;

    idadeEl.addEventListener('input', function (e) {
        var v = e.target.value.replace(/\D/g, '').slice(0, 3);
        if (v !== e.target.value) e.target.value = v;

        ClearError();
    });

    idadeEl.addEventListener('paste', function (e) {
        e.preventDefault();
        var paste = (e.clipboardData || window.clipboardData).getData('text') || '';
        var filtered = paste.replace(/\D/g, '').slice(0, 3);
        var el = e.target;
        var start = el.selectionStart || 0;
        var end = el.selectionEnd || 0;
        var newVal = (el.value.slice(0, start) + filtered + el.value.slice(end)).slice(0, 3);
        el.value = newVal;
        el.dispatchEvent(new Event('input', { bubbles: true }));
    });
});