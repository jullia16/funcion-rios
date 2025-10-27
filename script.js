// =====================
// Classe Funcionario
// =====================
class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    // Métodos de acesso
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

// =====================
// Array para armazenar funcionários
// =====================
const funcionarios = [];

// =====================
// Referências do DOM
// =====================
const form = document.getElementById('formFuncionario');
const tabelaCorpo = document.getElementById('tabelaFuncionarios').getElementsByTagName('tbody')[0];
const btnCadastrar = document.getElementById('btnCadastrar');

// Variável para controle de edição
let indiceEdicao = -1;

// =====================
// Função para atualizar a tabela
// =====================
function atualizarTabela() {
    tabelaCorpo.innerHTML = ''; // Limpa a tabela

    funcionarios.forEach((func, index) => {
        const linha = tabelaCorpo.insertRow();

        linha.insertCell(0).textContent = func.getNome();
        linha.insertCell(1).textContent = func.getIdade();
        linha.insertCell(2).textContent = func.getCargo();
        linha.insertCell(3).textContent = `R$ ${func.getSalario().toFixed(2)}`;

        const celulaAcoes = linha.insertCell(4);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = function() {

            document.getElementById('nome').value = func.getNome();
            document.getElementById('idade').value = func.getIdade();
            document.getElementById('cargo').value = func.getCargo();
            document.getElementById('salario').value = func.getSalario();

            indiceEdicao = index;

            btnCadastrar.textContent = 'Atualizar';
        };
        celulaAcoes.appendChild(btnEditar);

        celulaAcoes.appendChild(document.createTextNode(' '));

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.onclick = function() {
            if (confirm(`Deseja realmente excluir ${func.getNome()}?`)) {
                funcionarios.splice(index, 1);
                atualizarTabela();
                form.reset();
                btnCadastrar.textContent = 'Cadastrar';
                indiceEdicao = -1;
            }
        };
        celulaAcoes.appendChild(btnExcluir);
    });
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const cargo = document.getElementById('cargo').value;
    const salario = parseFloat(document.getElementById('salario').value);

    if (indiceEdicao === -1) {
        const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
        funcionarios.push(novoFuncionario);
    } else {
        const func = funcionarios[indiceEdicao];
        func.setNome(nome);
        func.setIdade(idade);
        func.setCargo(cargo);
        func.setSalario(salario);

        indiceEdicao = -1;
        btnCadastrar.textContent = 'Cadastrar';
    }

    atualizarTabela();
    form.reset();
});
