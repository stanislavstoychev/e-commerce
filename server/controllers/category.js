import Category from "../models/category.js";
import slugify from "slugify";

export const create = async (req, res) => {
    try {
        //1.check name is not empty
        const { name } = req.body;
        if(!name.trim()) { return res.json({"error": "Name is required"})}
        //2.name is unique
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.json({ err: "Already exists" });
        }
        //3.create a slug
        const slug = slugify(req.body.name, '-');
        //4.create a Category document
        const category = new Category({ name, slug });
        category.save();
        res.json(category);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

export const update = async (req, res) => { 
    try {
        //destructure from category.params
        const { categoryId } = req.params;
        const { name } = req.body;
        const category = await Category.findByIdAndUpdate(categoryId, { name, slug: slugify(name) }, {new: true});
        res.json(category);

    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
}; 

export const remove = async (req, res) => { 
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId);
        res.json(removed);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
}; 

export const list = async (req, res) => { 
    try {
        const all = await Category.find({});
        res.json(all);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
}; 

export const read = async (req, res) => { 
    try {
        const category = await Category.findOne({ slug: req.params.slug });
        res.json(category);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
}; 
