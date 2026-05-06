import { useState } from "react"

export default function AgeFilter({ age, setSearchParams }) {

    const AGES = [0, 3, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

    const [range, setRange] = useState(AGES.findIndex(a => a === age))

    const setAge = (age) => setSearchParams(prev => {
        prev.set('age', age)
        return prev
    })

    return (
        <div>
            <label htmlFor="age">Age Rating</label>
            <p>+{AGES[range]}</p>
            <input
                type="range"
                id="age"
                min={0}
                max={AGES.length - 1}
                value={range}
                onChange={(e) => setRange(Number(e.target.value))}
                onMouseUp={() => setAge(AGES[range])}
                onTouchEnd={() => setAge(AGES[range])}
            />
        </div>
    )
}