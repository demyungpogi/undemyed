// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ENV: any = {};

/* 
 * DOCU: Get values from .env file
 * This process is necessary to obfuscate the key values in the .env file.
 */
try {
    if(process.env){
        for(const prop in process.env){
            ENV[prop] = process.env[prop];
        }
    }
}
catch (error) {
    console.log("Error in ENV: " + error);
}

export default ENV;