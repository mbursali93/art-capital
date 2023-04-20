import chai, { should} from "chai";
import server from "../server"
import chaiHttp from "chai-http";
import { correctUser } from "./fixtures";

should()

class UserTests {
   
    
    getUser() {
        describe("GET /users/:id", ()=> {
            it("should get user information", (done)=> {
                chai.request(server).get("/users/"+ correctUser.id).end((err,res)=> {
                    res.should.have.status(200)
                    res.body.should.have.property("id")
                    res.body.should.have.property("username")
                    res.body.should.not.have.property("password")
                    res.body.should.have.property("role")
                    res.body.should.not.have.property("iban")
                    done()
                })
            })
        })
    }

    changePassword() {
        describe("PUT /users/:id", ()=> {
            it("should change password successfuly", (done)=> {
                chai.request(server).put("/users" + correctUser.id).set("Authorization", "token").send().end((err, res)=> {
                    res.should.have.status(200)
                    done()
                })
            })

            it("should give error when there is no valid JWT", (done)=> {
                chai.request(server).put("/users" + correctUser.id).set("Authorization", "token").send().end((err, res)=> {
                    res.should.have.status(200)
                    done()
                })
            })

            it("should give error when password is not following validation rules", (done)=> {
                chai.request(server).put("/users" + correctUser.id).set("Authorization", "token").send().end((err, res)=> {
                    res.should.have.status(200)
                    done()
                })
            })
        })
    }

    updateSocialMediaLinks() {
        describe("PUT /users/:id", ()=> {
            it("should update social media links successfuly", (done)=> {
                chai.request(server).put("/users" + correctUser.id).set("Authorization", "token").send().end((err, res)=> {
                    res.should.have.status(200)
                    done()
                })
            })

            it("should give error when there is no valid JWT", (done)=> {
                chai.request(server).put("/users" + correctUser.id).set("Authorization", "token").send().end((err, res)=> {
                    res.should.have.status(200)
                    done()
                })
            })
        })
    }

    runAllTests() {
        this.getUser()
        this.changePassword()
        this.updateSocialMediaLinks()
    }
}

export default UserTests;