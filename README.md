# @outmark/anno-type

A twoslash-inspired developer-oriented type-checking solution.

## Getting Started

As of now, this is still a very early prototype with little to no documentation and unstable if not faulty code.

You may get some idea on how the tool works by checking out the package scripts in the test folder:

- To run all the examples at once:

  ```sh
  # You can also just run this script in the test folder directly
  yarn workspace anno-type-test annotate:examples
  ```

- To run a specific example with more verbose output:
  
  ```sh
  # Adding 1 to 3 exclamation marks anywhere dumps the current state.
  # In this example the !! comes at the end and so it will dump the final state.
  yarn workspace anno-type-test annotate:twoslash:examples \!\!
  ```

  > **Note**: Interactive shells often require escaping each `\!` in a command line input.
