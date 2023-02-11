import { useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";

import "./Header.css";

import axios from 'axios';

function Header(props){

    const {axiosURL, loginStatus, ProductState, userName} = props;

    const [userCity, setUserCity] = useState("Ваш город");
    const [foundCities, setFoundCities] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    let userCityPopup = useRef();
    let userCityInput = useRef();

    let searchForm = useRef();
    let searchInput = useRef();

    useEffect( () => {
        let url = axiosURL + "Get_cities.php";
        axios.post(url,{
            mode: "GetUserCity"
        })
        .then( (responce) => {
            let data = responce.data;
            if(!data){
                navigator.geolocation.getCurrentPosition(getCity);
                return;
            }
            else{
                setUserCity(data);
            }
        } )
    }, [] )

    function getCity(position){
        let apiURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=04d8a31a8732bb8c83794a02192e18db`
        axios.get(apiURL).then( (responce) => {
            setUserCity(responce.data[0].local_names.ru);
        } )
    }

    function searchCity(){
        let userCity = userCityInput.current.value;
        let url = axiosURL + "Get_cities.php";
        axios.post(url,{
            mode: "GetCities",
            userCity: userCity
        })
        .then( (responce) => {
            let data = responce.data;
            setFoundCities(data.map( (f) => {
                return f[0];
            } ))
        } )
    }

    function searchProduct(){
        let product = searchInput.current.value;
        let url = axiosURL + "Search_product.php";
        if (product !== ""){
            axios.post(url,{
                search: product
            })
            .then( (responce) => {
                let data = responce.data;
                setSearchResult(data);
            } )
        }
        else{
            setSearchResult([])
        }
    }
    
    function setCity(city){

        userCityInput.current.value = "";
        userCityPopup.current.style.display = "none"
        setFoundCities("");

        let url = axiosURL + "Set_city.php";

        axios.post(url,{
            userCity: city
        })
        .then( () => {
            setUserCity(city)
        } )
        .catch( () => {
            console.error("Ошибка установки города")
        } )
    }

    function LogOut(){
        let URL = axiosURL + "Logout.php"
        axios.post(URL,{
            logout: true
        })
        .then( () => {
            window.location.reload();
        } )
    }

    return(
        <div>
            <section className="HeaderTop" onMouseLeave={ () => { userCityPopup.current.style.display = "none" } }>
                <div className="container-md d-flex justify-content-between align-items-center">
                    <div className="HeaderContacts">
                        <div className="HeaderCity">
                            <img src="/IMG/icons/location_icon.svg" alt="" />
                            <h4 className='HeaderCityText'
                                onClick={ () => { userCityPopup.current.style.display = "block" } }
                                >{ userCity }</h4>
                            <h4>+7-999-123-45-67</h4>
                        </div>
                    </div>

                    <div className='HeaderInfo'>
                        <h4>Акции</h4>
                        <h4>Доставка</h4>
                        <h4>Магазины</h4>
                        <h4>Обратная связь</h4>
                    </div>

                    <div className='HeaderCityPopup'
                        ref={ userCityPopup }
                        onMouseLeave={ () => { userCityPopup.current.style.display = "none" } }>
                    <form onSubmit={ (e) => { e.preventDefault() } }>
                        <h3>Введите название города</h3>
                        <input 
                            type="text" 
                            placeholder='Город'
                            minLength={3}
                            ref={ userCityInput }
                            onChange={ () => { searchCity() } }
                            />
                    </form>
                    <h5 onClick={ () => { setCity(foundCities[0]) } }>{foundCities[0]}</h5>
                    <h5 onClick={ () => { setCity(foundCities[1]) } }>{foundCities[1]}</h5>
                    <h5 onClick={ () => { setCity(foundCities[2]) } }>{foundCities[2]}</h5>
                </div>
                </div>
            </section>

            <section className='HeaderBottom'>
                <div className='container-md d-flex justify-content-between'>
                    <Link to={"/main"} className='Logo'>
                        <img src="/img/icons/Logo.svg" alt="" />
                    </Link>
                    <div className='HeaderSearch'
                        onMouseLeave={ () => {
                            searchForm.current.className = ""
                        } }>
                        <form  
                            ref={ searchForm } 
                            onSubmit={ (e) => { e.preventDefault(); } }>
                            <input 
                                type="text"
                                placeholder='Поиск по товарам'
                                ref={ searchInput }
                                onFocus={ () => { 
                                    searchForm.current.className = "openForm";
                                } }
                                onClick={ () => {
                                    searchForm.current.className = "openForm";
                                } }
                                onChange={ () => {
                                    searchProduct();
                                    searchForm.current.className = "openForm";
                                } }
                            />
                            { searchResult.map( (f) => {
                                return(
                                    <div className='ResultItem' >
                                        <img src={ f[4] + "1.png" } alt="" />
                                        <Link   
                                            to={`/product?id=`+f[0]}
                                            onClick={ () => {
                                                ProductState(f);
                                                searchForm.current.className = "";
                                            } }>
                                            { f[1] }
                                        </Link>
                                        <h4>{ f[3] } руб</h4>
                                    </div>
                                )
                            } ) }
                        </form>
                    </div>
                    <div className='HeaderMenu'>
                        { !loginStatus
                            ?<div className='item login'>
                                <img src="/img/icons/login.svg" alt="" />
                                <Link to="/login">Войти</Link>
                            </div>
                            :<div className='item login'>
                                <h3>Привет</h3>
                                <h3>{ userName }</h3>
                                <a onClick={ () => { LogOut() } } >Выход</a>
                            </div>

                        }
                        <div className='item login'>
                            <img src="/img/icons/favorites.svg" alt="" />
                            <Link to="/main">Избранное</Link>
                        </div>
                        <div className='item login'>
                            <img src="/img/icons/comparison.svg" alt="" />
                            <Link to="/main">Сравнение</Link>
                        </div>
                        <div className='item login'>
                            <img src="/img/icons/cart.svg" alt="" />
                            <Link to="/main">Корзина</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Header;