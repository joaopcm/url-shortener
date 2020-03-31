import uniqid from 'uniqid';
import * as Yup from 'yup';

import ShortLink from '../schemas/ShortLink';

class UrlController {
  async show(req, res) {
    const { short } = req.params;

    const getShortenedLink = await ShortLink.findOne({
      shortened: short,
    });

    if (!getShortenedLink) {
      return res.status(404).json({ error: 'Shortened URL not found' });
    }

    getShortenedLink.amountOfHits += 1;
    await getShortenedLink.save();

    return res.redirect(getShortenedLink.original);
  }

  async store(req, res) {
    const { url } = req.body;

    const schema = Yup.object().shape({
      url: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'You must provide an URL' });
    }

    const shortened = uniqid.time();

    await ShortLink.create({
      original: url,
      shortened,
    });
    const response = `http://${req.headers.host}/${shortened}`;

    return res.json({ url: response });
  }
}

export default new UrlController();
