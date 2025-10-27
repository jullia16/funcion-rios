class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    getNome() { return this.nome; }
    setNome(nome) { this.nome = nome; }

    getIdade() { return this.idade; }
    setIdade(idade) { this.idade = idade; }

    getCargo() { return this.cargo; }
    setCargo(cargo) { this.cargo = cargo; }

    getSalario() { return this.salario; }
    setSalario(salario) { this.salario = salario; }

    toString() {
        return `${this.nome}, ${this.idade} anos, ${this.cargo}, R$${this.salario.toFixed(2)}`;
    }
}

const funcionarios = [];

const form = document.getElementById('formFuncionario');
const tabelaCorpo = document.getElementById('tabelaFuncionarios').getElementsByTagName('tbody')[0];

function atualizarTabela() {
    tabelaCorpo.innerHTML = '';

    funcionarios.forEach(func => {
        const linha = tabelaCorpo.insertRow();

        linha.insertCell(0).textContent = func.getNome();
        linha.insertCell(1).textContent = func.getIdade();
        linha.insertCell(2).textContent = func.getCargo();
        linha.insertCell(3).textContent = `R$ ${func.getSalario().toFixed(2)}`;
    });
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const cargo = document.getElementById('cargo').value;
    const salario = parseFloat(document.getElementById('salario').value);

    const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
    funcionarios.push(novoFuncionario);

    atualizarTabela();

    form.reset();
});
