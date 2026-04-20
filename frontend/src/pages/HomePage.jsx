import useImages from "../hooks/useImages"
import Carousel from "../components/HomePage/Carousel"
import Error from "../components/ui/Error"
import Loading from "../components/ui/Loading"

export default function HomePage() {

    const { images, loading, error } = useImages()

    if (loading) return <Loading />
    if (error) return <Error />

    return <>
        <Carousel images={images[0]} />
        <Carousel images={images[1]} />
        <Carousel images={images[2]} />
    </>
}