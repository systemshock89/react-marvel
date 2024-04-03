import { useState, useCallback } from "react";

// хук позволяет отправлять запросы, обрабатывать р-ты и сохранять локальные состояния
export const useHttp = () => {
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type' : 'application/json'}) => {
        
        setLoading(true); // запускается при первичной загрузке первых 9 персов

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`); // объект ошибки
                // оператор throw выкидывает новую ошибку
            }

            const data = await response.json();

            setLoading(false);
            return data;
        } catch(e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }

    }, []);

    // ф-я чистит ошибки (вместо  setError(e.message) в catch() ставит null)
    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError}
}