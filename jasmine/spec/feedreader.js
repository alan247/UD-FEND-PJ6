/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds object
         * and ensures it has a both an URL and name defined and that
         * neither are empty.
         */
         it('have all url\'s and names defined', function() {
            for (feed in allFeeds) {
                expect(allFeeds[feed].url).toBeDefined();
                expect(allFeeds[feed].url).toBeTruthy();
                expect(allFeeds[feed].name).toBeDefined();
                expect(allFeeds[feed].name).toBeTruthy();
            };
         });

    });

    describe('The menu', function() {

        /* Test that ensures the menu element is hidden by default.
         */
         it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
         });

        /* Test that ensures the menu changes visibility when the
         * menu icon is clicked.
         */
        it('toggles visibility on click', function() {

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

    });

    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed function is called
         * and completes its work, there is at least a single
         * .entry element within the .feed container.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('have been successfully loaded', function() {
            expect($('.entry').length).toBeGreaterThan(0);
        });
     });

    describe('New Feed Selection', function() {
        /* Test that ensures when a new feed is loaded by the
         * loadFeed function that the content actually changes.
         */
        var firstHTML;

        beforeEach(function (done) {
            loadFeed(0, function() {
                firstHTML = $('.feed').html();
                done();
            });
        });

        it('has been loaded and displayed', function(done) {
            loadFeed(2, function() {
                expect($('.feed').html()).not.toEqual(firstHTML);
                done();
            })
        });
    });
}());
