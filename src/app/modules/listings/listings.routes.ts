import express from 'express'
import auth from '../../middleware/auth'
import zodValidator from '../../middleware/validator'
import { userRole } from '../auth/user.const'
import { ListingController } from './listings.controller'
import {
  listingSchemaValidation,
  listingUpdateSchemaValidation,
} from './listings.vallidation'

const router = express.Router()

router.get('/', ListingController.getAllListing)
router.get('/:id', ListingController.getOneByID)
router.delete('/:id', auth(userRole.user), ListingController.deleteListing)

// create a listing
router.post(
  '/',
  auth(userRole.user),
  zodValidator(listingSchemaValidation),
  ListingController.createListing
)

// update a listing
router.patch(
  '/:id',
  auth(userRole.user),
  zodValidator(listingUpdateSchemaValidation),
  ListingController.updateListing
)

export const ListingRoutes = router
