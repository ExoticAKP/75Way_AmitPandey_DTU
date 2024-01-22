import UserSchema from "../UserSchema"
import { MongoClient } from "mongodb";
const mongo_connection_uri: string = "mongodb+srv://pamit5337:Amit1234@mycluster.jgvmnxm.mongodb.net/?retryWrites=true&w=majority";
const getDataByHobby = async (hobby: string) => {
    const UserDB = new MongoClient(mongo_connection_uri);
    const database = UserDB.db('UsersData');
    const users = database.collection('Users');
    const arr = [];
    const data = users.find({ Hobby: hobby });
    // console.log('hi');
    for await (const doc of data) {
        arr.push(doc);
    }

    return data;
}
export default getDataByHobby;