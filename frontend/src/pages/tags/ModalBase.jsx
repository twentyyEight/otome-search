import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function TagModal({ title, children }) {

    const navigate = useNavigate();
    const location = useLocation();
    const background = location.state?.background

    {/* DISABLES SCROLL ON BACKGROUND */}
    useEffect(() => {
        const originalStyle = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => { document.body.style.overflow = originalStyle }
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-hidden">
            {/* overlay */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => navigate(background)}
            />

            {/* modal */}
            <div className="relative z-10 w-full max-w-xl mx-4 max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
                
                {/* header */}
                <div className="flex items-center justify-between mb-4">
                    {title !== 'Tags' && <button onClick={() => navigate(-1)}>Return</button>}
                    <h1>{title}</h1>
                    <button onClick={() => navigate(background)}>Close</button>
                </div>

                {/* content */}
                {children}
            </div>
        </div>
    );
}