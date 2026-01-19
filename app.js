function novaTarefa(){
    overlay.classList.add('active');
    criarTarefa.classList.add('active')
}

function fecharModal(){
    overlay.classList.remove('active');
    criarTarefa.classList.remove('active')
}

function buscarTarefa(){
    fetch("http://localhost:3001/tarefas")
    .then(res => res.json())
    .then(res =>{adicionarTarefa(res);

    })
}
buscarTarefa();

function adicionarTarefa(listaDeTarefas){
    if(listaDeTarefas.length > 0){
        listaDeTarefas.map(tarefa => {
            lista.innerHTML += `
            <li>
            <h5>${tarefa.titulo}</h5> <p>${tarefa.descricao}</p> <div class="Lixeira">
            <box-icon type='solid' name='trash-alt' size="sm" onclick="deletarTarefa(${tarefa.id})"></box-icon>
            </div>
            </li>`
        }
        )
    }
}

function criarNovaTarefa(){
    event.preventDefault();
    let tarefa =
        {
            "titulo": titulo.value,
            "descricao": descricao.value
        }
    
        fetch("http://localhost:3001/tarefas",{
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(tarefa)
})
.then(res => res.json())
.then(res => {
    fecharModal();
    buscarTarefa();
    })
}

function deletarTarefa(id){
        fetch(`http://localhost:3001/tarefas/${id}`,{
    method: "DELETE",
        })
        .then(res => res.json())
            .then(res => {
                alert("Tarefa deletada com sucesso!");
                buscarTarefa();
            }
            )

}

function pesquisarTarefa(){
    let lis = document.querySelectorAll("#lista li");
    
    if(busca.value.length > 0){
    lis.forEach(li => {
    if(li.children[0].innerText.includes(busca.value)){
        li.classList.remove("esconder");
    } else {
        li.classList.add("esconder");
        }
        })
    } else {
        lis.forEach(li => {
        li.classList.remove("esconder");
        })
    }
}

