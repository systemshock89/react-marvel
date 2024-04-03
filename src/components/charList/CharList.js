import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false); // запускается во время загрузки новых эл-тов после клика "показать еще"
    const [offset, setOffset] = useState(210); // каждый раз когда завершен запрос на сервер увеличивает отступ на 9 персонажей (можно вставить большое число и потестировать ситуацию, когда закончились персонажи)
    const [charEnded, setCharEnded] = useState(false); // если закончились персонажи

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => { // useEffect запускается после рендера, поэтому в этом случае мы можем исп-ть стрелочную ф-ю выше, чем она объявлена
        onRequest(offset, true);
    }, [])

    // запрос на сервер
    const onRequest = (offset, initial) => {
        // initial: true - первичная загрузка
        // initial: false - повторная загрузка по нажатию кнопки "показать еще"
        initial ? setNewItemLoading(false) : setNewItemLoading(true);     
        getAllCharacters(offset)
        .then(onCharListLoaded)
    }

    // когда персонажи загрузились получаем новые данные, из которых будем формировать новое состояние
    // если мы первый раз запускаем этот метод, то в ...charList пустой массив, кот-й ни во что не развернется
    // и у нас будет только ...newCharList, кот-я развернется в новые эл-ты.
    // В последующих запусках в ...charList будут старые эл-ты, а в ...newCharList новые.
    // В итоге они будут складываться в один массив.
    const onCharListLoaded = (newCharList) => {

        /*
        Ситауция - когда загрузились все персонажи и подгружать больше нечего.
        При клике на кнопку "загрузить еще" не будет ошибки, тк бекэнд спроектирован правильно и пришлет пустой массив.
        Но кнопку надо скрыть. Лучше стилями, тк если ее физически удалять, то компонент надо будет перерисовывать.

        Здесь в логиге не реализован случай:
        Когда последние 9 эл-то приходят, то кнопка будет удаляться.

        Также не реализовано запоминание количества уже загруженных эл-тов на страницу
        
        Динамически вычислим, если длина нового массива < 9 и помещаем ended в state
        */
        let ended = false;
        if(newCharList.length < 9){
            ended = true;
        }

        // формируем не 9 персонажей, а подгружаем каждый раз еще по 9. state зависит от предыдущуего stat'а. 
        // Вовзращаем объект из ф-и setState и передаем charList, подвергнутый деструктуризации
        setCharList(charList => [...charList, ...newCharList]); // разворачиваем старый массив charList и добавляем newCharList
        // setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended);

        // this.setState({
        //     charList, 
        //     loading: false, 
        //     newItemLoading: false
        // }) 
    }

    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }
                        }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ?  <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null; // есть загрузка, но не загрузка новых компонетов: 
    // тогда спиннер грузится только при первой загрузке страницы. А при нажатии "показать еще" спиннера уже нет

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading} 
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired // чтобы была ф-я и чтобы пропс был передан
}

export default CharList;