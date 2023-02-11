import { useNavigate } from "react-router-dom";

function CatigoriesNav(){

    const navigate = useNavigate();

    return(
        <nav className="categoriesWrapper">
            <ul>
                <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=бытовая+техника")} }>
                    <img src="/img/icons/catigories/appliances.svg" alt="" />
                    <div className="catigoriesText">
                        <a>Бытовая техника</a>
                        <span>для дома<span>уход за собой</span></span>   
                    </div>
                </li>
                <li className="catigoriesItem" 
                    onClick={ () => {navigate("/catigories?cat=Смартфоны+и+гаджеты")} }>
                    <img src="/img/icons/catigories/smartphones.svg" alt="" />
                    <div className="catigoriesText">
                        <a>Смартфоны и гаджеты</a>
                        <span>планшеты<span>фототехника</span></span>   
                    </div>
                </li>
                <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=ТВ+и+мультимедия")} }>
                    <img src="/img/icons/catigories/TV.svg" alt="" />
                    <div className="catigoriesText">
                        <a>ТВ и мультимедия</a>
                        <span>аудио<span>видеоигры</span></span>   
                    </div>
                </li>
                <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=Компьютеры")} }>
                    <img src="/img/icons/catigories/computers.svg" alt="" />
                    <div className="catigoriesText">
                        <a>Компьютеры</a>
                        <span>комплектующие<span>ноутбуки</span></span>   
                    </div>
                </li>
                <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=Офис+и+сеть")} }>
                    <img src="/img/icons/catigories/office.svg" alt="" />
                    <div className="catigoriesText">
                        <a>Офис и сеть</a>
                        <span>кресла<span>проекторы</span></span>   
                    </div>
                </li>
                <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=Отдых+и+развлечения")} }>
                    <img src="/img/icons/catigories/rest.svg" alt="" />
                    <div className="catigoriesText">
                        <a>Отдых и развлечения</a>
                        <span>электросамакаты<span>бассейны</span></span>   
                    </div>
                </li>
                <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=Дом+декор+и+кухня")} }>
                    <img src="/img/icons/catigories/house.svg" alt="" />
                    <div className="catigoriesText">
                        <a>Дом, декор и кухня</a>
                        <span>зоотовары<span>посуда</span></span>   
                    </div>
                </li>
                <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=Автотовары")} }>
                    <img src="/img/icons/catigories/car.svg" alt="" />
                    <div className="catigoriesText">
                        <a>Автотовары</a>
                        <span>звук<span>автокресла</span></span>   
                    </div>
                </li>
                <li className="catigoriesItem" onClick={ () => {navigate("/catigories?cat=Аксессуары+и+услуги")} }>
                    <img src="/img/icons/catigories/sound.svg" alt="" />
                    <div className="catigoriesText">
                        <a>Аксессуары и услуги</a>
                        <span>наушники<span>мыши</span></span>   
                    </div>
                </li>
                <hr />
                <li className="catigoriesItem markdown" onClick={ () => {navigate("/catigories?cat=Уценённые+товары")} }>
                    <img src="/img/icons/catigories/markdown.svg" alt="" />
                    <div className="catigoriesText">
                        <a>Уценённые товары</a>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default CatigoriesNav;