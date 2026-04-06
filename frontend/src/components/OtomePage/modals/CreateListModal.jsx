import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useForm } from 'react-hook-form'

export default function CreateList() {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => signup(data)

    return (
        <Dialog>
            <DialogTitle>Create List</DialogTitle>

            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="List name..." />
                </form>
            </DialogContent>

            <DialogActions>
                <button type="submit">Create</button>
            </DialogActions>
        </Dialog>
    )
}