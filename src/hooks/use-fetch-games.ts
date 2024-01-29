import { useState, useEffect } from 'react'

const useFetchGames = () => {
  const [backendData, setBackendData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    fetch('/api/get-frames')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        if (data.success && data.backendData) {
          setBackendData(data.backendData)
        } else {
          throw new Error('Invalid data structure')
        }
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return { backendData, isLoading, error }
}

export default useFetchGames
