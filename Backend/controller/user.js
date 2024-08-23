const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Session = require("../models/session");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwdwxd0qj",
  api_key: "189498858792856",
  api_secret: "ORXExbWIg1bHJqefwtTM1SISvLM",
  secure: true,
});

const Access_token = process.env.AccessToken;
const Refresh_token = process.env.RefreshToken;

exports.getAllUsers = async (req, res) => {
  const user = await User.find().select("-hashPassword -c_hashPassword");

  if (!user) {
    return res.status(400).send("User Not Found");
  }

  res.status(201).send(user);
};

exports.singUp = async (req, res) => {
  try {
    if (req.body.password !== req.body.c_password) {
      return res.status(500).send("Password and Confirm password must be same");
    }
    const user = await new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      hashPassword: bcrypt.hashSync(req.body.password, 10),
      c_hashPassword: bcrypt.hashSync(req.body.c_password, 10),
    }).save();

    if (!user) {
      return res.status(400).send("Invalid Inputs");
    }

    res.status(201).send(user);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const refresh_token_expiration = "30m";
    const access_token_expiration = "30d";

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send("User Not Found");
    }

    if (user && bcrypt.compareSync(req.body.password, user.hashPassword)) {
      const access_token = jwt.sign(
        {
          userId: user.id,
        },
        Access_token,
        {
          expiresIn: access_token_expiration,
        }
      );

      const refreshToken = jwt.sign(
        {
          user: user.id,
        },
        Refresh_token,
        {
          expiresIn: refresh_token_expiration,
        }
      );

      req.session.userId = user.id;
      req.session.username = user.username;

      await new Session({
        userId: user.id,
        email: user.email,
        Access_Token: access_token,
        Refresh_Token: refreshToken,
        ExpiresIn: refresh_token_expiration,
      }).save();

      console.log(user?.profileImage);

      res.status(201).send({
        userId: user.id,
        user: user.username,
        refresh_token: refreshToken,
        ExpiresIn: refresh_token_expiration,
        profileImage: user?.profileImage,
      });
    } else {
      res.status(500).send("Wrong Password");
    }
  } catch (err) {
    res.status(500).json({
      error: err,
      success: false,
    });
  }
};

exports.editProfile = async (req, res) => {
  const user = req.user;

  if (!req.files || !req.files.image) {
    return res.status(400).send("No image file uploaded.");
  }

  const imageFile = req.files.image;
  console.log(imageFile);

  try {
    // Upload the file buffer to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) reject(error);
        resolve(result);
      });

      stream.end(imageFile.data);
    });

    const userData = await User.findByIdAndUpdate(
      user?.user,
      {
        profileImage: uploadResult?.url,
      },
      { new: true }
    );

    userData;

    res.json({ message: "Image uploaded successfully", userData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Image upload failed.");
  }
};

exports.getMyProfile = async (req, res) => {
  const user = req?.user;

  const myProfile = await User.findOne({ _id: user?.user });

  if (!myProfile) return res.status(404).send("Profile Not Found");

  res.status(201).send(myProfile);
};

// exports.logOut = async (req, res) => {
//   try {
//     const id = req.user?.user;
//     const session = await Session.findByIdAndDelete(id);

//     if (!session) {
//       res.status(404).send("Session Not Found");
//     }

//     res.status(201).send(session);
//   } catch (err) {
//     console.error(err?.message);
//   }
// };
