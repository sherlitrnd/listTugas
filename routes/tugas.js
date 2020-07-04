var express = require("express")
var router = express.Router()
const Tugas = require("../model/tugas.js")


// mendapatkan semua tugas
router.get("/tugas",(req,res) =>{
    Tugas.findAll()
    .then(tugas => {
        res.json(tugas)
    })
    .catch(err => {
        res.send("error:" + err)
    })
})

// menambahkan tugas
router.post("/tugas",(req,res) => {
    if(!req.body.nama_tugas){
        res.status(400)
        res.json({
            error:"kesalahan saat menambahkan tugas"
        })
    }else{
        Tugas.create(req.body)
        .then(() => {
            res.send("Tugas ditambahkan")
        })
        .catch(err => {
            res.send("Error: " + err)
        })
    }
})

// Update Tugas
router.put("/tugas/:id",(req,res) => {
    if(!req.body.nama_tugas) {
        res.status(400)
        res.json({
            error: "kesalahan update tugas"
        })
    }else{
        Tugas.update(
            {nama_tugas: req.body.nama_tugas},
            {where: { id: req.params.id }}
        )
        .then(() => {
            res.send("Tugas telah di update")
        })
        .catch(err =>{
            res.send("Error: "+ err)
        })
    }
})
// menghapus tugas
router.delete("/tugas/:id",(req,res) => {
    Tugas.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(() =>{
        res.send("Tugas telah terhapus")
    })
    .catch(err =>{
        res.send("Error: "+ err)
    })
})
module.exports = router;