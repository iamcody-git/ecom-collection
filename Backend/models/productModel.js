import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required :[true, 'Name filed is required']
    },
    description:{
        type:String,
        required :[true, 'Description filed is required']
    },
    price:{
        type:Number,
        required :[true, 'Price filed is required']
    },
    image:{
        type:Array,
        required :[true, 'Image filed is required']
    },
    category:{
        type:String,
        required :[true, 'Category filed is required']
    },
    subCategory:{
        type:String,
        required :[true, 'suncategory filed is required']
    },
    sizes:{
        type:Array,
        required :[true, 'Sizes filed is required']
    },
    bestseller:{
        type:Boolean,
    },
    date:{
        type:Number,
        required:true
    },

})

const productModel = mongoose.models.product ||  mongoose.model("product", productSchema);

export default productModel;