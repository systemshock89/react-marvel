class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // пер-я начинается с подчеркивания - говорит о том, что это запрещено изменять
    _apiKey = 'apikey=a69aadd3cee4bd52ac851e95515c1aaa';

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); // объект ошибки
            // оператор throw выкидывает новую ошибку
        }
    
        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
}

export default MarvelService;