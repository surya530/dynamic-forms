import React , {useState , useEffect } from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/usersAction"

const Surya = (props) => {
    useEffect(()=>{
        props.dispatch(getUsers());
        console.log(props.u);
    } , [])
    return(
        <div>
            <h1>surya</h1>
            {
                props.u.users?.map((e,index)=>{
                    return(
                        <p key={index}>{e.name}</p>
                    )
                })
            }
        </div>
    )
}


const stateToProps = (state) => ({
    u : state.storeUsers
})

export default connect(stateToProps , (dispatch)=>({ dispatch }))(Surya);