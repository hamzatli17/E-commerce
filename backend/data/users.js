import bcrypt from 'bcryptjs'
const users=[
    {
        name:'Admin User',
        email:'admin@example.com',
        password:bcrypt.hashSync('12345',10),
        isAdmin:true,


    },
    {
        name:'John Doe',
        email:'John@example.com',
        password:bcrypt.hashSync('12345',10),
   


    },
    {
        name:'blaaaa',
        email:'blablaa@example.com',
        password:bcrypt.hashSync('12345',10),
        


    },
 

]

export default   users