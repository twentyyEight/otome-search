import useAllOtomes from "../hooks/useAllOtomes"

export default function OtomeList() {

    const otomes = useAllOtomes()

    return <>
        <h1>Otomes</h1>

        {otomes.map(otome => (

            <div key={otome.id}>
                <img src={otome.image.url} alt={otome.title} />
                <h2>{otome.title}</h2>
            </div>
        ))}
    </>
}