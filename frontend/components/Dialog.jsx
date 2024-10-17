import React, { useRef, useImperativeHandle, forwardRef } from "react";

const Dialog = forwardRef((props, ref) => {
    const dialog = useRef();

    useImperativeHandle(ref, () => ({
        openModal: () => {
            if (dialog.current) {
                dialog.current.showModal();
                console.log('dialog opened!')
            }
        },
        closeModal: () => {
            if (dialog.current) {
                dialog.current.close();
                console.log('dialog closed!')
            }
        }
    }));

    return (
        <>
            <dialog ref={dialog} className="modal">
                {props.children}
            </dialog>

        </>
    );
});

export default Dialog;
