const shortid = require('shortid');
const URL = require('../model/shortUrl');
const { getUser } = require('../service/auth');

async function handleNewShortUrl(req,res){
    const body = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    if(!body.url ) return res.status(400).json({err: "Body cannot be Empty"});

    const user = getUser(token)
    const newShortId = shortid(body)

    await URL.create({
        shortId: newShortId,
        redirectUrl: body.url,
        userId: user.id,
        visitHistory: []
    })

    res.json({id : newShortId});

}

async function handleAnalytic(req,res){
    const shortId = req.params.shortId;

    const entry = await URL.findOne({shortId});

    return res.json({
        totalClick : entry.visitHistory.length,
        analytics : entry.visitHistory
    })
}

module.exports = {
    handleNewShortUrl,
    handleAnalytic
}