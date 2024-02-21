import { useContext, useEffect } from "react"
import { UserContext } from "../../../providers/userProvider"
import { useForm } from "react-hook-form"
import { Input } from "../../Input/input"
import styles from "./style.module.scss"

export const EditUserModal = ({ closeModal, user }) => {

    const { editUser } = useContext(UserContext)

    const { register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm()


    useEffect(() => {
        setValue("name", user ? user.name : "");
        setValue("telephone", user ? user.telephone : "");
        setValue("email", user ? user.email : "");
    }, [user, setValue]);

    const submit = async (formData) => {
        await editUser(user.id, formData)
        closeModal()
    }

    return (
        <div className={styles.divModalContainer} role="dialog">
            <div className={styles.divModalTitle}>
                <h2 className="title3">Meus Dados</h2>
                <button onClick={closeModal}>X</button>
            </div>
            <form onSubmit={handleSubmit(submit)}>
                <div className={styles.divModalInputs}>
                    <Input
                        label="Nome"
                        type="text"
                        placeholder={user.name}
                        {...register("name")}
                        error={errors.name} />

                    <Input
                        label="Telefone"
                        type="text"
                        placeholder={user.telephone}
                        {...register("telephone")}
                        error={errors.telephone} />

                    <Input label="Email"
                        type="text"
                        placeholder={user.email}
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