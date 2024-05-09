const Users = require("../Modal/user.modal");
const validator = require("validator");

module.exports.submitForm = async (req, res) => {
  try {
    const { name, email, mobileno, designation, gender, course } = req.body;
    const image = req.file.filename;

    if (!name || !email || !designation || !gender || !course || !image) {
      return res.status(400).json({
        msg: "All fields are required",
      });
    }

    const nameCheck = await Users.findOne({ name });
    if (nameCheck) {
      return res.status(404).json({
        msg: "Username alredy exists",
      });
    }

    const emailcheck = await Users.findOne({ email });
    if (emailcheck) {
      return res
        .status(400)
        .json({ msg: "User Email alredy exists", data: emailcheck });
    }

    const emailvalidation = validator.isEmail(email);
    if (!emailvalidation) {
      return res.status(400).json({
        msg: "Email format is not correct ,Please provide a correct email",
      });
    }

    const newUser = new Users({
      name,
      email,
      mobileno,
      designation,
      gender,
      course,
      image,
    });
    await newUser.save();
    return res.status(200).json({
      msg: "User saved to server",
      data: savedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    return res.status(200).json({
      msg: "All users fetched successfully",
      data: users,
    });
  } catch (err) {
    console.log("Internal server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.getUsersById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    res.status(200).json({
      msg: "User found",
      data: user,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports.getUserByIdDelete = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findByIdAndDelete(userId);
    if (!userId) {
      return res.status(404).json({
        msg: "User not found",
      });
    }
    return res.status(200).json({
      msg: "User deleted succesfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Inetrnal server error",
    });
  }
};

module.exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, mobileno, designation, gender, course } = req.body;
    let image = req.file

    if(!name || !email ||!mobileno || !designation || !gender || !course){
      return res.status(400).json({
        msg:"all fields are important"
      })
    }

    const originalUser = await Users.findById(userId);

    if (!originalUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    originalUser.name = name || originalUser.name
    originalUser.email = email || originalUser.email
    originalUser.mobileno = mobileno || originalUser.mobileno
    originalUser.designation = designation || originalUser.designation
    originalUser.gender = gender || originalUser.gender
    originalUser.course = course || originalUser.course
    if (image) {
      originalUser.image = image;
    }

    const updatedUser = await originalUser.save();

    return res.status(200).json({
      msg: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

