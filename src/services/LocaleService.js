import { _, locale, addMessages } from 'svelte-i18n'
import { CookieStorage } from 'cookie-storage'

const COOKIE_KEY_LOCALE = 'appLocale';

const enLocale = {
    name: 'en',
    display: 'English'
}

const taLocale = {
    name: 'ta',
    display: 'தமிழ்'
}

const locales = [enLocale, taLocale]
const defaultLocale = enLocale;

const normalizeLocale = (localeParam) => {
    let foundLocale = locales.find((localeObj) => localeObj.name === localeParam);
    return foundLocale ? foundLocale.name : defaultLocale.name;
}

const getLocale = () => {
    const cookieStorage = new CookieStorage();
    const localeParam = normalizeLocale(cookieStorage.getItem(COOKIE_KEY_LOCALE));
    cookieStorage.setItem(COOKIE_KEY_LOCALE, localeParam);
    return localeParam;
};

const setLocale = (localeParam) => {
    const cookieStorage = new CookieStorage();
    let normalizedLocale = normalizeLocale(localeParam);
    if(normalizedLocale === localeParam) {
        cookieStorage.setItem(COOKIE_KEY_LOCALE, localeParam);
    }
}

export {
    enLocale,
    taLocale,
    _,
    locale,
    locales,
    getLocale,
    setLocale,
    addMessages
}