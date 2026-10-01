const mongoose = require("mongoose");
require("dotenv").config();

//1

mongoose.connect("mongodb://127.0.0.1:27017/mongoose", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//2

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

//3

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "John",
    age: 30,
    favoriteFoods: ["Pizza", "Burger"]
  });

  person.save((err, data) => {
    if (err) {
      return done(err);
    }

    done(null, data);
  });
};

//4

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      return done(err);
    }

    done(null, data);
  });
};

//5

const findPeopleByName = (personName, done) => {
  Person.find(
    {
      name: personName
    },
    (err, data) => {
      if (err) {
        return done(err);
      }

      done(null, data);
    }
  );
};

//6

const findOneByFood = (food, done) => {
  Person.findOne(
    {
      favoriteFoods: food
    },
    (err, data) => {
      if (err) {
        return done(err);
      }

      done(null, data);
    }
  );
};

//7

const findPersonById = (personId, done) => {
  Person.findById(
    {
      _id: personId
    },
    (err, data) => {
      if (err) {
        return done(err);
      }

      done(null, data);
    }
  );
};


//8

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) {
      return done(err);
    }

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) {
        return done(err);
      }

      done(null, updatedPerson);
    });
  });
};


//9

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {
      name: personName
    },
    {
      age: ageToSet
    },
    {
      new: true
    },
    (err, updatedPerson) => {
      if (err) {
        return done(err);
      }

      done(null, updatedPerson);
    }
  );
};


//10

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, removedPerson) => {
      if (err) {
        return done(err);
      }

      done(null, removedPerson);
    }
  );
};

//11

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove(
    {
      name: nameToRemove
    },
    (err, result) => {
      if (err) {
        return done(err);
      }

      done(null, result);
    }
  );
};

//12

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({
    favoriteFoods: foodToSearch
  })
    .sort({
      name: 1
    })
    .limit(2)
    .select({
      age: 0
    })
    .exec((err, data) => {
      if (err) {
        return done(err);
      }

      done(null, data);
    });
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
