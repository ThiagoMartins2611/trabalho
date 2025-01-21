// importando fastify
import { fastify } from "fastify";
// Importando database
import { DatabaseMemory } from "./database-memory.js";
//criando o Database
const database = new DatabaseMemory()
//criando servidor
const server = fastify()
//criando um livro
server.post('/livro', (request, reply) => {
// Acessando dados do corpo
    const {titulo, autor, npaginas} = request.body

    database.create({
        titulo: titulo,
        autor: autor,
        npaginas: npaginas
    })
    return reply.status(201).send()
});
/*Lendo livros cadastrados*/
server.get('/livros', () => {
// Acessando database
    const livros = database.list()
    console.log(livros)
// Retornado livro
    return livros
})
/*Atualiza livro totalmente, lembre-se de passar o route parament*/
server.put('/livros/:id', (request, reply) => {
    //return "Atualizar total"
    //passando ID do livro
    const livroId = request.params.id
    //passando o restante dos atributos
    const {titulo, autor, npaginas} = request.body
    //passamdo dados para serem atualizados
    const livro = database.update(livroId,{
        titulo: titulo,
        autor: autor,
        npaginas: npaginas,
    })
    //sucesso sem conteúdo
    return reply.status(204).send()
})
/*Atualiza livro parcialmente, lembre-se de passar o route parament*/
server.patch('/livros/:id', (request, reply) => {


    const livroId = request.params.id
    
    console.log(request.body)
    

    //passando o restante dos atributos
    const newInfo = request.body
    let antigoLivro;
    
    
    for (let i = 0; i < database.list().length; i++) {

       if(database.list()[i][0] == livroId){
          antigoLivro = database.list()[i][1]
          break;
       }
    }

    let arrayWaitAtualization = Object.entries(antigoLivro);
    let arrayNewInfo = Object.entries(newInfo);
    let min = 0;
    

    for (let i = 0; i < arrayWaitAtualization.length; i++) {

        if(arrayWaitAtualization[i][0] == arrayNewInfo[min][0]){
            arrayWaitAtualization[i][1] = arrayNewInfo[min][1]

        }
        
        
    if((arrayNewInfo[min+1] == null || arrayNewInfo[min+1] == undefined)){
        break;
    }else{
        min++;
    }

       
    }


    const livroAtualizado = Object.fromEntries(arrayWaitAtualization);
    console.log(livroAtualizado);

    
    //passamdo dados para serem atualizados
    const livro = database.update(livroId, livroAtualizado);


    //sucesso sem conteúdo
    return reply.status(204).send()


    //return "Atualizar parcial"
})
/*Exclui livro, lembre-se de passar o route parament*/
server.delete('/livros/:id', () => {
    return "Excluir"
})
// Criando nosso servidor
server.listen({
    port: 3333,
});