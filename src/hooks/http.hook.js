import { useState, useCallback } from "react";

// хук позволяет отправлять запросы, обрабатывать р-ты и сохранять локальные состояния
export const useHttp = () => {
    // перешли на конечный автомат, поэтому loading и error не нужны
    // const [loading, setLoading] = useState(false); 
    // const [error, setError] = useState(null);
    const [process, setProcess] = useState('waiting'); // Текущее состояние компонента (по умолчанию ожидание какого-то действия)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type' : 'application/json'}) => {
        
        // setLoading(true); // запускается при первичной загрузке первых 9 персов
        setProcess('loading'); // меняем состояние компонента в течение действия нашего запроса

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`); // объект ошибки
                // оператор throw выкидывает новую ошибку
            }

            const data = await response.json();

            // setLoading(false);
            
            // setProcess('confirmed'); // состояние компонента, когда запрос завершен
            // Установка состояния confirmed здесь будет приводить к ошибке, тк здесь асинхронные ф-ции и данные еще не будет сформированы.
            // нужно прокинуть setProcess в Charinfo и установить confirmed там

            return data;
        } catch(e) {
            // setLoading(false);
            // setError(e.message);
            setProcess('error'); // состояние компонента, когда произошла ошибка
            throw e;
        }

    }, []);

    // ф-я чистит ошибки (вместо  setError(e.message) в catch() ставит null)
    const clearError = useCallback(() => {
        // setError(null);
        setProcess('loading'); // при очистке ошибки ставим процесс в loading
    }, []);

    // return {loading, request, error, clearError, process, setProcess}
    return {request, clearError, process, setProcess}
}