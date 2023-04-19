import axios from "axios";

// export const getUsers = () => (dispatch) =>{
//     return axios.get('https://jsonplaceholder.typicode.com/todos').then((e)=>{console.log(e)}).catch((error)=>{})
// }


export function getUsers(){
    return (dispatch)=>{
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then((data)=>{
//            console.log(data);
            dispatch({
                type:"GET_USERS",
                data : data.data
            })
        }).catch((err)=>{})
    }
}


