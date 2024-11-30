from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

products = {}

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"}), 200

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(list(products.values()))

@app.route('/products', methods=['POST'])
def add_product():
    data = request.get_json()
    product_id = str(len(products) + 1)
    products[product_id] = {
        "id": product_id,
        "name": data['name'],
        "price": data['price'],
        "stock": data.get('stock', 0)
    }
    return jsonify(products[product_id]), 201

@app.route('/products/<product_id>', methods=['GET'])
def get_product(product_id):
    product = products.get(product_id)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

@app.route('/products/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    if product_id in products:
        del products[product_id]
        return jsonify({"message": "Product deleted"}), 200
    return jsonify({"error": "Product not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)