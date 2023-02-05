import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";

import axios from "axios";

import "./AdminPanel.css";

import Button from "../../components/Button/Button";

function AdminPanel(){

    const [errMessage, axiosURL] = useOutletContext();

    const [message, setMessage] = useState("");
    const [newProductMessage, setNewProductMessage] = useState("");
    const [categories, setCategories] = useState([]);

    let CategoryName = useRef();
    let messageText = useRef();
    let productMessageText = useRef();

    let ProductName = useRef();
    let ProductDescription = useRef();
    let ProductPrice = useRef();
    let ProductCategory = useRef();

    function addCategory(){
        CategoryName.current.className = "";
        messageText.current.style.color = "rgb(250, 60, 60)";
        setMessage("");
        
        let newCategory = CategoryName.current.value;

        if(newCategory === "") CategoryName.current.className = "inputEror";

        if(newCategory !== ""){  
            let URL = axiosURL + "Write_data.php";
            axios.post(URL,{
                type: "category",
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

    function addProduct(){
        let newProductName = ProductName.current.value;
        let newProductDescription = ProductDescription.current.value;
        let newProductPrice = ProductPrice.current.value;
        let newProductCategory = ProductCategory.current.value;

        if(newProductName === "") ProductName.current.className = "inputEror";
        if(newProductDescription === "") ProductDescription.current.className = "inputEror";
        if(newProductPrice === "") ProductPrice.current.className = "inputEror";
        if(newProductCategory === "") ProductCategory.current.className = "inputEror";

        if(newProductName !== "" && newProductDescription !== "" && newProductPrice !== "" && newProductCategory !== "")
        {
            let URL = axiosURL + "Write_data.php";
            axios.post(URL, {
                type: "setNewProduct",
                ProductName: newProductName,
                ProductDescription: newProductDescription,
                ProductCategory: newProductCategory,
                ProductPrice: newProductPrice
            })
            .then( (responce) => {
                if(responce.data === "done"){

                    ProductName.current.value = "";
                    ProductDescription.current.value = "";
                    ProductCategory.current.value = "";
                    ProductPrice.current.value = "";

                    ProductName.current.className = "";
                    ProductDescription.current.className = "";
                    ProductCategory.current.className = "";
                    ProductPrice.current.className = "";

                    productMessageText.current.style.color = "green";

                    setNewProductMessage("Новый товар был добавлен!")
                }
                else{

                    productMessageText.current.style.color = "rgb(250, 60, 60)";

                    setNewProductMessage("Произошла ошибка, вероятно данный товар уже существует или была допущена ошибка при заполнении формы")
                    
                    ProductName.current.className = "inputEror";
                    ProductDescription.current.className = "inputEror";
                    ProductCategory.current.className = "inputEror";
                    ProductPrice.current.className = "inputEror";
                }
            } )
        }
    }

    return(
        <div className="adminPanel">
            {(axiosURL.length === 0)
                ?<div></div>
                :<div className="row">
                    <div className="col-12 adminFormWrapper">
                        <h2>Новая категория</h2>
                        <form onSubmit={ (event) => {event.preventDefault(); addCategory();}}>
                            <input 
                                type="text"
                                name="NewCategory" 
                                ref={ CategoryName } 
                                placeholder="Новая категория"
                                minLength={3}
                                maxLength={32}
                            />
                            <Button 
                                type="Submit"
                                text="Добавить"
                                state={ ()=>{} }
                            />
                        </form>
                        <h3 ref={ messageText } >{ message }</h3>
                    </div>
                    <div className="col-12 adminFormWrapper addProduct">
                        <h2>Новый товар</h2>
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
                                name="ProductCategory" 
                                ref={ProductCategory}
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
                                minLength={3}
                                maxLength={32}
                            />
                            <Button 
                                type="Submit"
                                text="Добавить"
                                state={ ()=>{} }
                            />
                        </form>
                        <h3 ref={ productMessageText }>{ newProductMessage }</h3>
                    </div>
                </div>}
        </div>
    )
}

export default AdminPanel;