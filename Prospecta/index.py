from flask import Flask, jsonify, request
import requests

app = Flask(__name__)


BASE_URL = "https://fakestoreapi.com/products"

# Task 1: GET
@app.route('/api/products/category/<string:category>', methods=['GET'])
def get_products_by_category(category):
    try:
        response = requests.get(f"{BASE_URL}/category/{category}")
        
        if response.status_code == 200:
            products = response.json()
            return jsonify(products), 200
        else:
            return jsonify({"error": "Category not found"}), 404
            
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

#Task 2: POST
@app.route('/api/products', methods=['POST'])
def add_product():
    product_data = request.json

    try:
       
        response = requests.post(BASE_URL, json=product_data)

       
        if response.status_code == 200:
            return jsonify(response.json()), 201
        else:
            return jsonify({"error": "Failed to create product"}), response.status_code
            
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001) 