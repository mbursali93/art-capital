import AuthTests from "./auth-tests";
import UserTests from "./user-tests";

const auth = new AuthTests()
const user = new UserTests()


auth.runAllTests()
user.runAllTests()
