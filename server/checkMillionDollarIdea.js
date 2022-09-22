const checkMillionDollarIdea = (req, res, next) => {
    const numWeeks = req.body.numWeeks;
    const weeklyRevenue = req.body.weeklyRevenue;
    const total = numWeeks * weeklyRevenue;
    if (!Number(numWeeks) || !Number(weeklyRevenue) || total < 1000000){
        res.status(400).send('Idea is not worth it');
    } else {
        next();
        
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
