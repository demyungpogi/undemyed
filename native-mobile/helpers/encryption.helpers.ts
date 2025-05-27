import JWT from 'expo-jwt';

/**
 * DOCU: Encrypt Details. <br>.
 * Triggered: API call
 * Last Updated Date: September 17, 2024
 * @returns {string} returns the encrypted data
 * @author NoahJerreel
 */
export const encryptMobileData = (user_data: string) : string => {
    return JWT.encode({encrypted: user_data}, process.env.EXPO_PUBLIC_API_MOBILE_KEY as string);
}

/**
 * DOCU: Decrypt Details. <br>.
 * Triggered: API call
 * Last Updated Date: September 17, 2024
 * @returns {string} returns the decrypted data
 * @author NoahJerreel
 */
export const decryptMobileData = (encrypted_data: string) => {
    const { encrypted } = JWT.decode(`${encrypted_data}`, process.env.EXPO_PUBLIC_API_MOBILE_KEY as string);
    return encrypted;
}