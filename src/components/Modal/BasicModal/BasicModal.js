import React from "react";
import { Dialog } from "@headlessui/react";
export default function BasicModal(props) {
  const { show, setShow, children } = props;
  //logo
  return (
    <Dialog
      className="fixed z-10 inset-0 overflow-y-auto"
      open={show}
      onClose={() => setShow(false)}
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className=" inset-0 bg-black opacity-30" />
        <Dialog.Title></Dialog.Title>
        <Dialog.Description>{children}</Dialog.Description>
      </div>
    </Dialog>
  );
}
