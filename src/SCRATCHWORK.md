REF

https://react-select.com/props

FOCUS BEHAVIOR

It would be good if the focus on the inputs themselves could be controlled, we don't quite have that now.

It should be really easy to tab around in a form made of these inputs - and to use arrow keys/esc/enter to do the rest.

Maybe, on a select input, focus should remain in some sense, so that hitting an arrow key after selecting a value opens the dropdown again.

MOBILE FRIENDLY

At the moment, this is not going to work very well for mobile devices.

Really, on detecting a mobile environment, we should let the mobile browser decide how to render the actual input. That gets a little dicey. 

ADAPTER

custom icons
custom text match handler
custom keyboard shortcuts

NOTES

The ultimate goal, I think, is to give users the pieces to compose complex inline searches - the type we're trying to build at lei.

To start, though, I just want to offer reliable, basically styled and easily customizable components for getting basic, typed information.

A good next step would be to add an adapter like leiops icon has. Users could specify their own icons, decide on basic keyboard shortcut behaviors, turn things on and off globally, etc. (or plug in their own fuzzy match implementation).

I also want to focus on moving toward composable components - for example a user input that can get its own options and whatnot. Or a simple recipe for wrapping existing components into new ones by specifying an icon and the contents of their dropdown 

