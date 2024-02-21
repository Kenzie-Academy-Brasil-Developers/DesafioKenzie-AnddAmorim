import { useContext, useState } from "react"
import { UserContext } from "../../providers/userProvider"
import { AiOutlinePlus } from "react-icons/ai"
import styles from "./style.module.scss"
import { CreateContactModal } from "../Modal/CreateContactModal"
import { ContactCard } from './ContactCard/index';

export const ContactList = () => {
    const { contacts } = useContext(UserContext)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="container">
            <div className={styles.divContacts}>
                <h2 className="title1">Contatos</h2>
                <div className={styles.divButton}>
                    <button onClick={handleOpenModal}><AiOutlinePlus size={14} /></button>
                </div>
            </div>
            {isModalOpen && (
                <CreateContactModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} closeModal={handleCloseModal} />
            )}
            {contacts?.length > 0 ? (
                <div className={styles.divUlCards}>
                    <ul>
                        {contacts.map(contact => (
                            <ContactCard key={contact.id} contact={contact}  />
                        ))}
                    </ul>
                </div>
            ) : (
                <div className={styles.divNoContacts}>
                    <p className="title1">Não há contatos cadastrados.</p>
                </div>
            )}
        </div>
    )
}