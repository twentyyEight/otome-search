import useVisualNovel from "../hooks/useVisualNovel"
import { replaceFormattingCode } from "../utils/replaceFormat";

export default function VisualNovelPage() {

    const { vn, loading } = useVisualNovel()

    const { title, description, developers, image } = vn

    return (
        <div>
            {loading && <h3>Loading...</h3>}

            {!loading &&
                <div className="flex-col sm:flex-row flex items-center bg-white rounded-md w-[320px] sm:w-[1000px] sm:h-fit p-5">
                    <img src={image?.url} alt="image" className="w-full sm:w-[320px] h-[400px] object-cover rounded-md" />

                    <div className="h-[400px] sm:ml-4">
                        <h1 className="lato-bold text-2xl mt-3 sm:mt-0">{title}</h1>
                        <div className="flex">
                            {developers.map(dev =>
                                <p className="text-lg mb-3" key={dev.id}>{dev.name}</p>
                            )}
                        </div>
                        <p dangerouslySetInnerHTML={{ __html: replaceFormattingCode(description) }} className="lato-light"></p>
                    </div>
                </div>
            }
        </div>
    )
}