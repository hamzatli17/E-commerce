import  express  from 'express'
import  dotenv  from 'dotenv'
//import  colors  from 'colors'
import  productRoutes  from './routes/productRoutes.js'
import  userRoutes  from './routes/userRoutes.js'
import  orderRoutes  from './routes/orderRoutes.js'
import cors from 'cors';
import  connectDB  from './config/db.js'
import  {notFound,errorHandler}  from './middleware/errorMiddleware.js'
import bodyParser from 'body-parser'

dotenv.config();
connectDB();
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
          origin: [
               
                'https://e-commerce-client.onrender.com'
             ],
             credentials: true,
         }));
app.use(express.json())
app.get('/',(req,res) => {
    res.send('API is running.....')
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT =process.env.PORT || 5000 
app.listen(PORT, ()=> {
    console.log(`Listening on ${process.env.NODE_ENV} mode in PORT ${PORT}`);
});
