import Users from "../models/Users.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["name", "email", "gender", "phone_number"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["name", "email", "gender", "phone_number"],
      where: {
        id: req.params.id,
      },
    });
    if (!response) return res.status(404).json({ msg: "User Tidak Di Temukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const name = `${req.body.first_name} ${req.body.last_name}`;
  const { email, password, confPassword, gender, phone_number } = req.body;
  if (password !== confPassword) return res.status(400).json({ msg: "Password Dan Confirm Password Tidak Sesuai" });
  const isEmailTaken = await Users.findOne({
    where: {
      email: email,
    },
  });
  if (isEmailTaken) return res.status(400).json({ msg: "Email Ini Sudah Terdaftar" });
  const hashPassword = await argon2.hash(password);

  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      gender: gender,
      phone_number: phone_number,
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Di Temukan" });
  const name = `${req.body.first_name} ${req.body.last_name}`;
  const { password, confPassword, gender, phone_number } = req.body;

  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword) return res.status(400).json({ msg: "Password Dan Confirm Password Tidak Sesuai" });

  let email = req.body.email;
  if (email === "" || email === null) {
    email = user.email;
  } else {
    const isEmailTaken = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (user.email !== email) {
      if (isEmailTaken) return res.status(400).json({ msg: "Email Ini Sudah Terdaftar" });
    }
  }

  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        gender: gender,
        phone_number: phone_number,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Tidak Di Temukan" });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
