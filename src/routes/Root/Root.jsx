import { useState, useEffect, useRef } from 'react';
import { Outlet, useOutlet, useNavigate } from "react-router-dom";

import ConnectionTest from '../../components/ConnectionTest/ConnectionTest';

import Button from '../../components/Button/Button';

import './Root.css';
import axios from 'axios';

function Root() {

    let outlet = useOutlet();
    const [loginStatus, setLoginStatus] = useState(false);
    const [userAdmin, setUserAdmin] = useState(false);
    const [axiosURL, setAxiosURL] = useState([]);
    const [logOutURL, setlogOutURL] = useState([]);
    const [userName, setUserName] = useState("");

    const [errMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect( () => {
        if(outlet === null){
            window.location.href = "/main";
        }
    }, [] );

    useEffect( () => {
        if(window.location.href.indexOf("/admin") !== -1 && !userAdmin){
            window.location.href = "/login";
        }
    } )

    useEffect( () => {
        if (errMessage !== ""){
            navigate("/error");
        }
    }, [errMessage] )

    useEffect( () => {
        if(!loginStatus && axiosURL.length > 0){
            axios.post(axiosURL,{
                type: "getUser"
            }).then( (responce) => {
                if(responce.data){
                    setLoginStatus(true);
                    setUserName(responce.data);
                }
            } )
        }
    } )

    useEffect( () => {
        if(loginStatus && axiosURL.length > 0){
            axios.post(axiosURL,{
                type: "getPermissions"
            }).then( (responce) => {
                if(responce.data >= 90){
                    setUserAdmin(true);
                }
            } )
        }
    }, [loginStatus] )

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
                errCallBack = { setErrorMessage }
            />
            <ConnectionTest 
                script = "Logout.php"
                callBack = { setlogOutURL }
                errCallBack = { setErrorMessage }
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
                        {userAdmin
                        ?<Button 
                            type="Button"
                            text="Панель администратора"
                            href="/admin"
                        />
                        :<div></div>
                        }
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
                <Outlet context={[errMessage]}/>
            </div>
        </div>
    );
}

export default Root;
