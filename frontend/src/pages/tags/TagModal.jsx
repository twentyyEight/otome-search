import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useTag from "../../hooks/tags/useTag"
import Loading from '../../components/Loading'
import Error from '../../components/Error'

export default function TagModal() {

    const { tag, loading, error } = useTag();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const originalStyle = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    const handleClose = () => {
        if (location.state?.background) navigate(-1);
        else navigate("/otomes");
    };

    if (loading) return <Loading />;
    if (error) return <Error />;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-hidden">
            {/* overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* modal */}
            <div className="relative z-10 w-full max-w-xl mx-4 max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
                {/* header */}
                <div className="flex items-center justify-between mb-4">
                    <h1>{tag.name}</h1>
                    <button onClick={handleClose}>
                        Cerrar
                    </button>
                </div>

                {/* contenido */}
                <p>{tag.description}</p>

                <h2>Child Tags</h2>
                <ul>
                    {tag.childs.map(child => (
                        <li key={child.id}>
                            <Link
                                to={`/tags/${child.id}`}
                                state={{ background: location.state.background }}
                            >
                                {child.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}