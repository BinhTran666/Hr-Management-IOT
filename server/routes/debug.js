import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    console.log(req.body);

    res.send("Debugging endpoint");
});

export default router;
