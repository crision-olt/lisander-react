import React, {useEffect, useState} from "react";
import {Dialog} from "../Dialog";
import {addTootApi} from "../../../api/toot";
import {toast} from "react-toastify";
import {Button, Grid} from "@material-ui/core";
import {TextareaAutosize} from "@mui/material";

export default function TootModal() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const maxLength = 250;
    useEffect(() => {
        setMessage("");
    }, [open]);
    const onSubmit = (e) => {
        e.preventDefault();
        if (message.length > 0 && message.length <= maxLength)
            addTootApi(message)
                .then((response) => {
                    if (response?.code >= 200 && response?.code < 300) {
                        toast.success(response.message);
                        setOpen(false);
                        window.location.reload();
                    }
                })
                .catch(() => {
                    toast.warning("Error al enviar el toot, inténtelo más tarde");
                });
    };
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    //logo
    return (
        <>
            <button
                className="py-5 px-3 text-left text-gray-700 hover:bg-gray-200"
                onClick={handleOpen}
            >
                Toot
            </button>
            <Dialog
                dialogTitle={"Toot"} open={open} handleOpen={handleOpen} handleClose={handleClose}
            >
                <Grid container justifyContent={"center"} spacing={2}
                      sx={{maxWidth: 550, p: 4, mt: 0, pt: 0, width: '50%'}}>
                    <Grid item xs={12}>
                        <TextareaAutosize
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="biography"
                            label="Biografía"
                            onChange={(e) => setMessage(e.target.value)}
                            name="biography"
                            autoComplete="biography"
                            style={{width: '500px', height: '200px', padding: 2, marginLeft: '20px'}}
                        />
                        {/*<span className={message.length > maxLength ? "text-red-600" : ""}>
                         {
                         message
                         .replace("<div>", "")
                         .replace("</di>", "")
                         .replace(/&nbsp;/g, " ").length
                         }
                         </span>*/}
                    </Grid>

                    <Button
                        disabled={
                            message
                                .replace("<div>", "")
                                .replace("</di>", "")
                                .replace(/&nbsp;/g, " ").length > maxLength ||
                            message
                                .replace("<div>", "")
                                .replace("</di>", "")
                                .replace(/&nbsp;/g, " ").length < 1
                        }
                        onClick={onSubmit}
                        style={{marginBottom: 10}}
                    >
                        Toot
                    </Button>
                </Grid>
            </Dialog>
        </>
    );
}
