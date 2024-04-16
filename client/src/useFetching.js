import { useState } from "react";

// Удобная функция для получения стороннего ресурса при обращении к стороннему апи
// Возвращает результат колбека, флаг загрузки, флаг ошибки
export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
    const [error, setError] = useState(''); // Состояние ошибки

    // Асинхронная функция, возвращающая переданный колбек
    const fetching = async (...args) => {
        try {
            setIsLoading(true);
            await callback(...args)
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setIsLoading(false);
        }
    }
    return [fetching, isLoading, error]
}