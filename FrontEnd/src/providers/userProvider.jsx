import { createContext, useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { api } from './../services/api.js';

export const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [contacts, setContacts] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN")
    const userId = localStorage.getItem("@userId")
    const getUser = async () => {
      try {
        const { data } = await api.get(`/users/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUser(data.user)
        setContacts(data.contacts)
        navigate("/dashboard")
      } catch (error) {
        console.log(error)
      }
    }
    if (token) {
      getUser()
    }
  }, [])

  const userRegister = async (formData) => {
    try {
      await api.post("/users", formData)
      toast.success("Conta criada com sucesso", {
        duration: 2000
      })
      navigate("/")
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log('Erro de validação:', error.response.data);
      } else {
        console.log('Erro desconhecido ao criar usuário:', error);
      }
      toast.error("Ops, Algo deu errado", {
        duration: 2000
      })
    }
  }

  const editUser = async (userId, formData) => {
    try {
      const token = localStorage.getItem("@TOKEN")
      const {data} = await api.patch(`/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(data)
      toast.success("Oba... Dados editados com sucesso")
    } catch (error) {
      console.log(error.response.data)
      toast.error("Ops, algo está errado!")
    }
  }

  const submit = async (formData) => {
    try {
      const response = await api.post("/login", formData)
      console.log("Login Response:", response)

      if (response.status === 200 || response.status === 201) {
        const data = response.data
        localStorage.setItem("@TOKEN", data.token)
        localStorage.setItem("@userId", data.user.id)
        setUser(data.user)
        console.log(data)
        
        toast.success(`Olá, ${data.user.name} seja bem-vindo`, {
          duration: 2000
        })
        navigate("/dashboard")
      }
      else {
        console.error("Unexpected response status:", response.status);
        toast.error("Ops, algo está errado. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Ops, algo está errado. Por favor, tente novamente o login.");
    }
  };



  const logout = () => {
    localStorage.removeItem("@TOKEN")
    setUser(null)
    navigate("/")
  }

  return (
    <UserContext.Provider value={{ user, setUser, userRegister, editUser, submit, logout, contacts, setContacts }}>
      {children}
    </UserContext.Provider>
  )
}