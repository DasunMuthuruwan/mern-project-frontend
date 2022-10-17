import { useEffect } from "react"
import axios from "axios"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      await axios.get(`/api/workouts`)
        .then((response) => {
          dispatch({ type: 'SET_WORKOUTS', payload: response.data })
        }).catch((error) => {
          console.log(error.message);
        })
    }
    fetchWorkouts()
  }, [])

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Workout Buddy</h1>
        </div>
      </header>
      <div className="flex justify-center m-5">
        <div className="mr-5 w-full max-w-xl rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flow-root">
            {workouts.length > 0 ? workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            )) : <div className="flex p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
              <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Workout</span> not found!
              </div>
            </div>}
          </div>
        </div>
        <WorkoutForm />
      </div>
    </div>

  )
}

export default Home