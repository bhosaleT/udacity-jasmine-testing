/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('The URL is defined and the URL value is not empty', () => {
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined(); // the url variable should not be undefined
                expect(feed.url.length).not.toBe(0); // the url length should not be zero.

            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("The feed should have a name defined and its not empty", () => {
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined(); // the name variable should not be undefined.
                expect(feed.name.length).not.toBe(0); //The name variable length should not be zero.
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', () => {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('Menu is hidden by default', () => {
            //select the document - body attribute from html and check if it has the menu hidden class 
            expect($(document.body).hasClass('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('Toggle visibility on click', () => {
            $('.menu-icon-link').click();
            expect($(document.body).hasClass('menu-hidden')).toBe(false) // when first clicked the hidden attribute is to be false which in turn makes the content visible.

            $('.menu-icon-link').click();
            expect($(document.body).hasClass('menu-hidden')).toBe(true); // when clicked again the hidden attribute is set back to true again.

        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach((done) => {
            loadFeed(0, done);
        });

        //spec to check if the there is some entry in the feed container.
        it('There is atleast a single ".entry" element within ".feed" container', () => {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {


        var content; //variable to store the current feed.
        var newContent; // variable to store the newContent in the feed.

        beforeEach((done) => {
            loadFeed(0, () => {
                content = $('.entry').find('h2')[0].innerText;
            });

            loadFeed(1, () => {
                newContent = $('.entry').find('h2')[0].innerText;
                done(); 
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('Ensure that the content feed changes when new feed is added', (done) => {
            expect(newContent).not.toBe(content);
            done();
        });

    });

}());