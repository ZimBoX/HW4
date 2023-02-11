import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Showcase(props){

    const navigate = useNavigate();

    const { axiosURL } = props;

    const [productList, setProductList] = useState([]);

    useEffect( () => {
        if (axiosURL.length === 0){}
        else{
            let url = axiosURL + "Show_data.php"
            axios.post(url).then( (responce) => {
                setProductList(responce.data);
            } )
        }
    }, [axiosURL] )

    return(
        <section className="showcase">
            <div className="banner">
                <h3>Тут должна быть реклама</h3>
            </div>
            <div className="ProductShowcaseWrapper">
                <h2 className="titel">Лучшие новинки</h2>
                <div className="ProfuctShowcase d-flex">
                    { productList.map( (f) => {
                        return(
                            <div className="ProductShowcaseItem col-3" 
                                onClick={ () => { navigate(`/product?id=`+f[0]) } }>
                                <span>Новинка!</span>
                                <div className="imgWrapper">
                                    <img src={f[3] + "1.png"} alt="" />
                                </div>
                                <h2>{f[1]}</h2>
                                <p>{f[2]}  &#x20bd;</p>
                            </div>
                        )
                    } ) }
                </div>
            </div>
        </section>
    )
}

export default Showcase;