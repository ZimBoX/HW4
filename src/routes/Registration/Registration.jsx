import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import axios from "axios";
import { Link } from "react-router-dom";
import crypto from "crypto-js";

import "./Registration.css";

import Button from "../../components/Button/Button";

function Registration(){

    const {axiosURL} = useOutletContext();

    const [message, setMessage] = useState("");

    let Login = useRef();
    let Password = useRef();
    let Email = useRef();
    let UserName = useRef();
    let Country = useRef();
    let City = useRef();
    let Postcode = useRef();

    function userReg(){
        Login.current.className = "";
        Password.current.className = "";
        Email.current.className = "";
        UserName.current.className = "";

        let userLogin = Login.current.value;
        let userPassword = Password.current.value;
        let userEmail = Email.current.value;
        let userUserName = UserName.current.value;
        let userCountry = Country.current.value;
        let userCity = City.current.value;
        let userPostcode = parseInt(Postcode.current.value);
        
        
        let hashUserLogin = crypto.MD5(userLogin).toString();
        let hashuserPassword = crypto.MD5(userPassword).toString();

        if(userLogin === "") Login.current.className = "inputEror";
        if(userPassword === "") Password.current.className = "inputEror";
        if(userEmail === "") Email.current.className = "inputEror";
        if(userUserName === "") UserName.current.className = "inputEror";
        
        if(userLogin !== "" && userPassword !== "" && userEmail !== "" && userUserName !== ""){
            let URL = axiosURL + "Registration.php";
            axios.post(URL,{
                login: hashUserLogin,
                password: hashuserPassword,
                email: userEmail,
                userName: userUserName,
                country: userCountry,
                city: userCity,
                postcode: userPostcode
            })
            .then( (response) => {
                if(response.data === "clone login"){
                    setMessage("Пользователь с таким логином уже существует!");
                }
                else if(response.data === "clone email"){
                    setMessage("Пользователь с такой электронной почтой уже существует!");
                }
                else{
                    window.location.href = "/login"
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
            :<div className="Registration">
                <form onSubmit={ (event) => {event.preventDefault(); userReg();}}>
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
                    <input 
                        type="email" 
                        name="Email" 
                        ref={ Email } 
                        placeholder="Электронная почта*"
                        minLength={3}
                    />
                    <input 
                        type="text" 
                        name="UserName" 
                        ref={ UserName } 
                        placeholder="Имя пользователя*"
                        minLength={3}
                    />
                    <input 
                        type="text" 
                        name="Country" 
                        ref={ Country } 
                        placeholder="Страна" 
                    />
                    <input 
                        type="text" 
                        name="City" 
                        ref={ City } 
                        placeholder="Город" 
                    />
                    <input 
                        type="text" 
                        name="Postcode" 
                        ref={ Postcode } 
                        placeholder="Почтовый индекс" 
                    />
                    <Button 
                        text="Регистрация"
                        type="Submit"
                        state={ ()=>{} }
                    />
                    <h2>
                        Есть аккаунт? <Link to={`/Login`}>Войти</Link>
                    </h2>
                </form>
                <h3>{ message }</h3>
            </div>
            }
        </div>
    )
}

export default Registration;