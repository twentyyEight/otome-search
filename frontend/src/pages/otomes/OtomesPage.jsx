import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from '../../components/ui/Loading'
import Error from '../../components/ui/Error'
import Pagination from '../../components/ui/Pagination'
import useOtomes from '../../hooks/otomes/useOtomes'
import useSchema from "../../hooks/useSchema";
import { useAuth } from "../../contexts/auth/useAuth";
import OtomesFilter from "../../components/otomes/filters/OtomesFilter";
import ListsModal from '../../components/list/ListsModal'

export default function OtomesPage() {

    const { isAuth } = useAuth()
    const { otomes, total, loading: loading_otome, error: error_otome } = useOtomes()
    const { schema, loading: loading_schema, error: error_schema } = useSchema()

    const [otomeId, setOtomeId] = useState(null)
    const [openModal, setOpenModal] = useState(false)

    if (loading_otome || loading_schema) return <Loading />
    if (error_otome || error_schema) return <Error />

    const handleModalList = (id) => {
        setOtomeId(id)
        setOpenModal(true)
    }

    return (
        <>
            <div>
                <OtomesFilter schema={schema.enums} />

                {otomes.map((otome) => (
                    <div key={otome.id}>
                        <Link to={`${otome.id}`}>
                            <img src={otome.image?.url} alt={otome.title} />
                            <p>{otome.title}</p>
                        </Link>
                        {isAuth && <button onClick={() => handleModalList(otome.id)}>Add to list</button>}
                    </div>

                ))}

                {total > 1 && <Pagination total={total} />}
            </div>
            {isAuth && <ListsModal isOpen={openModal} setIsOpen={setOpenModal} otome_id={otomeId} />}
        </>
    )
}