var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
		promotedActivity: null,
		activities: []
	};

	// get the promote activity
	view.on('init', function (next) {
		var q = keystone.list('Activity').model.findOne({
			isPromotePage: true
		})
			.sort('-publishedDate')
			.populate('author categories');

		q.exec(function (err, result) {
			locals.data.promotedActivity = result;
			next(err);
		});
	});

	// get the home activities
	view.on('init', function (next) {

		var q = keystone.list('Activity').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: {
				state: 'published',
				isPromotePage: false,
				inHomePage: true
			},
		})
			.sort('-publishedDate')
			.populate('author categories');

		q.exec(function (err, results) {
			locals.data.activities = results;
			next(err);
		});
	});

	// Render the view
	view.render('index');
};
