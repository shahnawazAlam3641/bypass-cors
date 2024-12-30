const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.post("/api", async (req, res) => {
  try {
    const { url } = req.body;

    console.log(url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is Up",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
