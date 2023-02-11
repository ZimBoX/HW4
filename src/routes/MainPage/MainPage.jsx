import { useOutletContext } from "react-router-dom";


import "./MainPage.css";

import CatigoriesNav from "../../components/CatigoriesNav/CatigoriesNav";
import Showcase from "../../components/Showcase/Showcase";

function MainPage(){

    const { axiosURL } = useOutletContext();

    return(
        <div className="mainPage">
            {(axiosURL.length === 0)
                ?<div></div>
                :<div className="mainPageWrapper d-flex">
                    <CatigoriesNav />
                    <Showcase 
                    axiosURL={ axiosURL }
                    />
                </div>
                }
        </div>
    )
}

export default MainPage;