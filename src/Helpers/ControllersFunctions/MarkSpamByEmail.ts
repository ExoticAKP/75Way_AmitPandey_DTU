import UserSchema from "../UserSchema"
import { MongoClient } from "mongodb";
const mongo_connection_uri: string = "mongodb+srv://pamit5337:Amit1234@mycluster.jgvmnxm.mongodb.net/?retryWrites=true&w=majority";
const MarkSpamByEmail = async (email: string) => {
    const UserDB = new MongoClient(mongo_connection_uri);
    const database = UserDB.db('UsersData');
    const users = database.collection('Users');
    // users.updateOne({ "Email": email }, 
    //     {
    //     $set: {
    //         $inc:{spamCount:1}
    //     }})
    //     UserDB.close();

    // }
}
export default MarkSpamByEmail;