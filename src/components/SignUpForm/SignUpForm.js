import React, {useState} from "react";
import {size, toNumber, values} from "lodash";
import {toast} from "react-toastify";
import {Dialog} from "../Modal";
import {isEmailValid} from "../../utils/validations";
import {signUpApi} from "../../api/auth";
import InfoIcon from '@mui/icons-material/Info';

import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Slider,
    TextField,
    Tooltip
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function SignUpForm() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormValue());
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
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
            } else if (formData.password !== formData.repeatpassword) {
                toast.warning("Las contraseñas tienen que ser iguales.");
            } else if (size(formData.password) < 6) {
                toast.warning("La contraseña tiene que tener al menos 6 caracteres.");
            } else if (!toNumber(formData.updateDate)) {
                toast.warning(
                    "La actualización de las notificaciones tiene que ser 0 o mayor a 0"
                );
            } else {
                setLoading(true);
                signUpApi(formData)
                    .then((response) => {
                        if (response.code) {
                            toast.warning(response.message);
                        } else {
                            toast.success("El registro ha sido correcto");
                            setOpen(false);
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
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange =
        (prop) => (event) => {
            setFormData({...formData, [prop]: event.target.value});
        };
    return (
        <>

            <Button
                onClick={handleOpen}
            >
                Registrate
            </Button>
            <Dialog
                dialogTitle={"Crea tu cuenta"} open={open} handleOpen={handleOpen} handleClose={handleClose}
            >
                <Grid container justifyContent={"center"} spacing={2}
                      sx={{maxHeight: 550, mx: 4, p: 2, mt: 0, pt: 0}}>
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
                    <Grid item xs={6}>
                        <FormControl variant="outlined">
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
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-repeatpassword">Repetir contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-repeatpassword"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.repeatpassword}
                                onChange={handleChange('repeatpassword')}
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
                                label="Repetir contraseña"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{width: 500, p: 1}}>
                            Actualizaciones al día permitidas
                            <Tooltip sx={{ml: 2}}
                                     title="Si desconoce sobre la funcionalidad dejelo en 0"><InfoIcon/></Tooltip>
                            <Slider
                                aria-label="Actualizaciones al día permitidas"
                                defaultValue={0}
                                valueLabelDisplay="auto"
                                onChange={handleChange('updateDate')}
                                step={1}
                                marks
                                min={0}
                                max={12}
                            />
                        </Box>
                    </Grid>
                    <Button
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
        </>
    )

}

function initialFormValue() {
    return {
        name: "",
        surnames: "",
        email: "",
        updateDate: 0,
        password: "prueba1",
        repeatpassword: "prueba1",
    };
}
