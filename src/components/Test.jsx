import { useState } from "react";
import { useForm } from "react-hook-form"
import useFetch from "../hooks/useFetch";

export default function Test() {

    const [page, setPage] = useState(1)
    const { vns, limiter, loading, addFilters } = useFetch(page)
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        addFilters(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                {/* Buscar por nombre */}
                <input
                    type="search"
                    placeholder="Busca por nombre"
                    {...register('name')} />

                {/* Buscar por plataforma */}
                <div>
                    <label htmlFor="">Windows</label>
                    <input type="checkbox" value='win' {...register('platform')} />

                    <label htmlFor="">PSP</label>
                    <input type="checkbox" value='psp' {...register('platform')} />

                    <label htmlFor="">MacOS</label>
                    <input type="checkbox" value='mac' {...register('platform')} />

                    <label htmlFor="">Android</label>
                    <input type="checkbox" value='and' {...register('platform')} />

                    <label htmlFor="">Apple</label>
                    <input type="checkbox" value='ios' {...register('platform')} />

                    <label htmlFor="">PSX</label>
                    <input type="checkbox" value='ps1' {...register('platform')} />

                    <label htmlFor="">PS2</label>
                    <input type="checkbox" value='ps2' {...register('platform')} />

                    <label htmlFor="">PS3</label>
                    <input type="checkbox" value='ps3' {...register('platform')} />

                    <label htmlFor="">PS4</label>
                    <input type="checkbox" value='ps4' {...register('platform')} />

                    <label htmlFor="">PSVita</label>
                    <input type="checkbox" value='psv' {...register('platform')} />

                    <label htmlFor="">Nintendo DS</label>
                    <input type="checkbox" value='nds' {...register('platform')} />

                    <label htmlFor="">Nintendo Switch</label>
                    <input type="checkbox" value='swi' {...register('platform')} />

                    <label htmlFor="">Website</label>
                    <input type="checkbox" value='web' {...register('platform')} />

                    <label htmlFor="">Xbox One</label>
                    <input type="checkbox" value='xbo' {...register('platform')} />

                    <label htmlFor="">Xbox X/S</label>
                    <input type="checkbox" value='xxs' {...register('platform')} />

                    <label htmlFor="">Dreamcast</label>
                    <input type="checkbox" value='drc' {...register('platform')} />

                    <label htmlFor="">Sega Saturn</label>
                    <input type="checkbox" value='sat' {...register('platform')} />

                    <label htmlFor="">Gameboy Advance</label>
                    <input type="checkbox" value='gba' {...register('platform')} />

                    <label htmlFor="">Super Famicon</label>
                    <input type="checkbox" value='sfc' {...register('platform')} />

                    <label htmlFor="">Gameboy Color</label>
                    <input type="checkbox" value='gbc' {...register('platform')} />

                    <label htmlFor="">Nintendo 3DS</label>
                    <input type="checkbox" value='n3d' {...register('platform')} />
                </div>

                {/* Buscar por dialogos con voces */}
                <div>
                    <label htmlFor="">Fully voiced</label>
                    <input type="checkbox" value='4' {...register('voice')} />

                    <label htmlFor="">Partially voiced</label>
                    <input type="checkbox" value='3' {...register('voice')} />

                    <label htmlFor="">Not voiced</label>
                    <input type="checkbox" value='1' {...register('voice')} />
                </div>

                {/* Buscar por idioma */}
                <p>Language</p>
                <div>
                    <label htmlFor="">Japanese</label>
                    <input type="checkbox" value='ja' {...register('lang')} />

                    <label htmlFor="">English</label>
                    <input type="checkbox" value='en' {...register('lang')} />

                    <label htmlFor="">Spanish</label>
                    <input type="checkbox" value='es' {...register('lang')} />

                    <label htmlFor="">French</label>
                    <input type="checkbox" value='fr' {...register('lang')} />

                    <label htmlFor="">Korean</label>
                    <input type="checkbox" value='ko' {...register('lang')} />

                    <label htmlFor="">Chinese simplified</label>
                    <input type="checkbox" value='zh-Hans' {...register('lang')} />

                    <label htmlFor="">Chinese tradicional</label>
                    <input type="checkbox" value='zh-Hant' {...register('lang')} />

                    <label htmlFor="">Russian</label>
                    <input type="checkbox" value='ru' {...register('lang')} />

                    <label htmlFor="">German</label>
                    <input type="checkbox" value='de' {...register('lang')} />

                    <label htmlFor="">Portuguese (Brazil)</label>
                    <input type="checkbox" value='pt-br' {...register('lang')} />

                    <label htmlFor="">Portuguese (Portugal)</label>
                    <input type="checkbox" value='pt-pt' {...register('lang')} />

                    <label htmlFor="">Ukrainian</label>
                    <input type="checkbox" value='uk' {...register('lang')} />

                    <label htmlFor="">Vietnamese</label>
                    <input type="checkbox" value='vi' {...register('lang')} />

                    <label htmlFor="">Arabic</label>
                    <input type="checkbox" value='ar' {...register('lang')} />

                    <label htmlFor="">Basque</label>
                    <input type="checkbox" value='eu' {...register('lang')} />

                    <label htmlFor="">Belarusian</label>
                    <input type="checkbox" value='be' {...register('lang')} />

                    <label htmlFor="">Bulgarian</label>
                    <input type="checkbox" value='bg' {...register('lang')} />

                    <label htmlFor="">Catalan</label>
                    <input type="checkbox" value='ca' {...register('lang')} />

                    <label htmlFor="">Czech</label>
                    <input type="checkbox" value='cs' {...register('lang')} />

                    <label htmlFor="">Dutch</label>
                    <input type="checkbox" value='nl' {...register('lang')} />

                    <label htmlFor="">Finnish</label>
                    <input type="checkbox" value='fi' {...register('lang')} />

                    <label htmlFor="">Greek</label>
                    <input type="checkbox" value='el' {...register('lang')} />

                    <label htmlFor="">Hindi</label>
                    <input type="checkbox" value='hi' {...register('lang')} />

                    <label htmlFor="">Indonesian</label>
                    <input type="checkbox" value='id' {...register('lang')} />

                    <label htmlFor="">Italian</label>
                    <input type="checkbox" value='it' {...register('lang')} />

                    <label htmlFor="">Macedonian</label>
                    <input type="checkbox" value='mk' {...register('lang')} />

                    <label htmlFor="">Malay</label>
                    <input type="checkbox" value='ms' {...register('lang')} />

                    <label htmlFor="">Norwegian</label>
                    <input type="checkbox" value='no' {...register('lang')} />

                    <label htmlFor="">Polish</label>
                    <input type="checkbox" value='pl' {...register('lang')} />

                    <label htmlFor="">Romanian</label>
                    <input type="checkbox" value='ro' {...register('lang')} />

                    <label htmlFor="">Tagalog</label>
                    <input type="checkbox" value='ta' {...register('lang')} />

                    <label htmlFor="">Thai</label>
                    <input type="checkbox" value='th' {...register('lang')} />

                    <label htmlFor="">Turkish</label>
                    <input type="checkbox" value='tr' {...register('lang')} />
                </div>

                {/* Buscar por idioma original */}
                <p>Original Language</p>
                <div>
                    <label htmlFor="">Japanese</label>
                    <input type="checkbox" value='ja' {...register('olang')} />

                    <label htmlFor="">English</label>
                    <input type="checkbox" value='en' {...register('olang')} />

                    <label htmlFor="">Spanish</label>
                    <input type="checkbox" value='es' {...register('olang')} />

                    <label htmlFor="">French</label>
                    <input type="checkbox" value='fr' {...register('olang')} />

                    <label htmlFor="">Korean</label>
                    <input type="checkbox" value='ko' {...register('olang')} />

                    <label htmlFor="">Chinese simplified</label>
                    <input type="checkbox" value='zh-Hans' {...register('olang')} />

                    <label htmlFor="">Chinese tradicional</label>
                    <input type="checkbox" value='zh-Hant' {...register('olang')} />

                    <label htmlFor="">Russian</label>
                    <input type="checkbox" value='ru' {...register('olang')} />

                    <label htmlFor="">German</label>
                    <input type="checkbox" value='de' {...register('olang')} />

                    <label htmlFor="">Portuguese (Brazil)</label>
                    <input type="checkbox" value='pt-br' {...register('olang')} />

                    <label htmlFor="">Portuguese (Portugal)</label>
                    <input type="checkbox" value='pt-pt' {...register('olang')} />

                    <label htmlFor="">Ukrainian</label>
                    <input type="checkbox" value='uk' {...register('olang')} />

                    <label htmlFor="">Vietnamese</label>
                    <input type="checkbox" value='vi' {...register('olang')} />

                    <label htmlFor="">Arabic</label>
                    <input type="checkbox" value='ar' {...register('olang')} />

                    <label htmlFor="">Basque</label>
                    <input type="checkbox" value='eu' {...register('olang')} />

                    <label htmlFor="">Belarusian</label>
                    <input type="checkbox" value='be' {...register('olang')} />

                    <label htmlFor="">Bulgarian</label>
                    <input type="checkbox" value='bg' {...register('olang')} />

                    <label htmlFor="">Catalan</label>
                    <input type="checkbox" value='ca' {...register('olang')} />

                    <label htmlFor="">Czech</label>
                    <input type="checkbox" value='cs' {...register('olang')} />

                    <label htmlFor="">Dutch</label>
                    <input type="checkbox" value='nl' {...register('olang')} />

                    <label htmlFor="">Finnish</label>
                    <input type="checkbox" value='fi' {...register('olang')} />

                    <label htmlFor="">Greek</label>
                    <input type="checkbox" value='el' {...register('olang')} />

                    <label htmlFor="">Hindi</label>
                    <input type="checkbox" value='hi' {...register('olang')} />

                    <label htmlFor="">Indonesian</label>
                    <input type="checkbox" value='id' {...register('olang')} />

                    <label htmlFor="">Italian</label>
                    <input type="checkbox" value='it' {...register('olang')} />

                    <label htmlFor="">Macedonian</label>
                    <input type="checkbox" value='mk' {...register('olang')} />

                    <label htmlFor="">Malay</label>
                    <input type="checkbox" value='ms' {...register('olang')} />

                    <label htmlFor="">Norwegian</label>
                    <input type="checkbox" value='no' {...register('olang')} />

                    <label htmlFor="">Polish</label>
                    <input type="checkbox" value='pl' {...register('olang')} />

                    <label htmlFor="">Romanian</label>
                    <input type="checkbox" value='ro' {...register('olang')} />

                    <label htmlFor="">Tagalog</label>
                    <input type="checkbox" value='ta' {...register('olang')} />

                    <label htmlFor="">Thai</label>
                    <input type="checkbox" value='th' {...register('olang')} />

                    <label htmlFor="">Turkish</label>
                    <input type="checkbox" value='tr' {...register('olang')} />

                </div>

                <button type="submit">search</button>
            </form>

            {
                loading ?
                    <>
                        <h3>Loading...</h3>
                    </>
                    :
                    <ul>
                        {vns.map(vn =>
                            <li key={vn.id}>{vn.title}</li>
                        )}
                    </ul>
            }

            <button onClick={() => { if (page > 1) setPage(page - 1) }}>Prev</button>
            <button onClick={() => { if (limiter) setPage(page + 1) }}>Next</button>
        </>
    )
}