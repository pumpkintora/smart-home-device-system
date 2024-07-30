import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { businessLogicAxiosInstance as axios } from '../utils/axios' 

export default function Home(params) {
    const { user } = useSelector(state => state.user)

    React.useEffect(() => {
        axios.get("/room/all")
    }, [])

    return <>home</>
};
