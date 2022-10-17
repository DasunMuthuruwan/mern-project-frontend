import axios from "axios"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
// Icon
import { TrashIcon } from '@heroicons/react/24/solid'
// Date
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const deleteHandler = async () => {
        await axios.delete('/api/workouts/' + workout._id).then((response) => {
            if (response.status === 200) {
                dispatch({ type: 'DELETE_WORKOUT', payload: response })
            }
        }).catch((err) => {
            console.log(err.message);
        })
    }

    return (
        <div>
            <ul key={workout._id} className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4 border-b border-blue-500 cursor-pointer hover:border-red-500 duration-500">
                    <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                            <p className="capitalize hover:uppercase dark:text-purple-600 text-md font-medium truncate">
                                {workout.title}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                <strong>Reps: </strong>{workout.reps}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                <strong>Load: </strong>{workout.load}(KG)
                            </p>
                            <p className="decoration-sky-500/30 dark:text-white text-sm font-normal">
                                {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            <button onClick={deleteHandler} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-2.5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"><TrashIcon className="h-5 w-5 text-blue-500" /></button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default WorkoutDetails