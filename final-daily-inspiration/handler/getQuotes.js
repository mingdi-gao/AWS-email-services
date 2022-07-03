const AWS = require("aws-sdk")
AWS.config.update({ region: process.env.REGION})
const s3 = new AWS.S3()

module.exports.getQuotes = (event, context, callback) => {
    console.log("Incoming:::", event);


    // get files from S3
    s3.getObject({
        Bucket: "my-quote-bucket",
        Key: "quotes.json"
    },
        function (err, data) {
            if (err) {
                console.error(err);
                callback(new Error(err))
                return;
            } else {
                let json = JSON.parse(data.Body)
                console.log(data);
                console.log("JSON:::", json)

            //create a response
            const response = {
                headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Origin": "*", 
                },
                statusCode: 200,
                body: JSON.stringify(json)
            
            }
            callback(null, response)
                
            }
        }
    )
    
}