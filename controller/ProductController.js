import multer from 'multer'
import Product from '../model/ProductModel'
import path from 'path'
import Customerrorh from '../service/customerrorh';
import Joi from 'joi';
import fs from 'fs';


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniquename = `${Date.now()}${path.extname(file.originalname)}`;
        console.log("line 13 productcontroller",uniquename)
        cb(null, uniquename)
    }
});

const handlemu = multer({ storage, limit: { fileSize: 100000 * 5 } }).single('image')
//Product
const ProductController = {

    async store(req, res, next) {

        handlemu(req, res, async (err) => {
           
            if (err) {
                return next(Customerrorh.server(err.message))
            }

            console.log("line 28 productcontroller",req.file)
            console.log("line 29 productcontroller",req.file.path)

            const filepath = req.file.path

          //  E:\appppp\Node Js Course B\rest-api\uploads\1666188511706.png
            
          const Producthschema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().required(),
                size: Joi.string().required()
            });
            //errror agar aya 

            const { error } = Producthschema.validate(req.body)

            // console.log("logout line 66 ", req.body)
            console.log("line 42 productcontroller",`${appRoute}/${req.file.path}`)

            if (error) {
                //elete if image upload 

                fs.unlink(`${appRoute}/${req.file.path}`, (erro) => {
                //    console.log("line 53"`${appRoute}/${req.file.path}`)
                   

                    if (erro) {
                        return next(Customerrorh.server(erro.message))
                    }

                });
                // return next(error)
                return next(error)

            }



            const { name, price, size } = req.body;

            let docom;
            try {

                docom = await Product.create({
                    name,
                    price,
                    size,
                    image: filepath
                })
            } catch (error) {
                return next(error)

            }


            res.status(201).json({ docom })
        })




    }

}

export default ProductController;