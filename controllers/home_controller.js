module.exports.home = function(req,res){

//    return res.end('<h1>Express is up for Codeial!</h1>'); -------sending data to browser directly

    return res.render('home', {
        title : "Home"
    });
};