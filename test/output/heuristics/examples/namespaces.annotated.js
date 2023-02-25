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
    // @defs: const number1: 1
    //
    // @docs: I'm number1

    /**/ function1;
    //   ^?
    // @defs: const function1: () => void
    //
    // @docs: I'm function1
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
    // @defs: const number1: number
    //
    // @docs: I'm functionNamespace1.number1

    /**/ context.number1;
    //           ^?
    // @defs: (property) functionNamespace1.number1: number
    //
    // @docs: I'm functionNamespace1.number1

    /**/ function1;
    //   ^?
    // @defs: const function1: () => void
    //
    // @docs: I'm functionNamespace1.function1

    /**/ context.function1;
    //           ^?
    // @defs: (property) functionNamespace1.function1: () => void
    //
    // @docs: I'm functionNamespace1.function1

    /**/ context?.['function1'];
    //             ^?
    // @defs: (property) functionNamespace1.function1: () => void
    //
    // @docs: I'm functionNamespace1.function1
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
    // @defs: const number1: number
    //
    // @docs: I'm objectNamespace1.number1

    /**/ context.number1;
    //           ^?
    // @defs: (property) objectNamespace1.number1: number
    //
    // @docs: I'm objectNamespace1.number1

    /**/ number1b;
    //   ^?
    // @defs: const number1b: number
    //
    // @docs: I'm objectNamespace1.number1b

    /**/ context.number1b;
    //           ^?
    // @defs: (property) objectNamespace1.number1b: number
    //
    // @docs: I'm objectNamespace1.number1b

    /**/ function1;
    //   ^?
    // @defs: const function1: () => void
    //
    // @docs: I'm objectNamespace1.function1

    /**/ context.function1;
    //           ^?
    // @defs: (property) objectNamespace1.function1: () => void
    //
    // @docs: I'm objectNamespace1.function1

    /**/ context?.['function1'];
    //             ^?
    // @defs: (property) objectNamespace1.function1: () => void
    //
    // @docs: I'm objectNamespace1.function1
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
    // @defs: const number1: number
    //
    // @docs: I'm objectNamespace2.number1

    /**/ context.number1;
    //           ^?
    // @defs: (property) number1: number
    //
    // @docs: I'm objectNamespace2.number1

    /**/ function1;
    //   ^?
    // @defs: const function1: () => void
    //
    // @docs: I'm objectNamespace2.function1

    /**/ context.function1;
    //           ^?
    // @defs: (property) function1: () => void
    //
    // @docs: I'm objectNamespace2.function1

    /**/ context?.['function1'];
    //             ^?
    // @defs: (property) function1: () => void
    //
    // @docs: I'm objectNamespace2.function1
}

// @source: test/sources/examples/namespaces.js 