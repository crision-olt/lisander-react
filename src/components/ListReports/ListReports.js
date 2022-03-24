import React from 'react'
import {map, isEmpty} from "lodash";
import {Report} from "./Report";

export default function ListUsers(props) {
    const {reports} = props;
    
    if(isEmpty(reports)){
        return ( <h2 className="text-center">No hay resultados</h2> )
    }
    return (
        <ul className="w-full ">
            {map(reports, report =>{
                return(<Report key={report.id} report={report}/>)
            })}
        </ul>
    )
}
