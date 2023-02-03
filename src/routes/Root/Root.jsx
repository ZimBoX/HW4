import { useState, useEffect } from 'react';
import { Outlet, useOutlet } from "react-router-dom";

import ConnectionTest from '../../components/ConnectionTest/ConnectionTest';

import Button from '../../components/Button/Button';

import './Root.css';
import axios from 'axios';

function Root() {

    let outlet = useOutlet();
    const [loginStatus, setLoginStatus] = useState(false);
    const [axiosURL, setAxiosURL] = useState([]);
    const [logOutURL, setlogOutURL] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect( () => {
        if(outlet === null){
            window.location.href = "/main";
        }
    }, [] );
    useEffect( () => {
        if(!loginStatus && axiosURL.length > 0){
            axios.post(axiosURL).then( (responce) => {
                if(responce.data){
                    setLoginStatus(true);
                    setUserName(responce.data);
                }
            } )
        }
    } )

    function LogOut(){
        axios.post(logOutURL,{
            logout: true
        })
        .then( () => {
            window.location.reload();
        } )
    }

    // if(axiosURL.length !== 0) console.log("current link: " + axiosURL);

    return (
        <div>
            {(axiosURL.length === 0)
            ?<div>
            <ConnectionTest 
                script = "Connection_test.php"
                callBack = { setAxiosURL } 
            />
            <ConnectionTest 
                script = "Logout.php"
                callBack = { setlogOutURL } 
            />
            </div>
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
                            <h2>Привет { userName }</h2>
                            <Button 
                                type="Button"
                                text="Выход"
                                state={ LogOut }
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
