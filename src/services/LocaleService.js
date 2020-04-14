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

let getLocale = () => {
    const cookieStorage = new CookieStorage();
    const localeParam = cookieStorage.getItem(COOKIE_KEY_LOCALE) || defaultLocale.name;
    cookieStorage.setItem(COOKIE_KEY_LOCALE, localeParam);
    return localeParam;
};

let setLocale = (localeParam) => {
    const cookieStorage = new CookieStorage();
    cookieStorage.setItem(COOKIE_KEY_LOCALE, localeParam);
}

export {
    _,
    locale,
    locales,
    getLocale,
    setLocale,
    addMessages
}