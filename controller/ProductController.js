import multer from 'multer'
import Product from '../model/ProductModel'
import path, { join } from 'path'
import Customerrorh from '../service/customerrorh';
import Joi from 'joi';
import fs from 'fs';


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniquename = `${Date.now()}${path.extname(file.originalname)}`;
        console.log("line 13 productcontroller", uniquename)
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

            console.log("line 28 productcontroller", req.file)
            console.log("line 29 productcontroller", req.file.path)

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
            console.log("line 42 productcontroller", `${appRoute}/${req.file.path}`)

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
        });
    },

    async updatem(req, res, next) {


        handlemu(req, res, async (err) => {

            if (err) {
                return next(Customerrorh.server(err.message))
            }

            // console.log("line 28 productcontroller",req.file)
            // console.log("line 29 productcontroller",req.file.path)

            let filepath;

            if (req.file) {
                filepath = req.file.path
            }
            //  E:\appppp\Node Js Course B\rest-api\uploads\1666188511706.png

            const Producthschema = Joi.object({
                name: Joi.string().required(),
                price: Joi.number().required(),
                size: Joi.string().required(),
                image: Joi.string
            });
            //errror agar aya 

            const { error } = Producthschema.validate(req.body)

            // console.log("logout line 66 ", req.body)
            //  console.log("line 42 productcontroller",`${appRoute}/${req.file.path}`)

            if (error) {
                //elete if image upload 

                if (req.file) {
                    fs.unlink(`${appRoute}/${req.file.path}`, (erro) => {
                        //    console.log("line 53"`${appRoute}/${req.file.path}`)


                        if (erro) {
                            return next(Customerrorh.server(erro.message))
                        }

                    });
                }
                // return next(error)
                return next(error)

            }



            const { name, price, size } = req.body;

            let docom;

            try {

                docom = await Product.findOneAndUpdate({ _id: req.params.id }, {
                    name,
                    price,
                    size,
                    ...(req.file && { image: filepath })


                    //image: filepath
                }, { new: true })

                console.log(docom)
            } catch (error) {
                return next(error)

            }


            res.status(201).json({ docom })
        });

    },
    //update method end
    async destroy(req, res, next) {
        const docoment = await Product.findOneAndRemove({ _id: req.params.id })
        if (!docoment) {

            return next(Customerrorh.server("this product not available on serverfor delete"))
            //return next(new Error("nothing to delete") )
        };

        const imgpathd = docoment._doc.image;
        //const imgpathd = docoment.image;

        console.log("product controller line 178",imgpathd)
        fs.unlink(`${appRoute}/${imgpathd}`, (err) => {
            if (err) {
                return next(Customerrorh.server("image not deleted server error"))
            }
            res.json(docoment)

        });
       // res.json(docoment)

    },

    async getallproduct(req, res, next) {

        let allproduct;
        try {
            //            allproduct = await Product.find();
            //          allproduct = await Product.find().select("-__v -updatedAt" )
            //            allproduct = await Product.find().select("-__v -updatedAt" ).sort({_id: -1});


            // agar last record pahla lana ha 
            //for decending order sort .sort({_id: -1})
            //            allproduct = await Product.find();

            // allproduct = await Product.find().select('-updatedAt' -__v);

            allproduct = await Product.find().select("-__v -updatedAt").sort({ _id: -1 });



        } catch (error) {
            return next(Customerrorh.server("no product in data base is "))
        }

        return res.json(allproduct)


    },

   async singleproduct(req,res,next){

    let signlep;
    try {

        signlep = await Product.findOne({_id: req.params.id})
        
    } catch (error) {
        return next(Customerrorh.server("this singleproduct not available on server"))
    }

    res.json(signlep)

   }
}

export default ProductController;