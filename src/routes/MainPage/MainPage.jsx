import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

import axios from "axios";

import "./MainPage.css";

function MainPage(){

    const [errMessage, axiosURL] = useOutletContext();

    const [smartphones, setSmartphones] = useState([]);
    const [TVs, setTVs] = useState([]);

    useEffect( () => {
        if(smartphones.length === 0 && axiosURL.length !== 0){
            let URL = axiosURL + "Show_data.php";
            axios.post(URL, {
                search: "Смартфоны"
            })
            .then( (response) => {
                setSmartphones(response.data);
            } );
            axios.post(URL, {
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
                ?<div></div>
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