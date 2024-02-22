import {z} from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(1, {message: "Nome obrigatório"}),

  email: z
    .string()
    .min(1, {message: "E-mail obrigatório"})
    .email({message: "Forneça um email válido"}),

  password: z
    .string()
    .min(1, {message: "Senha obrigatória"})
    .min(8, "É necessário pelo menos oito caracteres")
    .regex(/(?=.*?[A-Z])/, "É necessário pelo menos uma letra maiúscula")
    .regex(/(?=.*?[a-z])/, "É necessário pelo menos uma letra minúscula")
    .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número"),

  telephone: z
    .string()
    .min(1, {message: "Por favor forneça um numero de telefone"}),
});
