async function fetchGamesData() {
  const response = await fetch('http://localhost:3000/api/get-frames')
  if (!response.ok) {
    throw new Error('Failed to fetch games data')
  }
  return response.json()
}

export default fetchGamesData
