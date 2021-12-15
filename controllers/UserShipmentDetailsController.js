const { authenticateToken } = require('../server');
const {
  saveUserShipmentDetails,
  getUserShipmentDetails,
  updateAllUserShipmentDetails,
} = require('../services/UserShipmentDetailsService');
const { getUserData } = require('../services/UserService');

module.exports = function (app) {
  app.get('/account/shipment_data', authenticateToken, async (req, res) => {
    try {
      const userDetails = await getUserShipmentDetails(req.user.id);
      if (userDetails) return res.status(200).send(userDetails);
      return res
        .status(401)
        .send({ error: "Couldn't find shipment data for this user" });
    } catch (err) {
      console.error(err);
    }
  });

  app.post('/account/shipment_data', authenticateToken, async (req, res) => {
    try {
      const data = {
        ...req.body,
        user_id: req.user.id,
      };

      const result = await saveUserShipmentDetails(data);
      if (result) return res.status(200).send({ message: 'Success' });
      return res.status(400).send({ error: 'Failure' });
    } catch (err) {
      console.error(err);
    }
  });

  app.patch('/account/shipment_data', authenticateToken, async (req, res) => {
    try {
      const data = {
        ...req.body,
        user_id: req.user.id,
      };

      const result = await updateAllUserShipmentDetails(data);
      if (result) return res.status(200).send({ message: 'Success' });
      return res.status(400).send({ error: 'Failure' });
    } catch (err) {
      console.error(err);
    }
  });

  app.get('/account/user_data', authenticateToken, async (req, res) => {
    try {
      const result = await getUserData(req.user.id);
      if (result) return res.status(200).json(result);
      return res.status(400).json({ error: 'Server error' });
    } catch (err) {
      console.error(err);
    }
  });
};
