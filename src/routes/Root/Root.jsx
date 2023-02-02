import { useState, useEffect } from 'react';
import { Outlet, useOutlet } from "react-router-dom";

import ConnectionTest from '../../components/ConnectionTest/ConnectionTest';

import Button from '../../components/Button/Button';

import './Root.css';

function Root() {

    let outlet = useOutlet();
    const [loginStatus, setLoginStatus] = useState(false);
    const [axiosURL, setAxiosURL] = useState([]);

    useEffect( () => {
        if(outlet === null){
            window.location.href = "/main";
        }
    }, [] );

    // if(axiosURL.length !== 0) console.log("current link: " + axiosURL);

    return (
        <div>
            {(axiosURL.length === 0)
            ?<ConnectionTest 
                script = "Connection_test.php"
                callBack = { setAxiosURL } 
            />
            :<header>
                <nav className='container-md'>
                    <div className='navButtons'>
                        <Button 
                            type="Button"
                            text="Главная"
                            href="/main"
                        />
                        <Button 
                            type="Button"
                            text="Панель администратора"
                            href="/admin"
                        />
                    </div>
                    <div>
                        {loginStatus
                        ? <div className='LoginRegister'>
                            <Button 
                                type="Button"
                                text="Выход"
                                href="/main"
                            />
                        </div>
                        : <div className='LoginRegister'>
                            <Button 
                                type="Button"
                                text="Вход"
                                href="/login"
                            />
                            <Button 
                                type="Button"
                                text="Регистрация"
                                href="/registration"
                            />
                        </div>
                        }
                    </div>
                </nav>
                <hr />
            </header>}

            <div className='container-md'>
                <Outlet />
            </div>
        </div>
    );
}

export default Root;
