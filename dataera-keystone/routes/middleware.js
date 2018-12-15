var keystone = require('keystone');
var _ = require('lodash');
var TAGS = require('../models/values').tags
var cache = {};

function getSiteText(locals, tag, next) {
	if (!cache[tag] || Date.now() - cache[tag].createdAt > 1000 * 60) {
		var q = keystone.list('SiteText').model.find()
			.where('tag', tag).sort('sequence');
		q.exec(function(err, results) {
			cache[tag] = {
				results: results,
				createdAt: Date.now()
			};
			locals[tag] = cache[tag];
			next(err);
		});
	} else {
		locals[tag] = cache[tag];
		next();
	}
}

/**
	Initialises cache text strings

	This included SPONSORS, SERVICES
*/
exports.initCacheServices = function(req, res, next) {
	getSiteText(res.locals, TAGS[0], next);
};
exports.initCacheSponsors = function(req, res, next) {
	getSiteText(res.locals, TAGS[1], next);
};

/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function(req, res, next) {
	res.locals.navLinks = [{
			label: 'About us',
			key: 'about',
			href: '/about'
		},
		{
			label: 'Blog',
			key: 'blog',
			href: '/blog'
		},
		{
			label: 'Contact',
			key: 'contact',
			href: '/contact'
		},
	];
	res.locals.user = req.user;
	console.log(res.locals);
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function(req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function(msgs) {
		return msgs.length;
	}) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function(req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
