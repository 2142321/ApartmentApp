class Appartment {

    constructor(appartmentId, description, streetAddress, postalCode, city, userId){
        this.appartmentId = this.validate(appartmentId),
        this.description = this.validate(description),
        this.streetAddress = this.validate(streetAddress),
        this.postalCode = this.validate(postalCode),
        this.city = this.validate(city),
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

    validatestreetAdress(streetAddress){
      let regexStreetAddress = new RegExp("(\w+(\s\w+){2,})?$i");
      if (regexStreetAddress.test(streetAddress)) {
        return streetAddress;
      } else {
        throw new Error("Invalid street: "+ streetAddress)
      }
    }

    validateCity(city){
        let regexCity = new RegExp("^\p{Lu}\p{L}*(?:[\s-]\p{Lu}\p{L}*)$");
        if (regexCity.test(city)) {
          return city;
        } else {
          throw new Error("Invalid city: "+ city)
        }
      }
}