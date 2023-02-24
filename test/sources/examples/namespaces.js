// @strict: true
// @allowUnreachableCode: false
// @noImplicitAny: true

/** I'm number1 */
const number1 = 1;

/** I'm function1 */
const function1 = () => { };

{
    /**/ number1;
    //   ^?
    // @defs:
    // @docs:

    /**/ function1;
    //   ^?
    // @defs:
    // @docs:
}

function functionNamespace1() { };

/** I'm functionNamespace1.number1 */
functionNamespace1.number1 = number1;

/** I'm functionNamespace1.function1 */
functionNamespace1.function1 = function1;

{
    const context = functionNamespace1;
    const { number1, function1 } = context;

    /**/ number1;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.number1;
    //           ^?
    // @defs:
    // @docs:

    /**/ function1;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.function1;
    //           ^?
    // @defs:
    // @docs:

    /**/ context?.['function1'];
    //             ^?
    // @defs:
    // @docs:
}

const objectNamespace1 = {};

/** I'm objectNamespace1.number1 */
objectNamespace1.number1 = number1;

/** I'm objectNamespace1.number1b */
objectNamespace1.number1b = functionNamespace1.number1;

/** I'm objectNamespace1.function1 */
objectNamespace1.function1 = function1;


{
    const context = objectNamespace1;
    const { number1, number1b, function1 } = context;

    /**/ number1;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.number1;
    //           ^?
    // @defs:
    // @docs:

    /**/ number1b;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.number1b;
    //           ^?
    // @defs:
    // @docs:

    /**/ function1;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.function1;
    //           ^?
    // @defs:
    // @docs:

    /**/ context?.['function1'];
    //             ^?
    // @defs:
    // @docs:
}

const objectNamespace2 = {
    /** I'm objectNamespace2.number1 */
    number1,
    /** I'm objectNamespace2.function1 */
    function1
};

{
    const context = objectNamespace2;
    const { number1, function1 } = context;

    /**/ number1;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.number1;
    //           ^?
    // @defs:
    // @docs:

    /**/ function1;
    //   ^?
    // @defs:
    // @docs:

    /**/ context.function1;
    //           ^?
    // @defs:
    // @docs:

    /**/ context?.['function1'];
    //             ^?
    // @defs:
    // @docs:
}

// @source: test/sources/examples/namespaces.js