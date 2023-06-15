import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { AuthContext } from "../providers/AuthProvider"

const useStudent=()=>{
    const {user}=useContext(AuthContext)
    const { isLoading:isStudentLoading, data:isStudent } = useQuery({
        queryKey: ['isStudent',user?.email],
        queryFn: async()=>{
          const res= await fetch(`http://localhost:5000/student?email=${user?.email}`)
          return res.json()
        },
      })
      return [isStudent,isStudentLoading]
}
export default useStudent