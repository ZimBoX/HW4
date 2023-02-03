import { useState, useEffect, useRef } from "react";

import axios from "axios";

import "./MainPage.css";

import ConnectionTest from "../../components/ConnectionTest/ConnectionTest";

function MainPage(){

    const [axiosURL, setAxiosURL] = useState([]);
    const [smartphones, setSmartphones] = useState([]);
    const [TVs, setTVs] = useState([]);

    useEffect( () => {
        if(smartphones.length === 0 && axiosURL.length !== 0){
            axios.post(axiosURL, {
                search: "Смартфоны"
            })
            .then( (response) => {
                setSmartphones(response.data);
            } );
            axios.post(axiosURL, {
                search: "Телевизоры"
            })
            .then( (response) => {
                setTVs(response.data);
            } )
        }
    }, [axiosURL] )

    return(
        <div className="mainPage">
            {(axiosURL.length === 0)
                ?<ConnectionTest 
                    script = "Show_data.php"
                    callBack = { setAxiosURL }
                />
                :<div>
                    <section className="smartphones row">
                        <h2>Смартфоны</h2>
                        {
                            smartphones.map( (f) => {
                                return(
                                    <div className="col-3">
                                        <div className="item">
                                            <div className="imgWrapper">
                                                <img src={`IMG/${f[0]}.png`} />
                                            </div>
                                            <h4>{ f[1] }</h4>
                                            <p>{ f[2].substr(0,128) }...</p>
                                            <span>Цена: { f[3] } руб.</span>
                                        </div>
                                    </div>
                                )
                            } )
                        }
                    </section>
                    <section className="TVs row">
                        <h2>Телевизоры</h2>
                        {
                            TVs.map( (f) => {
                                return(
                                    <div className="col-3">
                                        <div className="item">
                                            <div className="imgWrapper">
                                                <img src={`IMG/${f[0]}.png`} />
                                            </div>
                                            <h4>{ f[1] }</h4>
                                            <p>{ f[2].substr(0,128) }...</p>
                                            <span>Цена: { f[3] } руб.</span>
                                        </div>
                                    </div>
                                )
                            } )
                        }
                    </section>
                </div>
                }
        </div>
    )
}

export default MainPage;