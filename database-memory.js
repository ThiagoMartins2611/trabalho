import {randomUUID} from "node:crypto"
export class DatabaseMemory{
    #livros = new Map()
    // criando livro
    create(livro){
        const livroId = randomUUID()
        this.#livros.set(livroId, livro)
    }
    // Atualizar livro
    update(id, livro){
        this.#livros.set(id, livro)
    }
    list(){
        return Array.from(this.#livros.entries())
    }
    delete(id){
        this.#livros.delete(id)
    }
}