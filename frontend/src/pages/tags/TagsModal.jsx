import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useTags from "../../hooks/tags/useTags"
import Loading from '../../components/Loading'
import Error from '../../components/Error'

export default function TagsModal() {

    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state

    const { tags, loading, error } = useTags()

    useEffect(() => {
        const originalStyle = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    if (loading) return <Loading />
    if (error) return <Error />

    const handleClose = () => {
        // vuelve atrás si vienes con background, si no redirige a /otomes
        if (location.state?.background) navigate(-1);
        else navigate("/otomes");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center h-screen">
            {/* overlay */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* modal */}
            <div className="relative z-10 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
                {/* header */}
                <div className="flex items-center justify-between mb-4">

                    <h1>Tags</h1>

                    <button onClick={handleClose}>
                        Cerrar
                    </button>
                </div>

                {/* contenido */}
                <div>
                    {tags.map(tag => (
                        <div key={tag.id}>
                            <h2>{tag.name}</h2>
                            <p>
                                {tag.description}
                            </p>

                            <div>
                                {tag.childs.map(child => (
                                    <p key={child.id}>
                                        <Link
                                            to={`${child.id}`}
                                            state={{ background: state?.background }}
                                        >
                                            {child.name}
                                        </Link>
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}