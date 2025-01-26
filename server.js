import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";


const database = new DatabaseMemory()
const server = fastify()


server.post('/livro', (request, reply) => {

    const {titulo, autor, tipo, npaginas} = request.body

    database.create({
        titulo: titulo,
        autor: autor,
        tipo: tipo,
        npaginas: npaginas
    })
    return reply.status(201).send()
});


server.get('/livros', () => {

    const livros = database.list()
    console.log(livros)
    return livros
})


server.put('/livros/:id', (request, reply) => {

    const livroId = request.params.id
    const {titulo, autor, tipo, npaginas} = request.body

    const livro = database.update(livroId,{
        titulo: titulo,
        autor: autor,
        tipo: tipo,
        npaginas: npaginas,
    })

    return reply.status(204).send()
})



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

    for (let i = 0; i < arrayNewInfo.length; i++) {
        
        arrayWaitAtualization.forEach((info, index) => {
            let [nameInfo, valueInfo] = info

            if(nameInfo === arrayNewInfo[i][0]){
                arrayWaitAtualization[index][1] = arrayNewInfo[i][1]

            }
        });
        
    }

    


    const livroAtualizado = Object.fromEntries(arrayWaitAtualization);
    console.log(livroAtualizado);

    
    //passamdo dados para serem atualizados
    const livro = database.update(livroId, livroAtualizado);


    //sucesso sem conteúdo
    return reply.status(204).send()

})


server.delete('/livros/:id', () => {
    return "Excluir"
})


server.listen({
    port: 3333,
});