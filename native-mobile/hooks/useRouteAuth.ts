import { router } from 'expo-router';

/**
 * DOCU: This hook is used to check the authentication token on app startup.
 *       It will redirect the user to the home tab if the token is valid.
 *       Otherwise, it will redirect the user to the login screen.
 * Last Updated at: Sept 26, 2024 <br>
 * @author Jadee
 */
export const useLoadAuth = () => {
    /* TODO: Check authentication token then redirect the user */
    router.replace('(tabs)/home');
}