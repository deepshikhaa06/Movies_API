import axios from "axios"
const instance =axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNThlNTQxYTgzNGFiNzMzOTE3N2E1MWM1OTZlMjg5ZiIsIm5iZiI6MTcyMjg0OTM0My44MTI0NTUsInN1YiI6IjY2YWI5MTMyNzAxNjcwZTdhN2IyODdkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R9KN16lemmVnsSXhR2KhX9Sya5dSYHVgn0kWmSMJmqs'
      }
})
export default instance