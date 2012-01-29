module('util');

test('keys', function() {
    var obj_test = {'a': 1, 'cc': 2, 'ddd': 3, 'baf': 500};

    deepEqual(plphp.util.keys(obj_test), ['a', 'cc', 'ddd', 'baf'], 'Non-sorted keys dont match');
    deepEqual(plphp.util.keys(obj_test, true), ['a', 'baf', 'cc', 'ddd'], 'Sorted keys dont match');
    deepEqual(plphp.util.keys(obj_test, function(a, b) {return a < b;}), ['ddd', 'cc', 'baf', 'a'], 'Reverse sorted keys dont match');
});

test('values', function() {
    var obj_test_1 = {'a': 1, 'cc': 2, 'ddd': 3, 'baf': 500},
        obj_test_2 = [1, 2, 4, 6];

    deepEqual(plphp.util.values(obj_test_1), [1, 2, 3, 500], 'Normal object failed');
    deepEqual(plphp.util.values(obj_test_2), [1, 2, 4, 6], 'Normal array failed');
    raises(function() {
        plphp.util.values(10);
    }, 'Using number failed to throw error');
});

test('iterating', function() {
    var test_input = {1: 'a', 2: 'b', 3: 'c', 4: 'eee'},
        iterator = plphp.util.iterator(test_input),
        test_output = ['a', 'b', 'c', 'eee', null],
        index = 0,
        row;

    equal(typeof iterator, 'object', 'Iterator is not a function');

    while (row = iterator.current()) {
        equal(row, test_output[index]);
        ok(iterator.valid());
        equal(iterator.next(), test_output[++index], test_output[index - 1]);
    }

    ok(!iterator.valid(), 'Iterator is past end but not invalid');

    iterator.rewind();
    equal(iterator.current(), test_output[0]);
});

test('isArray', function() {
    equal(plphp.util.isArray([]), true, 'isArray failed with array');
    equal(plphp.util.isArray(new Array()), true, 'isArray failed with array');
    equal(plphp.util.isArray({}), false, 'isArray failed with object');
    equal(plphp.util.isArray(1), false, 'isArray failed with object');
    equal(plphp.util.isArray(''), false, 'isArray failed with object');
});

test('toArray', function() {
    var test_array_1 = [1, 2, 3, 4, 5],
        test_array_2 = {0: 1, 1: 2, 2: 3, 3: 4, 4: 5},
        test_array_3 = {a: 1, b: 2, c: 3, e: 4, d: 5},
        test_array_4 = {a: 1, b: 2, c: 3, e: 4, d: 5};

    deepEqual(plphp.util.toArray(test_array_1), test_array_1, 'toArray failed on normal array');
    deepEqual(plphp.util.toArray(test_array_2), test_array_1, 'toArray failed on array_like object');
    deepEqual(plphp.util.toArray(test_array_3, true), test_array_1, 'toArray failed on normal object');
    deepEqual(plphp.util.toArray(test_array_4), [], 'toArray failed on normal object with no key disregard');
});

test('inArray', function() {
    var array_1 = ['a', 'c', 'e', 'f'],
        array_2 = {0: 'a', 1: 'c', 2: 'e', 3: 'f'},
        array_3 = {a: 'a', b: 'c', c: 'e', d: 'f'};
    equal(plphp.util.inArray(array_1, 'e'), true, 'inArray failed on normal array');
    equal(plphp.util.inArray(array_2, 'e'), true, 'inArray failed on normal array');
    equal(plphp.util.inArray(array_3, 'e'), false, 'inArray failed on normal object');
});
