import React from 'react'
import {map, isEmpty} from "lodash";
import {User} from "./User";

export default function ListUsers(props) {
    const {users, type} = props;
    
    if(isEmpty(users)){
        return ( <h2 className="text-center">No hay resultados</h2> )
    }
    return (
        <ul className="w-full ">
            {map(users, user =>{
                return(<User key={user.id} type={type} user={user}/>)
            })}
        </ul>
    )
}
