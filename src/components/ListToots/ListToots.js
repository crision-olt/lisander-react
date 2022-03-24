import React, {useEffect, useState} from "react";
import {map} from "lodash";
import {getAvatarApi, getUserApi} from "../../api/user";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import {Menu, Transition} from "@headlessui/react";
import {ChatIcon, DotsVerticalIcon} from "@heroicons/react/solid";
import {deleteTootApi} from "../../api/toot";
import {formatRelative, parseISO} from "date-fns";
import {addCommentApi} from "../../api/comment";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {es} from "date-fns/locale";
import {Button, Grid} from "@material-ui/core";
import {TextField} from "@mui/material";

export default function ListToots(props) {
    const {toots, loggedUser} = props;

    return (
        <div className="w-full text-center">
            {!toots && "No hay toots que mostrar."}
            {map(toots, (toot, index) => <Toot key={index} toot={toot} loggedUser={loggedUser}/>)}
        </div>
    );
}

function Toot(props) {
    const {toot, loggedUser} = props;
    const [userInfo, setUserInfo] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    useEffect(() => {
        let isMounted = true;
        toot &&
        getUserApi(toot.userId).then((response) => {
            if (isMounted) {
                setUserInfo(response);
                setAvatarUrl(
                    response?.avatar ? getAvatarApi(response.avatar) : AvatarNotFound
                );
            }
        });
        return () => {
            isMounted = false;
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toot]);
    const [message, setMessage] = useState("");
    const maxLength = 250;
    const onSubmit = (e) => {
        e.preventDefault();
        if (message.replace(" ", "").length > 0 && message.length <= maxLength) {
            addCommentApi(message, toot._id ? toot._id : toot.id)
                .then((response) => {
                    if (response?.code >= 200 && response?.code < 300) {
                        toast.success(response.message);
                        setMessage("");
                    }
                })
                .catch(() => {
                    toast.warning("Error al enviar el comentario, intentelo más tarde.");
                });
        } else {
            toast.warning("El comentario tiene que tener entre 1 y 250 caracteres.");
        }
    };

    return (
        <Grid container spacing={0}>
            <Grid item xs={2}>
                <Link to={`/${userInfo?.id}`}>
                    <img
                        width={64}
                        height={64}
                        className="m-2 rounded"
                        src={avatarUrl}
                        alt={userInfo?.name + " " + userInfo?.surnames}
                    />
                </Link>
            </Grid>
            <Grid item container xs={10} sx={{mt: 2}} style={{textAlign: 'start'}}>
                <Grid item xs={11} sx={{mt: 2}}>
                    <Link
                        className="font-bold"
                        to={`/${userInfo?.id}`}
                    >
                        {userInfo?.name} {userInfo?.surnames}
                    </Link>
                    <Link
                        className="ml-2 text-gray-500 text-xs sm:text-sm"
                        to={`/toot/${toot.id ? toot.id : toot._id}`}
                    >
                        {formatRelative(parseISO(toot.date), new Date(), {
                            locale: es,
                        })}
                    </Link>
                </Grid>
                <Grid item xs={1}>
                    {loggedUser?._id === toot?.userId && (
                        <Menu as="span" className="mt-2">
                            {({open}) => (
                                <>
                                    <div>
                                        <Menu.Button>
                                            <DotsVerticalIcon className="h-5 w-5 text-black"/>
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
                                            className="absolute w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none grid grid-flow-row"
                                        >
                                            <Menu.Item>
                                                <button
                                                    onClick={() => {
                                                        deleteTootApi(toot.id ? toot.id : toot._id).then(
                                                            (response) => toast.success(response.message)
                                                        );
                                                        window.location.reload();
                                                    }}
                                                >
                                                    Eliminar toot
                                                </button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>
                    )}
                </Grid>

                <Grid item xs={12} style={{textAlign: 'left', maxWidth: '450px', wordWrap: "break-word"}}>
                    {/*className="w-full block border-transparent bg-transparent"
                     style={{
                     resize: "none",
                     width: "auto",
                     overflow: "hidden",
                     overflowWrap: "break-word",
                     textOverflow: "break-word",
                     maxWidth: 460,
                     }}
                     dangerouslySetInnerHTML={{__html: toot.message}}
                     readOnly={true} */}
                    {toot.message}
                </Grid>
            </Grid>
            <Grid item container xs={12} justifyContent={"center"} alignItems={'center'}>
                <Grid item xs={10}>
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        id="comment"
                        name="comment"

                        value={message}
                        label="Comentario"
                        onChange={(e) => setMessage(e.target.value)}
                        multiline
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        onClick={onSubmit}
                    >
                        <ChatIcon className="w-7 h-7 text-gray-700"/>
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

