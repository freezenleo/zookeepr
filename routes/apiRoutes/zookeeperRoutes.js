const router = require('express').Router();
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper } = require('../../lib/zookeepers.js');

const { zookeepers } = require('../../data/zookeepers.json');


router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    }
    else {
        res.sendStatus(404);
    }
})

router.post('/zookeepers', (req, res) => {
    //req.body is where our incoming content will be
    //set id based on what the next index of the array will be
    req.body.id = zookeepers.length.toString();

    //if any data in req.body is incorrect, send 400 error back
    if (!validateZookeeper(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    }
    else {
        // add animal to json file and zookeepers array in this function
        const animal = createNewZookeeper(req.body, zookeepers);

        res.json(animal);
    }
});

module.exports = router;