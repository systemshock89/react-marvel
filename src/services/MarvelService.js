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

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter); // вернем массив с объектами, кот-е нужны
    }

    getCharacter = async (id) => { // т.к getResource выполняется ассинхронно, то чтоб получить пер-ю res нужно подождать, добавив async await
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    // метод получает большой объект с данными, а отдает только те, кот-е нам нужны
    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;