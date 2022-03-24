import React, {useRef} from 'react';
import {Dialog} from "../Dialog";

export default function TButtonModal(props) {
    const {open, setOpen, messageText, acceptText, cancelText, onAccept, onCancel} = props;
    const ref = useRef(1);
    //logo
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    return (
        <Dialog dialogTitle={''} open={open} handleOpen={handleOpen} handleClose={handleClose}>

            <div className="grid grid-flow-row m-auto text-center w-full h-full p-4" ref={ref}>
                {messageText}
            </div>
            <div className="flex justify-around w-full">
                <button className="" onClick={onAccept}>{acceptText}</button>
                <button className="" onClick={onCancel}>{cancelText}</button>
            </div>

        </Dialog>
    );
}