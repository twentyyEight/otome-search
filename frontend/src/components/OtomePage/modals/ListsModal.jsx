import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function Lists({ open, setOpen }) {

    const handleClose = () => setOpen(false)

    return (
        <Dialog open={open} onClose={handleClose}>

            <DialogTitle>Your Lists</DialogTitle>

            <IconButton onClick={handleClose}>
                <CloseRoundedIcon />
            </IconButton>

            <DialogContent>
                <h1>Hola</h1>
            </DialogContent>

            <DialogActions>
                <button>
                    Create list
                </button>
            </DialogActions>
        </Dialog>
    )
}