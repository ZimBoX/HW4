import { useState, useEffect } from 'react';
import { Outlet, useOutlet, useNavigate, Link } from "react-router-dom";

import ConnectionTest from '../../components/ConnectionTest/ConnectionTest';
import Header from '../../components/Header/Header';

import './Root.css';
import axios from 'axios';

function Root() {

    let outlet = useOutlet();

    const [axiosURL, setAxiosURL] = useState([]);

    const [loginStatus, setLoginStatus] = useState(false);
    const [userAdmin, setUserAdmin] = useState(false);
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState(-1);

    const [errMessage, setErrorMessage] = useState("");
    const [productInfo, setProductInfo] = useState([]);

    const navigate = useNavigate();

    useEffect( () => {
        if(outlet === null){
            window.location.href = "/main";
        }
    }, [] );

    // useEffect( () => {
    //     if(window.location.href.indexOf("/admin") !== -1 && !userAdmin){
    //         window.location.href = "/login";
    //     }
    // } )

    useEffect( () => {
        if (errMessage !== ""){
            navigate("/error");
        }
    }, [errMessage] )

    useEffect( () => {
        if(!loginStatus && axiosURL.length > 0){
            let URL = axiosURL + "Connection_test.php";
            axios.post(URL,{
                type: "getUserName"
            }).then( (responce) => {
                if(responce.data){
                    setLoginStatus(true);
                    setUserName(responce.data[0]);
                    setUserId(responce.data[1]);
                }
            } )
        }
    } )

    useEffect( () => {
        if(loginStatus && axiosURL.length > 0){
            let URL = axiosURL + "Connection_test.php";
            axios.post(URL,{
                type: "getPermissions"
            }).then( (responce) => {
                if(responce.data >= 90){
                    setUserAdmin(true);
                }
            } )
        }
    }, [loginStatus] )

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
            </div>
            :<header>
                <Header 
                    axiosURL={ axiosURL }
                    loginStatus = { loginStatus }
                    ProductState = { setProductInfo }
                    userName = { userName }
                />
                {userAdmin
                  ?<div className='AdminButton'>
                    <Link to="/admin">Панель администратора</Link>
                  </div>
                  :<div></div>
                }
            </header>}

            <div className='container-md'>
                <Outlet context={{
                    errMessage: errMessage,
                    axiosURL: axiosURL,
                    productInfo: productInfo,
                    setProductInfo: setProductInfo,
                    loginStatus: loginStatus,
                    userName: userName,
                    userAdmin: userAdmin,
                    userId: userId,
                }
                }/>
            </div>
        </div>
    );
}

export default Root;
