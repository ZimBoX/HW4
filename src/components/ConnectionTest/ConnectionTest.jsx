import { useEffect } from 'react';

import axios from "axios";

function ConnectionTest(props){
    
    const {script, callBack, errCallBack} = props;

    useEffect( () => {
        axios.post('php/' + script)
        .then(function (response) {
            let data = response.data;

            if(data.indexOf("<?php") !== -1){
                console.log(data);
                errCallBack(data);
                return;
            }
            callBack("/php/");
            return;
        })
        .catch(function () {
            callBack("http://hw3dmr.box/");
            return;
        })
    }, [] );

}

export default ConnectionTest;