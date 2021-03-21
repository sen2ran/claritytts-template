var versionNumber = "1.0.0"
var isLive = true

if(isLive) {
    console.log = function () { };
}

var BASE_URL = "https://newb2b.uat5.tltid.com/api"

if(isLive){
    versionNumber = "1.0.0"
    BASE_URL = "https://newb2b.uat5.tltid.com/api"
}
else {
    versionNumber = "1.0.0.1"
    BASE_URL = "https://newb2b.uat5.tltid.com/api"
}

export default{
    versionNumber: versionNumber,
    BASE_URL: BASE_URL
}
