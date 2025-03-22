const express = require("express");
const {
  loginController,
  registerController,
  verifyController,
  verify_resend,
} = require("../controllers/auth.controller");
const { getCategory } = require("../controllers/category.controller");
const {
  orderPlacement,
  adminOrder,
  orderShowingAdmin,
  orderAccept,
  orderShowingUser,
} = require("../controllers/order.controller");
const {
  addBlanceController,
  blanceController,
  showBlanceController,
  rejectBlance,
  singleBlance,
} = require("../controllers/addblance");
const { getAllUsers } = require("../controllers/user.controller");
const publicRouter = express.Router();

// public routes
publicRouter.post("/register", registerController);
publicRouter.post("/verify", verifyController);
publicRouter.post("/verify&resend", verify_resend);
publicRouter.post("/login", loginController);

// private routes
publicRouter.get("/category", getCategory);
publicRouter.post("/orderPlacement", orderPlacement);
publicRouter.post("/adminOrder", adminOrder);
publicRouter.get("/orderShowingAdmin", orderShowingAdmin);
publicRouter.post("/orderShowingUser", orderShowingUser);
publicRouter.post("/orderAccept", orderAccept);

// blance route
publicRouter.post("/blance", addBlanceController); //user ad blance
publicRouter.get("/blanceShow", showBlanceController); //admin show
publicRouter.post("/blanced", blanceController); //admin approve blance
publicRouter.delete("/rejectBlance", rejectBlance); //admin approve blance
publicRouter.post("/singleBlance", singleBlance); //admin approve blance
// all user
publicRouter.get("/users", getAllUsers);
// error middleware

publicRouter.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({ message: err.message });
  }
  next();
});

module.exports = publicRouter;
