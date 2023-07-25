const user=require("../models/user")


const reg=(req,res)=>{
        //console.log(req);
        const data=new user(req.body);
        //const 
        //console.log(data);
        user.findOne({ email: data.email }, (err, existingUser) => {
                if (err) {
                  console.error('Error finding user:', err);
                  return res.status(500).json({ error: 'Internal server error' });
                }
                if (existingUser) {
                  console.log('Email already exists');
                  // Handle the case where the email already exists and send an appropriate response
                  res.send('Email already exists');
                }
               data.save()
                .then(()=>{
                        //console.log("data saved from control");
                        res.send('Successful');
                })
                .catch(()=>{
                        console.log("data error from control");
                })
        })
}

const login=(req,res)=>{
        const data=new user(req.body);
        user.findOne({email:data.email},(err,existingUser)=>{
                if (err) {
                        console.error('Error finding user:', err);
                        return res.status(500).json({ error: 'Internal server error' });
                      }
                else if (existingUser) {
                        user.findOne({pass:data.pass},(err,validUser)=>{
                                if(err) console.log(err);
                                else if(validUser){
                                        res.send("Logged in successfully!!!");
                                }
                                else{
                                        res.send("Wrong credentials!")
                                }
                        })
                        //console.log(existingUser);

                } 
                else if(data.email=="admin" && data.pass=="admin"){
                        res.send("Admin")
                }
                else{
                        res.send("Username does not exist!")
                }  
        })
}

module.exports={
        reg, login
}