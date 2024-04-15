import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null); // объект со всеми данными об этом комиксе
    const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateData()
        // eslint-disable-next-line
    }, [id])

    const updateData = () => {
        clearError();

        switch (dataType) {
            case 'comic':
                getComic(id)
                .then(onDataLoaded)
                .then(() => setProcess('confirmed'));
                break;
            case 'character':
                getCharacter(id)
                .then(onDataLoaded)
                .then(() => setProcess('confirmed'));
                break;
            default:
                return;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    // const errorMessage = error ?  <ErrorMessage/> : null;
    // const spinner = loading ? <Spinner/> : null;
    // const content = !(loading || error || !data) ? <Component data={data}/> : null; // не загрузка, не ошибка, но при этом есть персонаж

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
            {/* {errorMessage}
            {spinner}
            {content} */}
        </>
    )
}

export default SinglePage;