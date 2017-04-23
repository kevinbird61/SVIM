module.exports = {
    "login": {
        "fb_bgcolor_Hex": "#3b5998",
        "fb_bgcolor_RGB": "59,89,152"
    },
    "auth":{
        "fb":{
            "clientID": "281279502326353",
            "clientSecret": "8491a1bf6ef2e1b060baf1897a69cd37",
            "profileFields": "['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified' , 'picture.type(large)']",
            "callback": "http://140.116.245.247/auth/facebook/callback",
            "successUrl": "http://140.116.245.247/fblogin",
            "failureUrl": "http://140.116.245.247/error?type=login"
        }
    }
}
