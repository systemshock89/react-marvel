import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])

   const updateChar = () => {
        clearError();
        
        // ориентируемся на пропсы
        const {charId} = props;
        if(!charId){
            return;
        }

        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ?  <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null; // не загрузка, не ошибка, но при этом есть персонаж

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return(
        <>
        <div className="char__basics">
            <img src={thumbnail} alt={name} style={imgStyle}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
            {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comics.length > 0 ? null : 'Нет комиксов'}
            {
                comics.map((item, i) => {
                    
                    if(i > 9) return; // если в массиве много эл-то, то этот способ даст просадки по производительности, тк будет проходится по всем ним
                    // нужно переписывать на стандартный цикл с break. Но формировать новый массив, а не мутировать текущий
    
                    const comicId = item.resourceURI.match(/\d+$/)[0];
                    /**
                     * регулярное выражение \d+$ будет соответствовать последовательности цифр в конце строки.
                     * Функция match() возвращает массив совпадений. 
                     * Поэтому мы берем первый элемент этого массива [0], который содержит найденное число.
                     */

                    return (
                        
                        <li key={i} className="char__comics-item">
                            <Link to={`/comics/${comicId}`}>{item.name}</Link>
                        </li> 
                    )
                })
            }
        </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number // обязательно число
}

export default CharInfo;