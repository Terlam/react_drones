import React, { useState, useEffect } from 'react';
import { server_calls } from '../api';

export const useGetData = () => {
    const [ droneData, setData ] = useState<any>([]);

    async function handleDataFetch(){
        const result = await server_calls.get();
        setData(result)
    }

    // useEffect Hook adds our data to react State
    useEffect( () =>{
        handleDataFetch();
    }, [])

    return {droneData, getData:handleDataFetch}

}