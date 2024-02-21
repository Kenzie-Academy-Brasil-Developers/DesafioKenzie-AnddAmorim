import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../../components/Input/input.jsx"
import { UserContext } from './../../providers/userProvider.jsx';
import { loginFormSchema } from "../../components/Schemas/loginFormSchema.js"
import { Link } from "react-router-dom"
import styles from "./style.module.scss"

export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginFormSchema)
    })

    const { submit } = useContext(UserContext)

    const seePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <div className={`${styles.divLogo} container`}>
                <img src="/agenda.png" alt="logo agenda" />
                <h1 className={styles.logoText}>My Virtual Contacts</h1>
            </div>
            <div className={`${styles.divContainer} container`}>
                <div className={styles.divTitle}>
                    <h1 className="title1">Login</h1>
                </div>
                <form onSubmit={handleSubmit(submit)}>
                    <div className={styles.divForm}>
                        <Input label="Email"
                            type="email"
                            placeholder="Digite seu email"
                            {...register("email")}
                            error={errors.email} />

                        <div className={styles.passwordInput}>
                            <div className={styles.passwordField}>
                                <Input label="Senha"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    {...register("password")}
                                    error={errors.password} />
                                <button className={styles.changePasswordButton} type="button" onClick={seePassword} >
                                    {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.divAcessButton}>
                        <button type="submit" className="title2">Entrar</button>
                    </div>
                    <p className="headlineBold">Ainda não possui uma conta?</p>
                    <div className={styles.divRegisterButton}>
                        <Link className="title2" to="/register"> Cadastre-se</Link>
                    </div>
                </form>
            </div>
        </>
    )
}