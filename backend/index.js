import express from "express"
import mysql from "mysql"
import cors from 'cors'

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password :"chetan",
    database :"test"
})

app.use(express.json())
app.use(cors())

app.get("/" ,(req,res)=>{
    res.json("hello this is the backend")
})

app.get("/blogs" , (req,res)=>{
    const q = "SELECT * FROM blogs"
    db.query(q,(err,data)=>{
        if(err)return res.json(err)
        return res.json(data)
    })
})

app.post("/blogs",(req,res)=>{
    const q = "INSERT INTO blogs(`title`,`desc`,`cover`) VALUES(?)"
    const values = [req.body.title,req.body.desc,req.body.cover]


    db.query(q,[values],(err ,data)=>{
        if(err) return res.json(err)
        return res.json("blog has been created successfully")
    })
})

app.delete("/blogs/:id" , (req,res)=>{
    const blogId = req.params.id
    const q = "DELETE FROM blogs WHERE id = ?"

    db.query(q,[blogId],(err,data)=>{
        if(err) return res.json(err)
    return res.json("Blog has been deleted successfully")
    })
})

app.put("/blogs/:id" , (req,res)=>{
    const blogId = req.params.id
    const q = "UPDATE blogs SET `title` =?,`desc`=?,`cover`=? WHERE id = ?"

    const values =[req.body.title,req.body.desc,req.body.cover]

    db.query(q,[...values,blogId],(err,data)=>{
        if(err) return res.json(err)
    return res.json("Blog has been updated successfully")
    })
})

app.listen(8800 ,()=>{
    console.log("connected to backend")
})