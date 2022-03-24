import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {Dialog, ListUsers} from "../../../components";
import {BasicLayout} from "../../../layout";
import {getAdminsApi, insertAdmin} from "../../../api/admin";
import {Button, Grid, TextField} from "@mui/material";
import {size, values} from "lodash";
import {toast} from "react-toastify";
import {isEmailValid} from "../../../utils/validations";

export function AdminList(props) {
    const {setRefreshCheckLogin} = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState(null);
    const [newDialog, setNewDialog] = useState(false);
    useEffect(() => {
        getAdminsApi()
            .then((response) => {
                // eslint-disable-next-line eqeqeq
                if (response) {
                    setUsers(response);
                } else {
                    setUsers([]);
                }
            })
            .catch(() => {
                setUsers([]);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onSubmit = (e) => {
        e.preventDefault();

        let validCount = 0;
        values(formData).some(() => {
            validCount++;
            return null;
        });

        if (validCount !== size(formData)) {
            toast.warning("Completa todos los campos del formulario.");
        } else {
            if (!isEmailValid(formData.email)) {
                toast.warning("Email invalido");
            } else {
                setLoading(true);
                insertAdmin(formData)
                    .then((response) => {
                        if (response.code) {
                            toast.warning(response.message);
                        } else {
                            toast.success("El registro ha sido correcto");
                            setNewDialog(false);
                            setFormData(initialFormValue());
                        }
                    })
                    .catch(() => {
                        toast.error("Error del servidor, intentelo mas tarde!");
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
    };
    const handleClose = () => {
        setNewDialog(false);
    }
    const handleOpen = () => {
        setNewDialog(true);
    }

    const handleChange =
        (prop) => (event) => {
            setFormData({...formData, [prop]: event.target.value});
        };
    return (
        <BasicLayout title="Usuarios" setRefreshCheckLogin={setRefreshCheckLogin}>
            <div
                className="w-full  p-1 grid grid-flow-row bg-blue-50 m-auto"
                style={{maxWidth: 600}}
            >
                <Grid container>
                    <Grid item>
                        <h2>Administradores</h2>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleOpen}>
                            Nuevo Administrador
                        </Button>
                    </Grid>
                </Grid>


                {users && <ListUsers users={users} type="admin"/>}

            </div>
            <Dialog handleClose={handleClose} open={newDialog} dialogTitle={'Nuevo Administrador'}>
                <Grid container justifyContent={"center"} spacing={2}
                      sx={{maxWidth: 550, my: 1, mx: 'auto', p: 2, mt: 0, pt: 0}}>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Nombre"
                            onChange={handleChange('name')}
                            name="name"
                            autoComplete="name"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="surnames"
                            label="Apellidos"
                            onChange={handleChange('surnames')}
                            name="surnames"
                            autoComplete="surnames"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Correo electonico"
                            onChange={handleChange('email')}
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Button sx={{mt: 0, p: 2}}
                            onClick={onSubmit}
                    >
                        {!loading ? (
                            "Registrarse"
                        ) : (
                            <div className="w-12 h-12 border-8 border-yellow-400 rounded-full loader"/>
                        )}
                    </Button>
                </Grid>
            </Dialog>
        </BasicLayout>
    );
}

function initialFormValue() {
    return {
        name: "",
        surnames: "",
        email: "",
    };
}


export default withRouter(AdminList);
