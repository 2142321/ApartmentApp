var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../AppartmentApp.js')

chai.should();

chai.use(chaiHttp);

describe('Users/',()=>{
    
    it('Register new user', (done) => {
        chai.request(server)
            .post('/auth/register')
            .set('content-type','application/json')
            .send({
                "first_name":"Steven",
                "last_name":"Minecraft",
                "street_address":"Cobblestonestreet 21",
                "postal_code":"4812 EH",
                "city":"The Mines",
                "date_of_birth":"25-06-2019",
                "phone_number":"0683728499",
                "email":"blockmail@email.com",
                "password":"Shr3kt"
            })
            .end((err,res,body)=>{
                res.should.have.status(200);
                done();
            })
    })

})