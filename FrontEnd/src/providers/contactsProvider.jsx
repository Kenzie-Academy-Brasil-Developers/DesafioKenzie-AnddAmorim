import { createContext, useContext, useState } from "react"
import { api } from "../services/api"
import { UserContext } from "./userProvider"
import { toast } from "react-hot-toast"

export const ContactsContext = createContext({})

export const ContactsProvider = ({ children }) => {
  const [contactId, setContactId] = useState("")

  const { contacts, setContacts } = useContext(UserContext)

  const addContacts = async (formData) => {
    try {
      const token = localStorage.getItem("@TOKEN")
      const {data } = await api.post("/contacts", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        setContacts((prevContacts) => [...prevContacts, data])

      toast.success("Contato criado com sucesso", {
        duration: 2000
      })
    } catch (error) {
      console.log(error)
      toast.error("Opa, erro ao criar contato")
    }
  }

  const editContacts = async (contactId, formData) => {
    try {
      const token = localStorage.getItem("@TOKEN")
      const dataToUpdate = {}

      if (formData.name !== contactId.name) {
        dataToUpdate.name = formData.name;
      }

      if (formData.telephone !== contactId.telephone) {
        dataToUpdate.telephone = formData.telephone;
      }

      if (formData.email !== contactId.email) {
        dataToUpdate.email = formData.email;
      }
      if (Object.keys(dataToUpdate).length > 0) {
        await api.patch(`/contacts/${contactId}`, dataToUpdate, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const getEditContacts = await api.get(`/contacts/${contactId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const updatedContact = getEditContacts.data.contacts
        setContacts(updatedContact)
        toast.success("Eba... Contato editado com sucesso")
      } else {
        toast.info("Nenhum campo foi alterado")
      }
    } catch (error) {
      console.log(error.response.data)
      toast.error("Ops, algo está errado!")
    }
  }

  const deleteContacts = async (contactId) => {
    try {
      const token = localStorage.getItem("@TOKEN")
      await api.delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const updatedList = contacts.filter((contact) => contact.id !== contactId)
      toast.success("Contato excluido com sucesso!")
      setContacts(updatedList)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ContactsContext.Provider value={{ addContacts, editContacts, deleteContacts, contactId, setContactId }}>
      {children}
    </ContactsContext.Provider>
  )
}