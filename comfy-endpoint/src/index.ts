//this method should be called in the setup proxy in case you are using create react app 
//or include it in the webpack configuration


export const createComfyEndpoint = (_:any, res: any) => {
    res.send('comfortable hello world');
    console.log("WOOOOOORKING");
    //updateEntry(response.entryId, response.lang, response.newString);
}
