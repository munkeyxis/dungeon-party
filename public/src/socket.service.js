(function() {
    'use strict';

    angular
        .module('characterSheet')
        .factory('socket', socket);

    /* @ngInject */
    function socket($rootScope, $log) {
        let socket = io.connect('192.168.1.135:3000');
        $log.info('socket created');

        const service = {
            on: on,
            emit: emit
        };
        return service;

        ////////////////

        function on(eventname, callback) {
            function wrapper() {
                $rootScope.$apply(() => {
                    callback.apply(socket, arguments);
                });
            }

            socket.on(eventname, wrapper);

            return () => {
                socket.removeListener(eventname, wrapper);
            };
        }

        function emit(eventName, data, callback) {
            socket.emit(eventName, data, () => {
                $rootScope.$apply(() => {
                    if(callback) {
                        callback.apply(socket, arguments);
                    }
                });
            });
        }
    }
})();