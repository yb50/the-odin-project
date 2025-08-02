const findTheOldest = function(people) {
  return people.reduce((oldest, current) => {
    const currentYear = new Date().getFullYear();

    const getAge = person => {
      const death = person.yearOfDeath || currentYear;
      return death - person.yearOfBirth;
    };

    return getAge(current) > getAge(oldest) ? current : oldest;
  });
};

// Do not edit below this line
module.exports = findTheOldest;
