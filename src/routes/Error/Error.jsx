import { useOutletContext } from "react-router-dom";

function Error(){

    const {errMessage} = useOutletContext();

    return(
        <div>
            <h1>Произошла ошибка</h1>
            <h2>Функция ожидала получить в ответ выражение</h2>
            <h2>Функция получила:</h2>
            <p>{errMessage}</p>
            <h2>Причина ошибки, неверная интерпретация php скрипта сервером.</h2>
        </div>
    )
}

export default Error;