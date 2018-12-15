var TAGS = require('./values').tags
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * SiteText Model
 * ==========
 */

var SiteText = new keystone.List('SiteText', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

SiteText.add({
	title: { type: String, required: true },
	content: { type: Types.Html, wysiwyg: true, height: 400 },
	url: { type: Types.Url },
	image: { type: Types.CloudinaryImage },
	sequence: { type: Types.Number, default: 9999, required: true },
	tag: {
		type: Types.Select,
		options: TAGS,
		emptyOption: false
	},
});

SiteText.defaultColumns = 'title, tag|20%';
SiteText.register();
