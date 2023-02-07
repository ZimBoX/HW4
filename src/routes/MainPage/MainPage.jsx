import { useState, useEffect } from "react";
import { useOutletContext, Link, useNavigate } from "react-router-dom";

import axios from "axios";

import "./MainPage.css";

function MainPage(){

    const navigate = useNavigate();

    const { axiosURL } = useOutletContext();

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
                :<div className="mainPageWrapper d-flex">
                    <nav className="categoriesWrapper">
                        <ul>
                            <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=appliances")} }>
                                <img src="/img/icons/catigories/appliances.svg" alt="" />
                                <div className="catigoriesText">
                                    <a>Бытовая техника</a>
                                    <span>для дома<span>уход за собой</span></span>   
                                </div>
                            </li>
                            <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=smartphones")} }>
                                <img src="/img/icons/catigories/smartphones.svg" alt="" />
                                <div className="catigoriesText">
                                    <a>Смартфоны и гаджеты</a>
                                    <span>планшеты<span>фототехника</span></span>   
                                </div>
                            </li>
                            <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=TV")} }>
                                <img src="/img/icons/catigories/TV.svg" alt="" />
                                <div className="catigoriesText">
                                    <a>ТВ и мультимедия</a>
                                    <span>аудио<span>видеоигры</span></span>   
                                </div>
                            </li>
                            <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=computers")} }>
                                <img src="/img/icons/catigories/computers.svg" alt="" />
                                <div className="catigoriesText">
                                    <a>Компьютеры</a>
                                    <span>комплектующие<span>ноутбуки</span></span>   
                                </div>
                            </li>
                            <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=office")} }>
                                <img src="/img/icons/catigories/office.svg" alt="" />
                                <div className="catigoriesText">
                                    <a>Офис и сеть</a>
                                    <span>кресла<span>проекторы</span></span>   
                                </div>
                            </li>
                            <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=rest")} }>
                                <img src="/img/icons/catigories/rest.svg" alt="" />
                                <div className="catigoriesText">
                                    <a>Отдых и развлечения</a>
                                    <span>электросамакаты<span>бассейны</span></span>   
                                </div>
                            </li>
                            <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=house")} }>
                                <img src="/img/icons/catigories/house.svg" alt="" />
                                <div className="catigoriesText">
                                    <a>Дом, декор и кухня</a>
                                    <span>зоотовары<span>посуда</span></span>   
                                </div>
                            </li>
                            <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=car")} }>
                                <img src="/img/icons/catigories/car.svg" alt="" />
                                <div className="catigoriesText">
                                    <a>Автотовары</a>
                                    <span>звук<span>автокресла</span></span>   
                                </div>
                            </li>
                            <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=sound")} }>
                                <img src="/img/icons/catigories/sound.svg" alt="" />
                                <div className="catigoriesText">
                                    <a>Аксессуары и услуги</a>
                                    <span>наушники<span>мыши</span></span>   
                                </div>
                            </li>
                            <hr />
                            <li className="catigoriesItem markdown" onClick={ () => {navigate("/catigories?cat=markdown")} }>
                                <img src="/img/icons/catigories/markdown.svg" alt="" />
                                <div className="catigoriesText">
                                    <a>Уценённые товары</a>
                                </div>
                            </li>

                        </ul>
                    </nav>
                </div>
                }
        </div>
    )
}

export default MainPage;