This is a very simple kiosk application that just shows a single website using electron.
Built with the assistance of Claude, in part as an exploration of the js ecosystem which
I'm largely unfamiliar with, but also because I wanted the simplest browser in the world 
to exist.

![Screenshot](/kiosk.png)

By default the browser opens in fullscreen, but it's toggleable with F11, Ctrl+F, Cmd+F,
and exitable with Escape.

Building:

```
npm install
```

Running:

```
npm start https://www.example.com/
```

Can also be compiled into a binary using 

```
npm run build
```
