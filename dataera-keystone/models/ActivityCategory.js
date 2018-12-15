var COLORS = require('./values').colors
var GRADIENTS = require('./values').gradients
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * ActivityCategory Model
 * ==================
 */

var ActivityCategory = new keystone.List('ActivityCategory', {
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	},
});

ActivityCategory.add({
	name: {
		type: String,
		required: true
	},
	buttonColor: {
		type: Types.Select,
		options: COLORS,
		emptyOption: false,
		note: 'Refer to https://mdbootstrap.com/docs/jquery/components/buttons/'
	},
	headingGradient: {
		type: Types.Select,
		options: GRADIENTS,
		emptyOption: false,
		note: 'Refer to https://mdbootstrap.com/docs/jquery/css/gradients/'
	}
});

ActivityCategory.relationship({
	ref: 'Activity',
	path: 'activities',
	refPath: 'categories'
});

ActivityCategory.register();
