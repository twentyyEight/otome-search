import { Navigate } from "react-router-dom"
import useProfile from "../../hooks/useProfile"
import Loading from "../../components/ui/Loading"
import Error from "../../components/ui/Error"
import { useAuth } from "../../contexts/auth/useAuth"

export default function ProfilePage() {

    const { isAuth, loading: auth_loading } = useAuth()
    const { profile, loading: profile_loading, error } = useProfile()

    if (auth_loading || profile_loading) return <Loading />
    if (error) return <Error />
    if (!isAuth) return <Navigate to='/' replace />

    return (
        <>
            <h1>{profile.name}'s profile</h1>

            <div>
                {profile.lists.map(list =>
                    <div key={list._id}>
                        <h2>{list.name}</h2>

                        {list.otomes.map(otome =>
                            <div key={otome.id}>
                                <img src={otome.image?.url} alt={otome.title} />
                                <p>{otome.title}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}