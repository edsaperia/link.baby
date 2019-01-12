// creates a `mapping-templates` folder with the velocity templates
// for each query and mutation defined in your schema.graphql
// and a `sls-appsync-mt.yml` to use inside of `serverless.yml`:
// custom.appsync.mappingTemplates: ${file(./sls-appsync-mt.yml)}

const fs = require('fs')
const { join } = require('path')
const { introspectSchema } = require('apollo-codegen')
const ejs = require('ejs')
const yaml = require('node-yaml')

const { readFileSync } = fs

const generateVelocityTemplate = ({ type = 'request', field }) => {
	try {
		const template = fs.readFileSync(join(__dirname, `./${type}-mapping-template.tmpl.ejs`), 'utf-8')
		const mtContents = ejs.render( template, field ? { field } : {} )
		const outPath = join(__dirname, `../mapping-templates/${field ? `${field}-` : ''}${type}-mapping-template.txt`)
		fs.writeFileSync(outPath, mtContents, 'utf-8')
	} catch (err) {
		console.log(err)
	}
}

introspectSchema(
	join(__dirname, '../schema.graphql'),
	join(__dirname, './schema.json')
)
	.then(() => {
		const schema = require('./schema.json').data.__schema

		const toResolve = schema.types.reduce((toResolve, y) => {
			if(
				(schema.queryType && y.name === schema.queryType.name) ||
				(schema.mutationType && y.name === schema.mutationType.name) ||
				(schema.subscriptionType && y.name === schema.subscriptionType.name)
			) {
				toResolve = [
					...toResolve,
					...y.fields.map(f => ({
						field: f.name,
						type: y.name,
					}))
				]
			}
			return toResolve
		}, [])
	
		const slsConf = []
		let dataSource = process.argv.length > 2 ? process.argv[2] : null
		dataSource = dataSource || 'Lambda'

		const dir = './mapping-templates'
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir)
		}

		toResolve.map((data) => {
			const { field } = data
			slsConf.push({
				dataSource,
				...data,
				request: `${field}-request-mapping-template.txt`,
				response: 'response-mapping-template.txt',
			})
			generateVelocityTemplate({ field })
		})
		generateVelocityTemplate({ type: 'response' })

		yaml.writeSync(join(__dirname, '../sls-appsync-mt.yml'), slsConf)
		fs.unlinkSync(join(__dirname, './schema.json'))

		console.log('done appsync gen')
	})
	.catch(err => console.error(err))
