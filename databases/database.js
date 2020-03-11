import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
		'NienLuan01',
		'postgres',
		'00',
		{
			host:'localhost',
			dialect:'postgres',
			//operatorsAliases: false,
			logging: false,
			pool:{
				max:5,
				min:0,
				require:30000,
				idle:1000
			}
		}
		
);

sequelize.authenticate()
	.then(()=>console.log("Conneted database successfully!"))
		.catch(err=>console.log(err.message))