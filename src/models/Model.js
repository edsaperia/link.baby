const path = require('path')
const { Model } = require('objection')
const config = require('./knexfile').docker
const knex = require('knex')(config)
require('mysql') // to ensure it gets bundled in
Model.knex(knex)

class SplitThisModel extends Model {
	static get modelPaths() {
		return [
			path.resolve(__dirname),
		]
	}
}

export default SplitThisModel