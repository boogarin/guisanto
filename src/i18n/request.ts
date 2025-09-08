import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "en-US";

  return {
    locale,
    timeZone: "UTC",
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
