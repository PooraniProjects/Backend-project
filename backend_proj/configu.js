const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/firstprj')
.then(()=>console.log('DB CONNECTED'))
.catch(()=>console.log('DB NOT CONNECTED'));