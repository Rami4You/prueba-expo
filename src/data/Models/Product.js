class Product {
    get Id() {
        return this._id;
    }
    set Id(id) {
        id = id.trim();
        if (id === '') {
            throw new Error('Id is required');
        }
        this._id = id;
    }

    get Name() {
        return this._name;
    }
    set Name(name) {
        name = name.trim();
        if (name === '') {
            throw new Error('Name is required');
        }
        this._name = name;
    }

    get Price() {
        return this._price;
    }
    set Price(price) {
        price = price.trim();
        if (price === '') {
            throw new Error('Price is required');
        }
        this._price = price;
    }

    get Description() {
        return this._description;
    }
    set Description(description) {
        description = description.trim();
        if (description === '') {
            throw new Error('Description is required');
        }
        this._description = description;
    }

    get Photo() {
        return this._photo;
    }
    set Photo(photo) {
        photo = photo.trim();
        if (photo === '') {
            throw new Error('Photo is required');
        }
        this._photo = photo;
    }

    get InstitutionId() {
        return this._instructionId;
    }
    set InstitutionId(instructionId) {
        instructionId = instructionId.trim();
        if (instructionId === '') {
            throw new Error('InstitutionId is required');
        }
        this._instructionId = instructionId;
    }

    get Category() {
        return this._category;
    }
    set Category(category) {
        category = category.trim();
        if (category === '') {
            throw new Error('Category is required');
        }
        this._category = category;
    }
}

class ProductCategory {
    get Name() {
        return this._name;
    }
    set Name(name) {
        name = name.trim();
        if (name === '') {
            throw new Error('Name is required');
        }
        this._name = name;
    }

    get Products() {
        return this._products;
    }
    set Products(products) {
        this._products = products;
    }
}