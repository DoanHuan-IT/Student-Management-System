import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "./eng.json";
import Vietnamese from "./vie.json";

const resource = {
    en: {
        translation: English,
    },
    vi: {
        translation: Vietnamese,
    },
};

i18n.use(initReactI18next).init({
    resources: resource,
    lng: "en",
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
