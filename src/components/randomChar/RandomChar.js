import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState({});
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId)
        }
        // eslint-disable-next-line
    }, [])
 
    // когда персонаж загрузился
    const onCharLoaded = (char) => {
        setChar(char); // char: char
    }

    const updateChar = () => {

        // если запрос вызвал ошибку, то по следующему нажатию на кнопку "Try it" подгрузить нового перса не получится, тк появилась js ошибка
        // Чтобы этого не произошло, нужно перед каждым новым запросом чистить ошибку
        clearError();

        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // создадим случайное число в определенном промежутке и округлим его
        // example 1011005
        
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    // если необходимо несколько вещей отображать в зависимости от состояний:
    // const errorMessage = error ?  <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error) ? <View char={char} /> : null; // контент помещается на страницу тогда, когда нет загрузки, но при этом нет ошибки

    return (
        <div className="randomchar">

            {setContent(process, View, char)}
            {/* {errorMessage} */}
            {/* {spinner} */}
            {/* {content} */}
            {/* {loading ? <Spinner/> : <View char={char} />} */}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

// простой рендерящий компонент
const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return(
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;