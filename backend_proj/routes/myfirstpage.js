var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
const Myfirst = require('../module/firstpage');


router.get('/', async function (req, res, next) {
  try {
    const myfirstData = await Myfirst.find()
    res.json({
      data: myfirstData,
    });
  }
  catch (e) {
    res.json({
      error: e,
    });

  }
});


router.get('/:id', async function (req, res, next) {
  try {
    const myfirstData = await Myfirst.findById(req.params.id);
    res.json({
      data: myfirstData,
    });
  }
  catch (e) {
    res.json({
      error: e,
    });

  }
});

router.post('/', async function (req, res, next) {
  try {
   
    bcrypt.genSalt(10,(err,salt)=>{
      if(err){
        res.json({
          error:e,
        })
      }

      // password encrypt
      bcrypt.hash(req.body.password,salt, async (err,hash)=>{
        if(err){
          res.json({
            error:e,
          })
        }

        const pairr={
          ...req.body,
          password:hash,
        }
        const myfirstData = await Myfirst.create(pairr);
        res.json({
          data:myfirstData
        });

      });

    });
   
  }
  catch (e) {
    if(e.code === 11000){
      res.json({
        message: 'Email already exits',
      });
    }
    else{
      res.json({
        error: e,
      });

    }
   
  }
});


router.post('/login', async function (req, res, next) {
  try {
    const myfirstData = await Myfirst.findOne({email:req.body.email});

   // ****************  password decrypt

   if(myfirstData){
    
    console.log('myfirstData.password........>',myfirstData.password);
    console.log('req.body.password........>',req.body.password);

    bcrypt.compare(req.body.password, myfirstData.password, (err,result)=>{
      
      console.log('req.body.password........>',result);

   
      if(result){
        res.json({
          data: myfirstData,
        });
      }
      else{
        res.json({
          message: 'Sorry Password is wrong',
        });
      }

      
    });

    
  }
   else{
      res.json({
        message: 'Sorry User Not Found',
      });
    }
  }
  catch (e) {
    res.json({
      error: e,
    });
  }
});


router.put('/:id',async function (req, res, next) {
try{
  const myfirstData = await Myfirst.findByIdAndUpdate(req.params.id,req.body);
  res.json({
    data:myfirstData,
  });
}
catch(e){
  res.json({
    error:e,
  });
}
});


router.delete('/:id',async function (req, res, next) {
  try{
    const myfirstData = await Myfirst.findByIdAndDelete(req.params.id);
    res.json({
      data:myfirstData,
    });
  }
  catch(e){
    res.json({
      error:e,
    });
  }
  });

module.exports = router;