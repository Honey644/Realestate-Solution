const path = require('path'); const express = require('express'); const mongoose = require('mongoose');
const cors = require('cors'); const cookieParser = require('cookie-parser'); require('dotenv').config();
const authRoutes = require('./routes/auth'); const ldRoutes = require('./routes/luckydraw');
const app = express(); app.use(express.json()); app.use(cookieParser()); app.use(cors({origin:true,credentials:true}));
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log('✅ MongoDB connected')).catch(err=>console.error('Mongo error',err));
app.use('/api/auth', authRoutes); app.use('/api/luckydraw', ldRoutes);
const PORT = process.env.PORT || 5000; app.listen(PORT, ()=>console.log('🚀 Server running on', PORT));