const express = require("express")
const cors = require("cors");
const db = require("./db");

const app = express()

app.use(cors())
app.use(express.json())


app.get("/student",(req,res)=>{
    const sql = "SELECT * FROM details";

    db.query(sql,(err,result) =>{
        if(err) return res.status(500).json(err)
        res.json(result)    
    });
});

app.post("/student",(req,res) =>{

    const {name,cgpa} = req.body

    const sql = "INSERT INTO details(name,cgpa) VALUES (?,?)";

    db.query(sql,[name,cgpa],(err,result)=>{
        if(err) return res.status(500).json(err)

        res.json(result);    
    });
});

app.put("/student/:id",(req,res) =>{

    const {name,cgpa} = req.body
    const id = req.params.id
    const sql = "UPDATE details SET name=?,cgpa=? WHERE id=?";

    db.query(sql,[name,cgpa,id],(err,result)=>{
        if(err) return res.status(500).json(err)

        res.json(result);    
    });
});

app.delete("/student/:id",(req,res) =>{

    const id = req.params.id
    const sql = "DELETE FROM details WHERE id=?";

    db.query(sql,[id],(err,result)=>{
        if(err) return res.status(500).json(err)

        res.json(result);    
    });
});
app.listen(5000,()=>{
    console.log("server running on port 5000");
});