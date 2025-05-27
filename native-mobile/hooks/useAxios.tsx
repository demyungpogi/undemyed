import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import { router } from 'expo-router';
import { PostParams, PostResponse } from '@/entities/api.types';
import ENV from '@/constants/ENV';
import { INVALID_INDEX } from '@/constants/AppConstants';

/**
 * Docu: Axios function to send post request to the backend services.
 * @param url 
 * @param params
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sendPost(url: string, params: PostParams | any, hasToken?:boolean) {
    let response: PostResponse = { status:false, error: null };

    try {
        const token = hasToken ? await SecureStore.getItemAsync(ENV.TOKEN_KEY!) : "";
        const refresh_token = hasToken ? await SecureStore.getItemAsync(ENV.REFRESH_KEY!) : "";
        axios.defaults.headers.common['Authorization'] = hasToken ? `Bearer ${token} ${refresh_token}` : "";
        const { data } = await axios.post(`${ENV.API_URL}/${url}`, { ...params });

        if(!data.status){
            console.log(JSON.stringify(data));
            /* If users access token has already expired after API request, it will do recursive to update the access token. */
            if(data.error === "Access Token Expired"){
                await SecureStore.setItemAsync(ENV.TOKEN_KEY!, data.result);
                return await sendPost(url, params, hasToken);
            }
            /* If Refresh Token is expired this will logout user automatically. */
            else if(data.error === "Please Login"){ 
                /* TODO: If refresh token has already expired, logout the user, then redirect to login screen */
                router.replace("/(auth)/login");
            }
        }

        response = data;
    }
    catch (error) {
        console.log("Error in sendPost:", error);
        response.error = error;
    }

    return response;
}

/**
 * DOCU: Use Fetch API to perform GET requests
 * @param url 
 * @param params 
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchGet(url: string, params: any) {
    let data: unknown = {};
    const request_params = new URLSearchParams(params).toString()
    const request_uri = url + ((url.indexOf("?") > INVALID_INDEX) ? "&" : "?") + request_params;
    
    try{
        await fetch(request_uri)
            .then(response => response.json())
            .then(request_json => {
                data = request_json;
            }).catch((request_error) => {
                console.log("Error in fetchRequest: " + request_error);
            });
    } 
    catch (error) {
        throw new Error("Error in fetchGet: " + error);
    }
    finally {
        // eslint-disable-next-line no-unsafe-finally
        return data;
    }
}