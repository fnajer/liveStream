const express = require('express'),
    router = express.Router(),
    User = require('../database/Schema').User,
    axios = require('axios'),
    config = require('../config/default');

router.get('/list',
    (req, res) => {
        axios.get(
            `http://${config.MEDIA_SERVER.URL}:${config.MEDIA_SERVER.API_PORT}/v1/vhosts/default/apps/app/streams`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Basic b21lLWFjY2Vzcy10b2tlbg==',
                }
            }
        ).then(async (response) => {
                let streams = response.data.response;
                console.log(streams);
                if (streams.length) 
                    await getStreamsInfo(res, streams);
            });
    });
 
async function getStreamsInfo(res, live_streams) {
    if(live_streams){
        let query = {$or: []};

        live_streams.forEach((stream, i) => {
            query.$or.push({stream_key : stream});
        });

        User.find(query,(err, users) => {
            if (err)
                return;
            if (users) {
                res.json(users);
            }
        });
    }
}
module.exports = router;