import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


import { useOutletContext } from "react-router-dom";

import axios from "axios";

import "./Сatigories.css"

function Сatigories(){

    const { axiosURL } = useOutletContext();
    const [productList, setProductList] = useState([]);

    const navigate = useNavigate();

    let sortSellect = useRef();

    useEffect( () => {
        if (axiosURL.length === 0){}
        else{
            let href = window.location.href;
            let catName = href.substring(href.indexOf("?cat=")+5);
            let url = axiosURL + "Get_from_catigories.php"
            console.log(sortSellect.value)
            axios.post(url,{
                name: catName,
                // sort: sortSellect.current.value
            }).then( (responce) => {
                setProductList(responce.data);
            } )
        }
    }, [axiosURL] )

    function updateResult() {
        let href = window.location.href;
        let catName = href.substring(href.indexOf("?cat=")+5);
        let url = axiosURL + "Get_from_catigories.php"
        axios.post(url,{
            name: catName,
            sort: sortSellect.current.value
        }).then( (responce) => {
            setProductList(responce.data);
        } )
    }

    return(
        <div className="catigories">
            {(axiosURL.length === 0)
                ?<div></div>
                :<div className="catigoriesWrapper d-flex">
                    <div className="filter">
                        <h2>Тут должен был быть фильтр, но его украли(</h2>
                    </div>
                    <div className="showcaseWrapper">
                        <section className="categoriesShowcase">
                            {(productList.length === 0)
                            ?<div>
                                <h2>Ничего не найдено</h2>
                            </div>
                            :<div>
                                <div className="sortingWrapper">
                                    <form onSubmit={ (e) => { e.preventDefault()} }>
                                    <h3>Сортировать по: </h3>
                                        <select 
                                            name="sort" 
                                            ref={ sortSellect } 
                                            onChange={ () => {
                                                updateResult();
                                        } }>
                                            <option value="price DESC" selected>Убыванию цены</option>
                                            <option value="price ASC" >Возрастанию цены</option>
                                            <option value="id DESC" >Новизне</option>
                                        </select>
                                    </form>
                                </div>
                                { productList.map( (f) => {
                                    return(
                                        <div className="showcaseItem" onClick={ () => { navigate(`/product?id=`+f[0]) } }>
                                            <div className="imgWrapper">
                                                <img src={ f[3] + "1.png" } alt="" />
                                            </div>
                                            <div className="textWrapper">
                                                <h3>{f[1]}</h3>
                                                <h4>{f[4].substring(0,200) + "..."}</h4>
                                            </div>
                                            <p>{f[2]} &#x20bd;</p>
                                        </div>
                                    )
                                } ) }
                            </div>
                            }
                        </section>
                    </div>
                </div>
                }
        </div>
    )
}

export default Сatigories;