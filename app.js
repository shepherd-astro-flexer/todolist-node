const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const todos = [];

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => { // 6. Then rurun ulit etong get root route
  const newDate = new Date();
  const options = {
    day: "numeric",
    weekday: "long",
    month: "long"
  }

  const day = newDate.toLocaleDateString("en-US", options);

  res.render("index", {day: day, todos: todos}); // 7. Then ipapasa yung value ng todos(todos <- an array in this case) sa .ejs file na specified sa first parameter // Fudgeee... kapag hinanap na nya specified file sa first parameter, parang yung ginagawa ng sendFile na pala ang trabaho nya(sa get ilalagay)
})

app.post("/", (req, res) => { // 2. Then pupunta sa post request na eto na may route na root
  const newTodo = req.body.newTodo; // 3. Check the value of the input

  todos.push(newTodo); // 4. Then ipupush etong value na nakuha sa todos array

  res.redirect("/"); // 5. Then ireredirect sa root route // Kapag hindi sinamahan ng res.redirect("/") (need to pass in the path i.e. "/" etc) mag-loload lang sya without 
})

app.listen(3000, () => {
  console.log("Server has started on port 3000.");
})