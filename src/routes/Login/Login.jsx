import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import axios from "axios";
import { Link } from "react-router-dom";
import crypto from "crypto-js";

import "./Login.css";

import Button from "../../components/Button/Button";

function Login(){

    const {axiosURL} = useOutletContext();

    const [message, setMessage] = useState("");

    let Login = useRef();
    let Password = useRef();

    function userLogin(){
        Login.current.className = "";
        Password.current.className = "";

        let userLogin = Login.current.value;
        let userPassword = Password.current.value;
        
        
        let hashUserLogin = crypto.MD5(userLogin).toString();
        let hashuserPassword = crypto.MD5(userPassword).toString();

        if(userLogin === "") Login.current.className = "inputEror";
        if(userPassword === "") Password.current.className = "inputEror";
        
        if(userLogin !== "" && userPassword !== ""){
            let URL = axiosURL + "Login.php";
            axios.post(URL,{
                login: hashUserLogin,
                password: hashuserPassword,
            })
            .then( (response) => {
                if(response.data === "error"){
                    setMessage("Неверный логин/пароль!");
                }
                else{
                    window.location.href = "/main"
                }
            } )
        }
        else{
            setMessage("Заполните все обязательные поля!")
        }

       
    }

    return(
        <div>
            {(axiosURL.length === 0)
            ?<div></div>
            :<div className="Login">
                <form onSubmit={ (event) => {event.preventDefault(); userLogin();}}>
                    <input 
                        type="text" 
                        name="Login" 
                        ref={ Login } 
                        placeholder="Логин*"
                        minLength={3}
                        maxLength={20}
                    />
                    <input 
                        type="password"  
                        name="Password" 
                        ref={ Password } 
                        placeholder="Пароль*"
                        minLength={3}
                    />
                    <button type="submit">Войти</button>
                    <h2>
                        Нет аккаунта? <Link to={`/registration`}>Регистрация</Link>
                    </h2>
                    <h3>{ message }</h3>
                </form>
            </div>
            }
        </div>
    )
}

export default Login;