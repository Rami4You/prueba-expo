class OrderDetail {
    get ProductId() {
        return this._productId;
    }
    set ProductId(productId) {
        productId = productId.trim();
        if (productId === '') {
            throw 'The productId cannot be empty';
        }
        this._productId = productId;
    }

    get Quantity() {
        return this._quantity;
    }
    set Quantity(quantity) {
        quantity = quantity.trim();
        if (quantity === '') {
            throw 'The quantity cannot be empty';
        }
        this._quantity = quantity;
    }
}