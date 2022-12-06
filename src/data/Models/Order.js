class Order {
    get Id(){
        return this._id;
    }
    set Id(id) {
        id = id.trim();
        if (id === '') {
            throw new Error('Id is required');
        }
        this._id = id;
    }

    get UserId() {
        return this._userId;
    }
    set UserId(userId) {
        userId = userId.trim();
        if (userId === '') {
            throw new Error('UserId is required');
        }
        this._userId = userId;
    }

    get InstitutionId() {
        return this._institutionId;
    }
    set InstitutionId(institutionId) {
        institutionId = institutionId.trim();
        if (institutionId === '') {
            throw new Error('InstitutionId is required');
        }
        this._institutionId = institutionId;
    }

    get Total() {
        return this._total;
    }
    set Total(total) {
        total = total.trim();
        if (total === '') {
            throw new Error('Total is required');
        }
        this._total = total;
    }

    get CreatedAt() {
        return this._createdAt;
    }
    set CreatedAt(createdAt) {
        createdAt = createdAt.trim();
        if (createdAt === '') {
            throw new Error('CreatedAt is required');
        }
        this._createdAt = createdAt;
    }

    get OrderType() {
        return this._orderType;
    }
    set OrderType(orderType) {
        orderType = orderType.trim();
        if (orderType === '') {
            throw new Error('OrderType is required');
        }
        this._orderType = orderType;
    }

    get OrderDetail() {
        return this._orderDetail;
    }
    set OrderDetail(orderDetail) {
        orderDetail = orderDetail.trim();
        if (orderDetail === '') {
            throw new Error('OrderDetails is required');
        }
        this._orderDetails = orderDetail;
    }

    get Detail() {
        return this._detail;
    }

    set Detail(detail) {
        this._detail = detail;
    }

    get Status() {
        return this._status;
    }
    set Status(status) {
        status = status.trim();
        if (status === '') {
            throw new Error('Status is required');
        }
        this._status = status;
    }
}