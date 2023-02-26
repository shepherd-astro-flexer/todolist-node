const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todosDB");

const todosSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, name not specified"]
  }
})

const Todo = mongoose.model("Todo", todosSchema);

const todo1 = new Todo({
  name: "Testing"
});

const todo2 = new Todo({
  name: "The"
});

const todo3 = new Todo({
  name: "Database"
});

const defaultItems = [todo1, todo2, todo3];

app.get("/", (req, res) => { // 6. Then rurun ulit etong get root route
  const newDate = new Date();
  const options = {
    day: "numeric",
    weekday: "short",
    month: "short"
  }

  const day = newDate.toLocaleDateString("en-US", options);

  Todo.find((err, todos) => {
    if (todos.length === 0) {
      // Add these default items if todos length is zero.
      Todo.insertMany(defaultItems, (err) => {
        if (!err) {
          console.log("Successfully added documents.");
        } else {
          console.log(err);
        }
      })
      res.redirect("/");
    } 

    if (!err) {
      res.render("index", {day: day, todos: todos})
    } else {
      console.log(err);
    }
  })

  ; // 7. Then ipapasa yung value ng todos(todos <- an array in this case) sa .ejs file na specified sa first parameter // Fudgeee... kapag hinanap na nya specified file sa first parameter, parang yung ginagawa ng sendFile na pala ang trabaho nya(sa get ilalagay)
})

app.post("/", (req, res) => { // 2. Then pupunta sa post request na eto na may route na root
  // const newTodo = ; // 3. Check the value of the input

  // todos.push(newTodo); // 4. Then ipupush etong value na nakuha sa todos array

  const todo = new Todo({
    name: req.body.newTodo
  })

  todo.save();

  res.redirect("/"); // 5. Then ireredirect sa root route // Kapag hindi sinamahan ng res.redirect("/") (need to pass in the path i.e. "/" etc) mag-loload lang sya without 
})

app.post("/delete", (req, res) => {
  const checkbox = req.body.checkbox;

  Todo.deleteOne({id: checkbox}, (err) => {
    if (!err) {
      console.log("Successfully deleted a document.");
      res.redirect("/")
    } else {
      console.log(err);
    }
  });

})

app.listen(3000, () => {
  console.log("Server has started on port 3000.");
})

// switch ("Ellow") {
//   case "pwe":
//     console.log("Test");
//     break;
//   case "ewp":
//     console.log("ewe");
//     break;
//   default: "Ellow" 
// }