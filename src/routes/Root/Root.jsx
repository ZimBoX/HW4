import { useState, useEffect } from 'react';
import { Outlet, useOutlet } from "react-router-dom";

import Button from '../../components/Button/Button';

import './Root.css';

function Root() {

    let outlet = useOutlet();

    useEffect( () => {
        if(outlet === null){
            window.location.href = "/main";
        }
    }, [] )

    const {loginStatus, setLoginStatus} = useState(false);

    return (
        <div>
            <header>
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
            </header>

            <div className='container-md'>
                <Outlet />
            </div>
        </div>
    );
}

export default Root;
