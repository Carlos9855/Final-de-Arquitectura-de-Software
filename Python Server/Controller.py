from flask import Flask, jsonify, request

app = Flask(__name__)


import  Services as services

# Get Data Routes
@app.route('/products')
def getProducts():
    return services.get_Products()

@app.route('/products/<string:product_name>')
def getProduct(product_name):
    return services.get_Product(product_name)

# Create Data Routes
@app.route('/products', methods=['POST'])
def addProduct():
    new_product = {
        'name': request.json['name'],
        'price': request.json['price'],
        'quantity': 10
    }
    return services.addProduct(new_product)

# Update Data Route
@app.route('/products/<string:product_name>', methods=['PUT'])
def editProduct(product_name):
    return services.editProduct(product_name)

# DELETE Data Route
@app.route('/products/<string:product_name>', methods=['DELETE'])
def deleteProduct(product_name):
        return services.deleteProduct(product_name)

if __name__ == '__main__':
    app.run(debug=True, port=4000)
