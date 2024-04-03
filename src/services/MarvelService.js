import { useHttp } from "../hooks/http.hook";

// файл MarvelService.js не будет переименовывать, тк это специализированный компонент, где раньше был класс, переписанный на хук
// а вот к самому хуку добавим use
const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // пер-я начинается с подчеркивания - говорит о том, что это запрещено изменять
    const _apiKey = 'apikey=a69aadd3cee4bd52ac851e95515c1aaa';
    const _baseOffset = 210; // начнем с персонажа №210 тк вначале мало информации в персах

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter); // вернем массив с объектами, кот-е нужны
    }

    const getCharacter = async (id) => { // т.к getResource выполняется ассинхронно, то чтоб получить пер-ю res нужно подождать, добавив async await
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    // метод получает большой объект с данными, а отдает только те, кот-е нам нужны
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    };

    return {loading, error, getAllCharacters, getCharacter, clearError};
}

export default useMarvelService;