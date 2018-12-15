var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Activity Model
 * ==========
 */

var Activity = new keystone.List('Activity', {
	map: {
		name: 'title'
	},
	autokey: {
		path: 'slug',
		from: 'title',
		unique: true
	},
});

Activity.add({
	title: {
		type: String,
		required: true
	},
	state: {
		type: Types.Select,
		options: 'draft, published, archived',
		default: 'draft',
		index: true
	},
	author: {
		type: Types.Relationship,
		ref: 'User',
		index: true
	},
	startDateTime: {
		type: Types.Datetime,
		default: Date.now
	},
	publishedDate: {
		type: Types.Date,
		index: true,
		dependsOn: {
			state: 'published'
		}
	},
	image: {
		type: Types.CloudinaryImage
	},
	content: {
		brief: {
			type: Types.Html,
			wysiwyg: true,
			height: 150
		},
		extended: {
			type: Types.Html,
			wysiwyg: true,
			height: 400
		},
	},
	categories: {
		type: Types.Relationship,
		ref: 'ActivityCategory'
	},
	inHomePage: {
		type: Types.Boolean,
		default: false
	},
	isPromotePage: {
		type: Types.Boolean,
		default: false
	},
	button: {
		text: {
			type: String,
			required: true,
			default: 'More Detail'
		},
	}
});

Activity.schema.virtual('content.simple').get(function() {
	return this.content.brief || (this.content.extended ? this.content.extended.substring(0, 120) : '');
});

Activity.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Activity.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Activity.register();
