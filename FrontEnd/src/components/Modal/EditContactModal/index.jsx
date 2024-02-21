import { useContext, useEffect } from "react"
import { ContactsContext } from "../../../providers/contactsProvider"
import { Input } from "../../Input/input"
import { useForm } from "react-hook-form"
import styles from "./style.module.scss"

export const EditContactModal = ({ closeModal, contact }) => {

    const { editContacts } = useContext(ContactsContext)

    const { register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm()

    useEffect(() => {
        setValue("name", contact ? contact.name : "");
        setValue("telephone", contact ? contact.telephone : "");
        setValue("email", contact ? contact.email : "");
    }, [contact, setValue]);


    const submit = async (formData) => {
        await editContacts(contact.id, formData)
        closeModal()
    }

    return (
        <div className={styles.divModalContainer} role="dialog">
            <div className={styles.divModalTitle}>
                <h2 className="title3">Contatos Detalhes</h2>
                <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit(submit)}>
                <div className={styles.divModalInputs}>
                    <Input
                        label="Nome"
                        type="text"
                        placeholder={contact.name}
                        {...register("name")}
                        error={errors.name} />

                    <Input
                        label="Telefone"
                        type="text"
                        placeholder={contact.telephone}
                        {...register("telephone")}
                        error={errors.telephone} />

                    <Input label="Email"
                        type="text"
                        placeholder={contact.email}
                        {...register("email")}
                        error={errors.email} />

                    <div className={styles.divEditButton}>
                        <button className="paragraph">Salvar Alterações</button>
                    </div>
                </div>
            </form>
        </div>
    )
}