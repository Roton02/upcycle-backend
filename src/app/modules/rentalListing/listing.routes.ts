import { Router } from 'express'
import { listingController } from './listing.controller'
// import { BlogValidation } from './blog.validation'
// import zodValidator from '../../middleware/validator'
// import auth from '../../middleware/auth'

const listingRouter = Router()
listingRouter.patch('/:id', listingController.updateListing)
listingRouter.delete('/:id', listingController.deleteListing)

listingRouter.post(
  '/',
  // auth('user'),
  // zodValidator(BlogValidation.blogCreateValidation),
  listingController.createListing
)

listingRouter.get('/:id', listingController.getSingleListing)
listingRouter.get('/', listingController.getAllListing)

export default listingRouter
///api/blogs/:id
