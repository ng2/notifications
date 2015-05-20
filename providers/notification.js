/**
 * @ngdoc service
 * @name notifications.providers:notificationProvider
 * @description
 * Provider configuration docs.
 */

/**
 * @ngdoc service
 * @name notifications.services:notification
 * @description
 * Service consumption docs.
 */

angular
    .module('ng2-notifications', [])
    .provider('Notification', function () {

        var defaults = {}, notifications = [];

        /**
         * @description
         * The actual service.
         */
        return {

            /**
             * Inject services used within your service here
             */
            $get: ['$rootScope', '$timeout', function ($rootScope, $timeout) {

                var permission;

                $rootScope.$on('ng2notifications:permission::granted', function () {
                    notifications.forEach(function (n) {
                        if (!n.shown) {
                            $rootScope.$broadcast('ng2notifications:create:');
                            n.notification = createNotification(n);
                        }
                    });
                });

                /**
                 * @name createNotification
                 * @ngdoc function
                 * @methodOf notifications.services:notification
                 * @param  {Object} options The object to create the notification with.
                 * @description
                 * Accepts an object with image, title, text and show attributes.
                 * Show is either a boolean (true, false would not show the notification)
                 * or a time in milliseconds.
                 */
                var createNotification = function (options) {
                    var title = options.title || defaults.title;
                    var show = options.show || defaults.show;

                    var o = {};
                    o.icon = options.image || defaults.image;
                    o.body = options.text || defaults.text;

                    var n = new Notification(title, o);

                    options.notification = n;

                    if (typeof(show) === "number") {
                        $timeout(function () {
                            n.close();
                            options.shown = true;
                        }, show);
                    } else if (show === true) {
                        options.shown = true;
                    }
                };

                return {
                    /**
                     * @name create
                     * @ngdoc function
                     * @methodOf notifications.services:notification
                     * @return {Object} the notification object
                     * @description
                     * Create a new notification, or queue it.
                     * Will ask for permissions if none are granted yet.
                     */
                    create: function (options) {
                        notifications.push(options);
                        if (permission === 'granted') {
                            createNotification(options);
                        } else {
                            this.checkPermission();
                        }
                        return options;
                    },

                    /**
                     * @name checkPermission
                     * @ngdoc function
                     * @methodOf notifications.services:notification
                     * @description
                     * Ask for permission to show notifications.
                     */
                    checkPermission: function () {
                        permission = Notification.permission;
                        if (permission === 'granted') {
                            $rootScope.$broadcast('ng2notifications:permission::granted');
                        } else {
                            Notification.requestPermission(function (status) {
                                permission = Notification.permission;
                                if (permission === 'granted') {
                                    $rootScope.$broadcast('ng2notifications:permission::granted');
                                } else {
                                    $rootScope.$broadcast('ng2notifications:permission::denied');
                                }
                            });
                        }
                    }
                };
            }],

            /**
             * @name setDefaults
             * @ngdoc function
             * @methodOf notifications.providers:NotificationProvider
             * @param  {Object} the defaults
             * @description
             * Accepts an object with image, title, text and show attributes.
             * Show is either a boolean (true, false would not show the notification)
             * or a time in milliseconds.
             */
            setDefaults: function (opt) {
                if (typeof opt !== 'object') {
                    throw new Error('notification: setDefaults expects an object');
                }
                defaults = opt;
            }
        };
    });
