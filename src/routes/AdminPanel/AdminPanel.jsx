import { useState, useRef } from "react";
import { useOutletContext, Link } from "react-router-dom";

import axios from "axios";

import "./AdminPanel.css";

import Button from "../../components/Button/Button";

function AdminPanel(){

    const {axiosURL, userAdmin} = useOutletContext();

    const [message, setMessage] = useState("");
    const [newProductMessage, setNewProductMessage] = useState("");
    const [categories, setCategories] = useState([]);

    const [productList, setProductList] = useState([]);


    let CategoryName = useRef();
    let messageText = useRef();
    let productMessageText = useRef();

    let ProductName = useRef();
    let ProductDescription = useRef();
    let ProductPrice = useRef();
    let addProductCategory = useRef();
    let delProductCategory = useRef();
    let delProductSellect = useRef();

    function addCategory(){
        CategoryName.current.className = "";
        messageText.current.style.color = "rgb(250, 60, 60)";
        setMessage("");
        
        let newCategory = CategoryName.current.value;

        if(newCategory === "") CategoryName.current.className = "inputEror";

        if(newCategory !== ""){  
            let URL = axiosURL + "Write_data.php";
            axios.post(URL,{
                type: "setCategory",
                categoryName: newCategory
            })
            .then( (responce) => {
                if(responce.data === "done"){
                    CategoryName.current.value = "";
                    messageText.current.style.color = "green";
                    setMessage("Новая категория была добавлена!")
                }
                else{
                    setMessage("Произошла ошибка, вероятно данная категория уже существует")
                    CategoryName.current.className = "inputEror";
                }
            } )
        }
    }

    function delCategory(){
        let catName = delProductCategory.current.value;
        if(catName !== ""){
            let URL = axiosURL + "Write_data.php";
            axios.post(URL,{
                type: "delCategory",
                categoryName: catName
            })
            .then( (responce) => {
                if(responce.data === "done"){
                    messageText.current.style.color = "green";
                    setMessage("Категория была удалена!")
                    delProductCategory.current.value = "";
                    updateCategory()
                }
            })
        }
        else{
            messageText.current.style.color = "rgb(250, 60, 60)";
            setMessage("Сначала выберите категорию!")
        }
    }

    function updateCategory(){
        let URL = axiosURL + "Write_data.php";
        axios.post(URL,{
            type: "getCategories"
        })
        .then( (responce) => {
            let getCategories = responce.data.map( (f) => {
                return f[0];
            } );
            setCategories(getCategories)
        } )
    }

    function delProduct(prodId){
        if(prodId !== ""){
            let URL = axiosURL + "Write_data.php";
            axios.post(URL,{
                type: "delProduct",
                prodId: prodId
            })
            .then( (responce) => {
                if(responce.data === "done"){
                    messageText.current.style.color = "green";
                    setNewProductMessage("Продукт был удален!")
                    delProductCategory.current.value = "";
                    showProductList()
                }
            })
        }
        else{
            messageText.current.style.color = "rgb(250, 60, 60)";
            setMessage("Сначала выберите категорию!")
        }
    }

    function showProductList(){
        let selCat = delProductSellect.current.value;
        if(selCat !==""){
            let URL = axiosURL + "Write_data.php";
            axios.post(URL,{
                type: "getProducts",
                categoryName: selCat
            })
            .then( (responce) => {
                setProductList(responce.data);
            } )
        }
    }

    function addProduct(){
        let newProductName = ProductName.current.value;
        let newProductDescription = ProductDescription.current.value;
        let newProductPrice = ProductPrice.current.value;
        let newAddProductCategory = addProductCategory.current.value;

        if(newProductName === "") ProductName.current.className = "inputEror";
        if(newProductDescription === "") ProductDescription.current.className = "inputEror";
        if(newProductPrice === "") ProductPrice.current.className = "inputEror";
        if(newAddProductCategory === "") addProductCategory.current.className = "inputEror";

        if(newProductName !== "" && newProductDescription !== "" && newProductPrice !== "" && newAddProductCategory !== "")
        {
            let URL = axiosURL + "Write_data.php";
            axios.post(URL, {
                type: "setNewProduct",
                ProductName: newProductName,
                ProductDescription: newProductDescription,
                addProductCategory: newAddProductCategory,
                ProductPrice: newProductPrice
            })
            .then( (responce) => {
                console.log(responce.data)
                if(responce.data === "done"){

                    ProductName.current.value = "";
                    ProductDescription.current.value = "";
                    addProductCategory.current.value = "";
                    ProductPrice.current.value = "";

                    ProductName.current.className = "";
                    ProductDescription.current.className = "";
                    addProductCategory.current.className = "";
                    ProductPrice.current.className = "";

                    productMessageText.current.style.color = "green";

                    setNewProductMessage("Новый товар был добавлен!")
                }
                else{

                    productMessageText.current.style.color = "rgb(250, 60, 60)";

                    setNewProductMessage("Произошла ошибка, вероятно данный товар уже существует или была допущена ошибка при заполнении формы")
                    
                    ProductName.current.className = "inputEror";
                    ProductDescription.current.className = "inputEror";
                    addProductCategory.current.className = "inputEror";
                    ProductPrice.current.className = "inputEror";
                }
            } )
        }
    }

    return(
        <div className="adminPanel">
            {(axiosURL.length === 0 || !userAdmin)
                ?<div></div>
                :<div className="row">
                    <div className="col-12 adminFormWrapper row">
                        <div className="col-6 addCat">
                            <h2>Добавить категорию</h2>
                            <form onSubmit={ (event) => {event.preventDefault(); addCategory();}}>
                                <input 
                                    type="text"
                                    name="NewCategory" 
                                    ref={ CategoryName } 
                                    placeholder="Новая категория"
                                    minLength={3}
                                    maxLength={32}
                                />
                                <button type="submit">Добавить</button>
                            </form>
                        </div>

                        <div className="col-6 delCat">
                            <h2>Удалить категорию</h2>
                            <form onSubmit={ (event) => {event.preventDefault(); delCategory();}}>
                                <select 
                                    name="delProductCategory" 
                                    ref={delProductCategory}
                                    onClick={ () => { updateCategory() } }>
                                    <option value="">--Выберите категорию--</option>
                                    { categories.map( (f) => {
                                        return(
                                            <option value={f}>{f}</option>
                                        )
                                    } ) }
                                </select>
                                <button type="submit">Удалить</button>
                            </form>
                        </div>
                        <h3 ref={ messageText } >{ message }</h3>
                    </div>
                    <div className="col-12 adminFormWrapper addProduct row">
                        <div className="col-6">
                            <h2>Добавить новый товар</h2>
                            <form onSubmit={ (event) => {event.preventDefault(); addProduct();}}>
                                <textarea 
                                    name="ProductName"
                                    placeholder="Название"
                                    ref={ ProductName }
                                    minLength={3}>
                                </textarea>
                                <textarea 
                                    name="ProductDescription"
                                    placeholder="Описание"
                                    ref={ ProductDescription }
                                    minLength={3}>
                                </textarea>
                                <select 
                                    name="addProductCategory" 
                                    ref={addProductCategory}
                                    onClick={ () => { updateCategory() } }>
                                    <option value="">--Выберите категорию--</option>
                                    { categories.map( (f) => {
                                        return(
                                            <option value={f}>{f}</option>
                                        )
                                    } ) }
                                </select>
                                <input 
                                    type="text"
                                    name="ProductPrice" 
                                    ref={ ProductPrice } 
                                    placeholder="Цена"
                                    minLength={1}
                                    maxLength={9}
                                />
                                <button type="submit">Добавить</button>
                            </form>
                        </div>

                        <div className="col-6 delProduct">
                            <h2>Удалить товар</h2>
                            <form onSubmit={ (event) => {event.preventDefault();}}>
                                <select 
                                    name="delProductSellect" 
                                    ref={delProductSellect}
                                    onClick={ () => { updateCategory() } }
                                    onChange={ () => { showProductList() } }>
                                    <option value="">--Выберите категорию--</option>
                                    { categories.map( (f) => {
                                        return(
                                            <option value={f} >{f}</option>
                                        )
                                    } ) }
                                </select>
                                {(productList.length === 0)
                                ? <div></div>
                                : <div className="table">
                                    <tr>
                                        <th className="thId col-1">id</th>
                                        <th className="thName col-6">Название</th>
                                        <th className="thPrice col-1">Цена</th>
                                        <th className="thReviews col-3">Отзывы</th>
                                        <th className="thDel col-1">Удаление</th>
                                    </tr>
                                    { productList.map( (f) => {
                                        return(
                                            <tr>
                                                <td>{f[0]}</td>
                                                <td>{f[1]}</td>
                                                <td>{f[2]}</td>
                                                <td>
                                                    <Link to={`/product?id=`+f[0]}>
                                                        Cтраница продукта
                                                    </Link>
                                                </td>
                                                <td>
                                                    <button 
                                                        type="button" 
                                                        onClick={ () => {delProduct(f[0])} }
                                                    >
                                                        Удалить
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    } ) }
                                </div>
                                }
                            </form>
                        </div>
                        <h3 ref={ productMessageText }>{ newProductMessage }</h3>
                    </div>
                </div>}
        </div>
    )
}

export default AdminPanel;