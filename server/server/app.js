const express = require("express")
const graphqlHTTP = require("express-graphql")
const mongoose = require("mongoose")
const cors = require('cors')
const schema = require("../schema/schema")

const app = express()
const PORT = 3005

mongoose.connect(
  "mongodb+srv://igorg99:srmyNMI96GnHbtn5@cluster0.yf2hy.mongodb.net/My",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
)

app.use(cors())

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }))

const dbConnection = mongoose.connection
dbConnection.on("error", (err) => console.log(`Connection error: ${err}`))
dbConnection.once("open", () => console.log("Connected to DB!"))

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log("Server started!")
})
