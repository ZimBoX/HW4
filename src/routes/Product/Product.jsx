import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";


import { useOutletContext } from "react-router-dom";

import axios from "axios";

import ImageList from "../../components/ImageList/ImageList";

import "./Product.css";

function Product() {

    const {axiosURL, productInfo, loginStatus, 
           userName, userAdmin, userId} = useOutletContext();

    const [mainImage, setMainImage] = useState("");
    const [imagesList, setImagesList] = useState([]);
    const [imgCount, setImgCount] = useState(1);
    const [imgFolder, setImgFolder] = useState("");

    const [cols, setCols] = useState(1);

    const [infoProductId, setImfoProductId] = useState();
    const [infoProductName, setImfoProductName] = useState();
    const [infoProductDescription, setImfoProductDescription] = useState();
    const [infoProductPrice, setImfoProductPrice] = useState();

    const [reviews, setReviews] = useState([]);

    let reviewInput = useRef();

    useEffect( () => {
        if (axiosURL.length === 0){}
        else{
            let href = window.location.href;
            let productId = href.substring(href.indexOf("?id=")+4);
            let url = axiosURL + "Get_product_img.php"
            axios.post(url,{
                id: productId
            }).then( (responce) => {
                setImgFolder(responce.data[0]);
                setImgCount(responce.data[1]);
            } )

            url = axiosURL + "Get_product_info.php";
            axios.post(url,{
                id: productId
            }).then( (responce) => {
                setImfoProductId(responce.data["id"]);
                setImfoProductName(responce.data["name"]);
                setImfoProductDescription(responce.data["description"]);
                setImfoProductPrice(responce.data["price"]);
            } )

            getReviews();
        }
    }, [axiosURL, productInfo] )

    function getReviews(){
        let href = window.location.href;
        let productId = href.substring(href.indexOf("?id=")+4);
        let url = axiosURL + "Get_reviews.php";
        axios.post(url,{
            id: productId
        }).then( (responce) => {
            setReviews(responce.data);
        } )
    }

    useEffect( () => {
        let arr = [];
        for(let i = 1; i <= imgCount; i++){
            arr.push(imgFolder + i + ".png");
        }
        setImagesList(arr);
        setMainImage(arr[0])

        if(imgCount <= 3){
            setCols(imgCount);
        }
        else{
            setCols(3);
        }
    }, [imgFolder] )

    function deleteReview(reviewId){
        let url = axiosURL + "Delete_rewiew.php"
        axios.post(url,{
            id: reviewId
        }).then( () => {
            getReviews();
        } )
    }

    function addReview(){
        let href = window.location.href;
        let productId = href.substring(href.indexOf("?id=")+4);
        let url = axiosURL + "Add_review.php";
        let text = reviewInput.current.value;
        reviewInput.current.className = ""

        if(text !== ""){
            axios.post(url,{
                userId: userId,
                productId: productId,
                reviewText: text,
            }).then( () => {
                getReviews();
            } )
        }
        else{
            reviewInput.current.className = "errorInput"
        }
    }


    return (
        <div className="Product">
            <div className="container-md d-flex justify-content-between row">
            <div className="ProductName col-12">
                    <h1>{infoProductName}</h1>
                </div>
                <div className="col-6">
                    <div className="ProductImages ">
                        <div className="mainImageWrapper">
                            <img src={ mainImage } className='mainImg'/>
                        </div>
                        <ImageList 
                            images={ imagesList }
                            cols ={ cols }
                            state ={ setMainImage }
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="ProductPrice">
                        <h2>Цена: {infoProductPrice} руб</h2>
                        <h2>Тут должно быть больше информации о конфигурации товара и прочем, но её не завезли(</h2>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="productDescription">
                    <h2>Описание</h2>
                    <p>{infoProductDescription}</p>
                </div>
            </div>

            <div className="userReviewWrapper col-12">
                <h2>Отзывы</h2>
                {loginStatus
                    ? <div className="userReview">
                        <form onSubmit={ (e) => { e.preventDefault(); addReview(); } }>
                            <textarea 
                                name="userReview" 
                                placeholder="Оставьте свой отзыв о товаре"
                                ref={reviewInput} >
                            </textarea>
                            <button type="sunmit">Отправить отзыв</button>
                        </form>
                    </div>
                    : <div>
                        <h2 style={ {color: "#A8A8A8"} }>
                            Для того, чтобы оставить отзыв, необходимо авторизоваться.
                        </h2>
                    </div>
                }
                <div className="otherReviewsWrapper col-12">
                    { reviews.map( (f) => {
                        return(
                            <div className="otherRewiewsItem">
                                <h3>{f[1]}</h3>
                                <blockquote>{f[0]}</blockquote>
                                { (userId === f[2] || userAdmin)
                                ?<div className="delRewiew">
                                    <button onClick={ () => {deleteReview(f[3])} }>
                                        Удалить
                                    </button>
                                </div>
                                :<div></div>
                                 }
                            </div>
                        )
                    } ) }
                </div>
            </div>
        </div>
    );
    }

export default Product;
