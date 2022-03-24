import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import {getAvatarApi} from "../../api/user";
import {checkFollowApi, followUserApi, unFollowUserApi,} from "../../api/follow";
import {blockUserApi, checkBlockApi, unBlockUserApi} from "../../api/block";
import {banAdmin} from "../../api/admin";

export function User(props) {
    const {user, type} = props;
    const [following, setFollowing] = useState(null);
    const [blocking, setBlocking] = useState(null);
    const [banned, setBanned] = useState(user.blocked);
    const [reloadBlock, setReloadBlock] = useState(false);
    const [reloadFollow, setReloadFollow] = useState(false);
    const [reloadBanned, setReloadBanned] = useState(false);
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
    useEffect(() => {
        if (!user) {
            return;
        }
        checkBlockApi(user?.id).then((response) => {
            if (response?.status) {
                setBlocking(true);
            } else {
                setBlocking(false);
            }
        });
        setReloadBlock(false);
    }, [user, reloadBlock]);
    const onFollow = () => {
        followUserApi(user.id).then(() => {
            setReloadFollow(true);
            setFollowing(true);
        });
    };
    const onBan = () => {
        banAdmin(user.id).then(() => {
            setBanned(true)
        });
    };
    const onUnFollow = () => {
        unFollowUserApi(user.id).then(() => {
            setReloadFollow(false);
            setFollowing(false);
        });
    };
    const onBlock = () => {
        blockUserApi(user.id).then(() => {
            setReloadBlock(true);
            setBlocking(true);
        });
    };
    const onUnBlock = () => {
        unBlockUserApi(user.id).then(() => {
            setReloadBlock(false);
            setBlocking(false);
        });
    };
    return (
        <li className="flex ">
            <Link to={`/${user.id}`}>
                <img
                    width={64}
                    height={64}
                    className="m-2 rounded"
                    src={user?.avatar ? getAvatarApi(user.avatar) : AvatarNotFound}
                    alt={`${user.name} ${user.surnames}`}
                />
            </Link>
            <div className="p-2 grid grid-flow-col">
                <div>
                    <Link className="font-bold text-sm sm:text-md" to={`/${user.id}`}>
                        {user.name} {user.surnames}
                    </Link>
                    <p>{user.email}</p>
                </div>
                <div className=" flex justify-center ml-12">
                    {(() => {
                        switch (type) {
                            // eslint-disable-next-line no-lone-blocks
                            case "block":
                                if (blocking) {
                                    return (
                                        <button onClick={onUnBlock} className="unFollow">
                                            <span>Bloqueado</span>
                                        </button>
                                    );
                                } else {
                                    return <button onClick={onBlock}>No bloqueado</button>;
                                }
                            case "admin":
                                if (banned) {
                                    return (
                                        <button className="unFollow">
                                            <span>Baneado</span>
                                        </button>
                                    );
                                } else {
                                    return <button onClick={onBan}>Banear</button>;
                                }
                            // eslint-disable-next-line no-lone-blocks
                            case "follow":
                                if (following) {
                                    return (
                                        <button onClick={onUnFollow} className="button">
                                            <span>Siguiendo</span>
                                        </button>
                                    );
                                } else {
                                    return <button onClick={onFollow}>Seguir</button>;
                                }
                            default:
                                return;
                        }
                    })()}
                </div>
            </div>
        </li>
    );
}
