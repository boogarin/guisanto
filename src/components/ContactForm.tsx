import {
  IconUser,
  IconMail,
  IconAlertSquareRounded,
  IconMessage,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSound from "use-sound";
import { useSoundStore } from "../store/useSoundStore";
import { useTranslations } from "next-intl";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { volume } = useSoundStore();
  const [sent] = useSound("/sent.mp3", { volume: 0.3, soundEnabled: volume });
  const [play] = useSound("/click.mp3", { volume: 0.4, soundEnabled: volume });

  const t = useTranslations("Contact");

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erro no envio");

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Não foi possível enviar sua mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div className="relative" layout>
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            layout
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Nome */}
            <div className="flex flex-col mb-2">
              <div className="flex gap-2 items-center mb-1.5">
                <IconUser className="dark:text-[#FFFFFF85]" size={18} />
                <span className="font-semibold text-[#4B4B4C] dark:text-[#FFFFFF85] mt-0.5">
                  {t("name")}
                </span>
              </div>
              <input
                className="cursor-none p-3 bg-[#f1f1f1] dark:bg-[#373739] font-semibold text-[#8850ff] outline-none rounded-lg"
                aria-label="Nome"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="flex justify-end gap-2 items-center mt-2 -mb-4 text-sm text-red-700 dark:text-[#ec7373]">
                  <IconAlertSquareRounded size={16} />
                  {t("requiredName")}
                </span>
              )}
            </div>

            {/* E-mail */}
            <div className="flex flex-col mb-2.5">
              <div className="flex gap-2 items-center mb-1.5">
                <IconMail className="dark:text-[#FFFFFF85]" size={18} />
                <span className="font-semibold mb-1 text-[#4B4B4C] dark:text-[#FFFFFF85] mt-1">
                  {t("email")}
                </span>
              </div>
              <input
                type="email"
                className="cursor-none p-3 bg-[#f1f1f1] dark:bg-[#373739] text-[#4B4B4C] dark:text-[#FFFFFF90] outline-none rounded-lg"
                aria-label="E-mail"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t("invalidEmail"),
                  },
                })}
              />
              {errors.email && (
                <div className="flex justify-end gap-2 items-center mt-2 -mb-4 text-sm text-red-700 dark:text-[#ec7373]">
                  <IconAlertSquareRounded size={16} />
                  {errors.email.message || t("requiredEmail")}
                </div>
              )}
            </div>

            {/* Mensagem */}
            <div className="flex flex-col">
              <div className="flex gap-2 items-center mb-1.5">
                <IconMessage className="dark:text-[#FFFFFF85]" size={18} />
                <span className="font-semibold text-[#4B4B4C] dark:text-[#FFFFFF85] mt-0.5">
                  {t("message")}
                </span>
              </div>{" "}
              <textarea
                className="cursor-none p-3 bg-[#f1f1f1] dark:bg-[#373739] text-[#4B4B4C] dark:text-[#FFFFFF90] outline-none resize-none h-40 rounded-lg"
                aria-label="Mensagem"
                {...register("message", {
                  required: true,
                  minLength: {
                    value: 20,
                    message: t("minMessage"),
                  },
                })}
              />
              {errors.message && (
                <span className="flex justify-end gap-2 items-center mt-2 text-sm text-red-700 dark:text-[#ec7373]">
                  <IconAlertSquareRounded size={16} />
                  {errors.message.message || t("requiredMessage")}
                </span>
              )}
            </div>

            <button
              type="submit"
              onClick={() => play()}
              disabled={isSubmitting}
              className={`cursor-none w-full p-5 mt-5 text-center text-white font-semibold rounded-lg transition ${
                isSubmitting
                  ? "bg-gray-400"
                  : "bg-[#6532d2] hover:bg-[#5526ba] hover:scale-102"
              }`}
            >
              {isSubmitting ? t("sending") : t("submit")}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            layout
            className="flex flex-col items-center justify-center text-center text-[#4B4B4C]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-20 h-20 text-[#8850ff] mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <motion.path
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                onAnimationComplete={() => sent()}
              />
            </svg>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
              className="text-lg dark:text-[#FFFFFF85] font-semibold"
            >
              {t("sent")}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
