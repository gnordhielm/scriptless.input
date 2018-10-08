10.6.18

The ultimate goal, I think, is to give users the pieces to compose complex inline searches - the type we're trying to build at lei.

To start, though, I just want to offer reliable, basically styled and easily customizable components for getting basic, typed information.

A good next step would be to add an adapter like leiops icon has. Users could specify their own icons, decide on basic keyboard shortcut behaviors, turn things on and off globally, etc. (or plug in their own fuzzy match implementation).

I also want to focus on moving toward composable components - for example a user input that can get its own options and whatnot. Or a simple recipe for wrapping existing components into new ones by specifying an icon and the contents of their dropdown 