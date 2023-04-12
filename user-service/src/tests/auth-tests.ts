import chai, { should } from "chai"
import chaiHttp from "chai-http"
import server from "../server"
import { correctUser } from "./fixtures"
import AuthUtils from "../utils/auth-utils"

should()
chai.use(chaiHttp)

const utils = new AuthUtils()

class AuthTests {

    
    login() {

        describe("POST /auth/login", ()=> {
            it("login process should work perfectly", (done)=> {
                chai.request(server).post("/auth/login").send({email: correctUser.email, password: correctUser.password}).end((err,res)=> {
                    res.should.have.status(200)
                    res.body.should.have.property("id")
                    res.body.should.have.property("username")
                    res.body.should.not.have.property("password")
                    res.body.should.have.property("accessToken")
                    res.body.should.have.property("role")
                    res.body.should.not.have.property("iban")
                    res.should.have.cookie("refreshToken")

                    done()
                })
                
            })

        })

    }

    logout() {
        describe("POST /auth/logout", ()=> {
            it("should delete cookies successfuly", (done)=> {
                chai.request(server).post("/auth/logout").end((err,res)=> {
                    res.should.have.status(203)
                    res.body.should.not.have.cookie()
                    done()
                })
            })
        })
    }

    refreshToken() {
        
        describe("POST /auth/refresh", async ()=> {

            const refreshToken = await utils.generateRefreshToken(correctUser.id, correctUser.role)
            it("should return new  access token when given a valid refresh token", (done)=> {
                chai.request(server).post("/auth/refresh").set("Cookie", `refreshToken=${refreshToken}`).end((err, res)=> {
                    res.should.have.status(200)
                    res.body.should.have.property("token")
                    done()
                })
            })
        })
    }

    runAllTests() {
        this.login()
        this.logout()
        this.refreshToken()
    }
}

export default AuthTests