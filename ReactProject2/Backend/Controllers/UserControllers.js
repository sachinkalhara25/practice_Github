const User = require('../Model/UserModel');

const getAllUsers = async (req, res, next) => {
    let users;//variable

    //Get all users from the database
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }

    //If no users found
    if(!users){
        return res.status(404).json({message: "No users found"});
    }

    //Display all users
    return res.status(200).json({users});

};

//data Insert
const addUsers = async (req, res, next) => {
    const {name, email, age, address} = req.body;

    let user;//variable
    try {
        user = new User({name,email,age,address});//create new user
        await user.save();//save user to database
    } catch (err) {
        console.log(err);
    }
    //If user not added
    if(!user){
        return res.status(500).json({message: "Unable to add user"});
    }
    //If user added successfully
    return res.status(201).json({user});
        
        
        };

    //Get by ID
    const getById = async (req, res, next) => {
        const id = req.params.id;
        let user;
        try {
            user = await User.findById(id);
        } catch (err) {
            console.log(err);
        }
        //If user not found
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        //Display user
        return res.status(200).json({user});
    }

    //update user details
    const updateUser = async (req, res, next) => {
        const id =req.params.id;
        const {name, email, age, address} = req.body;

        let user;
        try{
            user = await User.findByIdAndUpdate(id,
                {name:name, email:email, age:age, address:address}
                );
                user = await user.save();
        } catch(err){
            console.log(err);
        }
        if(!user){
            return res.status(404).json({message: "Unable to update user"});
        }
        return res.status(200).json({user});
  };

  //Delete user details
  const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    let user;
    try {
        user = await User.findByIdAndDelete(id)
    } catch (err) {
        console.log(err);
    }
    if(!user){
        return res.status(404).json({message: "Unable to delete user"});
    }
    return res.status(200).json({message: "User successfully deleted"});
  }

exports.getById = getById;
exports.addUsers = addUsers;
exports.getAllUsers = getAllUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
