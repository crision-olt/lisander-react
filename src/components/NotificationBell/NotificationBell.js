import NotificationsIcon from '@mui/icons-material/Notifications';
import * as React from "react";
import {useEffect, useState} from "react";
import {Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@material-ui/core";
import {checkNotification, getCountNotificationsApi, getNotificationsApi} from "../../api/notification";
import {useHistory} from "react-router-dom";

export function NotificationBell(props) {

    const anchorRef = React.useRef();
    const [notifications, setNotifications] = useState([]);
    const [numNotifications, setNumNotifications] = useState(0);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    useEffect(() => {
            getCountNotificationsApi().then((response) => {
                if (response) {
                    setNumNotifications(response);
                } else {
                    setNumNotifications(0);
                }
            })
            getNotificationsApi(page).then((response) => {
                if (response) {
                    setNotifications(response);
                } else {
                    setNotifications([])
                }
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
        ,
        [page]
    )

    const handleClose = () => setOpen(false);
    return (
        <>
            <Button
                sx={{width: '25px', height: '25px'}}
                ref={anchorRef}
                id="basic-button"
                aria-controls="notifications"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={() => setOpen(true)}
            >
                <NotificationsIcon/><span
                style={{
                    backgroundColor: "rgba(1,200,160,0.5)",
                    fontSize: '10px',
                    padding: '0.5em',
                    color: 'white',
                    position: 'absolute',
                    borderRadius: '50%'
                }}>{numNotifications}</span>
            </Button>
            <Popper
                anchorEl={anchorRef.current}
                open={open}
                role={undefined}
                placement={"bottom"}
                transition
                disablePortal

            >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'center top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                >
                                    {notifications.length == 0 ?
                                        <MenuItem>No tienes notificaciones</MenuItem> : notifications.map((notification) =>
                                            <Notification key={notification.id} {...notification}/>)}

                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    )

}

function Notification(notification) {
    const history = useHistory()
    const handleClick = () => {
        checkNotification(notification.id).then((e) => {
            history.push(getLink())
        })
    }
    const getLink = () => {
        switch (notification['typeId']) {
            case 1:
                return `/${notification['fromUserId']}`
            case 2:
                return `/toot/${notification['fromTootId']}`
            default:
                return '/'
        }
    }
    const getText = () => {
        switch (notification['typeId']) {
            case 1:
                return <span><span style={{fontWeight: 'bold'}}>{notification.fromUserName}</span> te ha empezado a seguir</span>
            case 2:
                return <span><span style={{fontWeight: 'bold'}}>{notification.fromUserName}</span> comento en tu publicación</span>
            default:
                return 'No data'
        }
    }


    return (
        <MenuItem key={notification.id} onClick={handleClick}>
            {getText()}
        </MenuItem>
    );
}