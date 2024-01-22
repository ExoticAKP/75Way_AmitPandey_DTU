const {
    Schema,
    model
} = require("mongoose");

const MySchema = new Schema({
    Name: String,
    DOB: String,
    Gender: String,
    Location: String,
    Hobbies: String
});

const TaskModel = model("Users", MySchema)

export default TaskModel