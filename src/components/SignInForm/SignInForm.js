import React, {useState} from "react";
import {size, values} from "lodash";
import {toast} from "react-toastify";
import {isEmailValid} from "../../utils/validations";
import {setTokenApi, signInApi} from "../../api/auth";
import {Button, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from "@mui/material";
import {Dialog} from "../../components";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function SignInForm(props) {
    const {setRefreshCheckLogin} = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let validCount = 0;
        values(formData).some((value) => {
            value && validCount++;
            return null;
        });
        if (size(formData) !== validCount) {
            toast.warning("Completa todos los campos del formulario");
        } else {
            if (!isEmailValid(formData.email)) {
                toast.warning("Email es invalido");
            } else {
                signInApi(formData)
                    .then((response) => {
                        if (response.message) {
                            toast.warning(response.message);
                        } else {
                            setTokenApi(response.token);
                            setRefreshCheckLogin(true);
                        }
                    })
                    .catch(() => {
                        toast.error("Error del servidor, intentelo mas tarde");
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
        setLoading(false);
    };
    const handleChange =
        (prop) => (event) => {
            setFormData({...formData, [prop]: event.target.value});
        };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <Button
                onClick={handleOpen}
            >
                Iniciar sesion
            </Button>
            <Dialog
                dialogTitle={"Iniciar sesion"} open={open} handleOpen={handleOpen} handleClose={handleClose}
            >
                <Grid container justifyContent={"center"} sx={{maxWidth: 400, my: 1, mx: 'auto', p: 2, mt: 0, pt: 0}}>
                    < Grid item xs={8}>
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
                    <Grid item xs={8}>
                        <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Contraseña"
                        />
                    </Grid>
                    <Button sx={{mt: 2, p: 2}}
                            onClick={onSubmit}
                    >
                        {!loading ? (
                            "Iniciar sesion"
                        ) : (
                            <div className="w-12 h-12 border-8 border-yellow-400 rounded-full loader"/>
                        )}
                    </Button>
                </Grid>
            </Dialog>
        </>
    );
}

function initialFormValue() {
    return {
        email: "",
        password: "prueba1",
    };
}
