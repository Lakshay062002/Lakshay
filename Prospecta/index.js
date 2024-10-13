import express from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

//GET
app.get("/products", async (req, res) => {
    const category = req.query.category;

    try {
        const response = await axios.get("https://fakestoreapi.com/products/");
        const products = response.data;

        const filteredProducts = category
            ? products.filter(product => product.category === category)
            : products;

        res.json(filteredProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching products." });
    }
});
//POST
app.post("/products", async (req, res) => {
    const newProduct = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,
        rating: {
            rate: req.body.rating.rate,
            count: req.body.rating.count,
        },
    }
    try {
        const response = await axios.post('https://fakestoreapi.com/products/', newProduct);
        res.status(201).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding the product.' });
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
