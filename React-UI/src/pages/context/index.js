import {createContext , useState , useEffect } from "react";
import { useForm } from 'react-hook-form';
// styles
import '../styles.css'

const MainContext = createContext();

export const FormContext = (props)=>{
    
    const { children , initialValues } = props;
    const { handleSubmit } = useForm();
    const [mainValue , setMainValues] = useState(initialValues);

    const [ changeForm , setChangeForm ] = useState(false);

    useEffect(()=>{
        setMainValues(props.initialValues);
    },[]);

    const submitData = ()=>{
            props.submitData(mainValue);
    }

    const changeValue = (value , key) =>{
        setChangeForm(true);
        const data = {...mainValue , [key] : value};
        setMainValues(data);
    }


    return(
        <MainContext.Provider value={{
                                        name : 'surya teja' , 
                                        age : 24 , 
                                        initialValues : changeForm === false ? props.initialValues : mainValue , 
                                        changeValue
                                     }}>
            <form onSubmit={handleSubmit(submitData)}>
                {children}
                <br />
                <input type='submit' className="contextFormButton" />
            </form>
        </MainContext.Provider>
    )
} 

export default MainContext;