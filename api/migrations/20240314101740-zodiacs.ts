module.exports = {
  async up(db, client) {
    await db.createCollection('zodiacs', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name",  "startDate", "endDate"],
          properties: {
            name: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            startDate: {
              bsonType: "date",
              description: "must be a date and is required"
            },
            endDate: {
              bsonType: "date",
              description: "must be a date and is required"
            },
            createdAt: {
              bsonType: "date",
              description: "must be a date"
            },
            updatedAt: {
              bsonType: "date",
              description: "must be a date"
            },
          }
        }
      }
    })

    const zodiacCollection = db.collection('zodiacs');
    const zodiacs = [
      { startDate: new Date("1926-02-13"), endDate: new Date("1927-02-01"), name: "Tiger" },
      { startDate: new Date("1927-02-02"), endDate: new Date("1928-01-22"), name: "Rabbit" },
      { startDate: new Date("1928-01-23"), endDate: new Date("1929-02-09"), name: "Dragon" },
      { startDate: new Date("1929-02-10"), endDate: new Date("1930-01-29"), name: "Snake" },
      { startDate: new Date("1930-01-30"), endDate: new Date("1931-02-16"), name: "Horse" },
      { startDate: new Date("1931-02-17"), endDate: new Date("1932-02-05"), name: "Goat" },
      { startDate: new Date("1932-02-06"), endDate: new Date("1933-01-25"), name: "Monkey" },
      { startDate: new Date("1933-01-26"), endDate: new Date("1934-02-13"), name: "Rooster" },
      { startDate: new Date("1934-02-14"), endDate: new Date("1935-02-03"), name: "Dog" },
      { startDate: new Date("1935-02-04"), endDate: new Date("1936-01-23"), name: "Boar" },
      { startDate: new Date("1936-01-24"), endDate: new Date("1937-02-10"), name: "Rat" },
      { startDate: new Date("1937-02-11"), endDate: new Date("1938-01-30"), name: "Ox" },
      { startDate: new Date("1938-01-31"), endDate: new Date("1939-02-18"), name: "Tiger" },
      { startDate: new Date("1939-02-19"), endDate: new Date("1940-02-07"), name: "Rabbit" },
      { startDate: new Date("1940-02-08"), endDate: new Date("1941-01-26"), name: "Dragon" },
      { startDate: new Date("1941-01-27"), endDate: new Date("1942-02-14"), name: "Snake" },
      { startDate: new Date("1942-02-15"), endDate: new Date("1943-02-04"), name: "Horse" },
      { startDate: new Date("1943-02-05"), endDate: new Date("1944-01-24"), name: "Goat" },
      { startDate: new Date("1944-01-25"), endDate: new Date("1945-02-12"), name: "Monkey" },
      { startDate: new Date("1945-02-13"), endDate: new Date("1946-02-01"), name: "Rooster" },
      { startDate: new Date("1946-02-02"), endDate: new Date("1947-01-21"), name: "Dog" },
      { startDate: new Date("1947-01-22"), endDate: new Date("1948-02-09"), name: "Boar" },
      { startDate: new Date("1948-02-10"), endDate: new Date("1949-01-28"), name: "Rat" },
      { startDate: new Date("1949-01-29"), endDate: new Date("1950-02-16"), name: "Ox" },
      { startDate: new Date("1950-02-17"), endDate: new Date("1951-02-05"), name: "Tiger" },
      { startDate: new Date("1951-02-06"), endDate: new Date("1952-01-26"), name: "Rabbit" },
      { startDate: new Date("1952-01-27"), endDate: new Date("1953-02-13"), name: "Dragon" },
      { startDate: new Date("1953-02-14"), endDate: new Date("1954-02-02"), name: "Snake" },
      { startDate: new Date("1954-02-03"), endDate: new Date("1955-01-23"), name: "Horse" },
      { startDate: new Date("1955-01-24"), endDate: new Date("1956-02-11"), name: "Goat" },
      { startDate: new Date("1956-02-12"), endDate: new Date("1957-01-30"), name: "Monkey" },
      { startDate: new Date("1957-01-31"), endDate: new Date("1958-02-17"), name: "Rooster" },
      { startDate: new Date("1958-02-18"), endDate: new Date("1959-02-07"), name: "Dog" },
      { startDate: new Date("1959-02-08"), endDate: new Date("1960-01-27"), name: "Boar" },
      { startDate: new Date("1960-01-28"), endDate: new Date("1961-02-14"), name: "Rat" },
      { startDate: new Date("1961-02-15"), endDate: new Date("1962-02-04"), name: "Ox" },
      { startDate: new Date("1962-02-05"), endDate: new Date("1963-01-24"), name: "Tiger" },
      { startDate: new Date("1963-01-25"), endDate: new Date("1964-02-12"), name: "Rabbit" },
      { startDate: new Date("1964-02-13"), endDate: new Date("1965-02-01"), name: "Dragon" },
      { startDate: new Date("1965-02-02"), endDate: new Date("1966-01-20"), name: "Snake" },
      { startDate: new Date("1966-01-21"), endDate: new Date("1967-02-08"), name: "Horse" },
      { startDate: new Date("1967-02-09"), endDate: new Date("1968-01-29"), name: "Goat" },
      { startDate: new Date("1968-01-30"), endDate: new Date("1969-02-16"), name: "Monkey" },
      { startDate: new Date("1969-02-17"), endDate: new Date("1970-02-05"), name: "Rooster" },
      { startDate: new Date("1970-02-06"), endDate: new Date("1971-01-26"), name: "Dog" },
      { startDate: new Date("1971-01-27"), endDate: new Date("1972-01-15"), name: "Boar" },
      { startDate: new Date("1972-01-16"), endDate: new Date("1973-02-02"), name: "Rat" },
      { startDate: new Date("1973-02-03"), endDate: new Date("1974-01-22"), name: "Ox" },
      { startDate: new Date("1974-01-23"), endDate: new Date("1975-02-10"), name: "Tiger" },
      { startDate: new Date("1975-02-11"), endDate: new Date("1976-01-30"), name: "Rabbit" },
      { startDate: new Date("1976-01-31"), endDate: new Date("1977-02-17"), name: "Dragon" },
      { startDate: new Date("1977-02-18"), endDate: new Date("1978-02-06"), name: "Snake" },
      { startDate: new Date("1978-02-07"), endDate: new Date("1979-01-27"), name: "Horse" },
      { startDate: new Date("1979-01-28"), endDate: new Date("1980-02-15"), name: "Goat" },
      { startDate: new Date("1980-02-16"), endDate: new Date("1981-02-04"), name: "Monkey" },
      { startDate: new Date("1981-02-05"), endDate: new Date("1982-01-24"), name: "Rooster" },
      { startDate: new Date("1982-01-25"), endDate: new Date("1983-02-12"), name: "Dog" },
      { startDate: new Date("1983-02-13"), endDate: new Date("1984-02-01"), name: "Boar" },
      { startDate: new Date("1984-02-02"), endDate: new Date("1985-02-19"), name: "Rat" },
      { startDate: new Date("1985-02-20"), endDate: new Date("1986-02-08"), name: "Ox" },
      { startDate: new Date("1986-02-09"), endDate: new Date("1987-01-28"), name: "Tiger" },
      { startDate: new Date("1987-01-29"), endDate: new Date("1988-02-16"), name: "Rabbit" },
      { startDate: new Date("1988-02-17"), endDate: new Date("1989-02-05"), name: "Dragon" },
      { startDate: new Date("1989-02-06"), endDate: new Date("1990-01-26"), name: "Snake" },
      { startDate: new Date("1990-01-27"), endDate: new Date("1991-02-14"), name: "Horse" },
      { startDate: new Date("1991-02-15"), endDate: new Date("1992-02-03"), name: "Goat" },
      { startDate: new Date("1992-02-04"), endDate: new Date("1993-01-22"), name: "Monkey" },
      { startDate: new Date("1993-01-23"), endDate: new Date("1994-02-09"), name: "Rooster" },
      { startDate: new Date("1994-02-10"), endDate: new Date("1995-01-30"), name: "Dog" },
      { startDate: new Date("1995-01-31"), endDate: new Date("1996-02-18"), name: "Boar" },
      { startDate: new Date("1996-02-19"), endDate: new Date("1997-02-06"), name: "Rat" },
      { startDate: new Date("1997-02-07"), endDate: new Date("1998-01-27"), name: "Ox" },
      { startDate: new Date("1998-01-28"), endDate: new Date("1999-02-15"), name: "Tiger" },
      { startDate: new Date("1999-02-16"), endDate: new Date("2000-02-04"), name: "Rabbit" },
      { startDate: new Date("2000-02-05"), endDate: new Date("2001-01-23"), name: "Dragon" },
      { startDate: new Date("2001-01-24"), endDate: new Date("2002-02-11"), name: "Snake" },
      { startDate: new Date("2002-02-12"), endDate: new Date("2003-01-31"), name: "Horse" },
      { startDate: new Date("2003-02-01"), endDate: new Date("2004-01-21"), name: "Goat" },
      { startDate: new Date("2004-01-22"), endDate: new Date("2005-02-08"), name: "Monkey" },
      { startDate: new Date("2005-02-09"), endDate: new Date("2006-01-28"), name: "Rooster" },
      { startDate: new Date("2006-01-29"), endDate: new Date("2007-02-17"), name: "Dog" },
      { startDate: new Date("2007-02-18"), endDate: new Date("2008-02-06"), name: "Boar" },
      { startDate: new Date("2008-02-07"), endDate: new Date("2009-01-25"), name: "Rat" },
      { startDate: new Date("2009-01-26"), endDate: new Date("2010-02-13"), name: "Ox" },
      { startDate: new Date("2010-02-14"), endDate: new Date("2011-02-02"), name: "Tiger" },
      { startDate: new Date("2011-02-03"), endDate: new Date("2012-01-22"), name: "Rabbit" },
      { startDate: new Date("2012-01-23"), endDate: new Date("2013-02-09"), name: "Dragon" },
      { startDate: new Date("2013-02-10"), endDate: new Date("2014-01-30"), name: "Snake" },
      { startDate: new Date("2014-01-31"), endDate: new Date("2015-02-18"), name: "Horse" },
      { startDate: new Date("2015-02-19"), endDate: new Date("2016-02-07"), name: "Goat" },
      { startDate: new Date("2016-02-08"), endDate: new Date("2017-01-27"), name: "Monkey" },
      { startDate: new Date("2017-01-28"), endDate: new Date("2018-02-15"), name: "Rooster" },
      { startDate: new Date("2018-02-16"), endDate: new Date("2019-02-04"), name: "Dog" },
      { startDate: new Date("2019-02-05"), endDate: new Date("2020-01-24"), name: "Pig" },
      { startDate: new Date("2020-01-25"), endDate: new Date("2021-02-11"), name: "Rat" },
      { startDate: new Date("2021-02-12"), endDate: new Date("2022-01-31"), name: "Ox" },
      { startDate: new Date("2022-02-01"), endDate: new Date("2023-01-21"), name: "Tiger" },
      { startDate: new Date("2023-01-22"), endDate: new Date("2024-02-09"), name: "Rabbit" }
  ];
  

    await zodiacCollection.insertMany(zodiacs);
  },

  async down(db, client) {
    await db.collection('zodiacs').drop();
  }
};
