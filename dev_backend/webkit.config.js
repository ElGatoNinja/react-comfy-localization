var path = require('path');

module.exports = {
    devServer:{
        componentBase: path.join(__dirname,'dist'),
        compress:false,
        port:3001,
        before: function(app, server, compiler) {
            app.post('/comfy-backend',(req,res) => {
                //input example: {"entryId":"superId","lang": "en","newString":"super identification"}
                let response = res.body.json();
                console.table(response);
                updateEntry(response.entryId, response.lang, response.newString);
            })
        }
    }
}


function updateEntry (entryId,language,newString) {

}