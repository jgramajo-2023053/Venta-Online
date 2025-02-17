import User from '../src/user/user.model.js'
import Category from '../src/category/category.model.js'
import { encrypt } from '../utils/encryp.js'
import { Types } from 'mongoose';

export const userDefault = async () => {
    try {    

        const fixedUserId = new Types.ObjectId("65a123456789abcdef123456");

        let data = {
            _id: fixedUserId,
            name: "DefaultADMIN",
            email: "default@example.com",
            password: "Asada.2025",
            role: "ADMIN"
        };

        let existingUser = await User.findOne({ _id: fixedUserId });
        if (existingUser) return;

        let user = new User(data);
        user.password = await encrypt(user.password);
        await user.save();
    } catch (err) {
        console.error(err);
    }
};


export const categoryDeafult = async () => {
    try {    

        const fixedCatId = new Types.ObjectId("65a123456789abcdef123456");

        let data = {
            _id: fixedCatId,
            name: "DEFAULT",
            description: "Category deafult"
        };

        let existingCat = await Category.findOne({ _id: fixedCatId });
        if (existingCat) return;

        let cat = new Category(data);
        await cat.save();
    } catch (err) {
        console.error(err);
    }
};