import React, {useEffect, useState} from "react";
import AvatarNotFound from "../../../assets/png/avatar-no-found.png";
import {EditUserForm} from "../../../components";
import {Menu, Transition} from "@headlessui/react";
import {blockUserApi} from "../../../api/block.js";
import {getAvatarApi, getBannerApi} from "../../../api/user";
import {checkFollowApi, followUserApi, unFollowUserApi,} from "../../../api/follow";
import {DotsVerticalIcon} from "@heroicons/react/solid";
import {toast} from "react-toastify";
import {addReportApi, deleteReportApi} from "../../../api/report";
import TButtonModal from "../../Modal/TButtonModal/TButtonModal";

export default function BannerAvatar(props) {
    const {user, loggedUser, type} = props;
    const [show, setShow] = useState(false);
    const [showValidate, setShowValidate] = useState(false);
    const [showBlock, setShowBlock] = useState(false);
    const [following, setFollowing] = useState(null);
    const [reloadFollow, setReloadFollow] = useState(false);
    const bannerUrl = user?.banner ? getBannerApi(user.banner) : null;
    const avatarUrl = user?.avatar ? getAvatarApi(user.avatar) : AvatarNotFound;
    useEffect(() => {
        if (!user) {
            return;
        }
        checkFollowApi(user?.id).then((response) => {
            if (response?.status) {
                setFollowing(true);
            } else {
                setFollowing(false);
            }
        });
        setReloadFollow(false);
    }, [user, reloadFollow]);
    const onFollow = () => {
        followUserApi(user.id).then(() => {
            setReloadFollow(true);
        });
    };
    const onUnFollow = () => {
        unFollowUserApi(user.id).then(() => {
            setReloadFollow(true);
        });
    };
    return (
        <div
            className="grid grid-flow-col w-full h-60 bg-contain bg-no-repeat bg-center justify-between m-auto"
            style={{backgroundImage: `url('${bannerUrl}')`}}
        >
            <div
                className="h-32 w-32 mt-36 rounded-full bg-cover"
                style={{backgroundImage: `url('${avatarUrl}')`}}
            ></div>
            {user && (
                <div className="mt-56 mr-4 flex">
                    {type === "report" ? (
                        <button onClick={() => setShowValidate(true)}>
                            Validar Reporte
                        </button>
                    ) : (
                        <div className="flex items-center">
                            {loggedUser._id === user.id && (
                                <EditUserForm user={user} title={'Edit profile'}/>
                            )}

                            {loggedUser._id !== user.id &&
                            following !== null &&
                            (following ? (
                                <button onClick={onUnFollow} className="unFollow">
                                    Siguiendo
                                </button>
                            ) : (
                                <button onClick={onFollow}>Seguir</button>
                            ))}
                            {loggedUser._id !== user.id && (
                                <Menu
                                    as="div"
                                    className="relative inline-block text-left py-5 ml-2 mt-2"
                                >
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
                                                    className="absolute right-0 w-56 mt-2 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none grid grid-flow-row"
                                                >
                                                    <Menu.Item>
                                                        <button
                                                            onClick={() => {
                                                                setShow(true);
                                                            }}
                                                        >
                                                            Reportar
                                                        </button>
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <button
                                                            onClick={() => {
                                                                setShowBlock(true);
                                                            }}
                                                        >
                                                            Bloquear
                                                        </button>
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </>
                                    )}
                                </Menu>
                            )}
                        </div>
                    )}
                </div>
            )}
            <TButtonModal
                open={show}
                setOpen={setShow}
                messageText="¿Estas seguro de querer reportar a este usuario?"
                acceptText="Aceptar"
                cancelText="Cancelar"
                onAccept={() => {
                    addReportApi("", user.id);
                    toast.success("Reportaste al usuario correctamente.");
                    setShow(false);
                }}
                onCancel={() => setShow(false)}
            />
            <TButtonModal
                open={showBlock}
                setOpen={setShowBlock}
                messageText="¿Estas seguro de querer bloquear a este usuario?"
                acceptText="Aceptar"
                cancelText="Cancelar"
                onAccept={() => {
                    blockUserApi(user.id);
                    window.location = "/";
                    toast.error("Bloqueaste al usuario correctamente");
                }}
                onCancel={() => setShowBlock(false)}
            />
            <TButtonModal
                open={showValidate}
                setOpen={setShowValidate}
                messageText="¿El reporte fue adecuado?"
                acceptText="Confirmar reporte"
                cancelText="Rechazar reporte"
                onAccept={() => {
                    deleteReportApi(user.id, true).then(() => {
                        window.location = "/admin/reports";
                        toast.error("Validaste el reporte correctamente");
                    });
                }}
                onCancel={() => {
                    deleteReportApi(user.id, false).then(() => {
                        window.location = "/admin/reports";
                        toast.error("Validaste el reporte correctamente");
                    });
                }}
            />
        </div>
    );
}
