import React from 'react'
import { Dialog } from "@headlessui/react";
import {Close} from "../../../utils/Icons";

export default function ConfigModal(props) {
    const {show, setShow, title, children} = props
    
    return (
        <Dialog className="fixed z-10 inset-0 overflow-y-auto bg-blue-500" open={show} onClose={()=>setShow(false)} initialFocus="focus">
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className=" inset-0 bg-black opacity-30"/>
                <Dialog.Title>
                <Close onClick={()=> setShow(false)}/>
                        <h2>{title}</h2>
                </Dialog.Title>
                <Dialog.Description>

                </Dialog.Description>
            
                {children}
            </div>
        </Dialog>
    )
}
