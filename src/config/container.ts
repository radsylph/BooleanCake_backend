import { asClass, asValue, createContainer } from "awilix";

import User from "../models/user";
import UserModule from "../modules/user.module";

const UCM = createContainer(); //User Container Module

UCM.register({
	UserModule: asClass(UserModule).singleton(),
	userModel: asValue(User),
});

export { UCM };
