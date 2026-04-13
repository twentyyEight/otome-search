import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { ListsContext } from '../../contexts/list/ListContext'

export default function CreateListModal({ open, setOpen, setOpenLists }) {

    const { createList, loading } = useContext(ListsContext)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleClose = () => {
        setOpen(false)
        setOpenLists(true)
    }

    const onSubmit = async (data) => {
        await createList(data)
        handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create List</DialogTitle>

            <IconButton onClick={handleClose}>
                <CloseRoundedIcon />
            </IconButton>

            <DialogContent>
                {loading && <h1>Loading...</h1>}

                <form onSubmit={handleSubmit(onSubmit)} id='create-list-form'>
                    <input
                        type="text"
                        placeholder="List name..."
                        {...register("name", { required: "Name must be at least 3 characters" })} />
                    {errors.name && <p>{errors.name.message}</p>}
                </form>
            </DialogContent>

            <DialogActions>
                <button type="submit" form='create-list-form'>Create</button>
            </DialogActions>
        </Dialog>
    )
}