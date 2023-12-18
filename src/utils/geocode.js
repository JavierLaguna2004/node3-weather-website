const request=require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=93c5a7b2a217874d9fe08e915b847340&query=' + address;

    request({ url, json: true }, (error,{body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (!body || body.data === undefined || body.data.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            // Si no hay errores y se encuentran datos (data), se llama al callback con las coordenadas.
            const latitude = body.data[0].latitude;
            const longitude = body.data[0].longitude;
            const location=body.data[0].label
            console.log("Latitude = " + latitude + ", longitude = " + longitude);

            const data = {
                latitude,
                longitude,
                location:location
            };

            callback(undefined, data);
        }
    });
};

module.exports=geocode;
