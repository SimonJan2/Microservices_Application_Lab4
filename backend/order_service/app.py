from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

orders = {}

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"}), 200

@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify(list(orders.values()))

@app.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    order_id = str(len(orders) + 1)
    orders[order_id] = {
        "id": order_id,
        "user_id": data['userId'],
        "products": data['products'],
        "status": "pending",
        "total": sum(float(p['price']) * int(p['quantity']) for p in data['products'])
    }
    return jsonify(orders[order_id]), 201

@app.route('/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    order = orders.get(order_id)
    if order:
        return jsonify(order)
    return jsonify({"error": "Order not found"}), 404

@app.route('/orders/<order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    data = request.get_json()
    if order_id in orders:
        orders[order_id]['status'] = data['status']
        return jsonify(orders[order_id])
    return jsonify({"error": "Order not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
