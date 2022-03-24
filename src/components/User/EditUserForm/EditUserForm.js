import React, {useCallback, useEffect, useState} from "react";
import {Dialog} from "../../Modal";
import {Camera} from "../../../utils/Icons";
import {isEmpty} from "lodash";
import {toast} from "react-toastify";
import {useDropzone} from "react-dropzone";
import {getAvatarApi, getBannerApi, updateInfoApi, uploadAvatarApi, uploadBannerApi,} from "../../../api/user";
import {PencilIcon} from "@heroicons/react/solid";
import {Button, Grid, TextField} from "@mui/material";

export default function EditUserForm(props) {
    const {user, title} = props;
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialValue(user));
    const [bannerUrl, setBannerUrl] = useState(
        user?.banner ? getBannerApi(user.banner) : null
    );
    const [bannerFile, setBannerFile] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(
        user?.avatar ? getAvatarApi(user.avatar) : null
    );
    const [avatarFile, setAvatarFile] = useState(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropBanner = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        setBannerUrl(URL.createObjectURL(file));
        setBannerFile(file);
    });
    const {
        getRootProps: getRootBannerProps,
        getInputProps: getInputBannerProps,
    } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner,
    });
    useEffect(() => {
        setFormData(initialValue(user));
        setBannerUrl(user?.banner ? getBannerApi(user.banner) : null);
        setAvatarUrl(user?.avatar ? getAvatarApi(user.avatar) : null);
    }, [user]);
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropAvatar = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        setAvatarUrl(URL.createObjectURL(file));
        setAvatarFile(file);
    });
    const {
        getRootProps: getRootAvatarProps,
        getInputProps: getInputAvatarProps,
    } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar,
    });
    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (bannerFile) {
            await uploadBannerApi(bannerFile).catch(() => {
                toast.error("Error al subir el nuevo banner");
            });
        }
        if (avatarFile) {
            await uploadAvatarApi(avatarFile).catch(() => {
                toast.error("Error al subir el nuevo avatar");
            });
        }
        await updateInfoApi(formData)
            .then(() => {
                handleClose()
            })
            .catch(() => {
                toast.error("Error al actualizar los datos.");
            });
        setLoading(false);
        window.location.reload();
    };
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }

    const handleChange =
        (prop) => async (event) => {
            await setFormData({...formData, [prop]: event.target.value});

        };
    const handleChangeDate = (date) => {
        setFormData({...formData, 'birthDate': date});
    };
    return (
        <>
            <Button
                onClick={handleOpen}
            >
                <PencilIcon className="h-7 w-7 text-black"/>
            </Button>
            <Dialog
                dialogTitle={title} open={open} handleOpen={handleOpen} handleClose={handleClose}
            >
                <Grid container spacing={2} sx={{maxWidth: 600, my: 1, mx: 'auto', p: 2, mt: 0, pt: 0}}>
                    <div
                        className="w-full h-60 bg-contain bg-no-repeat bg-center flex items-center rounded"
                        style={{backgroundImage: `url('${bannerUrl}')`}}
                        {...getRootBannerProps()}
                    >
                        <input {...getInputBannerProps()} />
                        <Camera className="m-auto" width={20} height={20}/>
                    </div>
                    <div
                        className="h-32 w-32 rounded-full bg-cover absolute flex top-1/4 flex-1 left-1 items-center "
                        style={{backgroundImage: `url('${avatarUrl}')`}}
                        {...getRootAvatarProps()}
                    >
                        <input {...getInputAvatarProps()} />
                        <Camera className="m-auto" width={20} height={20}/>
                    </div>

                    <Grid item xs={6}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Nombre"
                            value={formData.name}
                            onChange={handleChange('name')}
                            name="name"
                            autoComplete="name"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            fullWidth
                            id="surnames"
                            label="Apellidos"
                            value={formData.surnames}
                            onChange={handleChange('surnames')}
                            name="surnames"
                            autoComplete="surnames"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            fullWidth
                            id="biography"
                            name="biography"
                            value={formData.biography}
                            autoComplete="biography"
                            label="Biografía"
                            onChange={handleChange('biography')}
                            multiline
                        />
                    </Grid>
                    {/*<div className=" justify-center ml-5">
                     Biografiá:
                     <ContentEditable
                     className="w-full h-full border-none bg-white rounded"
                     style={{textOverflow: "break-word", maxWidth: 530}}
                     placeholder="¿Que estas pensando?"
                     html={formData.biography}
                     defaultValue={formData.biography}
                     onChange={(e) => (formData.biography = e.target.value)}
                     />
                     </div>*/}
                    <Grid item xs={6}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            fullWidth
                            id="webSite"
                            label="Sitio web"
                            value={formData.webSite}
                            onChange={handleChange('webSite')}
                            name="webSite"
                            autoComplete="webSite"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="standard"
                            margin="normal"
                            fullWidth
                            id="location"
                            label="Ubicación"
                            value={formData.location}
                            onChange={handleChange('location')}
                            name="location"
                            autoComplete="location"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button sx={{mt: 0, p: 2}} onClick={onSubmit}>
                            {loading ? (
                                <div className="w-12 h-12 border-8 border-yellow-400 rounded-full loader"/>
                            ) : (
                                "Actualizar"
                            )}
                        </Button>
                    </Grid>
                </Grid>
            </Dialog>
        </>
    )

}

function initialValue(user) {
    return {
        name: isEmpty(user?.name) ? "" : user.name,
        surnames: isEmpty(user?.surnames) ? "" : user.surnames,
        biography: isEmpty(user?.biography) ? "" : user.biography,
        location: isEmpty(user?.location) ? "" : user.location,
        webSite: isEmpty(user?.webSite) ? "" : user.webSite,
    };
}
