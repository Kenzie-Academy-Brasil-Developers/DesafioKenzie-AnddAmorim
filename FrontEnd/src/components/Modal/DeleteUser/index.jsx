import { useContext } from "react"
import { UserContext } from "../../../providers/userProvider"
import { useForm } from "react-hook-form"
import styles from "./style.module.scss"

export const DeleteUserModal = ({ closeModal, user }) => {
    const { deleteUser } = useContext(UserContext)

    const handleDelete = async () => {
        await deleteUser(user.id)
        closeModal()
    }

    return (
        <div className={styles.divModalContainer} role="dialog">
            <div className={styles.divModalTitle}>
                <h2 className="title3">Tem certeza que quer deletar o usuário?</h2>
                <button onClick={closeModal}>X</button>
            </div>
            <div className={styles.divDeleteButton}>
            <button onClick={closeModal} className={`${styles.noButton} paragraph`}>Não, voltar</button>
            <button onClick={handleDelete} className={`${styles.yesButton} paragraph`}>Sim deletar!</button>
            </div>
        </div >
)
}