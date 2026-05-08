import { useForm } from 'react-hook-form'
import { useList } from '../../contexts/list/useList'
import ModalBase from '../ui/ModalBase'

export default function CreateListModal({ isOpen, setIsOpen, setShowLists }) {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createList, loading, getLists } = useList()

    const handleReturn = () => {
        setShowLists(true)
        setIsOpen(false)
    }

    const onSubmit = async (data) => {
        try {
            await createList(data)
            getLists()
            handleReturn()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {isOpen &&
                <>
                    <ModalBase
                        handleClose={() => setIsOpen(false)}
                        handleReturn={handleReturn}
                    >
                        {loading && <h1>Loading...</h1>}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="text"
                                placeholder="List name..."
                                {...register("name", { required: "Name must be at least 3 characters" })} />
                            {errors.name && <p>{errors.name.message}</p>}

                            <button type="submit">Create</button>
                        </form>
                    </ModalBase>
                </>
            }
        </>
    )
}