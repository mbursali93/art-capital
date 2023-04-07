import chai, { should } from "chai";
import chaiHttp from "chai-http"
import server from "../server"


should()
chai.use(chaiHttp)


class ProductTests {

    createProduct() {
        describe("POST /products", ()=> {
           

            it("should not let a non-seller to create a product", (done)=> {
                chai.request(server).post("/products/" + process.env.CORRECT_TEST_ID).send({ }).set("Authorization", "test").end((err, res)=> {
                    res.should.have.status(403)
                    res.body.should.be.equal("Something went wrong on seller verification")
                    done()
                })
            })
        })
    }

    getProduct() {
        describe("GET /products/params", ()=> {
            it("should get products ", (done)=> {
                chai.request(server)
                .get("/products/?search=&filter=painting,drawing&minPrice=1000&maxPrice=2000&priceOption=descending")
                .end((err, res)=> {
                    res.should.have.status(200)
                    res.body[0].should.have.property("title")
                    res.body[0].should.have.property("description")
                    res.body[0].should.have.property("art_type")
                    res.body[0].should.have.property("artist_name")
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
                chai.request(server).get("/products/"+ process.env.TEST_PRODUCT_ID).set("Authorization", "test").end((err, res)=> {
                    res.should.have.status(200)
                    res.body.should.have.property("title")
                    res.body.should.have.property("description")
                    res.body.should.have.property("art_type")
                    res.body.should.have.property("artist_name")
                    res.body.should.have.property("price")
                    res.body.should.have.property("image_url")
                    res.body.should.have.property("artist_id")
                    
                    done()
                })
            })
        })

    }

    runAllTests() {
        this.createProduct()
        this.getProductById()
        this.getProduct()
    }

    
}

export default ProductTests