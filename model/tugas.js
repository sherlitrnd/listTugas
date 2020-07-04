const sequelize = require("sequelize")
const db = require("../database/db.js")
const { Sequelize } = require("sequelize")

module.exports = db.sequelize.define("tugas",
    {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nama_tugas:{
            type: Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)