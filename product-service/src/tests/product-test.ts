import chai, { should } from "chai";
import chaiHttp from "chai-http"
import server from "../server"

should()
chai.use(chaiHttp)

class ProductTests {

    createProduct() {
        describe("POST /products", ()=> {
            it("should create a product perfectly", (done)=> {
                chai.request(server).post("/products").send().set("Authorization", "test").end((err, res)=> {
                    res.should.have.status(201)
                    res.body.should.have.property("title")
                    res.body.should.have.property("description")
                    res.body.should.have.property("art_type")
                    res.body.should.have.property("artist")
                    res.body.should.have.property("price")
                    res.body.should.have.property("image_url")
                    res.body.should.have.property("artist_id")
                    done()
                })
            })

            it("should not let a non-seller to create a product", (done)=> {
                chai.request(server).post("/products").send().set("Authorization", "test").end((err, res)=> {
                    res.should.have.status(403)
                    done()
                })
            })
        })
    }

    getProduct() {
        describe("GET /products", ()=> {
            it("should get products ", (done)=> {
                chai.request(server).post("/products").send().set("Authorization", "test").end((err, res)=> {
                    res.should.have.status(200)
                    res.body[0].should.have.property("title")
                    res.body[0].should.have.property("description")
                    res.body[0].should.have.property("art_type")
                    res.body[0].should.have.property("artist")
                    res.body[0].should.have.property("price")
                    res.body[0].should.have.property("image_url")
                    res.body[0].should.have.property("artist_id")
                
                    done()
                }) 
            })
        })
    }

    getProductById() {
        describe("GET /products/:id", ()=> {
            it("should get products ", (done)=> {
                chai.request(server).post("/products").send().set("Authorization", "test").end((err, res)=> {
                    res.should.have.status(200)
                    res.body.should.have.property("title")
                    res.body.should.have.property("description")
                    res.body.should.have.property("art_type")
                    res.body.should.have.property("artist")
                    res.body.should.have.property("price")
                    res.body.should.have.property("image_url")
                    res.body.should.have.property("artist_id")
                    
                    done()
                })
            })
        })

    }

    

    
}

export default ProductTests