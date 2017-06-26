# ReactiveX Test
Toy repo aiming to demonstrate the power of reactive programming

# Setup

* Clone this repo
* `npm install`

Note: typescript is expected to be already installed globally. If it is not, you can do this with:

`npm install -g typescript`

# Run it

Run `npm run watch`
It will detect changes in files and recompile and run on it.

Note: When a typescript compile error occurred, it stops observing file changes. In that case `CTRL-C` and run again.

# How to navigate

## index.ts

Main entry point. From here you can enable the different import statements at the beginning of the file.

## tests.ts

Here the tests of 2 functions are defined: function `getFirstNr()` and `arrayProduct()`. These functions are defined in their own files with appropriate naming.

To improve your reactiveX skills, delete the implementation of those functions and write them anew. Start with a naive convoluted implementation and work your way towards a more compact and expressive one.

## webRequests.ts

Here you can experiment with observable rest queries.

## other .ts files

Different experiments that might have nothing to do with reactiveX at all.
