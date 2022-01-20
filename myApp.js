require('dotenv').config();

let uri="mongodb+srv://Shravani27:"+process.env.pw+ "@cluster0.gbyer.mongodb.net/DB1?retryWrites=true&w=majority";

let mongoose=require('mongoose');
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


/**Create a person schema called personSchema having this prototype:

- Person Prototype -
--------------------
name : string [required]
age :  number
favoriteFoods : array of strings (*)**/
//Create personSchema
let personSchema=new mongoose.Schema({
  name:{type:String,required:true},
  age:Number,
  favoriteFoods:[String]

})
//Create Person model
let Person=mongoose.model('Person',personSchema)

/**let dave=new Person({name:'Dave',age:27,favoriteFoods:['x','y']})
console.log(dave)*/

/**Within the createAndSavePerson function, create a document instance using the Person model constructor you built before. Pass to the constructor an object having the fields name, age, and favoriteFoods. Their types must conform to the ones in the personSchema. Then, call the method document.save() on the returned document instance. Pass to it a callback using the Node convention. */
const createAndSavePerson = (done) => {
  let Revanth=new Person({name:'Revanth',age:23,
  favoriteFoods:['PavBhaji']})
  Revanth.save((error,data)=>{
    if (error){
      console.log(error);
    }else{
      done(null,data);
    }
  })
};
  
/**create many instances of your models, e.g. when seeding a database with initial data. Model.create() takes an array of objects like [{name: 'John', ...}, {...}, ...] as the first argument, and saves them all in the db. */
let arrayOfPeople=[
  {name:'Akshay',age:23,
  favoriteFoods:['Bread','butter']},
  {name:'Akash',age:21,
  favoriteFoods:['Panipuri','bhjel']},
  {name:'Kiran',age:23,
  favoriteFoods:['Noodles','Halwa']}
] 
const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople,(error,data)=>
  {
    if (error){
      console.log(error);
    }else{
      done(null,data);
    }

  })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},(error,arrayOfPeople)=>{
    if(error){
      console.log(error);
    }
    else{
      done(null ,arrayOfPeople);
    }

  })
  
};

/**Model.findOne() behaves like Model.find(), but it returns only one document (not an array), even if there are multiple items. It is especially useful when searching by properties that you have declared as unique. */
const findOneByFood = (food, done) => {

  Person.findOne({favoriteFoods:{$all:[food]}},
  (error,results)=>{
    if(error){
      console.log(error);
    }
    else{
      done(null ,results);
    }

  })
  
};
/**When saving a document, MongoDB automatically adds the field _id, and set it to a unique alphanumeric key. Searching by _id is an extremely frequent operation, so Mongoose provides a dedicated method for it.
 * Modify the findPersonById to find the only person having a given _id, using Model.findById() -> Person. Use the function argument personId as the search key.
 */
const findPersonById = (personId, done) => {

  Person.findById(personId,(error,result)=>{
    if(error){
      console.log(error);
    }
    else{
      done(null,result);
    }
  })
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(error,result)=>{
      if(error){
      console.log(error);
    }
    else{
      result.favoriteFoods.push(foodToAdd)
      result.save((error,UpdateFood)=>{
        if(error){
      console.log(error);
    }
    else{
      done(null,UpdateFood)
    }
      })
    }

  })

  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(error,UpdatedAge)=>{
    if(error){
      console.log(error);
    }
    else{
      done(null ,UpdatedAge);
    }
  })

  
};

/**findByIdAndRemove and findOneAndRemove are like the previous update methods. They pass the removed document to the db. As usual, use the function argument personId as the search key.
 * 
Modify the removeById function to delete one person by the person's _id. You should use one of the methods findByIdAndRemove() or findOneAndRemove().
 */

const removeById = (personId, done) => {

  Person.findByIdAndRemove(personId,(error,deleteRecord)=>{
    if(error){
      console.log(error);
    }
    else{
      done(null ,deleteRecord);
    }
  })
  
};

/** Model.remove() is useful to delete all the documents matching given criteria.
 * Modify the removeManyPeople function to delete all the people whose name is within the variable nameToRemove, using Model.remove(). Pass it to a query document with the name field set, and a callback.
 * The Model.remove() doesn’t return the deleted document, but a JSON object containing the outcome of the operation, and the number of items affected. Don’t forget to pass it to the done() callback, since we use it in tests.
 */
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name:nameToRemove},(error,JSONStatusRemove)=>{
    if(error){
      console.log(error);
    }
    else{
      done(null ,JSONStatusRemove);
    }

  })

  
};
/**You can store the query in a variable for later use. This kind of object enables you to build up a query using chaining syntax. The actual db search is executed when you finally chain the method .exec(). You always need to pass your callback to this last method. There are many query helpers, here we'll use the most commonly used.
 * Modify the queryChain function to find people who like the food specified by the variable named foodToSearch. Sort them by name, limit the results to two documents, and hide their age. Chain .find(), .sort(), .limit(), .select(), and then .exec(). Pass the done(err, data) callback to exec().
 */
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods:{$all:[foodToSearch]}})
    .sort({name:'asc'})
    .limit(2)
    .select('-age')
    .exec((error,result)=>{
      if(error){
        console.log(error)
      }
      else{
          done(null ,result);
      }
    })

  
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
