import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useState } from "react";

import ListsModal from "./ListsModal";
import CreateListModal from "./CreateListModal";

export default function ListsManager({ id, open, setOpen }) {

    const [view, setView] = useState(true)

    const handleClose = () => setOpen(false)

    return (
        <>
            <Dialog open={open} onClose={handleClose}>

                <IconButton onClick={handleClose}>
                    <CloseRoundedIcon />
                </IconButton>
                {
                    view ?
                    <ListsModal id={id} view={view} setView={setView} />
                    :
                    <CreateListModal setView={setView} />
                }
            </Dialog>
        </>
    )
}