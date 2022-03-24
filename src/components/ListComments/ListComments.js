import React, {useEffect, useState} from "react";
import {map} from "lodash";
import {toast} from "react-toastify";
import {Menu, Transition} from "@headlessui/react";
import {DotsVerticalIcon} from "@heroicons/react/solid";
import {getAvatarApi, getUserApi} from "../../api/user";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import {Link} from "react-router-dom";
import {deleteCommentApi} from "../../api/comment";
import {formatRelative, parseISO} from "date-fns";
import {es} from "date-fns/locale";
import {Grid} from "@material-ui/core";

export default function ListComments(props) {
    const {comments, loggedUser} = props;
    return (
        <div className="list-toots">
            {!comments && "No hay comentarios que mostrar."}
            {map(comments, (comment, index) => {
                return (
                    <Comment key={index} loggedUser={loggedUser} comment={comment}/>
                );
            })}
        </div>
    );
}

function Comment(props) {
    const {comment, loggedUser} = props;
    const [userInfo, setUserInfo] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    useEffect(() => {
        let isMounted = true;
        getUserApi(comment.userId).then((response) => {
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
    }, [comment]);
    return (
        <Grid container spacing={0}>
            <Grid item xs={2}>
                <Link as={Link} to={`/${comment.userId}`}>
                    <img
                        alt={userInfo?.name + " " + userInfo?.surnames}
                        className="w-20 h-20 p-1"
                        src={avatarUrl}
                    />
                </Link>
            </Grid>
            <Grid item container xs={10} sx={{mt: 2}}>
                <Grid item xs={11} sx={{mt: 2}}>
                    <Link className="font-bold" to={`/${comment.userId}`}>
                        {userInfo?.name} {userInfo?.surnames}
                    </Link>
                    <span className="ml-2 text-gray-500">
              {formatRelative(parseISO(comment.date), new Date(), {
                  locale: es,
              })}
            </span>
                </Grid>

                <Grid item xs={1}>
                    {loggedUser?._id === comment?.userId && (
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
                                                        deleteCommentApi(
                                                            comment.id ? comment.id : comment._id
                                                        ).then((response) =>
                                                            toast.success(response.message)
                                                        );
                                                        window.location.reload();
                                                    }}
                                                >
                                                    Eliminar comentario
                                                </button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>
                    )}

                </Grid>
                <Grid item xs={12}>
                    <div
                        className="w-full block border-transparent bg-transparent"
                        style={{
                            resize: "none",
                            overflow: "hidden",
                            overflowWrap: "break-word",
                            textOverflow: "break-word",
                            maxWidth: 460,
                        }}
                        dangerouslySetInnerHTML={{__html: comment.message}}
                        readOnly={true}
                    />
                </Grid>
            </Grid>
        </Grid>
    )

}
