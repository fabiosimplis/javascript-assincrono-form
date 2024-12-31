const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        // FileReader: Criamos uma nova instância do FileReader. Esse objeto nos permite ler o conteúdo do arquivo selecionado.
        const leitor = new FileReader();
        // carreggamento do arquivo
        leitor.onload = () => {
            //retorno da promise em caso de sucesso
            resolve({ url: leitor.result, nome: arquivo.name });
        };

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        };
        // Este método lê o arquivo e o codifica como um Data URL, uma string base64 que representa os dados do arquivo. Isso permite que a imagem seja mostrada diretamente no navegador sem precisar ser enviada para um servidor primeiro.
        leitor.readAsDataURL(arquivo);
    });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p")
/*
* 'change': Primeiro, adicionamos um ouvinte de eventos ao nosso input de arquivo. 
* Isso significa que sempre que um arquivo for selecionado, o código dentro da função será executado.
*/
inputUpload.addEventListener("change", async (evento) => {
    // Pega arquivo dentro do evento
    const arquivo = evento.target.files[0];
    // se arquivo existir
    if(arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            console.log("conteudo", conteudoDoArquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("ERRO: Falha na leitura do arquivo: ", erro);
        }
    }
});

/*
* modificando a Tag
*/

const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

inputTags.addEventListener("keypress", (evento) => {
    if (evento.key == "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== ""){
            const tagNova = document.createElement("li");
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
            listaTags.appendChild(tagNova);
            inputTags.value = "";
        }
    }
});
