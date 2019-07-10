const nl = require('nodeload');


let loadtest = nl.run({
    host: 'localhost',
    port: 8002,
    timeLimit: 60,
    targetRps: 500,
    requestGenerator: function(client) {
        let request = client.request('GET', "/v1/" + Math.floor(Math.random()*10000));
        request.end();
        return request;
    }
});
loadtest.on('end', () => { 
    console.log('Load test done.');
});