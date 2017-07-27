# udemy_mean

Practice files for Udemy Mean Stack course.

## MEAN Stack App

This folder contains the MEAN stack application that is built through
Full Stack Training's MEAN Stack course.

## Notes

- Look into `res.render()` method to dynamically render content from templates.

- Use [Nodemon](https://nodemon.io/) to automatically restart server after configuration changes. (*Never use this in production*).

- This here is convenient for quickly finding/replacing the req.body in `hotels.controllers.js` when adding a new hotel.

`s/^\s*(.*)\s*$/$1 : req.body.$1/`
Using VIM commands in VS Code, this replaces
`name` with `name : req.body.name`
