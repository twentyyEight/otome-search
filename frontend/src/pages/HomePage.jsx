import useImages from "../hooks/useImages"
import Carousel from "../components/Home/Carousel"
import Error from "../components/Error"
import Loading from "../components/Loading"

export default function HomePage() {

    const { images, loading, error } = useImages()

    return (
        (!error ?
            <>
                {!loading ?
                    <>
                        <Carousel images={images[0]} />
                        <Carousel images={images[1]} />
                        <Carousel images={images[2]} />
                    </>
                    :
                    <Loading />
                }
            </>
            :
            <Error />
        )
    )
}