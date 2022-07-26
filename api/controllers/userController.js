const {create, getUsers, getUserById, updateUser, deleteUser, getUserByUserEmail} = require('../services/userService');
const {hashSync, genSaltSync, compareSync} = require('bcrypt');
const {sign, verify} = require('jsonwebtoken');

function base64decode(base64string) {
    let bufferObj = Buffer.from(base64string, "base64")
    let string = bufferObj.toString("utf8")

    return string
}

module.exports = {
    RegisterUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        create(body, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message: "Database connection failed."});
            }
            return res.status(201).json({message: "Successfully Created User"})
        })
    },
    getUserProfile: (req, res) => {
        const id = req.userId;
        getUserById(id, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message: error});
            }
            if (!result) {
                return res.json({message: "Data not found"});
            }
            return res.status(200).json({message: "Successfully get  User by id", data: result})
        })
    },
    getUsers: (req, res) => {
        const check = req.headers.authorization.split(' ')[1].split('.')[1];
        const data = JSON.parse(base64decode(check));
        console.log(data.result.id);
        getUsers((error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message: error});
            }
            if (!result) {
                return res.json({message: "Data not found"});
            }
            return res.status(200).json({message: "Successfully get  all services", data: result})
        })
    },
    updateUserProfile: (req, res) => {
        const body = req.body;
        body.id = req.userId;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);


        updateUser(body, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message: "Database connection failed."});
            }
            if (!result) {
                console.log("MHSLOG : result ->>  ", result);
                return res.status(500).json({message: "Failed to update user"});
            }
            return res.status(200).json({message: "Successfully Updated User", data: result})
        })
    },
    deleteUser: (req, res) => {
        const body = req.body;
        deleteUser(body, (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({message: error});
            }
            return res.status(200).json({message: "Successfully Delete User"})
        })
    },
    loginUser: (req, res) => {
        const {email} = req.body;
        getUserByUserEmail(email, (error, result) => {
            console.log("MHSLOG : errpr result ->>  ", error, result);
            if (error) {
                console.log(error);
                return res.status(500).json({message: error});
            }
            if (!result) {
                return res.status(401).json({message: "Invalid email or password"});
            }
            const comparison = compareSync(req.body.password, result.password);
            if (comparison) {
                result.password = undefined;
                const jsonwebtoken = sign({result: result}, "abcd1234", {expiresIn: "5H"});
                return res.status(200).json({message: "Success", access_token: jsonwebtoken});
            } else {
                return res.status(401).json({message: "Invalid email or password"});
            }
        })

    }
}