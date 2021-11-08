const { authenticateToken } = require('../server');
const {
  saveUserShipmentDetails,
  getUserShipmentDetails,
  updateAllUserShipmentDetails,
} = require('../services/UserShipmentDetailsService');
const { getUserData } = require('../services/UserService');

module.exports = function (app) {
  app.get('/account/shipment_data', authenticateToken, async (req, res) => {
    const userDetails = await getUserShipmentDetails(req.user.id);
    if (userDetails) return res.status(200).send(userDetails);
    return res
      .status(401)
      .send({ error: "Couldn't find shipment data for this user" });
  });

  app.post('/account/shipment_data', authenticateToken, async (req, res) => {
    const { country, city, street, house_number, phone_number } = req.body;
    const user_id = req.user.id;

    const result = await saveUserShipmentDetails(
      country,
      city,
      street,
      house_number,
      phone_number,
      user_id,
    );
    if (result) return res.status(200).send({ message: 'Success' });
    return res.status(400).send({ error: 'Failure' });
  });

  app.patch('/account/shipment_data', authenticateToken, async (req, res) => {
    const { country, city, street, house_number, phone_number } = req.body;
    const user_id = req.user.id;

    const result = await updateAllUserShipmentDetails(
      user_id,
      country,
      city,
      street,
      house_number,
      phone_number,
    );
    if (result) return res.status(200).send({ message: 'Success' });
    return res.status(400).send({ error: 'Failure' });
  });

  app.get('/account/user_data', authenticateToken, async (req, res) => {
    const result = await getUserData(req.query.id);
    if (result) return res.status(200).json(result);
    return res.status(400).json({ error: 'Server error' });
  });
};
