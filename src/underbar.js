(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, index) {
    if (index === 0) {
      return [];
    } else if (index > array.length) {
      return array;
    } else if (index === undefined) {
      return array[array.length - 1];
    } else {
      return array.slice(index - 1, array.length);
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  //arguments[0]=collection
  //arguments[1]=iterator
  _.each = function(collection, iterator) {
    if (Array.isArray(collection) === true) {
      for (var i = 0; i < collection.length; i++) {
        if (iterator.length  === 1) {
          iterator(collection[i]);
        } else if (iterator.length === 2) {
          iterator(collection[i], i);
        } else if (iterator.length === 3) {
          iterator(collection[i], i, collection);
        }
      }
    } else {
      for (var key in collection) {
        if (iterator.length === 1) {
          iterator(collection[key]);
        } else if (iterator.length === 2) {
          iterator(collection[key], key);
        } else if (iterator.length === 3) {
          iterator(collection[key], key, collection);
        }

      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var filtered = []
    _.each(collection, function(item){
     if ( test(item) === true ){
       filtered.push(item);
     }
   });

    return filtered;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var array = [];
    _.each(collection, function(item) {
      if (test(item) === false) {
        array.push(item);
      }
    });
    return array;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var removeDuplicates = [];
    var uniques = new Set();

    for (var i = 0; i < array.length; i++) {
      uniques.add(array[i]);
    }
    //iterate through uniques
    for (var key of uniques) {
      //push keys onto remove duplicates
      removeDuplicates.push(key);
    }
    return removeDuplicates;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var mapped = [];
    for (var i = 0; i < collection.length; i++) {
      mapped.push(iterator(collection[i]));
    }
    return mapped;
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  //input collection, iterator function, optional accumulator
  //ouput accumulator
  _.reduce = function(collection, iterator, accumulator) {
    var total = accumulator;
    if (Array.isArray(collection) === true) {
      if (accumulator === undefined) {
        total = collection[0];
        for (var i = 0; i < collection.length - 1; i++) {
          total = iterator(total, collection[i + 1]);
        }
      } else {
        //iterate through the collection
          //do iterate function on each element in collection
        for (var i = 0; i < collection.length; i++) {
          total = iterator(total, collection[i]);
        }
      }
    } else {
      for (var key in collection) {
        total = iterator(total, collection[key]);
      }
    }
    return total;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    return _.reduce(collection, function (isPassing, item) {
      if (isPassing === false) {
        return false;
      } else if (iterator === undefined) {
        if (JSON.stringify(item) === JSON.stringify({})) {
          return true;
        } else {
          return item == true;
        }
      } else {
        if (JSON.stringify(iterator(item)) === JSON.stringify({})) {
          return true;
        } else {
          return iterator(item) == true;
        }
      }
    }, true);
    // Default value is true
    // TIP: Try re-using reduce() here.
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    //Reduce passes the accumulator and then the new value into the iterator
    //so if two values are given, by the default iterator should return the
    //second element, since the first will be the default value true

    //I'm having trouble getting the tests that use the identity function to work
    //because of the way I implemented reduce and every,
    /*
    if ((iterator === undefined) || (iterator.length === 1)) {
      iterator = function() {
        return arguments[1];
      };
    }

    for (var i = 0; i < collection.length; i++) {
      if (_.every(collection[i], iterator)) {
        return true;
      }
    }
    return false;
    */
    return _.reduce(collection, function (isPassing,item) {
      if (isPassing === true) {
        return true;
      } else if (iterator === undefined) {
        if (JSON.stringify(item) === JSON.stringify({})) {
          return true;
        } else if ((typeof item === 'string') && (item.length > 0)) {
          return true;
        } else {
          return item == true;
        }
      } else {
        if (JSON.stringify(iterator(item)) === JSON.stringify({})) {
          return true;
        } else if ((typeof item === 'string') && (item.length > 0)) {
          return true;
        } else {
          return iterator(item) == true;
        }
      }
    }, false);
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla

  //input an object of key value pairs to be updated and
    //additional objects that will update the first object
  //ouput the first object with the updated key value pairs
  //procedure add the new pairs to the first obj,
    //or overwrite values of existing keys
  _.extend = function(obj) {
    var sourceObjs = [];

    for (var i = 1; i < arguments.length; i++) {
      sourceObjs.push(arguments[i]);
    }
    //iterate through the arguments after obj
      //for each object
        //update the first obj with the key-value pairs
    for (var i = 0; i < sourceObjs.length; i++) {
      for (var key in sourceObjs[i]) {
        obj[key] = sourceObjs[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var sourceObjs = [];

    for (var i = 1; i < arguments.length; i++) {
      sourceObjs.push(arguments[i]);
    }
    //iterate throught the arguments after obj
      //iterate through the key-value pairs in the objects
        //if a key doesn't exist in obj
          //then add it to obj
    for (var i = 0; i < sourceObjs.length; i++) {
      for (var key in sourceObjs[i]) {
        if (obj.hasOwnProperty(key) === false) {
          obj[key] = sourceObjs[i][key];
        }
      }
    }
    return obj;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var cache = {};

    return function() {
      var argumentInput = JSON.stringify(arguments);

      if(!cache.hasOwnProperty(argumentInput)) {
        (cache[argumentInput] = func.apply(this, arguments));
      }
      //store the results and then return it
      return cache[argumentInput];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    //input take the arguments after somefunction and the wait
    //push the arguments to an accessible array
    var argArr = [];

    //use a for loop to push in to an array
    for (var i = 0; i < arguments.length; i++) {
      argArr.push(arguments[i]);
    }

    //take just the needed arguments
    var args = argArr.slice(2);

    return setTimeout(function(){
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    //copy the array
    var copy = array.slice();
    var shuffled = [];
    //swap or...
    //add the number to a new shuffled array

    //produce a random number of an index
    var randomIndex = Math.floor(Math.random() * (copy.length - 1));

    //make a loop that goes thru the copy array starting from the random index
    while(copy.length > 0) {
      var temp;
      temp = copy[randomIndex];
      shuffled.push(temp);
      // copy.length = copy.length - 1
      copy.splice(randomIndex, 1);
      // update ranodm number
      randomIndex = Math.floor(Math.random() * (copy.length - 1));
    }
    // return the new suffled array
    return shuffled;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(item) {
      var newItem = typeof functionOrKey === 'string' ? item[functionOrKey] : functionOrKey;
      return newItem.apply(item, args);
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
   if (typeof iterator === 'string') {
     return collection.sort(function(a, b) {
       return a[iterator] - b[iterator];
     });
   } else {
     return collection.sort(function(a, b) {
       return iterator(a) - iterator(b);
     });
   }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
   // var zippedArrays = []
   // use arguments going into zip and
   var zippedArrays = [];
   // use each to go through each argument
   // each (arguments, function (item))

   var largestLength = 0;

   _.each(arguments, function(item) {

     if (item.length > largestLength ) {
       largestLength = item.length;
     }

   })

   for (var i = 0; i < largestLength; i++) {
     zippedArrays.push([]);
   }

   _.each(arguments, function(item) {

     for (var i = 0; i < largestLength; i++) {
       zippedArrays[i].push(item[i]);
     }

   });
   // for loop to push
   // return  zipped arrays []
   return zippedArrays;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    _.each(nestedArray, function(item) {
      if (Array.isArray(item))
        nestedArray = _.flatten([].concat.apply([], nestedArray));
    });
   return nestedArray;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
