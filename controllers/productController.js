const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')

// create main Model
const Product = db.products

const Admin = db.Admin
const pricing = db.pricings

// main work



const pic = db.pics;


const create = async (req, res) => {
  console.log("()()()()()()()()()()");

  const image = {
    image: req.file.path,
    description: req.body.description,
  };

  const imager = await pic.create(image)
  res.status(200).send(imager)
  console.log(image)
};

const findAll = (_req, res) => {
  pic.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving images.",
      });
    });
};

const update = (req, res) => {
  const id = req.params.id;

  pic.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Image was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Image with id=${id}. Maybe Image was not found or req.body is empty!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating Image with id=" + id,
      });
    });
};

const deleted = (req, res) => {
  const id = req.params.id;

  pic.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Image was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Image with id=${id}. Maybe Image was not found!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete Image with id=" + id,
      });
    });
};



const sent = (_req, res) => {

  console.log("ok")
  let resData = {
    status: false,
    answare: ''
  }
  try {
    const options = {
      method: 'GET',
      url: 'https://graph.facebook.com/v22.0/626889620500944/messages ',
      headers: {
        Authorization: 'EAANni04p3ZAsBO074EZBwGZBx5n5nZBThCoUql38ZBpiozZCPEDYyrmgF43ZAaDCITEeSifkOghlBvfs1k8mhcZCKy8GRwwAheMvORrWsRhJbnlq2hndNLc7WaR3zOt8hBfjknfyhV2ZABtxrNyyf2NOzbRDhvWvBQrZBFAISMFArRhf4ZBfZCbTuRNv9FyJlcphnpvvurSRR2Ut2ZC3TNCF4J794a1tDqH0ZD',
        'Content-Type': 'application/json'
      },
      body: {
        messaging_product: 'whatsapp',
        to: '94760218199',
        type: 'template',
        template: {
          name: 'hello_world',
          language: {
            code: 'en_US'
          }
        }
      },
      json: true
    };
    request(options, function (error, _response, body) {
      if (error) throw new Error(error);
      //+++++++++++++++++++++++++++++++++++++++++++++
      resData.status = true;
      resData.respondData = body;
      return res.status(200).json(resData);
    });
  } catch (e) {
    resData.status = false;
    resData.answare = e;
    return res.status(200).json(resData);
  }
};

//const db = require("../models");
const Message = db.messages;

const chat = (req, res) => {
  if (!req.body.text) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const message = {
    text: req.body.text,
    isUser: req.body.isUser
  };

  Message.create(message)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Message."
      });
    });
};

exports.findAll = (_req, res) => {
  Message.findAll()
    .then(data => {
      res.send(data);
    })

    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving messages."
      });
    });
};





// 1. create product



const addProduct = async (req, res) => {
  console.log("jacxfxcfgxcgfxcvxcvxcv");

  let info = {
    image: req.file.path,
    title: req.body.title,

  }

  const product = await Product.create(info)
  res.status(200).send(product)
  console.log(product)

}



// 2. get all products
//const fs =require('fs')


const getPricing = async (_req, res) => {



  const plans = await pricing.findAll();
  res.json(plans);

}


const editPricingPlan = async (req) => {
  console.log(
    "_____________________________________________"
  );

  console.log(req.body.features);

}
const getAllProducts = async (_req, res) => {




  let products = await Product.findAll({})
  res.status(200).send(products)

}

// 3. get single product

const getOneProduct = async (req, res) => {

  let id = req.params.id
  let product = await Product.findOne({ where: { id: id } })
  res.status(200).send(product)

}

// 4. update Product

// const updateProduct = async (req, res) => {

//     let id = req.params.id

//     const product = await Product.update(req.body, { where: { id: id }})

//     res.status(200).send(product)


// }

// 5. delete product by id

const deleteProduct = async (req, res) => {

  console.log("_______________________________________________________");
  const id = req.params.id;

  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Image was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Image with id=${id}. Maybe Image was not found!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete Image with id=" + id,
      });
    });

}

// 6. get published product

const getPublishedProduct = async (_req, res) => {

  const products = await Product.findAll({ where: { published: true } })

  res.status(200).send(products)

}



const jwt = require('jsonwebtoken')
const signUp = async (req, res) => {
  const { email, password } = req.body;
  //const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await Admin.create({ email, password });
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: 'Signup failed' });
  }
};

// 8. Upload Image Controller

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'Images')
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: '1000000' },
  fileFilter: (_req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const mimeType = fileTypes.test(file.mimetype)
    const extname = fileTypes.test(path.extname(file.originalname))

    if (mimeType && extname) {
      return cb(null, true)
    }
    cb('Give proper files formate to upload')
  }
}).single('image')




const login = async (req, res) => {
  console.log("sdfsdhfkljslfjlsdk");
  const { email, password } = req.body;


  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      console.log("ok");

      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // console.log(password==admin.password);

    const isMatch = password == admin.password;
    console.log(isMatch);

    if (!isMatch) {
      console.log("ok");
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const SECRET_KEY = "123";
    const token = jwt.sign({ id: admin.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}







module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  // updateProduct,
  deleteProduct,
  getPublishedProduct,

  upload,
  signUp,
  login,
  chat,
  sent,
  getPricing, editPricingPlan,
  create, deleted, findAll, update


}