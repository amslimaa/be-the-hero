const connection = require('../database/connection');

module.exports ={
  async store(req, res){
    const { id } = req.body;

    const ong = await connection('ongs').where('id', id).select('*').first();

    if(!ong){
      return res.status(400).json({ error : 'NO Ong found with this id'});
    }
    return res.json(ong);

  }
}