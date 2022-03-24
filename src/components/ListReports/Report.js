import React, {} from 'react';
import {Link} from "react-router-dom";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import { getAvatarApi} from "../../api/user";
import {formatRelative, parseISO} from "date-fns";
import {es} from 'date-fns/locale';
export function Report(props) {
    const {report} = props;
    
   
    return (
        <li className="flex ">
            <Link to={`/admin/reports/${report.id}`}><img width={64} height={64} className="m-2 rounded" src={report.reportedUser?.avatar ? getAvatarApi(report.reportedUser.avatar):AvatarNotFound} alt={`${report.reportedUser.name} ${report.reportedUser.surnames}`} /></Link>
            <div className="p-2 grid grid-flow-col">
                <div>
                <Link className="font-bold" to={`/admin/reports/${report.id}`}>
                    {report.reportedUser.name} {report.reportedUser.surnames}
                </Link>
                <Link className="ml-2 text-gray-500" to={`/admin/reports/${report.id}`}>{formatRelative(parseISO(report.date), new Date(),{locale:es})}</Link>
                </div>
                <div className=" flex justify-center ml-12">
                    {report.reports.length} {report.reports.length>1 ? <>Indidencias</> : <>Incidencia</>}
                </div>
            </div>
        </li>
    )
}
