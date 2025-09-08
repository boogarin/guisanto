"use client";

import { NextIntlClientProvider } from "next-intl";
import { useLocaleStore } from "../store/useLocaleStore";
import Cursor from "../components/Cursor";

import enMessages from "../../messages/en-US.json";
import ptMessages from "../../messages/pt-BR.json";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocaleStore((s) => s.locale);
  const messages = locale === "pt-BR" ? ptMessages : enMessages;

  return (
    <>
      <Cursor />
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone="America/Sao_Paulo"
      >
        {children}
      </NextIntlClientProvider>
    </>
  );
}
