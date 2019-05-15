class Reservering{
    constructor(reservationId, apartmentId, startDate, endDate, status, userId){
        this.reservationtId = this.validate(reservationId),
        this.apartmentId = this.validate(apartmentId),
        this.startDate = this.validate(startDate),
        this.endDate = this.validate(endDate),
        this.status = this.validate(status),
        this.userId = this.validate(userId)
    }

      validatePostalCode(postalCode){
        let regexPostCode = new RegExp("^([0-9]{4})([ ]{1,2})(?!SD|SA|SS)([A-Z]{2})$");
        if (regexPostCode.test(postalCode)) {
          return postalCode;
        } else {
          throw new Error("Invalid postal code: "+ postalCode)
        }
      }
    
}