
const gerarRelatorios = () => {
    const salarioAlto = funcionarios
        .filter(func => func.getSalario() > 5000)
        .map(func => func.getNome());

    const ulSalarioAlto = document.getElementById('salarioAlto');
    ulSalarioAlto.innerHTML = '';
    salarioAlto.forEach(nome => {
        const li = document.createElement('li');
        li.textContent = nome;
        ulSalarioAlto.appendChild(li);
    });

    const media = funcionarios.length > 0 
        ? funcionarios.reduce((acc, func) => acc + func.getSalario(), 0) / funcionarios.length
        : 0;

    document.getElementById('mediaSalarial').textContent = `R$ ${media.toFixed(2)}`;

    const cargos = [...new Set(funcionarios.map(func => func.getCargo()))];
    const ulCargos = document.getElementById('cargosUnicos');
    ulCargos.innerHTML = '';
    cargos.forEach(cargo => {
        const li = document.createElement('li');
        li.textContent = cargo;
        ulCargos.appendChild(li);
    });

    const nomesUpper = funcionarios.map(func => func.getNome().toUpperCase());
    const ulNomes = document.getElementById('nomesMaiusculo');
    ulNomes.innerHTML = '';
    nomesUpper.forEach(nome => {
        const li = document.createElement('li');
        li.textContent = nome;
        ulNomes.appendChild(li);
    });
};

const atualizarTabela = () => {
    tabelaCorpo.innerHTML = '';

    funcionarios.forEach((func, index) => {
        const linha = tabelaCorpo.insertRow();

        linha.insertCell(0).textContent = func.getNome();
        linha.insertCell(1).textContent = func.getIdade();
        linha.insertCell(2).textContent = func.getCargo();
        linha.insertCell(3).textContent = `R$ ${func.getSalario().toFixed(2)}`;

        const celulaAcoes = linha.insertCell(4);

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.onclick = () => {
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
        btnExcluir.onclick = () => {
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

    // Atualiza os relatórios
    gerarRelatorios();
};
