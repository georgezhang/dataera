var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'activity';
	locals.filters = {
		slug: req.params.slug,
	};
	locals.data = {
		activities: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Activity').model.findOne({
			state: 'published',
			slug: locals.filters.slug,
		}).populate('author categories');

		q.exec(function (err, result) {
			locals.data.currentActivity = result;
			next(err);
		});

	});

	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Activity').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.activities = results;
			next(err);
		});

	});

	// Render the view
	view.render('activityDetail');
};
