import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component{

    // constructor(props) {
        // super(props);
        // this.updateChar(); // Будет Warning: Can't call setState on a component that is not yet mounted
        // нельзя вызывать этот метод внутри конструктора. Следствие этого: придет два объекта при вызове (минус для оптимизации):
        // см ур.151
        // .getAllCharacters()
        // .then(res => console.log(res))
    // }

    state = {
        char: {},
        // name: null,
        // description: null,
        // thumbnail: null,
        // homepage: null,
        // wiki: null
        loading: true, // идет загрузка объекта или нет
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    // когда персонаж загрузился
    onCharLoaded = (char) => {
        this.setState({
            char, // char: char
            loading: false, // как только загрузятся данные, позиция становится false
        }) 
    }

    // когда персонаж уже существует, нажимаем кнопку try it и загружаем новгго
    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    // отлавливаем ошибку 404, кот-я появляется если такого пользователя нет
    onError = () => {
        this.setState({
            loading: false, 
            error: true 
        }) 
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); // создадим случайное число в определенном промежутке и округлим его
        // example 1011005
        
        this.onCharLoading(); // перед тем как запустится обновление персонажа покажем спиннер
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render(){
        const {char, loading, error} = this.state;
        // const {char: {name, description, thumbnail, homepage, wiki}, loading} = this.state;
        // const {name, description, thumbnail, homepage, wiki} = this.state;

        // если необходимо несколько вещей отображать в зависимости от состояний:
        const errorMessage = error ?  <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} /> : null; // контент помещается на страницу тогда, когда нет загрузки, но при этом нет ошибки

        return (
            <div className="randomchar">

                {errorMessage}
                {spinner}
                {content}
                {/* {loading ? <Spinner/> : <View char={char} />} */}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

// простой рендерящий компонент
const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
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