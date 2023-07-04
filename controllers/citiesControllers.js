const Cities = require('../models/citiesmodel')

const citiesControllers = {
    getAllCities: async (req, res) => {
        let cities
        let error = null

        try {
            cities = await Cities.find()
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : { cities },
            success: error ? false : true,
            error: error
        })
    },
    getOneCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null

        try {
            city = await Cities.findOne({ _id: id })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : { city },
            success: error ? false : true,
            error: error
        })
    },
    addCity: async (req, res) => {
        const { name, country, description, image, population } = req.body.data
        let city
        let error = null

        try {
            let verifyCityExist = await Cities.find({ name: { $regex: name, $options: 'i' } })
            console.log(verifyCityExist)
            if (verifyCityExist.length == 0) {
                city = await new Cities({
                    name: name,
                    country: country,
                    description: description,
                    image: image,
                    population: population
                }).save()
            } else {
                error = "The city already exists in the DB with the id: " + verifyCityExist[0]._id + "I enter by ADDCITY"
            }
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : { city },
            success: error ? false : true,
            error: error
        })
    },
    addMultiplesCities: async (req, res) => {

        let error = []
        let cities = []
     for (let city of req.body.data) {
        try {
                let verifyCityExist = await Cities.find({ name: { $regex: city.name, $options: 'i' } })
                if (verifyCityExist.length == 0) {

                    let dataCity =
                    {
                        name: city.name,
                        country: city.country,
                        description: city.description,
                        image: city.image,
                        population: city.population
                    }

                    await new Cities({
                        ...dataCity
                    }).save()
                    cities.push(dataCity)
                    console.log("in if")

                } else {
                    error.push({
                        name: city.name,
                        result: "already exists in the DB with id: " + verifyCityExist[0]._id
                    })
                }
            }
        catch (err) { error.push ({name: city.name, err}) }
        }
        res.json({
            response: error.length > 0 && cities.length === 0 ? "ERROR" : cities,
            success: error.length > 0 ? (cities.length > 0 ? "warning" : false) : true,
            error: error
        })
    },
    modifyCity: async (req, res) => {
        const id = req.params.id
        const data = req.body.data

        let city
        let error = null

        try {
            city = await Cities.findOneAndUpdate({ _id: id }, data, { new: true })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : { city },
            success: error ? false : true,
            error: error
        })
    },
    removeCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null

        try {
            city = await Cities.findOneAndDelete({ _id: id })
        } catch (err) { error = err }

        res.json({
            response: error ? "ERROR" : { city },
            success: error ? false : true,
            error: error
        })
    }
}

module.exports = citiesControllers