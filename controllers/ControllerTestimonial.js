const {Testimoni,Portofolio} = require('../models/index')

class Controller {
    static async getTestimoni(req,res) {
        try {
            const testimonials = await Testimoni.findAll({
                include : [
                    Portofolio
                ]
            });
            res.status(200).json(testimonials)
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
          }
    }
    static async getTestimoniById(req,res) {
      try {
        const {id} = req.params
        const data = await Testimoni.findByPk(id,{
          include : [
            Portofolio
          ]
        })
        if (!data) {
          throw {
            name : 'product not found'
          }
        }
        res.status(200).json(data)
      } catch (error) {
        console.log(error);
      }
    }
    static async postTestimoni(req,res) {
        try {
            const { name, avatar, testimoni,portofolioId } = req.body;
            const testimonial = await Testimoni.create({ name, avatar, testimoni,portofolioId });
            res.status(201).json(testimonial);
          } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
          }
    }
    static async approvedTestimoni(req,res) {
      try {
        const testimonialId = req.params.id;
        const testimonial = await Testimoni.findByPk(testimonialId);
        if (!testimonial) {
          return res.status(404).json({ error: 'Testimonial not found' });
        }
        testimonial.approved = true;
        await testimonial.save();
        res.json(testimonial);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
}

module.exports = Controller