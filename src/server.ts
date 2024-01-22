import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import {  MongoClient } from "mongodb";
import bodyParser from "body-parser";
import { Collection } from "mongoose";
import crypto from "crypto";


dotenv.config();
const mongo_connection_uri= process.env.MONGO_CONNECTION_URI as string;
const UserDB = new MongoClient(mongo_connection_uri);
const database = UserDB.db('UsersData');
const users = database.collection('Users');
const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 4000;
app.get("/", (req: Request, res: Response) => {
    res.send("req sent successfully");
});
//DONE
app.post("/sign_up", (req: Request, res: Response) => {
    const user: { Name: string,Email:string,Password:String, DOB: string, Gender: string, Location: Location, Hobbies: string, spamCount: number } = {
        Name: req.body.Name,
        Email:req.body.Email,
        Password: req.body.Password,
        DOB: req.body.DOB,
        Gender: req.body.Gender,
        Location: req.body.Location,
        Hobbies: req.body.Hobbies,
        spamCount: 0
    }
    const result = users.insertOne(user);
    res.send(user);
})
//DONE
// Log In
app.post('/log_in',(req:Request,res:Response)=>{
    const alreadyRegistered=users.findOne({$and: [{Email:req.body.Email}, {Password:req.body.Password}]}).then((result)=>{
        if(result==null){
            res.send('Invalid Credentials or Not Registered');
        }
        else{
            res.send('Log In SuccessFul');
        }
    });
    
})

//DONE
//Get profiles by name
app.get('/get_profiles_by_name',async (req: Request, res: Response) => {
    try{
        let arr:any=[];
        const data=users.find({Name:req.body.Name}).toArray() ;
        (await data).forEach((element)=>{
            arr.push(element);
        })
        res.send(arr);
    }
    catch(err){
        res.sendStatus(201).send('Oops!! No one Is the With the typed Name');
    }
})
//Done
//Get Profiles by same hobby
app.get('/get_profiles_by_hobby',async (req: Request, res: Response) => {
    try {
        let arr: any = [];
        const data = users.find({ Hobbies: req.body.Hobbies }).toArray();
        (await data).forEach((element) => {
            arr.push(element);
        })
        res.send(arr);
    }
    catch (err) {
        res.sendStatus(201).send('Oops!! No one Is the With the Same hobby');
    }
})

//DONE
// For Marking Spam through the Unique Email and Deleting the account if the spamCount reaches 10 in number
app.post('/mark_spam_by_email', async (req: Request, res: Response)=>{
    try{
        
        (await users.updateOne({Email:req.body.Email},{$inc:{spamCount:1}}));
        const ele = users.findOne({ $and: [{ Email: req.body.Email }, { spamCount:{ $gte:10}}]});
        ele.then((result)=>{
            if(result!=null){
                users.deleteOne({Email:req.body.Email});
            }
        })
        res.send('Successfully done');
    }
    catch{
        res.send('Spam not done. There is no one with this id');
    }
    
    
})
const createHashed=(Password:string)=>{
    const iv = crypto.randomBytes(64);
    const cipher = crypto.createCipheriv('aes-128-cbc', 'abc', iv);
    let encrypted:string = cipher.update(Password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

app.listen(port, () => {
    console.log(`${port} has successfully started`);
});
