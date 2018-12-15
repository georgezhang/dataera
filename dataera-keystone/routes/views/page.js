var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'about';
	locals.data = {};
	// Load page
	view.on('init', function(next) {

		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.section.toLowerCase(),
		});

		q.exec(function(err, result) {
			locals.data.post = result;
			next(err);
		});
	});

	view.render('page');
};
