class Bookvisit {
    constructor(obj) {
        this.propertyId = obj.propertyId;
        this.name = obj.custName;
        this.mobNo = obj.mobNo;
        this.emailId = obj.emailId;
        this.pancardNo = obj.pancard;
        this.visitingDate = obj.VisitingDate;
        this.sellerId = obj.sellerId;
    }
}

module.exports = Bookvisit;