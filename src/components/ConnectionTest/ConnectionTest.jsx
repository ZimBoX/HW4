import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import axios from "axios";

import Error from '../../routes/Error/Error';


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
            callBack(response.request.responseURL);
            return;
        })
        .catch(function (response) {
            callBack("http://hw3dmr.box/" + script);
            return;
        })
    }, [] );

}

export default ConnectionTest;