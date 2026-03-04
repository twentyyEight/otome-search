import useOtome from "../hooks/useOtome"

export default function OtomeDetail() {

    const otome = useOtome()
    console.log(otome)

    return <h1>Otome Detail</h1>
}