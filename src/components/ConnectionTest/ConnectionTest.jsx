import { useState, useEffect } from 'react';

import axios from "axios";


function ConnectionTest(props){
    
    const {script, callBack} = props;

    useEffect( () => {
        axios.post('php/' + script)
        .then(function (response) {
            callBack(response.request.responseURL);
            return;
        })
        .catch(function () {
            callBack("http://hw3dmr.box/" + script);
            return;
        });
    }, [] );

}

export default ConnectionTest;