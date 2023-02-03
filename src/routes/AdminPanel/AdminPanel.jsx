import { useState, useEffect, useRef } from "react";

import axios from "axios";

import "./AdminPanel.css";

import ConnectionTest from "../../components/ConnectionTest/ConnectionTest";
import Button from "../../components/Button/Button";

function AdminPanel(){

    const [axiosURL, setAxiosURL] = useState([]);
    const [message, setMessage] = useState("");

    let CategoryName = useRef();
    let messageText = useRef();

    function addCategory(){
        CategoryName.current.className = "";
        messageText.current.style.color = "rgb(250, 60, 60)";
        setMessage("");
        console.log(messageText.current)
        
        let newCategory = CategoryName.current.value;

        if(newCategory === "") CategoryName.current.className = "inputEror";

        if(newCategory !== ""){  
            axios.post(axiosURL,{
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
                console.log(responce.data)
            } )
        }
    }

    return(
        <div className="adminPanel">
            {(axiosURL.length === 0)
                ?<ConnectionTest 
                    script = "Write_data.php"
                    callBack = { setAxiosURL }
                />
                :<div className="row">
                    <div className="col-12 adminFormWrapper">
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
                    <div className="col-12 adminFormWrapper">
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
                </div>}
        </div>
    )
}

export default AdminPanel;