import { useForm } from 'react-hook-form'
import { useList } from '../../contexts/list/useList'

export default function CreateListModal({ isOpen, setIsOpen, setShowLists }) {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createList, loading, getLists } = useList()

    const onSubmit = async (data) => {
        try {
            await createList(data)
            getLists()
            setShowLists(true)
            setIsOpen(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {isOpen &&
                <div>
                    {loading && <h1>Loading...</h1>}
                    <button onClick={() => setIsOpen(false)}>Return</button>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            placeholder="List name..."
                            {...register("name", { required: "Name must be at least 3 characters" })} />
                        {errors.name && <p>{errors.name.message}</p>}

                        <button type="submit">Create</button>
                    </form>
                </div>
            }
        </>
    )
}