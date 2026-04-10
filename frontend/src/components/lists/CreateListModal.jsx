import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useForm } from 'react-hook-form'

export default function CreateListModal({ open, setOpen, createList, getLists, loading }) {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleClose = () => setOpen(false)

    const onSubmit = async (data) => {
        await createList(data)
        await getLists()
        handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create List</DialogTitle>

            <DialogContent>
                {loading && <h1>Loading...</h1>}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="List name..."
                        {...register("name", { required: "Name must be at least 3 characters" })} />
                    {errors.name && <p>{errors.name.message}</p>}

                    <button type="submit">Create</button>
                </form>
            </DialogContent>
        </Dialog>
    )
}