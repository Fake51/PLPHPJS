var plphp = (function() {
    var container = {};

    // iterator function - creates
    // an iterator function that allows
    // you to iterate over an object|arrays
    // elements one by one
    function iterator(iteratee) {
        var items = [],
            index = 0,
            item_count = 0,
            helper = {};

        for (var m in iteratee) {
            if (iteratee.hasOwnProperty(m)) {
                items.push(iteratee[m]);
            }
        }

        item_count = items.length;

        helper.next = function() {
            if (index >= item_count) {
                ++index;
                return null;
            } else {
                return items[++index];
            }
        };

        helper.rewind = function() {
            index = 0;
        };

        helper.current = function() {
            if (index >= item_count) {
                return null;
            } else {
                return items[index];
            }
        };

        helper.valid = function() {
            return index < item_count;
        };

        return helper;
    };

    // returns an array of the keys of the given
    // dictionary (object or array)
    // - optionally, use the sort param to sort
    //   the keys
    //   - sort = true:     just a normal sort
    //   - sort = function: function is used for sorting
    function keys(dictionary, sort) {
        var dictionary_keys = [],
            key;

        if (typeof dictionary != 'object') {
            throw {
                name:    'PLPHPError',
                message: 'First param not an object or array'
            };
        }

        for (key in dictionary) {
            if (dictionary.hasOwnProperty(key)) {
                dictionary_keys.push(key);
            }
        }

        if (sort) {
            if (typeof sort == 'function') {
                dictionary_keys.sort(sort);
            } else {
                dictionary_keys.sort();
            }
        }

        return dictionary_keys;
    };

    function values(array_object) {
        var result = [],
            key;

        if (isArray(array_object)) {
            return array_object;
        } else if (typeof array_object == 'object') {
            for (key in array_object) {
                if (array_object.hasOwnProperty(key)) {
                    result.push(array_object[key])
                }
            }

            return result;
        } else {
            throw {
                name:    'PLPHPError',
                message: 'Parameter is not an array or object'
            };
        }
    };

    // checks if an object is in fact an array
    function isArray(test) {
        return {}.toString.call(test) === '[object Array]';
    };

    // converts array like object to array
    // or any normal object if second param is true
    function toArray(from_object, disregard_keys) {
        var result = [],
            keys   = [],
            index  = 0,
            key;

        if (isArray(from_object)) {
            return from_object;
        }

        for (key in from_object) {
            if (from_object.hasOwnProperty(key)) {
                if (disregard_keys) {
                    result[index++] = from_object[key];
                } else if (typeof parseInt(key, 10) != 'NaN') {
                    result[parseInt(key, 10)] = from_object[key];
                }
            }
        }

        return result;
    };

    // checks if an object has the given value
    function inArray(array_object, value) {
        var local_array = isArray(array_object)
            ? array_object
            : toArray(array_object);

        return local_array.indexOf(value) !== -1;
    };

    container.util = {
        iterator: iterator,
        inArray:  inArray,
        toArray:  toArray,
        isArray:  isArray,
        keys:     keys,
        values:   values
    };

    return container;
}());
