import { useEffect } from "react"

export default function ModalBase({ children, handleClose, handleReturn }) {

    {/* DISABLES SCROLL ON BACKGROUND */ }
    useEffect(() => {
        const originalStyle = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => { document.body.style.overflow = originalStyle }
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-xl mx-4 max-h-[80vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">

                <div>
                    {handleReturn && <button onClick={handleReturn}>Return</button>}
                    <button onClick={handleClose}>Close</button>
                </div>

                {children}
            </div>
        </div>
    )
}