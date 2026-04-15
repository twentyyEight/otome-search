import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import IconButton from '@mui/material/IconButton';

import { useForm } from 'react-hook-form'
import { useContext } from 'react'

import { ListsContext } from '../../contexts/list/ListContext'

export default function CreateListModal({ setView }) {

    const { createList, loading } = useContext(ListsContext)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = async (data) => {
        const res = await createList(data)
        if (res) setView(true)
    }

    return (
        <>
            <IconButton onClick={() => setView(true)}>
                <ArrowBackIosNewRoundedIcon />
            </IconButton>

            <DialogTitle>Create List</DialogTitle>

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
        </>
    )
}