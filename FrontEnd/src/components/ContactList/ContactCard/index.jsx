import { useContext, useState } from "react"
import { ImPencil } from "react-icons/im"
import { PiTrash } from "react-icons/pi"
import { ContactsContext } from "../../../providers/contactsProvider"
import { EditContactModal } from "../../Modal/EditContactModal"
import styles from "./style.module.scss"

export const ContactCard = ({ contact, updateContactList }) => {
    const { deleteContacts } = useContext(ContactsContext)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleDeleteContact = async () => {
        await deleteContacts(contact.id)
    }

    return (
        <li>
            <div className={styles.divContainer}>
                <div className={styles.divTitle}>
                    <h2 className="title3">{contact?.name}</h2>
                </div>
                    
                
                <div className={styles.divPhone}>
                    <p className="headline">{contact?.telephone}</p>
                </div>
                <div className={styles.divButtons}>
                    <p className="headline">{contact?.email}</p>
                    <button onClick={() => { handleOpenModal() }} title="Editar contatos" aria-label="edit">
                        <ImPencil size={15} />
                    </button>
                    {isModalOpen ? (
                        <EditContactModal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            closeModal={handleCloseModal}
                            contact={contact}
                            updateContactList={updateContactList}
                        />
                    ) : null}
                    <button onClick={handleDeleteContact} title="Remover contatos" aria-label="remove">
                        <PiTrash size={19} />
                    </button>

                </div>
            </div>
        </li>
    )
}