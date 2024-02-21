import { ContactsContext } from "../../../providers/contactsProvider"
import { useForm } from 'react-hook-form';
import { Input } from "../../Input/input";
import { useContext } from "react";
import styles from "./style.module.scss"

export const CreateContactModal = ({ closeModal }) => {
    const { addContacts } = useContext(ContactsContext)

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const submit = async (formData) => {
        await addContacts(formData)
        closeModal()
    }

    return (
        <div className={styles.divModalContainer} role="dialog">
            <div className={styles.divModalTitle}>
                <h2 className="title3">Cadastrar Contatos</h2>
                <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit(submit)}>
                <div className={styles.divModalInputs}>
                    <Input
                        label="Nome"
                        type="text"
                        placeholder="Insira aqui o nome."
                        {...register("name")}
                        error={errors.name} />

                    <Input
                        label="Email"
                        type="text"
                        placeholder="Insira aqui o email"
                        {...register("email")}
                        error={errors.email} />

                    <Input
                        label="Telefone"
                        type="text"
                        placeholder="Insira aqui o telefone"
                        {...register("telephone")}
                        error={errors.telephone} />

                    <div className={styles.divRegisterButton}>
                        <button type="submit" className="paragraph">Cadastrar Contato</button>
                    </div>

                </div>
            </form>
        </div>
    )
}