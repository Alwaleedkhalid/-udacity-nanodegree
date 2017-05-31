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
         //first test suits that contains related set of tests
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        //this checks if all the feeds have url and isn't null
        it('URL is to be defined here', function() {
            allFeeds.forEach(function(everyFeed) {
                expect(everyFeed.url).toBeDefined();
                expect(everyFeed.url.length).not.toBe(0);

            });
        });

       //ensures if all feeds have name and isn't null
        it('Name is to be defined here', function() {
            allFeeds.forEach(function(everyFeed) {
                expect(everyFeed.name).toBeDefined();
                expect(everyFeed.name.length).not.toBe(0);

            });
        });
    });

    //this is our second test suit menu 
    describe('Menu', function() {

        /* this test ensures menu elemt is hidden by default */

        it('Hidden elements ', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

       //displays menu when clicked


        it('menu visibility', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            //menu will hide when clicked again
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

   //third initial entries 

    describe('Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        //this test ensure when load feed function is called their is atleast single .
        it('feed containor elements', function(done) {
            expect($('.feed .entry').length!==0).toBe(true);
            done();
        });
    });

    
    describe('Feed Selection is to be done here', function() {
        var fd;
        var nfd;
        beforeEach(function(done) {
            loadFeed(0, function() {
                fd = $('.feed').html();
                loadFeed(1, function() {
                    nfd= $('.feed').html();
                    done();
                });
            });
        });

        //this test checks for feed change at reload
        it('new feed is to be loaded here', function() {
            expect(fd).not.toEqual(nfd);
        });
    });

}());