import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
    return (
        <div className="flex h-full items-center space-x-4 text-5xl justify-center">
            <AiOutlineLoading3Quarters className="animate-spin" />
            <p>Loading...</p>
        </div>
    )
}