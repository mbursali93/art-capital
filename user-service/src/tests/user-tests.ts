import chai, { should } from "chai";
import server from "../server"
import { correctUser } from "./fixtures";
import AuthUtils from "../utils/auth-utils";


should()
const utils = new AuthUtils()

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
        describe("PUT /users/:id",async ()=> {
            const token = await utils.generateAccessToken(correctUser.id, correctUser.role)
            it("should change password successfuly", (done)=> {
                
                chai.request(server).put("/users/" + correctUser.id)
                .set("Authorization", token)
                .send({ password: correctUser.password, verifyPassword: correctUser.password })
                .end((err, res)=> {
                    res.should.have.status(200)
                    done()
                })
            })

            it("should give error when there is no valid JWT", (done)=> {
                chai.request(server).put("/users/" + correctUser.id)
                .set("Authorization", "token")
                .send({ password: correctUser.password, verifyPassword: correctUser.password }).end((err, res)=> {
                    res.should.have.status(403)
                    done()
                })
            })

            it("should give error when password is not following validation rules", (done)=> {
                chai.request(server).put("/users/" + correctUser.id).set("Authorization", token).send({ password: "dsf", verifyPassword: "dsf" }).end((err, res)=> {
                    res.should.have.status(400)
                    done()
                })
            })
        })
    }

    updateSocialMediaLinks() {
        describe("PATCH /users/:id", async ()=> {
            const token = await utils.generateAccessToken(correctUser.id, correctUser.role)
            it("should update social media links successfuly", (done)=> {
                chai.request(server).patch("/users/" + correctUser.id).set("Authorization", token)
                .send({ social_media_links: correctUser.social_media_links }).end((err, res)=> {
                    res.should.have.status(200)
                    done()
                })
            })

            it("should give error when there is no valid JWT", (done)=> {
                chai.request(server).patch("/users/" + correctUser.id).set("Authorization", "token").send().end((err, res)=> {
                    res.should.have.status(403)
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