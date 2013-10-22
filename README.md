# notifications
> a simple notifications service for angularjs

## usage
Dropin somewhere in your config's a setup your defaults with

```js
NotificationProvider.setDefaults({
  image: "path/to/your/default/image.png",
  title: "my default title",
  text: "my default body",
  show: 1000 // default delay to show, or just true to show immediately
});
```

And then from anywhere in your code create a new notification with

```js
Notification.create({
  image: "path/to/your/awesome-image.png",
  title: "Ahoy!",
  text: "This is a notification yeah!",
  show: true
});
```

### worth knowing

`Notification.create` will create a new notification if it can, or it will queue it and will ask the browser for permissions and __then__ create it.

You can smash a bunch of `Notification.create` together and have the service queue them all with different timings so after the users gives the app permissions BAM, the notifications start flowing :)

## As shown in [leostera.com](leostera.com). Just click the lambda.