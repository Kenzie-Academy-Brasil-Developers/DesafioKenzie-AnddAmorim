import { Link } from "react-router-dom"
import { Input } from "../../components/Input/input.jsx"
import { useContext, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerFormSchema } from "../../components/Schemas/registerFormSchema.js"
import { UserContext } from "../../providers/userProvider.jsx"
import styles from "./style.module.scss"
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

export const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerFormSchema)
    })

    const { userRegister } = useContext(UserContext)

    const submit = (formData) => {
        userRegister(formData)
    }

    const seePassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <>
            <div className={`${styles.divLogo} container`}>
                <img src="/assets/agenda.png" alt="logo agenda" />
                <h1 className={styles.logoText}>My Virtual Contacts</h1>
                <div>
                    <Link className="headlineBold" to="/">Voltar</Link>
                </div>
            </div>
            <div className={`${styles.divContainer} container`}>
                <div className={styles.divTitle}>
                    <h1 className="title1">Criar uma conta nova</h1>
                    <p className="headline">É Rápido, Grátis e Fácil!</p>
                </div>
                <form onSubmit={handleSubmit(submit)}>
                    <div className={styles.divForm}>
                        <Input label="Nome"
                            type="text"
                            placeholder="Digite aqui seu nome"
                            {...register("name")}
                            error={errors.name} />

                        <Input label="E-mail"
                            type="email"
                            placeholder="Digite aqui seu email"
                            {...register("email")}
                            error={errors.email} />

                        <div className={styles.passwordInput}>
                            <div className={styles.passwordField}>
                                <Input label="Senha"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite aqui sua senha"
                                    {...register("password")}
                                    error={errors.password} />
                                <button className={styles.changePasswordButton} type="button" onClick={seePassword}>
                                    {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <Input label="Contato"
                            type="text"
                            placeholder="Opção de contato"
                            {...register("telephone")}
                            error={errors.telephone} />

                        <div className={styles.divButton}>
                            <button type="submit" className="title2">Cadastrar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}