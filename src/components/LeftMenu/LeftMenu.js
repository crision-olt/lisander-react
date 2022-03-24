import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {logoutApi} from "../../api/auth";
import atlas from "../../assets/png/atlas.png";
import {MenuAlt2Icon} from "@heroicons/react/solid";
import {getAvatarApi, getUserApi} from "../../api/user";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import {getDateApi, getReloads, isAdminApi, isStandardApi, isSuperAdminApi, updateDateApi,} from "../../api/date";
import useAuth from "../../hooks/useAuth";
import {Menu, Transition} from "@headlessui/react";
import {Dialog, TootModal} from "../../components";
import {Button, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {isEmpty, values} from "lodash";
import {toast} from "react-toastify";
import {changePassword} from "../../api/admin";
import {NotificationBell} from "../NotificationBell/NotificationBell";
import {formatRelative} from "date-fns";
import {es} from "date-fns/locale";

export default function LeftMenu(props) {
    const {setRefreshCheckLogin} = props;
    const [isStandard, setIsStandard] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [formData, setFormData] = useState(initialFormValue());
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [date, setDate] = useState(null);
    const [reloads, setReloads] = useState(null);
    const user = useAuth();
    const history = useHistory();
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleChange =
        (prop) => (event) => {
            setFormData({...formData, [prop]: event.target.value});
        };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const onSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        let validCount = 0;
        values(formData).some((value) => {
            value && validCount++;
            return null;
        });
        if (isEmpty(formData.password) || isEmpty(formData.newPassword) || isEmpty(formData.repeatPassword)) {
            toast.warning("Completa todos los campos del formulario");
        } else {
            if (formData.newPassword !== formData.repeatPassword) {
                toast.warning("La nueva contraseña no coincide con la repetición de la nueva contraseña");
            } else {
                changePassword(formData)
                    .then((response) => {
                        if (response.message) {
                            toast.warning(response.message);
                        } else {
                            toast.success('La contraseña se actualizo correctamente.');
                            setFormData(initialFormValue());
                            setOpenChangePassword(false);
                        }
                    })
                    .catch(() => {
                        toast.error("Error del servidor, inténtelo mas tarde");
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        }
        setLoading(false);
    };
    useEffect(() => {
        isStandardApi().then((response) => {
            setIsStandard(response.status);
            getDateApi().then(response => setDate(response))
            getReloads().then(response => setReloads(response))
        });
        isAdminApi().then((response) => {
            setIsAdmin(response.status);
        });
        isSuperAdminApi().then((response) => {
            setIsSuperAdmin(response.status);
        });
    }, []);
    useEffect(() => {
        let isMounted = true;
        getUserApi(user?._id).then((response) => {
            if (isMounted) {
                setAvatarUrl(
                    response?.avatar ? getAvatarApi(response.avatar) : AvatarNotFound
                );
            }
        });
    }, [user]);
    const logout = () => {
        logoutApi();
        setRefreshCheckLogin(true);
    };
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const closeChangePassword = () => {
        setOpenChangePassword(false);
    }
    return (
        <>
            <nav className="bg-gray-100 items-center" style={{maxHeight: 70}}>
                <div>
                    <div className="flex justify-around">
                        <div className="hidden md:flex items-center space-x-1">
                            <Link
                                to="/"
                                className="py-5 px-3 text-gray-700 hover:text-gray-900"
                            >
                                Inicio
                            </Link>
                            <Link
                                to="/users"
                                className="py-5 px-3 text-gray-700 hover:text-gray-900"
                            >
                                Buscar usuarios
                            </Link>
                            <TootModal/>
                        </div>

                        <Menu
                            as="div"
                            className="md:hidden relative inline-block text-left py-5"
                        >
                            {({open}) => (
                                <>
                                    <div>
                                        <Menu.Button>
                                            <MenuAlt2Icon className="h-5 w-5 text-black"/>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        show={open}
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Menu.Items
                                            static
                                            className="absolute left-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none grid grid-flow-row"
                                        >
                                            <Menu.Item>
                                                <Link
                                                    to="/"
                                                    className="py-5 px-3 text-gray-700 hover:bg-gray-200"
                                                >
                                                    Inicio
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link
                                                    to="/users"
                                                    className="py-5 px-3 text-gray-700 hover:bg-gray-200"
                                                >
                                                    Buscar usuarios
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <TootModal/>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>

                        <div className="">
                            <Link
                                to="/"
                                className="flex items-center py-5 px-2 text-gray-700 hover:bg-gray-200"
                            >
                                <img src={atlas} width={20} alt=""/>{" "}
                                <span className="font-bold">Lisander</span>
                            </Link>
                        </div>
                        <NotificationBell/>
                        <Menu as="div" className="relative inline-block text-left py-5">
                            {({open}) => (
                                <>
                                    <div>
                                        <Menu.Button>
                                            <img
                                                alt={""}
                                                width={40}
                                                className=" rounded-full"
                                                src={avatarUrl}
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        show={open}
                                        enter="transition duration-100 ease-out"
                                        enterFrom="transform scale-95 opacity-0"
                                        enterTo="transform scale-100 opacity-100"
                                        leave="transition duration-75 ease-out"
                                        leaveFrom="transform scale-100 opacity-100"
                                        leaveTo="transform scale-95 opacity-0"
                                    >
                                        <Menu.Items
                                            static
                                            className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none grid grid-flow-row"
                                        >
                                            <Menu.Item>
                                                <Link
                                                    to={`/${user?._id}`}
                                                    className="py-5 px-3 text-gray-700 hover:bg-gray-200"
                                                >
                                                    Perfil
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link
                                                    to="/follows"
                                                    className="py-5 px-3 text-gray-700 hover:bg-gray-200"
                                                >
                                                    Seguidores/Seguidos
                                                </Link>
                                            </Menu.Item>

                                            <Menu.Item>
                                                <Link
                                                    to={`/blocked`}
                                                    className="py-5 px-3 text-gray-700 hover:bg-gray-200"
                                                >
                                                    Bloqueados
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link
                                                    to=""
                                                    onClick={() => setOpenChangePassword(true)}
                                                    className="py-5 px-3 text-gray-700 hover:bg-gray-200"
                                                >
                                                    Cambiar Contraseña
                                                </Link>
                                            </Menu.Item>
                                            {!isStandard && (
                                                <Menu.Item>
                                                    <Link
                                                        to=""
                                                        onClick={() => {
                                                            updateDateApi().then(() => history.go(0))
                                                        }}
                                                        className="py-5 px-3 text-gray-700 hover:bg-gray-200"
                                                    >
                                                        Actualizar <span
                                                        style={{fontSize: '10px'}}>(Restantes:{reloads}) {formatRelative(new Date(date), new Date(), {
                                                        locale: es,
                                                    })}</span>
                                                    </Link>
                                                </Menu.Item>
                                            )}
                                            {isAdmin && (
                                                <Menu.Item>
                                                    <Link
                                                        to={`/admin/reports`}
                                                        className="py-5 px-3 text-gray-700 hover:bg-gray-200"
                                                    >
                                                        Reportes
                                                    </Link>
                                                </Menu.Item>
                                            )}
                                            {isSuperAdmin && (
                                                <Menu.Item>
                                                    <Link
                                                        to={`/admin/list`}
                                                        className="py-5 px-3 text-gray-700 hover:bg-gray-200"
                                                    >
                                                        Gestionar Administradores
                                                    </Link>
                                                </Menu.Item>
                                            )}
                                            <Menu.Item>
                                                <Link
                                                    to=""
                                                    onClick={logout}
                                                    className="py-5 px-3 text-gray-700 hover:bg-gray-200"
                                                >
                                                    Cerrar sesión
                                                </Link>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>
                    </div>
                </div>
                <Dialog handleClose={closeChangePassword} dialogTitle={'Cambiar contraseña'} open={openChangePassword}>
                    <Grid container justifyContent={"center"} sx={{maxWidth: 400, my: 1, mx: 'auto', p: 2, mt: 0, pt: 0}}>
                        <Grid item xs={8}>
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="password"
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
                        <Grid item xs={8}>
                            <InputLabel htmlFor="outlined-adornment-password">Nueva contraseña</InputLabel>
                            <OutlinedInput
                                id="newPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.newPassword}
                                onChange={handleChange('newPassword')}
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
                                label="Nueva contraseña"
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <InputLabel htmlFor="outlined-adornment-password">Repetir nueva contraseña</InputLabel>
                            <OutlinedInput
                                id="repeatPassword"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.repeatPassword}
                                onChange={handleChange('repeatPassword')}
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
                                label="Repetir nueva contraseña"
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
            </nav>
        </>
    );
}

function initialFormValue() {
    return {
        password: "",
        newPassword: "",
        repeatPassword: "",
    };
}
