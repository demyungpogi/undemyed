import ENV from "@/constants/ENV";
import { fetchGet } from "@/hooks/useAxios";

/**
 * DOCU: THIS IS A SAMPLE API CALL
 * Fetches user data from the API.
 * 
 * @param {any} params - The parameters to be included in the request.
 * @returns {Promise} - A promise that resolves to the user data.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserData = (params: any): Promise<any> => {
    /* The URL to make the request to. */
    const request_url = ENV.API_URL + "/user";

    /* Make the GET request to the API and return the result. */
    return fetchGet(request_url, params);
}
