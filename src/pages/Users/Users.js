import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {getUsersApi} from "../../api/follow";
import {isEmpty} from "lodash";
import {ListUsers} from "../../components";
import {BasicLayout} from "../../layout";
import {useDebouncedCallback} from "use-debounce";
import {TextField} from "@mui/material";

export function Users(props) {
    const {setRefreshCheckLogin} = props;
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        getUsersApi()
            .then((response) => setUsers(response))
            .then(() => setShowUsers(users));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const debounced = useDebouncedCallback((email) => {
        let array = [];
        users.forEach((user) => {
            if (new RegExp(email).test(user.email)) array.push(user);
        });
        setSearch(email);
        setShowUsers(array);
    }, 1000);

    return (
        <BasicLayout setRefreshCheckLogin={setRefreshCheckLogin}>
            <div
                className="w-full  p-1 grid grid-flow-row bg-blue-50 m-auto"
                style={{maxWidth: 600}}
            >
                <div
                    className="w-full  p-1 grid grid-flow-row bg-blue-50 m-auto"
                    style={{maxWidth: 600}}
                >
                    <h2>Usuarios</h2>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        defaultValue={search}
                        label="Busca un usuario por su correo..."
                        onChange={(e) => debounced(e.target.value)}
                        name="email"
                        autoComplete="email"
                    />
                </div>

                <ListUsers users={isEmpty(search) ? users : showUsers} type="follow"/>
            </div>
        </BasicLayout>
    );
}

export default withRouter(Users);
