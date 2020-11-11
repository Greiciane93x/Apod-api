class UserModel{
    constructor (data) {
        
        this._data; 
        if(data !== undefined){
            this._data = data; 
        }
        this._imagem = ""; 

    }

     buscaImagem(){
        let date = this._data 
        let requisicao = new XMLHttpRequest();
        requisicao.open("GET", `https://api.nasa.gov/planetary/apod?api_key=B1O9vK47vMDHgvULt9xK1FNr4iHKDaxNKlCQGdFc&date=${date}` , false);
        
        requisicao.addEventListener ("load", () => 
        {
            if(requisicao.status == 200){
                let objeto = this._processaResponse(requisicao.responseText); 
               
                    this._atualiza ( objeto ); 
        
            }
        })
        
        requisicao.send();
              
    }
    _processaResponse(responseString){
        let response = JSON.parse (responseString); 
        return response;
    }
    _atualiza ( dados )
    {
        this._data = dados.date;
        this._imagem = dados.url; 
    }
    getData(){
        return this._data; 
    }
    getImagem(){
        return this._imagem; 
    }

}
class UserView{
    render (model){
       let imagem = document.querySelector("#conteudo"); 
        imagem.innerHTML = `
            <img src=${model.getImagem()}> 
        ` 
        document.body.appendChild( imagem ); 
    }
}
class Usercontroller{
    adicionaImagem(){
        let dados = new UserModel(data.value)
        dados.buscaImagem(); 

        let view = new UserView();
        view.render( dados ); 
    }
    
}

let controller = new Usercontroller();
document.getElementById("busca").addEventListener("click",controller.adicionaImagem)
var data = document.querySelector("#data")