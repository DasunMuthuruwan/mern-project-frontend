import { useState } from "react"
import axios from 'axios'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = { title, reps, load }
        await axios.post('/api/workouts', workout).then((response) => {
            if (response.status === 200) {
                setTitle('')
                setLoad('')
                setReps('')
                setError(null)
                setEmptyFields([])
                dispatch({type: "CREATE_WORKOUT", payload: response.data})
            } else if(response.status === 422) {
                setEmptyFields(response.data.emptyFields)
                setError(error)
            }
        }).catch((err) => {
            setError(err.response.data.error)
        })
    }

    return (
        <>
            <div className="basis-1/4 p-6">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">Add a New Workout</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Exercise Title</label>
                        <input type="text" id={emptyFields.includes('title') ? "error" : ""} value={title} onChange={(e) => setTitle(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Exercise title" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="reps" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reps</label>
                        <input type="number" id={emptyFields.includes('reps') ? "error" : ""} value={reps} onChange={(e) => setReps(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Reps" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="load" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Load (KG)</label>
                        <input type="number" id={emptyFields.includes('load') ? "error" : ""} value={load} onChange={(e) => setLoad(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Load" />
                    </div>
                    <button type="submit" className="py-2 mb-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Workout</button>
                    {error && <div className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">{error}</span>
                        </div>
                    </div>}
                </form>
            </div>

        </>
    )
}

export default WorkoutForm