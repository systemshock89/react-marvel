import { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component{

    state = {
        charList: [],
        loading: true, // запускается при первичной загрузке первых 9 персов
        error: false,
        newItemLoading: false, // запускается во время загрузки новых эл-тов после клика "показать еще"
        offset: 210, // каждый раз когда завершен запрос на сервер увеличивает отступ на 9 персонажей (можно вставить большое число и потестировать ситуацию, когда закончились персонажи)
        charEnded: false // если закончились персонажи
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest(); 
        // Первый раз посылаем запрос на сервер, не передавая offset (он будет подставлен из _baseOffset)
    }

    // запрос на сервер
    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

    // когда запустился запрос onRequest и там что-то грузится, переключим состояние в newItemLoading: true
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    // когда персонажи загрузились получаем новые данные, из которых будем формировать новое состояние
    // если мы первый раз запускаем этот метод, то в ...charList пустой массив, кот-й ни во что не развернется
    // и у нас будет только ...newCharList, кот-я развернется в новые эл-ты.
    // В последующих запусках в ...charList будут старые эл-ты, а в ...newCharList новые.
    // В итоге они будут складываться в один массив.
    onCharListLoaded = (newCharList) => {

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
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList], // разворачиваем старый массив charList и добавляем newCharList
            loading: false, 
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        })) 

        // this.setState({
        //     charList, 
        //     loading: false, 
        //     newItemLoading: false
        // }) 
    }

    onError = () => {
        this.setState({
            loading: false, 
            error: true 
        }) 
    }

    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items =  arr.map((item) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => {this.props.onCharSelected(item.id)}}>
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

    render (){
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ?  <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading} 
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired // чтобы была ф-я и чтобы пропс был передан
}

export default CharList;