const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');
// const { GetAllAddresss } = require('../../../../app/address');

const AddresssController = {
  get router() {
    const router = Router();

    router.use(inject('addressSerializer'));

    router.get('/', inject('getAllAddresses'), this.index);
    router.get('/:id', inject('getAddress'), this.show);
    router.post('/', inject('createAddress'), this.create);
    router.put('/:id', inject('updateAddress'), this.update);
    router.put('/addUserAddress/:id', inject('addUserAddress'), this.addUserAddress);
    router.delete('/:id', inject('deleteAddress'), this.delete);

    return router;
  },

  index(req, res, next) {
    const { getAllAddresses, addressSerializer } = req;
    const { SUCCESS, ERROR } = getAllAddresses.outputs;

    getAllAddresses
      .on(SUCCESS, (addresses) => {
        res
          .status(Status.OK)
          .json(addresses);
      })
      .on(ERROR, next);

    getAllAddresses.execute();
  },

  show(req, res, next) {
    const { getAddress, addressSerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getAddress.outputs;

    getAddress
      .on(SUCCESS, (address) => {
        res
          .status(Status.OK)
          .json(address);
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    getAddress.execute(req.params.id);
  },

  create(req, res, next) {
    const { createAddress, addressSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createAddress.outputs;

    createAddress
      .on(SUCCESS, (address) => {
        res
          .status(Status.CREATED)
          .send(address);
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);

    createAddress.execute(req.body);
  },

  update(req, res, next) {
    const { updateAddress, addressSerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = updateAddress.outputs;

    updateAddress
      .on(SUCCESS, (address) => {
        res
          .status(Status.ACCEPTED)
          .json(addressSerializer.serialize(address));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    updateAddress.execute(req.params.id, req.body);
  },

  delete(req, res, next) {
    const { deleteAddress } = req;
    const { SUCCESS, ERROR, NOT_FOUND } = deleteAddress.outputs;

    deleteAddress
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    deleteAddress.execute(req.params.id);
  },
  
  addUserAddress(req, res, next) {
    const { addUserAddress } = req;
    const { SUCCESS, ERROR, NOT_FOUND } = addUserAddress.outputs;

    addUserAddress
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

      addUserAddress.execute(req.params.id, req.body);
  }
};

module.exports = AddresssController;
