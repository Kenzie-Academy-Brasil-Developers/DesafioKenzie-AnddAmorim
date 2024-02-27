import { useContext, useState } from 'react';
import { UserContext } from './../../providers/userProvider';
import { ContactList } from '../../components/ContactList';
import { EditUserModal } from './../../components/Modal/EditUserModal/index';
import { ImPencil } from "react-icons/im"
import { PiTrash } from "react-icons/pi"
import styles from "./style.module.scss"
import logoImg from "../../../assets/agenda.png"
import { DeleteUserModal } from '../../components/Modal/DeleteUser';


export const DashboardPage = () => {

    const { user, deleteUser, logout } = useContext(UserContext)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleDeleteUser = async () => {
            await deleteUser(user.id)
            handleCloseDeleteModal()
        
        
    }

    return (
        <>
            <header className="container">
                <div className={styles.divHeader}>
                    <div className={styles.divLogo}>
                        <img className={styles.logoImage} src={logoImg} alt="logo agenda" />
                        <h1 className={styles.logoText}> My Virtual Contacts</h1>
                    </div>
                    <button className={styles.headerButton} onClick={logout}>Sair</button>
                </div>
            </header>
            <div className={styles.divBorder}>
                <div className="container">
                    <div className={styles.divUser}>
                        <h1 className="title1">Olá, {!user ? "carregando" : user.name}</h1>
                        <p className="headline">{!user ? "carregando" : user.telephone}</p>
                        <p className="headline">{!user ? "carregando" : user.email}</p>
                        <div className={styles.divButton}>
                            <button onClick={() => { handleOpenModal() }} title="Editar meus dados" aria-label="edit">
                                <ImPencil size={15} />
                            </button>
                            {isModalOpen ? (
                                <EditUserModal
                                    isModalOpen={isModalOpen}
                                    setIsModalOpen={setIsModalOpen}
                                    closeModal={handleCloseModal}
                                    user={user}
                                />
                            ) : null}
                            <button onClick={() => { handleOpenDeleteModal() }} title='Deletar usuário' aria-label='delete'>
                                <PiTrash size={20} />
                            </button>
                            {isDeleteModalOpen ? (
                                <DeleteUserModal
                                    isDeleteModalOpen={isDeleteModalOpen}
                                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                                    closeModal={handleCloseDeleteModal}
                                    user={handleDeleteUser}
                                />
                            ) : null}

                        </div>

                    </div>
                </div>
            </div>

            <div>
                <ContactList />
            </div>
        </>
    )
}