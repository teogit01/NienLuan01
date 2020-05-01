import express from 'express'
import storage from 'node-persist'

module.exports.data = async function(req,res,next){
	const options = {
		dir : 'mydata',
		encoding: 'utf8',
		ttl : false
	}
	await storage.init(options)
		storage.setItem('date','date')
	
		console.log(storage.getItem('date'))
	next();
};



